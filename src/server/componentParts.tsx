// Lives outside src/templates: the HBX plugin builds every export of a file under there as a template of its own.
// Utility-styled pieces of Citadel's modal, alert box, panel and card components (formerly compat rules in assets/scss/tailwind/_tailwind.scss).
// Same convention as formParts.tsx: every base utility is written as `[:where(&)]:...` (zero specificity), so any utility on the element
// or an ancestor beats it, exactly as the old non-important compat CSS lost to important utilities. Class names (`modal`, `alertBox` ...) stay
// on the elements as hooks: JS and the live store's injected CSS select them.
import type {ReactNode} from "react";

type Attrs = Record<string, unknown>;
// className: strings, or HBX pointers (joined into the attribute like a template literal would)
type Props = Attrs & {className?: unknown; children?: unknown};

// Static class strings only: `.join()` would stringify an HBX element, which throws.
const cx = (...parts: Array<string | false>) => parts.filter(Boolean).join(" ");
// The caller's className may be an HBX element: only a template literal (which HBX understands) may join it.
const withClass = (base: string, extra: unknown) => (extra ? `${base} ${extra}` : base);

const MODAL = "[:where(&)]:fixed small:[:where(&)]:right-0 [:where(&)]:z-[1005] [:where(&)]:rounded-(--sv-reveal-radius) [:where(&)]:bg-(--sv-reveal-modal-bg) [:where(&)]:[border-style:var(--sv-reveal-border-style)] [:where(&)]:[border-width:var(--sv-reveal-border-width)] [:where(&)]:border-(--sv-reveal-border-color) [:where(&)]:[box-shadow:var(--sv-reveal-box-shadow)] [:where(&:not([style*=display]))]:[display:none] [:where(&:not([style*=visibility]))]:[visibility:hidden] [:where(&:not(.modal--small):not(.modal--large))]:w-full small:[:where(&:not(.modal--small):not(.modal--large))]:w-(--sv-reveal-default-width) [:where(&.modal--small)]:w-[500px] [:where(&.modal--large)]:w-[1280px] [:where(&_.column,&_.columns)]:min-w-0 [:where(&>:first-child)]:mt-0 [:where(&>:last-child)]:mb-0 print:[:where(&)]:bg-white";

/** `modal` (a Foundation reveal: JS toggles `modal--small` / `modal--large`, the open state is set by style attribute). */
export const Modal = ({className, children, ...rest}: Props) => (
    <div className={withClass(cx("modal", MODAL), className)} {...rest}>
        {children as ReactNode}
    </div>
);

const MODAL_HEADER = "[:where(&)]:relative [:where(&)]:py-[1rem] [:where(&)]:border-b [:where(&)]:border-b-(color:--sv-reveal-border-color)";
export const ModalHeader = ({className, children, ...rest}: Props) => (
    <div className={withClass(cx("modal-header", MODAL_HEADER), className)} {...rest}>
        {children as ReactNode}
    </div>
);

export const ModalTitle = ({tag = "h2", className, children, ...rest}: Props & {tag?: "h1" | "h2"}) => {
    const Tag = tag as "h2";
    return (
        <Tag className={withClass(cx("modal-header-title", "[:where(&)]:m-0"), className)} {...rest}>
            {children as ReactNode}
        </Tag>
    );
};

export const ModalBody = ({className, children, ...rest}: Props) => (
    <div className={withClass(cx("modal-body", "[:where(&>:last-child)]:mb-0"), className)} {...rest}>
        {children as ReactNode}
    </div>
);

const ALERT_BASE = "[:where(&)]:relative [:where(&:not([style*=display]))]:[display:block] [:where(&)]:[border-style:var(--sv-alert-border-style)] [:where(&)]:text-(length:--sv-alert-font-size) [:where(&)]:font-(weight:--sv-alert-font-weight) [:where(&)]:mb-(--sv-alert-bottom-margin) [:where(&)]:pt-(--sv-alert-padding-top) [:where(&)]:pr-(--sv-alert-padding-opposite-direction) [:where(&)]:pb-(--sv-alert-padding-bottom) [:where(&)]:pl-(--sv-alert-padding-default-float) [:where(&)]:[transition:opacity_var(--sv-alert-transition-speed)_var(--sv-alert-transition-ease)]";
const ALERT_COLORS = {
    generic: "[:where(&)]:bg-(--sv-alert-generic-bgColor) [:where(&)]:border-(--sv-alert-generic-bgColor)",
    info: "[:where(&)]:bg-(--sv-alert-info-bgColor) [:where(&)]:border-(--sv-alert-info-bgColor)",
    success: "[:where(&)]:bg-(--sv-alert-success-bgColor) [:where(&)]:border-(--sv-alert-success-bgColor)",
    warning: "[:where(&)]:bg-(--sv-alert-warning-bgColor) [:where(&)]:border-(--sv-alert-warning-bgColor)",
    error: "[:where(&)]:bg-(--sv-alert-error-bgColor) [:where(&)]:border-(--sv-alert-error-bgColor)",
};

/** `alertBox`, `alertBox--info|success|warning|error`. */
export const AlertBox = ({variant = "generic", className, children, ...rest}: Props & {variant?: keyof typeof ALERT_COLORS}) => (
    <div className={withClass(cx("alertBox", variant !== "generic" && `alertBox--${variant}`, ALERT_BASE, ALERT_COLORS[variant]), className)} {...rest}>
        {children as ReactNode}
    </div>
);

const ALERT_COLUMN = "[:where(&)]:[display:table-cell] [:where(&)]:[text-align:var(--sv-alert-column-textAlign)] [:where(&)]:align-middle";
/** `alertBox-column` plus `alertBox-icon` (the icon cell) or `alertBox-message` (the text cell). */
export const AlertColumn = ({tag = "div", part, className, children, ...rest}: Props & {tag?: "div" | "p"; part: "icon" | "message"}) => {
    const Tag = tag as "div";
    const own = part === "icon" ? "[:where(&)]:pr-(--sv-alert-padding-default-float)" : "[:where(&)]:[margin:var(--sv-alert-message-margin)] [:where(&)]:[text-align:var(--sv-alert-message-textAlign)] [:where(&)]:w-full";
    return (
        <Tag className={withClass(cx("alertBox-column", `alertBox-${part}`, ALERT_COLUMN, own), className)} {...rest}>
            {children as ReactNode}
        </Tag>
    );
};

export const Panel = ({className, children, ...rest}: Props) => (
    <div className={withClass(cx("panel", "[:where(&)]:relative"), className)} {...rest}>
        {children as ReactNode}
    </div>
);

export const PanelHeader = ({className, children, ...rest}: Props) => (
    <div className={withClass(cx("panel-header", "[:where(&)]:bg-(--sv-panel-header-bg) [:where(&)]:[margin:var(--sv-panel-header-margin)] [:where(&)]:[padding:var(--sv-panel-header-padding)]"), className)} {...rest}>
        {children as ReactNode}
    </div>
);

export const PanelTitle = ({tag = "h2", className, children, ...rest}: Props & {tag?: "h1" | "h2" | "h3" | "h4"}) => {
    const Tag = tag as "h2";
    return (
        <Tag className={withClass(cx("panel-title", "[:where(&)]:[line-height:var(--sv-panel-title-lineHeight)] [:where(&)]:[margin:var(--sv-panel-title-margin)]"), className)} {...rest}>
            {children as ReactNode}
        </Tag>
    );
};

/** `panel-body`; `tag` is `span` for the "new address" tile that is a link. */
export const PanelBody = ({tag = "div", className, children, ...rest}: Props & {tag?: "div" | "span"}) => {
    const Tag = tag as "div";
    return (
        <Tag className={withClass(cx("panel-body", "[:where(&)]:mb-(--sv-panel-margin-bottom) [:where(&)]:p-(--sv-panel-padding) [:where(&)]:bg-(--sv-panel-bg) [:where(&>:first-child)]:mt-0 [:where(&>:last-child)]:mb-0"), className)} {...rest}>
            {children as ReactNode}
        </Tag>
    );
};

export const Card = ({className, children, ...rest}: Props) => (
    <article className={withClass(cx("card", "[:where(&)]:bg-transparent [:where(&)]:mb-(--sv-card-marginBottom) [:where(&)]:p-0"), className)} {...rest}>
        {children as ReactNode}
    </article>
);

export const CardFigure = ({className, children, ...rest}: Props) => (
    <figure className={withClass(cx("card-figure", "[:where(&)]:bg-white [:where(&)]:mb-0 [:where(&)]:p-0 [:where(&)]:relative"), className)} {...rest}>
        {children as ReactNode}
    </figure>
);

export const CardFigcaption = ({className, children, ...rest}: Props) => (
    <figcaption className={withClass(cx("card-figcaption", "[:where(&)]:absolute [:where(&)]:inset-0 [:where(&)]:h-full [:where(&)]:opacity-0 [:where(&)]:[text-align:var(--sv-card-figcaption-textAlign)]"), className)} {...rest}>
        {children as ReactNode}
    </figcaption>
);

export const CardFigcaptionBody = ({className, children, ...rest}: Props) => (
    <div className={withClass(cx("card-figcaption-body", "[:where(&)]:relative [:where(&)]:top-1/2 [:where(&)]:[transform-style:preserve-3d] [:where(&>:first-child)]:mt-0 [:where(&>:last-child)]:mb-0 [:where(&_.card-text)]:text-(--sv-card-text-color)"), className)} {...rest}>
        {children as ReactNode}
    </div>
);

export const CardBody = ({className, children, ...rest}: Props) => (
    <div className={withClass(cx("card-body", "[:where(&)]:p-(--sv-card-body-padding) [:where(&>:first-child)]:mt-0 [:where(&>:last-child)]:mb-0 [:where(&_.card-text)]:text-(--sv-card-body-textColor)"), className)} {...rest}>
        {children as ReactNode}
    </div>
);

/** `pagination-list` (list style and indent only: the layout utilities stay at the call site). */
export const PaginationList = ({className, children, ...rest}: Props) => (
    <ul className={withClass(cx("pagination-list", "[:where(&)]:ml-0"), className)} {...rest}>
        {children as ReactNode}
    </ul>
);

const PAGINATION_ITEM = "[:where(&:not(:first-child))]:ml-(--sv-pagination-li-margin) [:where(&:first-child)]:ml-0 [:where(&)]:text-(--sv-pagination-li-font-color) [:where(&)]:text-(length:--sv-pagination-li-font-size) [:where(&)]:cursor-pointer [:where(&_a,&_button)]:rounded-[4px] [:where(&_a,&_button)]:[transition:background-color_300ms_ease-out] [:where(&_a,&_button)]:[background:none] [:where(&_a,&_button)]:[display:block] [:where(&_a,&_button)]:text-[1em] [:where(&_a,&_button)]:font-normal [:where(&_a,&_button)]:leading-[inherit] [:where(&_a,&_button)]:p-(--sv-pagination-link-pad)";
const PAGINATION_LINK = "[:where(&_a,&_button)]:text-(--sv-pagination-link-font-color)";
const PAGINATION_LINK_CURRENT = "[:where(&_a,&_button)]:text-(--sv-pagination-link-current-font-color) [:where(&_a,&_button)]:cursor-(--sv-pagination-link-current-cursor)";

/** `pagination-item`; `current` is the item of the page being shown. */
export const PaginationItem = ({current, className, children, ...rest}: Props & {current?: boolean}) => (
    <li className={withClass(cx("pagination-item", current === true && "pagination-item--current", PAGINATION_ITEM, current ? PAGINATION_LINK_CURRENT : PAGINATION_LINK), className)} {...rest}>
        {children as ReactNode}
    </li>
);

const NAV_LIST = "[:where(&)]:[display:flow-root] [:where(&_.navList-item)]:[display:block] [:where(&_.navList-action)]:text-(--sv-navList-action-color) [:where(&_.navList-action:not(.navList-action--checkbox))]:text-(length:--sv-navList-action-fontSize) [:where(&_.navList-action)]:py-eighth [:where(&_.navList-action)]:pr-0 [:where(&_.navList-action:not(.navList-action--checkbox))]:pl-0 [:where(&_.navList-action:not(.navList-action--checkbox))]:[display:block] [:where(&_.navList-action:is(:hover,:focus))]:text-(--sv-anchor-font-color-hover)";

/** `navList`: the list of links of a sidebar block or facet. */
export const NavList = ({className, children, ...rest}: Props) => (
    <ul className={withClass(cx("navList", NAV_LIST), className)} {...rest}>
        {children as ReactNode}
    </ul>
);

const CONTAINER = "[:where(&)]:relative [:where(&)]:mx-auto [:where(&)]:w-(--sv-layout-widthFixed) [:where(&)]:max-w-[calc(var(--sv-layout-widthMax)+var(--sv-container-padding)*4)] [:where(&)]:px-(--sv-container-padding) large:[:where(&)]:px-[calc(var(--sv-container-padding)*4)]";

/** `container`: the centred page column. The merchant's own `div.container` (account banner) cannot take utilities, so the class keeps a rule in _tailwind.scss. */
export const Container = ({className, children, ...rest}: Props) => (
    <div className={withClass(cx("container", CONTAINER), className)} {...rest}>
        {children as ReactNode}
    </div>
);

// The checked box of a facet row follows `is-selected`, which faceted-search.js toggles on the link at runtime: the two states are disjoint :where() selectors.
const NAV_LIST_CHECKBOX = "[:where(&)]:[display:inline-block] [:where(&)]:text-[1rem] [:where(&)]:font-normal [:where(&)]:mb-quarter [:where(&)]:pl-[1.85714rem] [:where(&)]:relative [:where(&)]:align-baseline [:where(&)]:w-full [:where(&)]:before:content-[''] [:where(&)]:before:[display:block] [:where(&)]:before:absolute [:where(&)]:before:[transition:all_50ms_ease-out] [:where(&)]:before:top-1/2 [:where(&)]:before:left-0 [:where(&)]:before:bg-(--sv-checkRadio-bg) [:where(&)]:before:border-(--sv-checkRadio-borderColor) [:where(&)]:before:[border-style:var(--sv-checkRadio-borderStyle)] [:where(&)]:before:[border-width:var(--sv-checkRadio-borderWidth)] [:where(&)]:before:rounded-(--sv-input-border-radius) [:where(&)]:before:size-(--sv-checkRadio-outerSize) [:where(&)]:before:mt-[calc(var(--sv-checkRadio-outerSize)/-2)] [:where(&)]:after:content-[''] [:where(&)]:after:[display:block] [:where(&)]:after:absolute [:where(&)]:after:[transition:all_50ms_ease-out] [:where(&)]:after:top-1/2 [:where(&)]:after:left-px [:where(&)]:after:[background-image:var(--sv-derived-checkmark)] [:where(&)]:after:[background-position:50%] [:where(&)]:after:bg-no-repeat [:where(&)]:after:bg-[length:100%] [:where(&)]:after:text-(--sv-radio-pip-color) [:where(&)]:after:text-[1rem] [:where(&)]:after:leading-none [:where(&)]:after:text-center [:where(&)]:after:size-(--sv-checkRadio-pip-size) [:where(&)]:after:mt-[-0.5rem] [:where(&:not(.is-selected))]:after:opacity-0 [:where(&:not(.is-selected))]:after:[transform:var(--sv-checkRadio-pip-zoomStart)] [:where(&.is-selected)]:after:opacity-100 [:where(&.is-selected)]:after:[transform:var(--sv-checkRadio-pip-zoomEnd)]";

/** `navList-action navList-action--checkbox`: a facet row with a checkbox. The caller adds `is-selected` (and `has-children`) through className. */
export const NavListCheckbox = ({className, children, ...rest}: Props) => (
    <a className={withClass(cx("navList-action navList-action--checkbox", NAV_LIST_CHECKBOX), className)} {...rest}>
        {children as ReactNode}
    </a>
);

// The merchant tab widget on the home page is injected markup, so tabs/tab/tab-title/tabs-contents/tab-content keep a compat rule in
// _tailwind.scss for it. Our own tabs get the same rules here, as utilities on the list and the wrapper of the panes (the items hold template literals).
const TABS = "[:where(&)]:[border-bottom:var(--sv-tabs-bottom-border)] [:where(&)]:[margin:var(--sv-tabs-margin)] [:where(&)]:[display:flow-root] [:where(&>.tab)]:[display:var(--sv-tab-display)] [:where(&>.tab)]:list-none [:where(&>.tab)]:m-0 [:where(&>.tab)]:p-0 [:where(&>.tab)]:relative [:where(&>.tab)]:border-b-(color:--sv-tab-title-border-color) [:where(&>.tab>.tab-title)]:[display:var(--sv-tab-navigation-display)] [:where(&>.tab>.tab-title)]:text-(length:--sv-tabs-navigation-font-size) [:where(&>.tab:not(.is-active)>.tab-title)]:text-(--sv-tabs-navigation-font-color) [:where(&>.tab:not(.is-active)>.tab-title:hover)]:text-(--sv-tabs-navigation-active-font-color) [:where(&>.tab.is-active>.tab-title)]:text-(--sv-tabs-navigation-active-font-color) [:where(&>.tab.is-active>.tab-title)]:font-(weight:--sv-tab-title-active-font-weight)";

export const Tabs = ({className, children, ...rest}: Props) => (
    <ul className={withClass(cx("tabs", TABS), className)} {...rest}>
        {children as ReactNode}
    </ul>
);

const TABS_CONTENTS = "[:where(&)]:mb-(--sv-tabs-content-margin-bottom) [:where(&)]:[display:flow-root] [:where(&>.tab-content)]:[padding:var(--sv-tabs-content-padding)] [:where(html:not(.no-js)_&>.tab-content:not(.is-active))]:[display:none] [:where(&>.tab-content.is-active)]:[display:block] no-js:[:where(&>.tab-content)]:[display:block] no-js:[:where(&>.tab-content)]:float-none";

export const TabsContents = ({className, children, ...rest}: Props) => (
    <div className={withClass(cx("tabs-contents", TABS_CONTENTS), className)} {...rest}>
        {children as ReactNode}
    </div>
);
