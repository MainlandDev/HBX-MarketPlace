"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$lang, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

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
            <form className="form form--hiddenLabels coupon-form flow-root text-[0px] mb-base" method="post" action={$pointer("urls.cart")}>
                <label className="form-label" htmlFor="couponcode">
                    <$Lang keyName={$string("cart.coupons.coupon_code")} />
                </label>
                <input
                    className="form-input float-left inline-block h-[32px] w-[78%] p-third align-top"
                    data-error={$lang($string("cart.coupons.empty_error"))}
                    id="couponcode"
                    type="text"
                    name="couponcode"
                    value=""
                    placeholder={$lang($string("cart.coupons.coupon_code"))}
                />
                <input
                    className="button button--primary button--small float-left m-0 ml-[2%] w-[20%] px-half"
                    type="submit"
                    aria-label={$lang($string("cart.coupons.apply_coupon"))}
                    value={$lang($string("cart.coupons.button"))}
                />
                <input type="hidden" name="action" value="applycoupon" />
            </form>
        </div>
    </>
);
