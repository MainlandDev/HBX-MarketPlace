"use server";
import FacetedSearchFacetsHierarchyChildren from "./hierarchy-children.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $pointer, $sanitize, $this, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {NavList, NavListCheckbox} from "../../../../server/componentParts.tsx";

interface ChildFacet {
    id: string;
    url: string;
    title: string;
    count: number;
    selected: boolean;
    has_sub_categories: boolean;
    children: ChildFacet[];
}

export default (_props: PartialProps) => (
    <NavList className="navList--inner ml-single">
        <$Each
            list={$this<ChildFacet[]>()}
            $then={(item) => (
                <li className="navList-item [&_.navList-action]:no-underline [&_.navList-action.is-active]:font-bold">
                    <NavListCheckbox
                        href={item.url}
                        className={`${$If({test: item.selected, $then: () => " is-selected"})}${$If({test: item.has_sub_categories, $then: () => " has-children"})}`}
                        rel="nofollow"
                        data-id={item.id}
                        data-faceted-search-facet={""}
                    >
                        {$unescaped($sanitize(item.title))}{" "}
                        <$If
                            test={$pointer("../show_product_counts")}
                            $then={() => <$If test={item.count} $then={() => <span>({item.count})</span>} />}
                        />
                    </NavListCheckbox>
                    <$If
                        test={item.children}
                        $then={() => <FacetedSearchFacetsHierarchyChildren $positionalHash={item.children} />}
                    />
                </li>
            )}
        />
    </NavList>
);
