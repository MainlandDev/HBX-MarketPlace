"use server";
import NavigationDropdown from "./navigation-dropdown.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {moreIcon, navLink} from "../../../../server/navParts.tsx";

interface NavChild {
    id: string;
    url: string;
    name: string;
    children: unknown;
}

export default (_props: PartialProps) => (
    <div
        className="navPage-subMenu navPage-subMenu-horizontal [display:none] [outline:0] is-open:[display:block] medium:absolute medium:bg-(--sv-setting-navPages-subMenu-backgroundColor) medium:px-single medium:pt-single medium:pb-single-half medium:text-left medium:is-open:top-0 medium:is-open:left-0 medium:is-open:ml-(--sv-navPage-subMenu-horizontal-width) medium:is-open:w-[calc(var(--sv-navPage-subMenu-horizontal-width)+1px)] medium:is-open:[display:inherit] medium:is-open:h-(--sv-navPage-subMenu-horizontal-height) medium:is-open:border-l medium:is-open:border-(--sv-setting-navPages-subMenu-separatorColor) medium:is-open:p-0 medium:[[class~=has-subMenu][class~=is-root]+&]:top-[inherit] medium:[[class~=has-subMenu][class~=is-root]+&]:left-[inherit] medium:[[class~=has-subMenu][class~=is-root]+&]:m-auto medium:[[class~=has-subMenu][class~=is-root]+&]:h-(--sv-navPage-subMenu-horizontal-height) medium:[[class~=has-subMenu][class~=is-root]+&]:w-(--sv-navPage-subMenu-horizontal-width) medium:[[class~=has-subMenu][class~=is-root]+&]:border-l-0"
        id={`navPages-${$pointer("id")}`}
        aria-hidden="true"
        tabIndex={-1}
    >
        <ul className="navPage-subMenu-list my-quarter ml-0 mr-half pl-0 medium:m-auto medium:w-full medium:max-w-(--sv-layout-widthMax) medium:flow-root medium:p-0">
            <li className="navPage-subMenu-item-parent w-full medium:m-0 medium:p-0">
                {navLink("maxLeaf", false, {href: $pointer("url")}, <$Lang keyName={$string("category.view_all.name")} category={$pointer("name")} />)}
            </li>
            <$Each
                list={$pointer<NavChild[]>("children")}
                $then={(child) => (
                    <li className="navPage-subMenu-item-child w-full medium:m-0 medium:p-0">
                        <$If
                            test={child.children}
                            $then={() => (
                                <>
                                    <$If
                                        test={$pointer("is_active")}
                                        $then={() =>
                                            navLink("maxParent", true, {href: child.url, "data-collapsible": `navPages-${child.id}`}, (
                                                <>
                                                    {child.name}
                                                    {moreIcon("maxNested")}
                                                </>
                                            ))
                                        }
                                        $else={() =>
                                            navLink("maxParent", false, {href: child.url, "data-collapsible": `navPages-${child.id}`}, (
                                                <>
                                                    {child.name}
                                                    {moreIcon("maxNested")}
                                                </>
                                            ))
                                        }
                                    />
                                    <NavigationDropdown />
                                </>
                            )}
                            $else={() => (
                                <$If
                                    test={$pointer("is_active")}
                                    $then={() => navLink("maxLeaf", true, {href: child.url}, child.name)}
                                    $else={() => navLink("maxLeaf", false, {href: child.url}, child.name)}
                                />
                            )}
                        />
                    </li>
                )}
            />
        </ul>
    </div>
);
