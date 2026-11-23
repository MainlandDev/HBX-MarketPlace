// WCAG 2.x relative luminance and contrast helpers for the design tokens.

export function parseHex(hex) {
    const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex);
    if (!m) {
        if (/^#([0-9a-f]{4}|[0-9a-f]{8})$/i.test(hex)) throw new Error(`alpha not supported: ${hex}`);
        throw new Error(`invalid hex colour: ${hex}`);
    }
    const h = m[1].length === 3 ? [...m[1]].map((c) => c + c).join("") : m[1];
    return {r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16)};
}

const channel = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

export function luminance(hex) {
    const {r, g, b} = parseHex(hex);
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(fg, bg) {
    const [a, b] = [luminance(fg), luminance(bg)];
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export function grade(ratio, size) {
    return size === "large" ? {aa: ratio >= 3, aaa: ratio >= 4.5} : {aa: ratio >= 4.5, aaa: ratio >= 7};
}
