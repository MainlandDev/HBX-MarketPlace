"use server";
import FacetedSearchIndex from "../faceted-search/index.tsx";
import CategoryShopByPrice from "./shop-by-price.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $pointer} from "@mainlanddev/hbx-bigcommerce";

interface Subcategory {
    url: string;
    name: string;
}

export default (_props: PartialProps) => (
    <nav>
        <$If
            test={$pointer("category.subcategories")}
            $then={() => (
                <div className="sidebarBlock [[class~=sidebarBlock]+&]:mt-single-third [[class~=sidebarBlock]+&]:border-t [[class~=sidebarBlock]+&]:border-(--sv-container-border-global-color-base) [[class~=sidebarBlock]+&]:pt-single-third">
                    <h2 className="sidebarBlock-heading mt-0 text-[15px] [text-transform:inherit]">{$pointer("category.name")}</h2>
                    <ul className="navList">
                        <$Each
                            list={$pointer<Subcategory[]>("category.subcategories")}
                            $then={(subcategory) => (
                                <li className="navList-item">
                                    <a className="navList-action" href={subcategory.url} title={subcategory.name}>
                                        {subcategory.name}
                                    </a>
                                </li>
                            )}
                        />
                    </ul>
                </div>
            )}
        />

        <$If
            test={$pointer("category.faceted_search_enabled")}
            $then={() => <FacetedSearchIndex $positionalHash={$pointer("category")} />}
            $else={() => <CategoryShopByPrice />}
        />
    </nav>
);
