"use server";
import FacetedSearchFacetedSearchNavigation from "../faceted-search-navigation.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$dashcase, $Each, $If, $Lang, $pointer, $sanitize, $string, $unescaped, $Unless} from "@mainlanddev/hbx-bigcommerce";

interface FacetOption {
    id: string;
    url: string;
    title: string;
    count: number;
    selected: boolean;
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
                    <ul
                        id={`facetedSearch-navList--${$dashcase($pointer("facet"))}`}
                        data-facet={$pointer("facet")}
                        className="navList ml-0"
                        data-has-more-results={$pointer("has_more_results")}
                    >
                        <$Each
                            list={$pointer<FacetOption[]>("items")}
                            $then={(item) => (
                                <li className="navList-item [&_.navList-action]:no-underline [&_.navList-action.is-active]:font-bold">
                                    <a
                                        href={item.url}
                                        className={`navList-action navList-action--checkbox${$If({test: item.selected, $then: () => " is-selected"})}`}
                                        rel="nofollow"
                                        data-faceted-search-facet={""}
                                    >
                                        {$unescaped($sanitize(item.title))}{" "}
                                        <$If
                                            test={$pointer("../show_product_counts")}
                                            $then={() => <span>({item.count})</span>}
                                        />{" "}
                                        <span className="navList-action-close float-right inline-block rounded-[100%] bg-(--sv-navList-action-close-background) p-(--sv-navList-action-close-padding) leading-[0] opacity-0 [visibility:hidden] [transition:var(--sv-navList-action-close-transition)] [&_.icon]:size-(--sv-navList-action-close-iconSize) [&_.icon]:fill-(--sv-setting-color-textLink) [[class~=navList-action][class~=is-selected]:hover_&]:opacity-100 [[class~=navList-action][class~=is-selected]:hover_&]:[visibility:visible]" aria-hidden="true">
                                            <svg className="icon">
                                                <use href="#icon-close" />
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                            )}
                        />
                    </ul>

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
