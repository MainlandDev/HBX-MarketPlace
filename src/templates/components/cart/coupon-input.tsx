"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$lang, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormInput, FormLabel} from "../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <>
        <div className="cart-total-value">
            <button
                className="coupon-code-add p-0 text-text-secondary underline [transition:color_0.15s_ease] hover:text-(--sv-setting-color-textSecondary--hover)"
                aria-label={$lang($string("cart.coupons.add_coupon"))}
                aria-controls="add-coupon"
                aria-expanded="false"
            >
                <$Lang keyName={$string("cart.coupons.add_coupon")} />
            </button>

            <button
                className="coupon-code-cancel italic p-0 text-text-secondary underline [transition:color_0.15s_ease] hover:text-(--sv-setting-color-textSecondary--hover)"
                style={{display: "none"}}
                aria-label={$lang($string("cart.coupons.add_coupon"))}
                aria-controls="add-coupon"
                aria-expanded="true"
            >
                <$Lang keyName={$string("cart.coupons.cancel")} />
            </button>
        </div>

        <div
            id="add-coupon"
            className="cart-form coupon-code"
            aria-hidden="true"
            style={{display: "none"}}
        >
            <form className="form form--hiddenLabels [&_.form-label]:absolute [&_.form-label]:size-px [&_.form-label]:overflow-hidden [&_.form-label]:border-0 [&_.form-label]:p-0 [&_.form-label]:[clip:rect(1px,1px,1px,1px)] coupon-form flow-root text-[0px] mb-base [:where(&)]:[margin:var(--sv-form-margin)]" method="post" action={$pointer("urls.cart")}>
                <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="couponcode">
                    <$Lang keyName={$string("cart.coupons.coupon_code")} />
                </FormLabel>
                <FormInput
                    className="float-left inline-block h-[32px] w-[78%] p-third align-top"
                    data-error={$lang($string("cart.coupons.empty_error"))}
                    id="couponcode"
                    type="text"
                    name="couponcode"
                    value=""
                    placeholder={$lang($string("cart.coupons.coupon_code"))}
                />
                <Button
                    tag="input" variant="primary" size="small" className="float-left m-0 ml-[2%] w-[20%] px-half"
                    type="submit"
                    aria-label={$lang($string("cart.coupons.apply_coupon"))}
                    value={$lang($string("cart.coupons.button"))}
                />
                <input type="hidden" name="action" value="applycoupon" />
            </form>
        </div>
    </>
);
