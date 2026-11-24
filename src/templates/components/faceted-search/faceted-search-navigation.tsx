"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$dashcase, $If, $Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {Icon} from "../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <h2 className="accordion-heading accordion-nav-clear-holder relative m-0 text-(length:--sv-fontSize-base) leading-(--sv-lineHeight-smaller)">
        <$If
            test={$pointer("start_collapsed")}
            $then={() => (
                <button
                    type="button"
                    className="accordion-navigation toggleLink [:where(&)]:cursor-pointer [:where(&)]:border-y [:where(&)]:border-x-0 [:where(&)]:border-solid [:where(&)]:border-(--sv-container-border-global-color-base) [:where(&)]:mb-0 text-(--sv-setting-color-textSecondary) hover:text-(--sv-setting-color-textSecondary--hover) relative flex w-full flex-row items-center justify-between pr-[1rem] no-underline medium:mb-half medium:border-0 medium:p-0 medium:[background-position:right_0_top_50%]"
                    data-collapsible={`#facetedSearch-content--${$dashcase($pointer("facet"))}`}
                    aria-label={$lang($string("search.faceted.toggleSection"), {title: $pointer("title")})}
                >
                    <span className="accordion-title [:where(&)]:[line-height:var(--sv-accordion-title-lineHeight)] m-0 p-(--sv-accordion-navList-padding) text-[15px] font-normal text-(--sv-setting-color-textHeading) [font-family:'Montserrat',Arial,Helvetica,sans-serif] [text-decoration:none] [text-transform:inherit] medium:p-0">{$pointer("title")}</span>{" "}

                    <span>
                        <Icon tag="svg" className="accordion-indicator fill-(--sv-color-greyLight) toggleLink-text toggleLink-text--off text-smallest font-normal [display:inline-block] [[class~=toggleLink][class~=is-open]_&]:[display:none]">
                            <use href="#icon-add" />
                        </Icon>{" "}
                        <Icon tag="svg" className="accordion-indicator fill-(--sv-color-greyLight) toggleLink-text toggleLink-text--on text-smallest font-normal [display:none] [[class~=toggleLink][class~=is-open]_&]:[display:inline-block]">
                            <use href="#icon-remove" />
                        </Icon>
                    </span>
                </button>
            )}
            $else={() => (
                <button
                    type="button"
                    className="accordion-navigation toggleLink [:where(&)]:cursor-pointer [:where(&)]:border-y [:where(&)]:border-x-0 [:where(&)]:border-solid [:where(&)]:border-(--sv-container-border-global-color-base) [:where(&)]:mb-0 text-(--sv-setting-color-textSecondary) hover:text-(--sv-setting-color-textSecondary--hover) relative flex w-full flex-row items-center justify-between pr-[1rem] no-underline medium:mb-half medium:border-0 medium:p-0 medium:[background-position:right_0_top_50%] is-open"
                    data-collapsible={`#facetedSearch-content--${$dashcase($pointer("facet"))}`}
                    aria-label={$lang($string("search.faceted.toggleSection"), {title: $pointer("title")})}
                >
                    <span className="accordion-title [:where(&)]:[line-height:var(--sv-accordion-title-lineHeight)] m-0 p-(--sv-accordion-navList-padding) text-[15px] font-normal text-(--sv-setting-color-textHeading) [font-family:'Montserrat',Arial,Helvetica,sans-serif] [text-decoration:none] [text-transform:inherit] medium:p-0">{$pointer("title")}</span>{" "}

                    <span>
                        <Icon tag="svg" className="accordion-indicator fill-(--sv-color-greyLight) toggleLink-text toggleLink-text--off text-smallest font-normal [display:inline-block] [[class~=toggleLink][class~=is-open]_&]:[display:none]">
                            <use href="#icon-add" />
                        </Icon>{" "}
                        <Icon tag="svg" className="accordion-indicator fill-(--sv-color-greyLight) toggleLink-text toggleLink-text--on text-smallest font-normal [display:none] [[class~=toggleLink][class~=is-open]_&]:[display:inline-block]">
                            <use href="#icon-remove" />
                        </Icon>
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
