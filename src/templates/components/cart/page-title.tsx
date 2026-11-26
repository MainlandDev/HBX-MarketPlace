"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <h1 className="page-heading mx-0 mt-0 mb-base text-left" data-cart-page-title={""}>
        <$Lang keyName={$string("cart.label")} quantity={$pointer<number>("cart.quantity")} />
    </h1>
);
