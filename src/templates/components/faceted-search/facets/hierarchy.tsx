"use server";
import FacetedSearchFacetedSearchNavigation from "../faceted-search-navigation.tsx";
import FacetedSearchFacetsHierarchyChildren from "./hierarchy-children.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$dashcase, $Each, $If, $Lang, $pointer, $sanitize, $string, $unescaped, $Unless} from "@mainlanddev/hbx-bigcommerce";
import {NavList, NavListCheckbox} from "../../../../server/componentParts.tsx";

interface Facet {
    id: string;
    url: string;
    title: string;
    count: number;
    selected: boolean;
    has_sub_categories: boolean;
    children: Facet[];
}

export default (_props: PartialProps) => (
    <$If
        test={$pointer("items")}
        $then={() => (
            <div className="accordion-block [[class~=facetedSearch-navList][class~=is-open]_&:first-child_[class~=accordion-navigation]]:rounded-t-none medium:mt-(--sv-accordion-navList-spacing) first:mt-0 first:[&_.accordion-navigation]:[border-radius:4px_4px_0_0] last:[&_.accordion-navigation]:[border-radius:0_0_4px_4px] last:[&_.accordion-content]:[border-radius:0_0_4px_4px] last:[&_.accordion-navigation]:border-b-0 last:[&_.accordion-navigation.is-open]:border-b-[1px] medium:last:[&_.accordion-navigation.is-open]:border-b-0 last:[&_.accordion-navigation.is-open]:rounded-none">
                <FacetedSearchFacetedSearchNavigation />

                <div
                    id={`facetedSearch-content--${$dashcase($pointer("facet"))}`}
                    className={`accordion-content${$Unless({test: $pointer("start_collapsed"), $then: () => " is-open"})}`}
                >
                    <NavList
                        id={`facetedSearch-navList--${$dashcase($pointer("facet"))}`}
                        className="ml-0"
                        data-facet={$pointer("facet")}
                        data-has-more-results={$pointer("has_more_results")}
                    >
                        <$Each
                            list={$pointer<Facet[]>("items")}
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
                                            $then={() => <span>({item.count})</span>}
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

                    <$If
                        test={$pointer("show_more_toggle")}
                        $then={() => (
                            <a href={`#facetedSearch-navList--${$dashcase($pointer("facet"))}`} role="button" className="toggleLink text-(--sv-setting-color-textSecondary) hover:text-(--sv-setting-color-textSecondary--hover)">
                                <span className="toggleLink-text toggleLink-text--off text-smallest font-normal [display:inline-block] [[class~=toggleLink][class~=is-open]_&]:[display:none]">
                                    <$Lang keyName={$string("search.faceted.show-more")} />
                                </span>
                            </a>
                        )}
                    />
                </div>
            </div>
        )}
    />
);
