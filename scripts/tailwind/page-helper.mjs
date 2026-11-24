// JavaScript to run in the page (claude-in-chrome javascript_tool, in the user's Edge) for before/after parity checks.
//   __tw(label, "save")  store the structural-path snapshot of `root` in sessionStorage ("tw-<label>")
//   __tw(label)          compare the current snapshot with it: {w, diffCount, byProp, rest}
//   __twFrame(width, label, mode, nojs)  the same inside a hidden same-origin iframe of this page at `width` px (Edge cannot resize
//                                        its viewport); nojs swaps `js` for `no-js` on the iframe's <html>
//   __twFocus(selector)  focus an element and report its outline/border/shadow and its parent's
// __tw must stay self-contained: __twFrame evaluates its source inside the iframe's window.
import {buildCaptureExpression} from "./snapshot.mjs";

export function buildPageHelper({root}) {
    return `window.__tw = function (label, mode) {
    var snap = ${buildCaptureExpression({root})};
    var key = "tw-" + label;
    if (mode === "save") {
        sessionStorage.setItem(key, JSON.stringify(snap));
        return {saved: Object.keys(snap).length, w: innerWidth};
    }
    var before = JSON.parse(sessionStorage.getItem(key));
    if (!before) throw new Error("no saved snapshot for " + label);
    var diffs = [];
    Object.keys(Object.assign({}, before, snap)).forEach(function (path) {
        if (!(path in snap)) return diffs.push([path, "(element)", "present", "missing"]);
        if (!(path in before)) return diffs.push([path, "(element)", "missing", "present"]);
        Object.keys(Object.assign({}, before[path], snap[path])).forEach(function (prop) {
            if (before[path][prop] !== snap[path][prop]) diffs.push([path, prop, before[path][prop], snap[path][prop]]);
        });
    });
    var byProp = {};
    diffs.forEach(function (d) { byProp[d[1]] = (byProp[d[1]] || 0) + 1; });
    return {
        w: innerWidth,
        diffCount: diffs.length,
        byProp: byProp,
        rest: diffs.filter(function (d) { return !/radius/.test(d[1]); }).slice(0, 6).map(function (d) { return d.join(" | ").slice(0, 160); })
    };
};
window.__twFrame = async function (width, label, mode, nojs) {
    var frame = document.createElement("iframe");
    frame.style.cssText = "position:fixed;left:0;top:0;width:" + width + "px;height:900px;border:0;visibility:hidden;pointer-events:none";
    frame.src = location.pathname + location.search;
    document.body.appendChild(frame);
    await new Promise(function (resolve) { frame.onload = resolve; });
    await new Promise(function (resolve) { setTimeout(resolve, 3000); });
    var win = frame.contentWindow;
    if (nojs) win.document.documentElement.className = win.document.documentElement.className.replace(/\\bjs\\b/, "no-js");
    var result = win.eval("(" + window.__tw.toString() + ")")(label, mode);
    frame.remove();
    return result;
};
window.__twFocus = function (selector) {
    var el = document.querySelector(selector);
    if (!el) throw new Error("not found: " + selector);
    var describe = function (node) {
        var s = getComputedStyle(node);
        return {outline: s.outlineStyle + " " + s.outlineWidth + " " + s.outlineColor + " off " + s.outlineOffset, border: s.borderTopStyle + " " + s.borderTopWidth, shadow: s.boxShadow.slice(0, 60)};
    };
    el.focus();
    var result = {active: document.activeElement === el, target: describe(el), parent: el.parentElement ? describe(el.parentElement) : null};
    el.blur();
    return result;
};
`;
}
