"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$lang, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormInput, FormLabel} from "../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <div
        id="add-certificate"
        className="cart-form gift-certificate-code"
        aria-hidden="true"
        style={{display: "none"}}
    >
        <form className="form form--hiddenLabels [&_.form-label]:absolute [&_.form-label]:size-px [&_.form-label]:overflow-hidden [&_.form-label]:border-0 [&_.form-label]:p-0 [&_.form-label]:[clip:rect(1px,1px,1px,1px)] cart-gift-certificate-form flow-root text-[0px] mb-base [:where(&)]:[margin:var(--sv-form-margin)]" method="post" action={$pointer("urls.cart")}>
            <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="certcode">
                <$Lang keyName={$string("cart.gift_certificates.cert_code")} />
            </FormLabel>
            <FormInput
                className="float-left inline-block h-[32px] w-[78%] p-third align-top"
                id="certcode"
                type="text"
                name="certcode"
                value=""
                placeholder={$lang($string("cart.gift_certificates.add_cert_code"))}
            />
            <Button
                tag="input" variant="primary" size="small" className="float-left m-0 ml-[2%] w-[20%] px-half [[data-enhanced]_&]:bg-(--sv-container-fill-base) [[data-enhanced]_&]:font-bold [[data-enhanced]_&]:text-text-base"
                aria-label={$lang($string("cart.gift_certificates.apply_gift_certificate"))}
                type="submit"
                value={$lang($string("cart.coupons.button"))}
            />
            <input type="hidden" name="action" value="applycoupon" />
        </form>
    </div>
);
