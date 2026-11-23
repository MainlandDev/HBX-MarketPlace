// Before/after verification for class-to-utility conversions. buildCaptureExpression() makes a script to run in the page
// (claude-in-chrome javascript_tool or the DevTools console); diffSnapshots() compares two of its results.
// Elements are keyed by structural path, not class, so renaming classes does not change the keys.
export const DEFAULT_PROPS = [
    "display", "position", "top", "right", "bottom", "left", "z-index", "float", "overflow-x", "overflow-y", "box-sizing",
    "width", "height", "min-width", "max-width", "min-height", "max-height",
    "margin-top", "margin-right", "margin-bottom", "margin-left",
    "padding-top", "padding-right", "padding-bottom", "padding-left",
    "flex-direction", "flex-wrap", "flex-grow", "flex-shrink", "align-items", "justify-content", "gap",
    "grid-template-columns", "grid-template-rows",
    "color", "background-color", "font-family", "font-size", "font-weight", "line-height", "letter-spacing", "text-align", "text-transform", "text-decoration-line",
    "border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "border-top-style", "border-top-color",
    "border-top-left-radius", "border-top-right-radius", "border-bottom-left-radius", "border-bottom-right-radius",
    "box-shadow", "opacity", "transform", "visibility",
];

export function buildCaptureExpression({root, props = DEFAULT_PROPS}) {
    return `(function () {
    var rootEl = document.querySelector(${JSON.stringify(root)});
    if (!rootEl) throw new Error("root not found: " + ${JSON.stringify(root)});
    var props = ${JSON.stringify(props)};
    function pathOf(node) {
        var parts = [];
        while (node !== rootEl) {
            var parent = node.parentElement;
            parts.unshift(node.tagName.toLowerCase() + ":nth-child(" + (Array.prototype.indexOf.call(parent.children, node) + 1) + ")");
            node = parent;
        }
        return parts.length ? parts.join(">") : ".";
    }
    var out = {};
    var nodes = [rootEl].concat(Array.prototype.slice.call(rootEl.querySelectorAll("*")));
    nodes.forEach(function (node) {
        var style = getComputedStyle(node);
        var record = {};
        props.forEach(function (prop) { record[prop] = style.getPropertyValue(prop); });
        out[pathOf(node)] = record;
    });
    return out;
})()`;
}

export function diffSnapshots(before, after) {
    const diffs = [];
    for (const path of new Set([...Object.keys(before), ...Object.keys(after)])) {
        if (!(path in after)) diffs.push({path, property: "(element)", before: "present", after: "missing"});
        else if (!(path in before)) diffs.push({path, property: "(element)", before: "missing", after: "present"});
        else {
            for (const property of new Set([...Object.keys(before[path]), ...Object.keys(after[path])])) {
                if (before[path][property] !== after[path][property]) {
                    diffs.push({path, property, before: before[path][property], after: after[path][property]});
                }
            }
        }
    }
    return diffs;
}
