"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {moreIcon, navLink} from "../../../../server/navParts.tsx";

interface NavChild {
    id: string;
    url: string;
    name: string;
    children: unknown;
}

interface NavGrandchild {
    url: string;
    name: string;
}

// `activePage` is decided while the template renders, so every link is an $If pair of the active and inactive literal.
export default (_props: PartialProps) => (
    <$If
        test={$pointer("children")}
        $then={() => (
            <>
                <$If
                    test={$pointer("is_active")}
                    $then={() =>
                        navLink("top", true, {href: $pointer("url"), "data-collapsible": `navPages-${$pointer("id")}`}, (
                            <>
                                {$pointer("name")}
                                {moreIcon("top")}
                            </>
                        ))
                    }
                    $else={() =>
                        navLink("top", false, {href: $pointer("url"), "data-collapsible": `navPages-${$pointer("id")}`}, (
                            <>
                                {$pointer("name")}
                                {moreIcon("top")}
                            </>
                        ))
                    }
                />
                <div
                    className="navPage-subMenu [display:none] [outline:0] is-open:[display:block] medium:absolute medium:bg-(--sv-setting-navPages-subMenu-backgroundColor) medium:px-single medium:pt-single medium:pb-single-half medium:text-left medium:is-open:left-0 medium:is-open:w-full"
                    id={`navPages-${$pointer("id")}`}
                    aria-hidden="true"
                    tabIndex={-1}
                >
                    <ul className="navPage-subMenu-list my-quarter ml-0 mr-0 pl-0 medium:m-auto medium:w-full medium:max-w-(--sv-layout-widthMax) medium:flow-root medium:p-0">
                        <li className="navPage-subMenu-item py-half medium:float-left medium:m-0 medium:w-1/4 medium:px-[0.75rem] medium:py-0 medium:[&>a]:mb-half-quarter medium:[&>a]:border-b medium:[&>a]:border-(--sv-setting-navPages-subMenu-separatorColor) medium:[&_a]:w-full medium:[&_a]:normal-case">
                            {navLink("sub", false, {href: $pointer("url"), "aria-label": $lang($string("category.view_all.name"), {category: $pointer("name")})}, (
                                <$Lang keyName={$string("category.view_all.name")} category={$pointer("name")} />
                            ))}
                        </li>
                        <$Each
                            list={$pointer<NavChild[]>("children")}
                            $then={(child) => (
                                <li className="navPage-subMenu-item py-half medium:float-left medium:m-0 medium:w-1/4 medium:px-[0.75rem] medium:py-0 medium:[&>a]:mb-half-quarter medium:[&>a]:border-b medium:[&>a]:border-(--sv-setting-navPages-subMenu-separatorColor) medium:[&_a]:w-full medium:[&_a]:normal-case">
                                    <$If
                                        test={child.children}
                                        $then={() => (
                                            <>
                                                <$If
                                                    test={$pointer("is_active")}
                                                    $then={() =>
                                                        navLink("subParent", true, {href: child.url, "aria-label": child.name}, (
                                                            <>
                                                                {child.name}
                                                                <span
                                                                    className="collapsible-icon-wrapper box-content inline-block h-full w-full text-right medium:[display:none]"
                                                                    data-collapsible={`navPages-${child.id}`}
                                                                    data-collapsible-disabled-breakpoint="medium"
                                                                    data-collapsible-disabled-state="open"
                                                                    data-collapsible-enabled-state="closed"
                                                                >
                                                                    {moreIcon("child")}
                                                                </span>
                                                            </>
                                                        ))
                                                    }
                                                    $else={() =>
                                                        navLink("subParent", false, {href: child.url, "aria-label": child.name}, (
                                                            <>
                                                                {child.name}
                                                                <span
                                                                    className="collapsible-icon-wrapper box-content inline-block h-full w-full text-right medium:[display:none]"
                                                                    data-collapsible={`navPages-${child.id}`}
                                                                    data-collapsible-disabled-breakpoint="medium"
                                                                    data-collapsible-disabled-state="open"
                                                                    data-collapsible-enabled-state="closed"
                                                                >
                                                                    {moreIcon("child")}
                                                                </span>
                                                            </>
                                                        ))
                                                    }
                                                />
                                                <ul
                                                    className="navPage-childList [display:none] is-open:[display:block] my-quarter ml-double mr-half border-l border-(--sv-navPage-childList-borderColor) pl-half medium:[display:block] medium:m-0 medium:border-0 medium:p-0"
                                                    id={`navPages-${child.id}`}
                                                >
                                                    <$Each
                                                        list={$pointer<NavGrandchild[]>("children")}
                                                        $then={(grandchild) => (
                                                            <li className="navPage-childList-item medium:m-0 medium:p-0">
                                                                <$If
                                                                    test={$pointer("is_active")}
                                                                    $then={() => navLink("child", true, {href: grandchild.url, "aria-label": grandchild.name}, grandchild.name)}
                                                                    $else={() => navLink("child", false, {href: grandchild.url, "aria-label": grandchild.name}, grandchild.name)}
                                                                />
                                                            </li>
                                                        )}
                                                    />
                                                </ul>
                                            </>
                                        )}
                                        $else={() => (
                                            <$If
                                                test={$pointer("is_active")}
                                                $then={() => navLink("sub", true, {href: child.url, "aria-label": child.name}, child.name)}
                                                $else={() => navLink("sub", false, {href: child.url, "aria-label": child.name}, child.name)}
                                            />
                                        )}
                                    />
                                </li>
                            )}
                        />
                    </ul>
                </div>
            </>
        )}
        $else={() => (
            <$If
                test={$pointer("is_active")}
                $then={() => navLink("plain", true, {href: $pointer("url"), "aria-label": $pointer("name")}, $pointer("name"))}
                $else={() => navLink("plain", false, {href: $pointer("url"), "aria-label": $pointer("name")}, $pointer("name"))}
            />
        )}
    />
);
