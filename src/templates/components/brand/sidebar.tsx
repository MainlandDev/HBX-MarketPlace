"use server";
import FacetedSearchIndex from "../faceted-search/index.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {NavList} from "../../../server/componentParts.tsx";

interface ShopByBrand {
    url: string;
    name: string;
}

export default (_props: PartialProps) => (
    <nav>
        <$If
            test={$pointer("brand.faceted_search_enabled")}
            $then={() => <FacetedSearchIndex $positionalHash={$pointer("brand")} />}
            $else={() => (
                <$If
                    test={$pointer("shop_by_brand")}
                    $then={() => (
                        <div className="sidebarBlock [[class~=sidebarBlock]+&]:mt-single-third [[class~=sidebarBlock]+&]:border-t [[class~=sidebarBlock]+&]:border-(--sv-container-border-global-color-base) [[class~=sidebarBlock]+&]:pt-single-third">
                            <h5 className="sidebarBlock-heading mt-0 text-[15px] [text-transform:inherit]">
                                <$Lang keyName={$string("brand.label")} />
                            </h5>
                            <NavList className="ml-0">
                                <$Each
                                    list={$pointer<ShopByBrand[]>("shop_by_brand")}
                                    $then={(brand) => (
                                        <li className="navList-item">
                                            <a className="navList-action no-underline" href={brand.url}>
                                                {brand.name}
                                            </a>
                                        </li>
                                    )}
                                />
                                <li className="navList-item">
                                    <a className="navList-action no-underline" href={$pointer("urls.brands")}>
                                        <$Lang keyName={$string("common.view_all")} />
                                    </a>
                                </li>
                            </NavList>
                        </div>
                    )}
                />
            )}
        />
    </nav>
);
