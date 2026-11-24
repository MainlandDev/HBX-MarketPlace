"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $pointer, $string, $sanitize, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {Icon} from "../../../server/formParts.tsx";

interface SelectedFacet {
    url: string;
    title: string;
}

export default (_props: PartialProps) => (
    <div className="facetedSearch-refineFilters sidebarBlock [display:none] medium:[display:block] [[class~=sidebarBlock]+&]:mt-single-third [[class~=sidebarBlock]+&]:border-t [[class~=sidebarBlock]+&]:border-(--sv-container-border-global-color-base) [[class~=sidebarBlock]+&]:pt-single-third" role="region" aria-label={$lang($string("search.faceted.selected.facet-label"))}>
        <h2 className="sidebarBlock-heading mt-0 text-[15px] [text-transform:inherit]">
            <$Lang keyName={$string("search.faceted.selected.title")} />
        </h2>

        <$If
            test={$pointer("items")}
            $then={() => (
                <ul className="inlineList inlineList--labels flow-root overflow-visible mb-0 -ml-half [&>li]:mb-half [&>li]:ml-half">
                    <$Each
                        list={$pointer<SelectedFacet[]>("items")}
                        $then={(item) => (
                            <li>
                                <a href={item.url} className="facetLabel rounded-(--sv-facetLabel-borderRadius) bg-(--sv-facetLabel-backgroundColor) py-eighth pr-third pl-[calc(var(--sv-spacing-third)+var(--sv-spacing-eighth))] no-underline" rel="nofollow" data-faceted-search-facet={""}>
                                    <$If
                                        test={$pointer("facet")}
                                        operator={$string("===")}
                                        rvalue={$string("rating")}
                                        $then={() => (
                                            <>
                                                <$Lang keyName={$string("search.faceted.selected.rating-label")} rating={$pointer<number>("title")} />
                                            </>
                                        )}
                                        $else={() => (
                                            <>
                                                {$unescaped($sanitize(item.title))}
                                            </>
                                        )}
                                    />{" "}
                                    <Icon tag="svg" className="relative -top-px inline-block size-[12px] fill-(--sv-facetLabel-removeIcon-color)">
                                        <use href="#icon-close" />
                                    </Icon>
                                </a>
                            </li>
                        )}
                    />
                </ul>
            )}
            $else={() => (
                <p>
                    <$Lang keyName={$string("search.faceted.selected.no-filters")} />
                </p>
            )}
        />

        <$If
            test={$pointer("remove_all_url")}
            $then={() => (
                <a href={$pointer("remove_all_url")} data-faceted-search-facet={""}>
                    <$Lang keyName={$string("search.faceted.selected.clear-all")} />
                </a>
            )}
        />
    </div>
);
