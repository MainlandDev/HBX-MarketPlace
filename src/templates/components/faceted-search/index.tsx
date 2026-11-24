"use server";
import FacetedSearchSelectedFacets from "./selected-facets.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Any, $boolean, $Each, $If, $join, $Lang, $lang, $number, $pluck, $pointer, $string, $toLowerCase, $unescaped, $dynamicComponent} from "@mainlanddev/hbx-bigcommerce";
import {Icon} from "../../../server/formParts.tsx";

interface Facet {
    title: string;
    visible: boolean;
}

export default (_props: PartialProps) => (
    <div id="facetedSearch" className="facetedSearch sidebarBlock [[class~=sidebarBlock]+&]:mt-single-third [[class~=sidebarBlock]+&]:border-t [[class~=sidebarBlock]+&]:border-(--sv-container-border-global-color-base) [[class~=sidebarBlock]+&]:pt-single-third" role="region" aria-label={$lang($string("search.faceted.label"))}>
        <FacetedSearchSelectedFacets $positionalHash={$pointer("selected")} />

        <a href="#facetedSearch-navList" role="button" className="facetedSearch-toggle toggleLink mx-auto mb-(--sv-facetedSearch-toggle-verticalSpacing) w-full max-w-(--sv-layout-widthMax) flow-root rounded-(--sv-facetedSearch-toggle-borderRadius) border-(length:--sv-facetedSearch-toggle-borderWidth) border-solid border-(--sv-accordion-borderColor) p-(--sv-facetedSearch-toggle-padding) [display:block] is-open:mb-0 is-open:rounded-b-none medium:[display:none] text-(--sv-setting-color-textSecondary) hover:text-(--sv-setting-color-textSecondary--hover)" data-collapsible={""}>
            <span className="facetedSearch-toggle-text float-left w-7/12 p-0 text-left font-normal [display:block]">
                <$If
                    test={$pointer("facets.length")}
                    operator={$string(">")}
                    rvalue={$number(2)}
                    $then={() => (
                        <>
                            <$Lang keyName={$string("search.faceted.browse-by")} />{" "}
                            {$join($pluck($pointer<Facet[]>("facets"), $string("title")), $string(", "), {limit: $number(2)})}
                            {" & "}
                            {$toLowerCase($lang($string("search.faceted.more")))}
                        </>
                    )}
                    $else={() => (
                        <>
                            <$Lang keyName={$string("search.faceted.browse-by")} />{" "}
                            {$join($pluck($pointer<Facet[]>("facets"), $string("title")), $string(", "), {lastSeparator: $string(" & ")})}
                        </>
                    )}
                />
            </span>{" "}

            <span className="facetedSearch-toggle-indicator float-left w-5/12 p-0 text-right font-bold [display:block]">
                <span className="toggleLink-text toggleLink-text--on text-smallest font-normal [display:none] [[class~=toggleLink][class~=is-open]_&]:[display:inline-block]">
                    <$Lang keyName={$string("search.faceted.hide-filters")} />{" "}

                    <Icon aria-hidden="true">
                        <svg>
                            <use href="#icon-keyboard-arrow-up" />
                        </svg>
                    </Icon>
                </span>{" "}

                <span className="toggleLink-text toggleLink-text--off text-smallest font-normal [display:inline-block] [[class~=toggleLink][class~=is-open]_&]:[display:none]">
                    <$Lang keyName={$string("search.faceted.show-filters")} />{" "}

                    <Icon aria-hidden="true">
                        <svg>
                            <use href="#icon-keyboard-arrow-down" />
                        </svg>
                    </Icon>
                </span>
            </span>
        </a>

        <$Any
            list={$pointer<Facet[]>("facets")}
            predicate={{visible: $boolean(true)}}
            $then={() => (
                <div id="facetedSearch-navList" className="facetedSearch-navList [display:none] is-open:[display:block] medium:[display:block]">
                    <div className="accordion accordion--navList [:where(&)]:[display:flow-root] [:where(&)]:[margin:var(--sv-accordion-margin)] [:where(&)]:border [:where(&)]:border-solid [:where(&)]:border-(--sv-container-border-global-color-base) [:where(&_.accordion-content)]:[display:none] [&_.accordion-content.is-open]:[display:block] rounded-[4px] [[class~=facetedSearch-navList][class~=is-open]_&]:rounded-t-none shadow-none medium:border-0 medium:[[class~=sidebarBlock]+&]:mt-(--sv-accordion-navList-spacing) [&_.navList]:mb-0 [&_.accordion-content]:border-0 [&_.accordion-content]:p-(--sv-accordion-navList-padding) medium:[&_.accordion-content]:p-0 [&_.accordion-content_.form:only-child]:mb-0">
                        <$Each
                            list={$pointer<Facet[]>("facets")}
                            $then={(facet) => (
                                <$If
                                    test={facet.visible}
                                    $then={() => $unescaped($dynamicComponent($string("components/faceted-search/facets")))}
                                />
                            )}
                        />
                    </div>

                    <div className="blocker absolute inset-0 z-(--sv-zIndex-highest) bg-(--sv-body-bg)/50" style={{display: "none"}}></div>
                </div>
            )}
        />
    </div>
);
