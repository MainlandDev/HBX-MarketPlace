"use server";
import ProductsCard from "./card.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$add, $Each, $Lang, $number, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <>
        <h2 className="page-heading">
            <$Lang keyName={$string("products.featured")} />
        </h2>

        <ul className="productGrid -mx-gutter-half mb-single w-auto max-w-none flow-root text-[0px] [list-style-type:none]" data-product-type="featured" data-list-name="Featured Products">
            <$Each
                list={$pointer<unknown[]>("products")}
                $then={() => (
                    <li className="product inline-block w-6/12 overflow-hidden px-gutter-half align-top text-(length:--sv-fontSize-base) small:w-4/12 medium:w-3/12 small:[[class~=page-sidebar]+[class~=page-content]_&]:w-4/12">
                        <ProductsCard settings={$pointer("../settings")} theme_settings={$pointer("../theme_settings")} customer={$pointer("../customer")} event={$string("list")} position={$add($pointer<number>("@index"), $number(1))} />
                    </li>
                )}
            />
        </ul>
    </>
);
