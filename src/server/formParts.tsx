// Lives outside src/templates: the HBX plugin builds every export of a file under there as a template of its own.
// Utility-styled form controls and buttons. Generated bundles: every base utility is written as `[:where(&)]:...` (zero specificity) so any
// utility on the element or an ancestor beats it, exactly as the old non-important compat CSS lost to important utilities. States use
// natural specificity. Class names (`button`, `form-input` ...) stay on the elements as hooks: JS and the live store's injected CSS select them.
import type {ReactNode} from "react";

type Attrs = Record<string, unknown>;
// className: strings, or HBX pointers such as $pointer("class") (joined into the attribute like a template literal would)
type Props = Attrs & {className?: unknown; children?: unknown};

// Static class strings only: `.join()` would stringify an HBX element, which throws.
const cx = (...parts: Array<string | false>) => parts.filter(Boolean).join(" ");
// The caller's className may be an HBX element such as $pointer("class"): only a template literal (which HBX understands) may join it.
const withClass = (base: string, extra: unknown) => (extra ? `${base} ${extra}` : base);

const BUTTON_BASE = "[:where(&)]:appearance-none [:where(&)]:[border-style:var(--sv-button-border-style)] [:where(&)]:[border-width:var(--sv-button-border-width)] [:where(&)]:cursor-pointer [:where(&)]:font-(family-name:--sv-button-font-family) [:where(&)]:font-(weight:--sv-button-font-weight) [:where(&)]:[line-height:16px] [:where(&)]:mb-(--sv-button-margin-bottom) [:where(&)]:relative [:where(&)]:[text-align:var(--sv-button-font-align)] [:where(&)]:no-underline [:where(&)]:[vertical-align:var(--sv-button-vAlign)] [:where(&)]:[transition:all_0.15s_ease] [:where(&:not([style*=none]))]:[display:var(--sv-button-display)] medium:[:where(.button+&)]:ml-half";
const BUTTON_COLORS = {default: "[:where(&)]:bg-(--sv-buttonStyle-default-backgroundColor) [:where(&)]:border-(--sv-buttonStyle-default-borderColor) [:where(&)]:text-(--sv-buttonStyle-default-color) [:where(&:is(:hover,:focus,.is-active,.active):not([disabled]):not(:active))]:bg-(--sv-buttonStyle-default-backgroundColorHover) [:where(&:is(:hover,:focus,.is-active,.active):not([disabled]):not(:active))]:border-(--sv-buttonStyle-default-borderColorHover) [:where(&:is(:hover,:focus,.is-active,.active):not([disabled]):not(:active))]:text-(--sv-buttonStyle-default-colorHover) [:where(&:active:not([disabled]))]:bg-(--sv-buttonStyle-default-backgroundColorActive) [:where(&:active:not([disabled]))]:border-(--sv-buttonStyle-default-borderColorActive) [:where(&:active:not([disabled]))]:text-(--sv-buttonStyle-default-colorActive) [:where(&[disabled])]:bg-(--sv-buttonStyle-disabled-backgroundColor) [:where(&[disabled])]:border-(--sv-buttonStyle-disabled-borderColor) [:where(&[disabled])]:text-(--sv-buttonStyle-disabled-color) [:where(&[disabled])]:cursor-not-allowed", primary: "[:where(&)]:bg-(--sv-buttonStyle-primary-backgroundColor) [:where(&)]:border-(--sv-buttonStyle-primary-borderColor) [:where(&)]:text-(--sv-buttonStyle-primary-color) [:where(&:is(:hover,:focus,.is-active,.active):not([disabled]):not(:active))]:bg-(--sv-buttonStyle-primary-backgroundColorHover) [:where(&:is(:hover,:focus,.is-active,.active):not([disabled]):not(:active))]:border-(--sv-buttonStyle-primary-borderColorHover) [:where(&:is(:hover,:focus,.is-active,.active):not([disabled]):not(:active))]:text-(--sv-buttonStyle-primary-colorHover) [:where(&:active:not([disabled]))]:bg-(--sv-buttonStyle-primary-backgroundColorActive) [:where(&:active:not([disabled]))]:border-(--sv-buttonStyle-primary-borderColorActive) [:where(&:active:not([disabled]))]:text-(--sv-buttonStyle-primary-colorActive) [:where(&[disabled])]:bg-(--sv-buttonStyle-disabled-backgroundColor) [:where(&[disabled])]:border-(--sv-buttonStyle-disabled-borderColor) [:where(&[disabled])]:text-(--sv-buttonStyle-disabled-color) [:where(&[disabled])]:cursor-not-allowed"};
const BUTTON_SIZE = {
    default: "[:where(&)]:text-(length:--sv-buttonSize-default-fontSize) [:where(&)]:px-(--sv-buttonSize-default-horizontalPadding) [:where(&)]:py-(--sv-buttonSize-default-verticalPadding)",
    large: "[:where(&)]:text-(length:--sv-buttonSize-large-fontSize) [:where(&)]:px-(--sv-buttonSize-default-horizontalPadding) [:where(&)]:py-(--sv-buttonSize-default-verticalPadding)",
    small: "[:where(&)]:text-(length:--sv-buttonSize-small-fontSize) [:where(&)]:px-(--sv-buttonSize-small-horizontalPadding) [:where(&)]:py-(--sv-buttonSize-small-verticalPadding)",
    icon: "[:where(&)]:text-(length:--sv-buttonSize-square-fontSize) [:where(&)]:px-(--sv-buttonSize-square-horizontalPadding) [:where(&)]:py-(--sv-buttonSize-square-verticalPadding) [:is(&)_svg]:fill-(--sv-setting-button--icon-svg-color)",
};

/** `button`, `button--primary`, `button--small|large|icon`. `tag` is the element: `button`, `a`, `input` or `label`. */
export const Button = ({tag = "button", variant = "default", size = "default", className, children, ...rest}: Props & {tag?: "a" | "button" | "input" | "label"; variant?: "default" | "primary"; size?: "default" | "large" | "small" | "icon"}) => {
    const Tag = tag as "button";
    return (
        <Tag className={withClass(cx("button", variant === "primary" && "button--primary", size !== "default" && `button--${size}`, BUTTON_BASE, BUTTON_COLORS[variant], BUTTON_SIZE[size]), className)} {...rest}>
            {children as ReactNode}
        </Tag>
    );
};

const INPUT = "[:where(&)]:appearance-none [:where(&)]:bg-(--sv-input-bg-color) [:where(&)]:border-(--sv-input-border-color) [:where(&)]:[border-style:var(--sv-input-border-style)] [:where(&)]:[border-width:var(--sv-input-border-width)] [:where(&)]:text-(--sv-input-font-color) [:where(&)]:font-(family-name:--sv-input-font-family) [:where(&)]:text-(length:--sv-input-font-size) [:where(&)]:antialiased [:where(&)]:h-(--sv-input-height) [:where(&)]:[margin:var(--sv-input-margin)] [:where(&)]:[padding:var(--sv-input-padding)] [:where(&)]:[transition:var(--sv-input-transition)] [:where(&)]:w-full [:where(&:not([style*=none]))]:[display:block] [:is(&:disabled)]:bg-(--sv-input-disabled-bg) [:is(&:disabled)]:text-(--sv-input-disabled-color) [:is(&:disabled)]:[cursor:var(--sv-input-disabled-cursor)] [:is(&[readonly])]:bg-(--sv-color-greyLightest) [:is(&[readonly])]:border-(--sv-color-greyLight) [:is(&[readonly])]:text-(--sv-color-greyMedium) [:is(&[readonly])]:cursor-text [:is(&:focus)]:border-(--sv-input-focus-border-color) [:is(&[rows])]:h-auto [:is(&[type=search])]:box-border [:is(&)]:placeholder:text-(--sv-input-placeholder-color) [[class~=form-field--success][class~=form-field--success]_&]:border-(--sv-color-success) [:where([class~=form-field--success]_&)]:float-left [[class~=form-field--error][class~=form-field--error]_&]:border-(--sv-color-error) [[class~=form-field--success][class~=form-field--success]_&[type=text]]:pr-(--sv-form-success-input-paddingRight) [[class~=form-field--success][class~=form-field--success]_&[type=text]]:[background-image:var(--sv-form-success-icon)] [[class~=form-field--success][class~=form-field--success]_&[type=text]]:[background-position:right_var(--sv-form-success-icon-right)_center] [[class~=form-field--success][class~=form-field--success]_&[type=text]]:bg-no-repeat [[class~=form-field--success][class~=form-field--success]_&[type][name^=credit]]:[background-position:right_var(--sv-form-success-icon-check-right)_center] [[class~=form-field--success][class~=form-field--success]_&[type][name=cvv]]:[background-position:right_var(--sv-form-success-icon-check-right)_center]";

/** `form-input`. `tag`: `input` or `textarea`. The radius is a non-important rule in _tailwind.scss: the live store overrides it (non-important, unlayered) on some forms. */
export const FormInput = ({tag = "input", className, children, ...rest}: Props & {tag?: "input" | "textarea"}) => {
    const Tag = tag as "input";
    return (
        <Tag className={withClass(cx("form-input", INPUT), className)} {...rest}>
            {children as ReactNode}
        </Tag>
    );
};

const SELECT = "[:where(&)]:appearance-none [:where(&)]:bg-(--sv-select-bg-color) [:where(&)]:[background-image:var(--sv-select-backgroundImage)] [:where(&)]:[background-position:var(--sv-select-backgroundPosition)] [:where(&)]:bg-no-repeat [:where(&)]:rounded-(--sv-select-borderRadius) [:where(&)]:[border-style:var(--sv-input-border-style)] [:where(&)]:[border-width:var(--sv-input-border-width)] [:where(&)]:border-(--sv-input-border-color) [:where(&)]:text-(--sv-input-font-color) [:where(&)]:font-(family-name:--sv-input-font-family) [:where(&)]:text-(length:--sv-input-font-size) [:where(&)]:[line-height:normal] [:where(&)]:cursor-pointer [:where(&)]:h-(--sv-select-height) [:where(&)]:[margin:var(--sv-select-margin)] [:where(&)]:[padding:var(--sv-select-padding)] [:where(&:not(:focus))]:[outline:var(--sv-select-outline)] [:is(&:focus)]:border-(--sv-select-focus-borderColor) [:is(&:disabled)]:bg-(--sv-input-disabled-bg) [:is(&:disabled)]:[cursor:var(--sv-input-disabled-cursor)] [:is(&[multiple])]:h-auto [:is(&[multiple])_option]:p-[5px] [[class~=form-field--success][class~=form-field--success]_&]:border-(--sv-color-success) [[class~=form-field--error][class~=form-field--error]_&]:border-(--sv-color-error)";

export const FormSelect = ({className, children, ...rest}: Props) => (
    <select className={withClass(cx("form-select", SELECT), className)} {...rest}>
        {children as ReactNode}
    </select>
);

const LABEL_PLAIN = "[:where(&)]:text-(--sv-form-label-font-color) [:where(&)]:[cursor:var(--sv-form-label-pointer)] [:where(&)]:text-(length:--sv-form-label-font-size) [:where(&)]:[line-height:var(--sv-form-label-line-height)] [:where(&)]:mb-(--sv-form-label-bottom-margin) [:where(&:not([style*=none]))]:[display:block] [:where(&_small)]:text-(--sv-form-label-small-color) [:where(&_small)]:text-(length:--sv-form-label-small-fontSize) [:where(&_small)]:[text-transform:var(--sv-form-label-small-transform)] [:where(&_small)]:align-bottom";
const LABEL_CHECKBOX = "[:where(&)]:text-(--sv-form-label-font-color) [:where(&)]:text-(length:--sv-checkRadio-label-fontSize) [:where(&)]:font-(weight:--sv-checkRadio-label-fontWeight) [:where(&)]:[line-height:var(--sv-form-label-line-height)] [:where(&)]:mb-(--sv-checkRadio-label-marginBottom) [:where(&)]:pl-(--sv-checkRadio-label-spacing) [:where(&)]:relative [:where(&)]:align-baseline [:where(&)]:w-full [:where(&:not([style*=none]))]:[display:inline-block] [:where(&_small)]:text-(--sv-form-label-small-color) [:where(&_small)]:text-(length:--sv-form-label-small-fontSize) [:where(&_small)]:[text-transform:var(--sv-form-label-small-transform)] [:where(&_small)]:align-bottom [:where(&)]:before:content-[''] [:where(&)]:before:[display:block] [:where(&)]:before:absolute [:where(&)]:before:[transition:all_50ms_ease-out] [:where(&)]:before:bg-(--sv-checkRadio-bg) [:where(&)]:before:border-(--sv-checkRadio-borderColor) [:where(&)]:before:[border-style:var(--sv-checkRadio-borderStyle)] [:where(&)]:before:[border-width:var(--sv-checkRadio-borderWidth)] [:where(&)]:before:size-(--sv-checkRadio-outerSize) [:where(&)]:before:left-0 [:where(&)]:before:top-0 [:where(&)]:after:content-[''] [:where(&)]:after:[display:block] [:where(&)]:after:absolute [:where(&)]:after:[transition:all_50ms_ease-out] [:where(&)]:after:size-(--sv-checkRadio-pip-size) [:where(&)]:after:left-px [:where(&)]:after:top-px [:where(:not(:checked)+&)]:after:opacity-0 [:where(:not(:checked)+&)]:after:[transform:var(--sv-checkRadio-pip-zoomStart)] [:where(:checked+&)]:after:opacity-100 [:where(:checked+&)]:after:[transform:var(--sv-checkRadio-pip-zoomEnd)] [:where(:not([disabled])+&)]:cursor-pointer [:where([disabled]+&)]:cursor-default [:where([disabled]+&)]:before:bg-(--sv-checkRadio-disabled-bg) [[class~=form-field--success][class~=form-field--success]_&]:before:border-(--sv-color-success) [[class~=form-field--error][class~=form-field--error]_&]:before:border-(--sv-color-error) [:where(&)]:before:rounded-(--sv-input-border-radius) [:where(&)]:after:[background-image:var(--sv-derived-checkmark)] [:where(&)]:after:[background-position:50%] [:where(&)]:after:bg-no-repeat [:where(&)]:after:bg-[length:100%] [:where(&)]:after:text-(--sv-radio-pip-color) [:where(&)]:after:text-[1rem] [:where(&)]:after:leading-none [:where(&)]:after:text-center";
const LABEL_RADIO = "[:where(&)]:text-(--sv-form-label-font-color) [:where(&)]:text-(length:--sv-checkRadio-label-fontSize) [:where(&)]:font-(weight:--sv-checkRadio-label-fontWeight) [:where(&)]:[line-height:var(--sv-form-label-line-height)] [:where(&)]:mb-(--sv-checkRadio-label-marginBottom) [:where(&)]:pl-(--sv-checkRadio-label-spacing) [:where(&)]:relative [:where(&)]:align-baseline [:where(&)]:w-full [:where(&:not([style*=none]))]:[display:inline-block] [:where(&_small)]:text-(--sv-form-label-small-color) [:where(&_small)]:text-(length:--sv-form-label-small-fontSize) [:where(&_small)]:[text-transform:var(--sv-form-label-small-transform)] [:where(&_small)]:align-bottom [:where(&)]:before:content-[''] [:where(&)]:before:[display:block] [:where(&)]:before:absolute [:where(&)]:before:[transition:all_50ms_ease-out] [:where(&)]:before:bg-(--sv-checkRadio-bg) [:where(&)]:before:border-(--sv-checkRadio-borderColor) [:where(&)]:before:[border-style:var(--sv-checkRadio-borderStyle)] [:where(&)]:before:[border-width:var(--sv-checkRadio-borderWidth)] [:where(&)]:before:size-(--sv-checkRadio-outerSize) [:where(&)]:before:left-0 [:where(&)]:before:top-0 [:where(&)]:after:content-[''] [:where(&)]:after:[display:block] [:where(&)]:after:absolute [:where(&)]:after:[transition:all_50ms_ease-out] [:where(&)]:after:size-(--sv-checkRadio-pip-size) [:where(&)]:after:left-px [:where(&)]:after:top-px [:where(:not(:checked)+&)]:after:opacity-0 [:where(:not(:checked)+&)]:after:[transform:var(--sv-checkRadio-pip-zoomStart)] [:where(:checked+&)]:after:opacity-100 [:where(:checked+&)]:after:[transform:var(--sv-checkRadio-pip-zoomEnd)] [:where(:not([disabled])+&)]:cursor-pointer [:where([disabled]+&)]:cursor-default [:where([disabled]+&)]:before:bg-(--sv-checkRadio-disabled-bg) [[class~=form-field--success][class~=form-field--success]_&]:before:border-(--sv-color-success) [[class~=form-field--error][class~=form-field--error]_&]:before:border-(--sv-color-error) [:where(&)]:before:rounded-(--sv-radio-radius) [:where(&)]:after:bg-(--sv-radio-pip-color) [:where(&)]:after:[border:var(--sv-radio-pipInset)_solid_var(--sv-radio-pipInset-color)] [:where(&)]:after:rounded-[1rem]";

/** `form-label`. `check`: the label of a `form-checkbox` / `form-radio` input (draws the box and the mark in its pseudo-elements). */
export const FormLabel = ({tag = "label", check, className, children, ...rest}: Props & {tag?: "label" | "p" | "span" | "div"; check?: "checkbox" | "radio"}) => {
    const Tag = tag as "label";
    return (
        <Tag className={withClass(cx("form-label", check === "checkbox" ? LABEL_CHECKBOX : check === "radio" ? LABEL_RADIO : LABEL_PLAIN), className)} {...rest}>
            {children as ReactNode}
        </Tag>
    );
};

const CHECK_INPUT = "[:where(&)]:[border:0] [:where(&)]:[clip:rect(1px,1px,1px,1px)] [:where(&)]:h-px [:where(&)]:overflow-hidden [:where(&)]:p-0 [:where(&)]:absolute [:where(&)]:w-px";

/** The visually hidden `form-checkbox` / `form-radio` input; its `FormLabel check` sibling shows the control. */
export const FormCheck = ({kind, className, ...rest}: Props & {kind: "checkbox" | "radio"}) => (
    <input className={withClass(cx(`form-${kind}`, CHECK_INPUT), className)} {...rest} />
);

const FIELD = "[:where(&:not([style*=none]))]:[display:flow-root] [:where(&)]:[margin:var(--sv-formField-margin)] [:where(&)]:[max-width:var(--sv-formField-maxWidth)] [:is(&.form-field--success)_.form-inlineMessage]:text-(--sv-color-success) [:is(&.form-field--error)_.form-inlineMessage]:text-(--sv-color-error) [:is(&.form-field--error)_.form-inlineMessage]:before:[background-image:var(--sv-form-error-icon)] [:is(&.form-field--error)_.form-inlineMessage]:before:bg-no-repeat [:is(&.form-field--error)_.form-inlineMessage]:before:[background-size:var(--sv-form-inlineMessage-backgroundSize)] [:is(&.form-field--error)_.form-inlineMessage]:before:content-[''] [:is(&.form-field--error)_.form-inlineMessage]:before:[display:inline-block] [:is(&.form-field--error)_.form-inlineMessage]:before:h-(--sv-form-error-icon-height) [:is(&.form-field--error)_.form-inlineMessage]:before:left-(--sv-form-error-icon-left) [:is(&.form-field--error)_.form-inlineMessage]:before:mr-(--sv-form-error-icon-marginRight) [:is(&.form-field--error)_.form-inlineMessage]:before:relative [:is(&.form-field--error)_.form-inlineMessage]:before:top-(--sv-form-error-icon-top) [:is(&.form-field--error)_.form-inlineMessage]:before:w-(--sv-form-error-icon-width)";

export const FormField = ({className, children, ...rest}: Props) => (
    <div className={withClass(cx("form-field", FIELD), className)} {...rest}>
        {children as ReactNode}
    </div>
);

const ICON = "[:where(&)]:size-(--sv-icon-size) [:where(&)]:align-middle [:where(&)]:[transition:all_0.15s_ease] [:where(&:not([style*=none]))]:[display:inline-block] [:where(&_svg)]:[display:inline-block] [:where(&_svg)]:fill-(--sv-icon-color) [:where(&_svg)]:size-full [:where(&_svg)]:align-top [:where(&_svg)]:[transition:all_0.15s_ease]";

export const Icon = ({tag = "i", className, children, ...rest}: Props & {tag?: "i" | "span" | "div" | "svg" | "a" | "button" | "icon"}) => {
    const Tag = tag as "i";
    return (
        <Tag className={withClass(cx("icon", ICON), className)} {...rest}>
            {children as ReactNode}
        </Tag>
    );
};
