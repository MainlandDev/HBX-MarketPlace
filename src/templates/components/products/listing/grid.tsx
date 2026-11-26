"use server";
import ProductsCard from "./card.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$add, $Each, $number, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <ul className="productGrid -mx-gutter-half mb-single w-auto max-w-none [display:flex] flex-wrap text-[0px] [list-style-type:none]">
        <$Each
            list={$pointer<unknown[]>("products")}
            $then={() => (
                <li className="product [display:flex] [&>.card]:w-full w-6/12 overflow-hidden px-gutter-half align-top text-(length:--sv-fontSize-base) small:w-4/12 medium:w-3/12 small:[[class~=page-sidebar]+[class~=page-content]_&]:w-4/12 large:[[class~=page-sidebar]+[class~=page-content]_&]:w-3/12">
                    <ProductsCard settings={$pointer("../settings")} show_compare={$pointer("../show_compare")} show_rating={$pointer("../settings.show_product_rating")} theme_settings={$pointer("../theme_settings")} customer={$pointer("../customer")} event={$pointer("../event")} position={$add($pointer<number>("@index"), $number(1))} />
                </li>
            )}
        />
    </ul>
);
