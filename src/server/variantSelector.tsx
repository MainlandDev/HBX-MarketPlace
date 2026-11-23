// Lives outside src/templates: the HBX plugin builds every export of a file under there as a template of its own.
import {$assignVar, $If, $null, $number, $pointer, $string, $toLowerCase, place} from "@mainlanddev/hbx-bigcommerce";
import type {Body} from "@mainlanddev/hbx-bigcommerce";

/**
 * Scratchpad macros and name gates for the colour + size selector. Paper's scratchpad holds at most 50 keys and a key stays until it is
 * removed, so every flag set here is cleared by `clearFlags` before the value leaves scope.
 */
export type SelectorFlag = "hasColour" | "hasSize";

const FLAGS: readonly SelectorFlag[] = ["hasColour", "hasSize"];

/** `{{assignVar "hasColour" 1}}` */
export const setFlag = (flag: SelectorFlag): string => place($assignVar($string(flag), $number(1)));

/** `{{assignVar "hasColour" null}}{{assignVar "hasSize" null}}`: removing a key frees its slot. */
export const clearFlags = (): string => FLAGS.map((flag) => place($assignVar($string(flag), $null()))).join("");

interface Gate {
    readonly $then?: Body;
    readonly $else?: Body;
}

const lowerName = () => $toLowerCase($pointer<string>("display_name"));
const is = (name: string) => ({test: lowerName(), operator: $string("==="), rvalue: $string(name)}) as const;

/** For the option in context: `$then` when it is named `Colour` or `Color` (any case), else `$else`. */
export const WhenColour = ({$then, $else}: Gate): string => $If({...is("colour"), $then, $elseThen: [{...is("color"), $then: $then ?? (() => "")}], $else});

/**
 * Like `WhenColour`, and the option must also render as a swatch (its `partial` is "swatch"). A Colour option of any other type (dropdown,
 * rectangles, radios) does not qualify, so the page keeps its plain option list.
 */
export const WhenColourSwatch = ({$then}: {readonly $then: Body}): string =>
    WhenColour({$then: () => $If({test: $pointer<string>("partial"), operator: $string("==="), rvalue: $string("swatch"), $then})});

/** For the option in context: `$then` when it is named `Size` (any case), else `$else`. */
export const WhenSize = ({$then, $else}: Gate): string => $If({...is("size"), $then, $else});
