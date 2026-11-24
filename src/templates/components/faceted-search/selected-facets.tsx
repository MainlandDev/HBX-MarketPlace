"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $pointer, $string, $sanitize, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface SelectedFacet {
    url: string;
    title: string;
}

export default (_props: PartialProps) => (
    <div className="facetedSearch-refineFilters sidebarBlock [display:none] medium:[display:block]" role="region" aria-label={$lang($string("search.faceted.selected.facet-label"))}>
        <h2 className="sidebarBlock-heading mt-0 text-[15px] [text-transform:inherit]">
            <$Lang keyName={$string("search.faceted.selected.title")} />
        </h2>

        <$If
            test={$pointer("items")}
            $then={() => (
                <ul className="inlineList inlineList--labels">
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
                                    <svg className="icon relative -top-px inline-block size-[12px] fill-(--sv-facetLabel-removeIcon-color)">
                                        <use href="#icon-close" />
                                    </svg>
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
