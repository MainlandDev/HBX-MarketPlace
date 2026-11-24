// Prints the in-page parity helper for a component root. Run: npm run tw-helper -- "<css selector of the component root>"
// Paste the output into the claude-in-chrome javascript_tool (the user's Edge) on the page that renders the component.
import {buildPageHelper} from "./tailwind/page-helper.mjs";

const root = process.argv[2];
if (!root) {
    console.error('usage: npm run tw-helper -- "<css selector of the component root>"');
    process.exit(2);
}
process.stdout.write(buildPageHelper({root}));
