// Which classes does each SCSS partial define, and which markup/JS still uses them? A rule may only be deleted when its class has
// no consumer outside the markup being converted. "Used" is a whole-word match anywhere in the source, which over-approximates on purpose.
const stripComments = (scss) => scss.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^[ \t]*\/\/.*$/gm, "");

const DECLARATION = /^[\w-]+\s*:\s/;

export function meaningfulLines(scss) {
    return stripComments(scss).split("\n").filter((line) => line.trim()).length;
}

export function classSelectors(scss) {
    const names = new Set();
    for (const raw of stripComments(scss).split("\n")) {
        const line = raw.trim();
        // A selector line opens a block (`{`, possibly with the body on the same line) or continues a selector list (`,`).
        const withoutInterpolation = line.replace(/#\{[^}]*\}/g, "");
        const opensBlock = withoutInterpolation.includes("{");
        if (!(opensBlock || /,$/.test(line)) || /^[@$]|^--/.test(line) || DECLARATION.test(line)) continue;
        const selector = withoutInterpolation.split("{")[0];
        const cleaned = selector.replace(/"[^"]*"|'[^']*'/g, "").replace(/\[[^\]]*\]/g, "");
        for (const match of cleaned.matchAll(/\.([A-Za-z_][\w-]*)/g)) names.add(match[1]);
    }
    return [...names];
}

// `&-title` / `&__body` build a class name from the parent selector; this tool cannot resolve those, so it reports how many there are.
const unresolvedSuffixes = (scss) => (stripComments(scss).match(/&[-_]\w/g) || []).length;

export function findConsumers(classes, files) {
    const tokens = files.map(({path, text}) => ({path, words: new Set(text.match(/[\w-]+/g) || [])}));
    return new Map(classes.map((name) => [name, tokens.filter((file) => file.words.has(name)).map((file) => file.path)]));
}

export function buildInventory({scssFiles, sourceFiles}) {
    return scssFiles
        .map(({path, text}) => {
            const classes = classSelectors(text);
            return {partial: path, lines: meaningfulLines(text), classes, consumers: findConsumers(classes, sourceFiles), unresolved: unresolvedSuffixes(text)};
        })
        .sort((a, b) => b.lines - a.lines);
}

// A TSX template under src/templates replaces the hand-written templates/<same path>.html (the dev server warns "shadows"), so the
// html copy is dead markup and must not count as a consumer.
export function withoutShadowedHtml(files) {
    const tsx = new Set(files.map((file) => file.path));
    return files.filter((file) => !(file.path.startsWith("templates/") && file.path.endsWith(".html") && tsx.has(`src/${file.path.replace(/\.html$/, ".tsx")}`)));
}
