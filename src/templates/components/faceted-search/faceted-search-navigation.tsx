"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$dashcase, $If, $Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <h2 className="accordion-heading accordion-nav-clear-holder relative m-0 text-(length:--sv-fontSize-base) leading-(--sv-lineHeight-smaller)">
        <$If
            test={$pointer("start_collapsed")}
            $then={() => (
                <button
                    type="button"
                    className="accordion-navigation toggleLink relative flex w-full flex-row items-center justify-between pr-[1rem] no-underline medium:mb-half medium:border-0 medium:p-0 medium:[background-position:right_0_top_50%]"
                    data-collapsible={`#facetedSearch-content--${$dashcase($pointer("facet"))}`}
                    aria-label={$lang($string("search.faceted.toggleSection"), {title: $pointer("title")})}
                >
                    <span className="accordion-title m-0 p-(--sv-accordion-navList-padding) text-[15px] font-normal text-(--sv-setting-color-textHeading) [font-family:'Montserrat',Arial,Helvetica,sans-serif] [text-decoration:none] [text-transform:inherit] medium:p-0">{$pointer("title")}</span>{" "}

                    <span>
                        <svg className="icon accordion-indicator fill-(--sv-color-greyLight) toggleLink-text toggleLink-text--off">
                            <use href="#icon-add" />
                        </svg>{" "}
                        <svg className="icon accordion-indicator fill-(--sv-color-greyLight) toggleLink-text toggleLink-text--on">
                            <use href="#icon-remove" />
                        </svg>
                    </span>
                </button>
            )}
            $else={() => (
                <button
                    type="button"
                    className="accordion-navigation toggleLink relative flex w-full flex-row items-center justify-between pr-[1rem] no-underline medium:mb-half medium:border-0 medium:p-0 medium:[background-position:right_0_top_50%] is-open"
                    data-collapsible={`#facetedSearch-content--${$dashcase($pointer("facet"))}`}
                    aria-label={$lang($string("search.faceted.toggleSection"), {title: $pointer("title")})}
                >
                    <span className="accordion-title m-0 p-(--sv-accordion-navList-padding) text-[15px] font-normal text-(--sv-setting-color-textHeading) [font-family:'Montserrat',Arial,Helvetica,sans-serif] [text-decoration:none] [text-transform:inherit] medium:p-0">{$pointer("title")}</span>{" "}

                    <span>
                        <svg className="icon accordion-indicator fill-(--sv-color-greyLight) toggleLink-text toggleLink-text--off">
                            <use href="#icon-add" />
                        </svg>{" "}
                        <svg className="icon accordion-indicator fill-(--sv-color-greyLight) toggleLink-text toggleLink-text--on">
                            <use href="#icon-remove" />
                        </svg>
                    </span>
                </button>
            )}
        />
        <$If
            test={$pointer("selected")}
            $then={() => (
                <a href={$pointer("remove_url")} className="facetedSearch-clearLink absolute top-1/2 right-[40px] [transform:translateY(-50%)] text-(--sv-setting-color-textSecondary) hover:text-(--sv-setting-color-textSecondary--hover) medium:top-[3px] medium:right-[20px] medium:[transform:none]" data-faceted-search-facet={""}>
                    <$Lang keyName={$string("search.faceted.clear")} />
                </a>
            )}
        />
    </h2>
);
