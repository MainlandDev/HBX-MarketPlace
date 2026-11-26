"use server";
import NavigationDropdown from "./navigation-dropdown.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $pointer} from "@mainlanddev/hbx-bigcommerce";
import {moreIcon, navLink} from "../../../../server/navParts.tsx";

export default (_props: PartialProps) => (
    <$If
        test={$pointer("children")}
        $then={() => (
            <>
                <$If
                    test={$pointer("is_active")}
                    $then={() =>
                        navLink("maxRoot", true, {href: $pointer("url"), "data-collapsible": `navPages-${$pointer("id")}`, "aria-label": $pointer("name")}, (
                            <>
                                {$pointer("name")}
                                {moreIcon("maxRoot")}
                            </>
                        ))
                    }
                    $else={() =>
                        navLink("maxRoot", false, {href: $pointer("url"), "data-collapsible": `navPages-${$pointer("id")}`, "aria-label": $pointer("name")}, (
                            <>
                                {$pointer("name")}
                                {moreIcon("maxRoot")}
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
                $then={() => navLink("plain", true, {href: $pointer("url"), "aria-label": $pointer("name")}, $pointer("name"))}
                $else={() => navLink("plain", false, {href: $pointer("url"), "aria-label": $pointer("name")}, $pointer("name"))}
            />
        )}
    />
);
