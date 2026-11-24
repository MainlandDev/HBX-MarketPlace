"use server";
import ProductsCard from "../products/card.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import Paginator from "../common/paginator.tsx";
import {$Each, $If, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface WishlistItem {
    product_id: string;
    remove_url: string;
}

export default (_props: PartialProps) => (
    <>
        <ul className="productGrid -mx-gutter-half mb-single w-auto max-w-none flow-root text-[0px] [list-style-type:none]">
            <$Each
                list={$pointer<WishlistItem[]>("wishlist.items")}
                $then={(item) => (
                    <li className="product inline-block w-6/12 overflow-hidden px-gutter-half align-top text-(length:--sv-fontSize-base) small:w-4/12 medium:w-3/12 small:[[class~=page-sidebar]+[class~=page-content]_&]:w-4/12">
                        <ProductsCard id={item.product_id} theme_settings={$pointer("../theme_settings")} />

                        <$If
                            test={$pointer("../show_remove")}
                            $then={() => (
                                <form action={item.remove_url} className="form" method="post">
                                    <input type="submit" className="button button--primary button--small" value={$lang($string("account.wishlists.remove_item"))} />
                                </form>
                            )}
                        />
                    </li>
                )}
            />
        </ul>
        <Paginator $positionalHash={$pointer("wishlist.pagination")} />
    </>
);
