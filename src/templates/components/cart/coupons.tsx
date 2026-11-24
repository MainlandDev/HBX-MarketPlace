"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Each, $lang, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface Coupon {
    display_name: string;
    code: string;
    remove_url: string;
}

export default (_props: PartialProps) => (
    <div className="cart-coupons w-full pb-base border-b border-(--sv-container-border-global-color-base) small:float-right small:w-[75%] medium:w-[58.3333%] large:w-[41.6667%]">
        <div className="cart-coupon-trigger">
            <a href="#" className="cart-coupon-link inline-flex items-center font-normal no-underline text-(--sv-setting-optimizedCheckout-link-color) hover:underline hover:text-(--sv-setting-optimizedCheckout-link-color)" data-coupon-trigger={""}>
                <$Lang keyName={$string("cart.coupons.apply_coupon_code")} />
            </a>
        </div>

        <div className="cart-form coupon-code-form" data-coupon-form={""} style={{display: "none"}}>
            <form className="form form--hiddenLabels coupon-form flow-root text-[0px] mb-base mt-base" action={$pointer("urls.cart")} method="post">
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
                    className="button button--primary button--small float-left m-0 ml-[2%] w-[20%] px-half bg-(--sv-container-fill-base) font-bold text-text-base"
                    type="submit"
                    aria-label={$lang($string("cart.coupons.apply_coupon"))}
                    value={$lang($string("cart.coupons.button"))}
                />
                <input type="hidden" name="action" value="applycoupon" />
            </form>
        </div>

        <$If
            test={$pointer("cart.coupons.length")}
            $then={() => (
                <div className="cart-coupon-display mt-base">
                    <ul className="cart-coupon-list m-0 flex list-none flex-row flex-wrap items-start gap-[0.75rem] p-0">
                        <$Each
                            list={$pointer<Coupon[]>("cart.coupons")}
                            $then={(coupon) => (
                                <li className="cart-coupon-item inline-flex max-w-full items-center gap-[0.5rem] rounded-[3px] border border-(color:--sv-setting-color-coupon-pill-border) bg-(--sv-setting-color-coupon-pill-background) p-[0.5rem] text-(--sv-setting-color-coupon-pill-text) [&_svg]:fill-(--sv-setting-icon-color)">
                                    <i className="icon" aria-hidden="true">
                                        <svg>
                                            <use href="#icon-promotions" />
                                        </svg>
                                    </i>
                                    <$If
                                        test={coupon.display_name}
                                        $then={() => (
                                            <span className="cart-coupon-name ml-sixth inline-flex flex-1 flex-col">
                                                {coupon.display_name} ({coupon.code})
                                            </span>
                                        )}
                                        $else={() => <span className="cart-coupon-name ml-sixth inline-flex flex-1 flex-col">{coupon.code}</span>}
                                    />
                                    <a className="cart-coupon-remove" aria-label={$lang($string("cart.coupons.remove"))} href={coupon.remove_url}>
                                        <i className="icon" aria-hidden="true">
                                            <svg>
                                                <use href="#icon-close" />
                                            </svg>
                                        </i>
                                    </a>
                                </li>
                            )}
                        />
                    </ul>
                </div>
            )}
        />
    </div>
);
