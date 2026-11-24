// Lives outside src/templates: the HBX plugin builds every export of a file under there as a template of its own.
// Utility-styled pieces of the main navigation that repeat across the navigation partials. The class names (`navPages-action`,
// `has-subMenu`, `is-open`, `activePage` ...) stay on the elements as hooks: Foundation collapsibles and mobile-menu-toggle.js select them.
// `activePage` is a render-time condition (`$If`), so each action exists as an active/inactive literal pair.
import type {ReactNode} from "react";
import {Icon} from "./formParts.tsx";

type Attrs = Record<string, unknown>;

/** Chevron inside a `navPages-action`. `top`: simple design, top level; `child`: simple design, inside a sub menu; `max`/`maxNested`: depth-max design. */
export const moreIcon = (kind: "top" | "child" | "max" | "maxRoot" | "maxNested") => {
    const svg = (
        <svg className="fill-(--sv-setting-navPages-color) stroke-(--sv-setting-navPages-color) [transition:all_0.15s_ease] group-hover:fill-(--sv-navPage-subMenu-item--is-highlighted-color) group-hover:stroke-(--sv-navPage-subMenu-item--is-highlighted-color) group-is-open:fill-(--sv-navPage-subMenu-item--is-highlighted-color) group-is-open:stroke-(--sv-navPage-subMenu-item--is-highlighted-color) group-[.activePage]:fill-(--sv-navPage-subMenu-item--is-highlighted-color) group-[.activePage]:stroke-(--sv-navPage-subMenu-item--is-highlighted-color) [[class~=collapsible-icon-wrapper][class~=is-open]_&]:fill-(--sv-navPage-subMenu-item--is-highlighted-color) [[class~=collapsible-icon-wrapper][class~=is-open]_&]:stroke-(--sv-navPage-subMenu-item--is-highlighted-color)">
            <use href="#icon-chevron-down" />
        </svg>
    );
    const maxSvg = (
        <svg className="fill-(--sv-setting-navPages-color) stroke-(--sv-setting-navPages-color) [transition:all_0.15s_ease] group-hover:fill-(--sv-navPage-subMenu-item--is-highlighted-color) group-hover:stroke-(--sv-navPage-subMenu-item--is-highlighted-color) group-is-open:size-[9.6px] group-is-open:fill-(--sv-navPage-subMenu-item--is-highlighted-color) group-is-open:stroke-(--sv-navPage-subMenu-item--is-highlighted-color) medium:group-is-open:size-full group-[.activePage]:fill-(--sv-navPage-subMenu-item--is-highlighted-color) group-[.activePage]:stroke-(--sv-navPage-subMenu-item--is-highlighted-color)">
            <use href="#icon-chevron-down" />
        </svg>
    );
    switch (kind) {
        case "top":
            return (
                <Icon className="navPages-action-moreIcon mx-single my-0 size-[11px] [transform:rotate(-90deg)] group-is-open:[transform:rotate(0)] medium:mr-0 medium:ml-half medium:size-[8px] medium:[transform:none]" aria-hidden="true">
                    {svg}
                </Icon>
            );
        case "child":
            return (
                <Icon className="navPages-action-moreIcon mx-single my-0 size-[11px] [transform:rotate(-90deg)] group-is-open:[transform:rotate(0)] [[class~=collapsible-icon-wrapper][class~=is-open]_&]:[transform:rotate(0)] medium:mr-0 medium:ml-half medium:size-[8px] medium:[display:none] medium:[transform:none]" aria-hidden="true">
                    {svg}
                </Icon>
            );
        case "max":
            return (
                <Icon className="navPages-action-moreIcon ml-half size-[8px] [transform:rotate(-90deg)] group-is-open:float-left group-is-open:-mt-[10px] group-is-open:size-[35px] group-is-open:rounded-[4px] group-is-open:border group-is-open:border-(--sv-navPages-action-moreIcon-borderColor) group-is-open:p-[11.7px] group-is-open:[transform:rotate(90deg)] medium:[transform:none] medium:group-is-open:float-none medium:group-is-open:mt-0 medium:group-is-open:size-[8px] medium:group-is-open:rounded-none medium:group-is-open:border-0 medium:group-is-open:p-0 medium:group-is-open:[transform:rotate(-90deg)]" aria-hidden="true">
                    {maxSvg}
                </Icon>
            );
        case "maxRoot":
            return (
                <Icon className="navPages-action-moreIcon ml-half size-[8px] [transform:rotate(-90deg)] group-is-open:float-left group-is-open:-mt-[10px] group-is-open:size-[35px] group-is-open:rounded-[4px] group-is-open:border group-is-open:border-(--sv-navPages-action-moreIcon-borderColor) group-is-open:p-[11.7px] group-is-open:[transform:rotate(90deg)] medium:[transform:none] medium:group-is-open:float-none medium:group-is-open:mt-0 medium:group-is-open:size-[8px] medium:group-is-open:rounded-none medium:group-is-open:border-0 medium:group-is-open:p-0 medium:group-is-open:[transform:rotate(0)]" aria-hidden="true">
                    {maxSvg}
                </Icon>
            );
        default:
            return (
                <Icon className="navPages-action-moreIcon ml-half size-[8px] [transform:rotate(-90deg)] group-is-open:float-left group-is-open:-mt-[10px] group-is-open:size-[35px] group-is-open:rounded-[4px] group-is-open:border group-is-open:border-(--sv-navPages-action-moreIcon-borderColor) group-is-open:p-[11.7px] group-is-open:[transform:rotate(90deg)] medium:[display:inline-block] medium:[transform:rotate(-90deg)] medium:group-is-open:float-none medium:group-is-open:mt-0 medium:group-is-open:size-[8px] medium:group-is-open:rounded-none medium:group-is-open:border-0 medium:group-is-open:p-0 medium:group-is-open:[transform:rotate(-90deg)]" aria-hidden="true">
                    {maxSvg}
                </Icon>
            );
    }
};

/**
 * One navigation link. kind: `plain` (no sub menu), `top` (has a sub menu, simple design), `sub` (action in a sub menu, simple design),
 * `subParent` (sub-menu action that owns a child list, simple design), `child` (grandchild link), `maxLeaf`/`maxParent` (depth-max design,
 * inside navPage-subMenu-item-child/-parent), `maxRoot` (depth-max top level with a sub menu).
 */
export const navLink = (
    kind: "plain" | "top" | "sub" | "subParent" | "child" | "maxLeaf" | "maxParent" | "maxRoot",
    active: boolean,
    attrs: Attrs,
    // unknown: callers pass JSX, hbx pointers and strings, which the framework types do not unify
    children: unknown,
) => {
    if (kind === "plain") {
        return active ? (
            <a className="navPages-action activePage [display:block] py-half text-smaller font-bold text-(--sv-navPage-subMenu-item--is-highlighted-color) uppercase no-underline medium:inline-block medium:px-half-quarter medium:pt-half medium:pb-half-quarter" {...attrs}>
                {children as ReactNode}
            </a>
        ) : (
            <a className="navPages-action [display:block] py-half text-smaller font-bold text-(--sv-setting-navPages-color) uppercase no-underline hover:text-(--sv-navPage-subMenu-item--is-highlighted-color) medium:inline-block medium:px-half-quarter medium:pt-half medium:pb-half-quarter" {...attrs}>
                {children as ReactNode}
            </a>
        );
    }
    if (kind === "top") {
        return active ? (
            <a className="group navPages-action has-subMenu activePage [display:flex] items-center justify-between py-half text-smaller font-bold text-(--sv-navPage-subMenu-item--is-highlighted-color) uppercase no-underline medium:px-half-quarter medium:pt-half medium:pb-half-quarter medium:is-open:bg-(--sv-navPage-subMenu-item--is-highlighted-background)" {...attrs}>
                {children as ReactNode}
            </a>
        ) : (
            <a className="group navPages-action has-subMenu [display:flex] items-center justify-between py-half text-smaller font-bold text-(--sv-setting-navPages-color) uppercase no-underline hover:text-(--sv-navPage-subMenu-item--is-highlighted-color) medium:px-half-quarter medium:pt-half medium:pb-half-quarter medium:is-open:bg-(--sv-navPage-subMenu-item--is-highlighted-background)" {...attrs}>
                {children as ReactNode}
            </a>
        );
    }
    if (kind === "sub") {
        return active ? (
            <a className="group navPage-subMenu-action navPages-action activePage [display:block] py-0 pr-0 pl-single text-smaller font-bold text-(--sv-navPage-subMenu-item--is-highlighted-color) uppercase no-underline medium:inline-block medium:px-0 medium:pt-half medium:pb-half-quarter" {...attrs}>
                {children as ReactNode}
            </a>
        ) : (
            <a className="group navPage-subMenu-action navPages-action [display:block] py-0 pr-0 pl-single text-smaller font-bold text-(--sv-setting-navPages-color) uppercase no-underline hover:text-(--sv-navPage-subMenu-item--is-highlighted-color) medium:inline-block medium:px-0 medium:pt-half medium:pb-half-quarter" {...attrs}>
                {children as ReactNode}
            </a>
        );
    }
    if (kind === "subParent") {
        return active ? (
            <a className="group navPage-subMenu-action navPages-action has-subMenu activePage [display:flex] items-center justify-between py-0 pr-0 pl-single text-smaller font-bold text-(--sv-navPage-subMenu-item--is-highlighted-color) uppercase no-underline medium:px-0 medium:pt-half medium:pb-half-quarter" {...attrs}>
                {children as ReactNode}
            </a>
        ) : (
            <a className="group navPage-subMenu-action navPages-action has-subMenu [display:flex] items-center justify-between py-0 pr-0 pl-single text-smaller font-bold text-(--sv-setting-navPages-color) uppercase no-underline hover:text-(--sv-navPage-subMenu-item--is-highlighted-color) medium:px-0 medium:pt-half medium:pb-half-quarter" {...attrs}>
                {children as ReactNode}
            </a>
        );
    }
    if (kind === "child") {
        return active ? (
            <a className="navPage-childList-action navPages-action activePage [display:block] px-0 pt-0 pb-quarter text-smaller font-normal text-(--sv-navPage-subMenu-item--is-highlighted-color) uppercase no-underline medium:inline-block" {...attrs}>
                {children as ReactNode}
            </a>
        ) : (
            <a className="navPage-childList-action navPages-action [display:block] px-0 pt-0 pb-quarter text-smaller font-normal text-(--sv-setting-navPages-color) uppercase no-underline hover:text-(--sv-navPage-subMenu-item--is-highlighted-color) medium:inline-block" {...attrs}>
                {children as ReactNode}
            </a>
        );
    }
    if (kind === "maxLeaf") {
        return active ? (
            <a className="navPage-subMenu-action navPages-action activePage [display:block] py-half text-smaller font-bold text-(--sv-navPage-subMenu-item--is-highlighted-color) uppercase no-underline medium:inline-block medium:w-full medium:px-single medium:pt-half medium:pb-half-quarter" {...attrs}>
                {children as ReactNode}
            </a>
        ) : (
            <a className="navPage-subMenu-action navPages-action [display:block] py-half text-smaller font-bold text-(--sv-setting-navPages-color) uppercase no-underline hover:text-(--sv-navPage-subMenu-item--is-highlighted-color) medium:inline-block medium:w-full medium:px-single medium:pt-half medium:pb-half-quarter" {...attrs}>
                {children as ReactNode}
            </a>
        );
    }
    // maxParent and maxRoot: `navPages-action-depth-max has-subMenu` actions, restyled while open (border, centred text, bordered chevron).
    if (kind === "maxParent") {
        return active ? (
            <a className="group navPage-subMenu-action navPages-action navPages-action-depth-max has-subMenu activePage [display:block] py-half text-smaller font-bold text-(--sv-navPage-subMenu-item--is-highlighted-color) uppercase no-underline is-open:border-b is-open:border-(--sv-navPages-list--user-borderColor) is-open:text-center medium:inline-block medium:w-full medium:px-single medium:pt-half medium:pb-half-quarter medium:is-open:border-b-0 medium:is-open:text-left medium:is-open:bg-(--sv-navPage-subMenu-item--is-highlighted-background)" {...attrs}>
                {children as ReactNode}
            </a>
        ) : (
            <a className="group navPage-subMenu-action navPages-action navPages-action-depth-max has-subMenu [display:block] py-half text-smaller font-bold text-(--sv-setting-navPages-color) uppercase no-underline hover:text-(--sv-navPage-subMenu-item--is-highlighted-color) is-open:border-b is-open:border-(--sv-navPages-list--user-borderColor) is-open:text-center medium:inline-block medium:w-full medium:px-single medium:pt-half medium:pb-half-quarter medium:is-open:border-b-0 medium:is-open:text-left medium:is-open:bg-(--sv-navPage-subMenu-item--is-highlighted-background)" {...attrs}>
                {children as ReactNode}
            </a>
        );
    }
    return active ? (
        <a className="group navPages-action navPages-action-depth-max has-subMenu is-root activePage [display:block] py-half text-smaller font-bold text-(--sv-navPage-subMenu-item--is-highlighted-color) uppercase no-underline [[class~=navPages-list-depth-max][class~=subMenu-is-open]_&[class~=is-hidden]]:[display:none] is-open:border-b is-open:border-(--sv-navPages-list--user-borderColor) is-open:text-center medium:inline-block medium:px-half-quarter medium:pt-half medium:pb-half-quarter medium:is-open:border-b-0 medium:is-open:text-left medium:is-open:bg-(--sv-navPage-subMenu-item--is-highlighted-background) medium:[[class~=navPages-list-depth-max][class~=subMenu-is-open]_&[class~=is-hidden]]:[display:inline-block]" {...attrs}>
            {children as ReactNode}
        </a>
    ) : (
        <a className="group navPages-action navPages-action-depth-max has-subMenu is-root [display:block] py-half text-smaller font-bold text-(--sv-setting-navPages-color) uppercase no-underline hover:text-(--sv-navPage-subMenu-item--is-highlighted-color) [[class~=navPages-list-depth-max][class~=subMenu-is-open]_&[class~=is-hidden]]:[display:none] is-open:border-b is-open:border-(--sv-navPages-list--user-borderColor) is-open:text-center medium:inline-block medium:px-half-quarter medium:pt-half medium:pb-half-quarter medium:is-open:border-b-0 medium:is-open:text-left medium:is-open:bg-(--sv-navPage-subMenu-item--is-highlighted-background) medium:[[class~=navPages-list-depth-max][class~=subMenu-is-open]_&[class~=is-hidden]]:[display:inline-block]" {...attrs}>
            {children as ReactNode}
        </a>
    );
};
