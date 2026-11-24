"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$lang, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div
        id="add-certificate"
        className="cart-form gift-certificate-code"
        aria-hidden="true"
        style={{display: "none"}}
    >
        <form className="form form--hiddenLabels cart-gift-certificate-form flow-root text-[0px] mb-base" method="post" action={$pointer("urls.cart")}>
            <label className="form-label" htmlFor="certcode">
                <$Lang keyName={$string("cart.gift_certificates.cert_code")} />
            </label>
            <input
                className="form-input float-left inline-block h-[32px] w-[78%] p-third align-top"
                id="certcode"
                type="text"
                name="certcode"
                value=""
                placeholder={$lang($string("cart.gift_certificates.add_cert_code"))}
            />
            <input
                className="button button--primary button--small float-left m-0 ml-[2%] w-[20%] px-half [[data-enhanced]_&]:bg-(--sv-container-fill-base) [[data-enhanced]_&]:font-bold [[data-enhanced]_&]:text-text-base"
                aria-label={$lang($string("cart.gift_certificates.apply_gift_certificate"))}
                type="submit"
                value={$lang($string("cart.coupons.button"))}
            />
            <input type="hidden" name="action" value="applycoupon" />
        </form>
    </div>
);
