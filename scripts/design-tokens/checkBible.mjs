const KINDS = new Set(["static", "island"]);
const COMPONENT_PARTS = ["no-js", "states", "a11y", "tokens-used"];

export function lintBible(html) {
    const problems = [];

    for (const [tag] of html.matchAll(/<img\b[^>]*>/gi)) {
        if (!/\balt=/i.test(tag)) problems.push(`image without alt: ${tag.slice(0, 60)}`);
    }
    for (const [tag] of html.matchAll(/<svg\b[^>]*>/gi)) {
        if (!/aria-hidden="true"/i.test(tag) && !/role="img"/i.test(tag)) problems.push(`svg needs aria-hidden="true" or role="img": ${tag.slice(0, 60)}`);
    }
    // Only real tags: example markup in prose is escaped (&lt;) and has no literal "<".
    for (const m of html.matchAll(/<[a-z][^>]*?\s(?:src|href)="(https?:[^"]*)"/gi)) problems.push(`external ${m[1]}`);
    for (const m of html.matchAll(/url\(\s*["']?(https?:[^)"']*)/gi)) problems.push(`external ${m[1]}`);
    for (const m of html.matchAll(/@import\b[^;]*/gi)) problems.push(`external @import: ${m[0]}`);

    const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
    if (h1Count > 1) problems.push(`expected at most one h1, found ${h1Count}`);

    for (const m of html.matchAll(/<article\b[^>]*class="[^"]*\bcomponent\b[^"]*"[^>]*>([\s\S]*?)<\/article>/gi)) {
        const kind = /data-kind="([^"]*)"/.exec(m[0].slice(0, m[0].indexOf(">") + 1))?.[1];
        const title = /<h3[^>]*>([\s\S]*?)<\/h3>/.exec(m[1])?.[1] ?? "(untitled)";
        if (!kind || !KINDS.has(kind)) problems.push(`component "${title}": data-kind must be static or island`);
        for (const part of COMPONENT_PARTS) {
            if (kind && !new RegExp(String.raw`class="[^"]*\b${part}\b`).test(m[1])) problems.push(`component "${title}": missing .${part} block`);
        }
    }
    return problems;
}
