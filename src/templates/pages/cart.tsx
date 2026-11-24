import CartPageTitle from "../components/cart/page-title.tsx";
import CartStatusMessages from "../components/cart/status-messages.tsx";
import CartContent from "../components/cart/content.tsx";
import CartCoupons from "../components/cart/coupons.tsx";
import CartTotals from "../components/cart/totals.tsx";
import CartAdditionalCheckoutButtons from "../components/cart/additional-checkout-buttons.tsx";
import Breadcrumbs from "../components/common/breadcrumbs.tsx";
import {
    $frontmatter,
    $If,
    $Inject,
    $Lang,
    $lang,
    $Page,
    $pointer,
    $region,
    $string,
    $unescaped, $unlessExpression, $Or,
} from "@mainlanddev/hbx-bigcommerce";
import {Button} from "../../server/formParts.tsx";
import {LoadingOverlay} from "../../server/runtimeParts.tsx";

export const frontmatter = $frontmatter.other({cart: true});

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default () => (
    <>
        <$Inject keyName={$string("cancelButtonText")} value={$lang($string("common.cancel"))} />
        <$Page
            blocks={{
                page: () => (
                    <>
                        <$Inject keyName={$string("invalidEntryMessage")} value={$lang($string("cart.invalid_entry_message"))} />{" "}
                        <$Inject keyName={$string("multiCouponUIEnabled")} value={$pointer("cart.multi_coupon_ui_enabled")} />
                        <div className="page -mx-gutter-half w-auto max-w-none flow-root">
                            <div className="page-content float-left w-full px-gutter-half" data-cart={""}>
                                <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                                <CartPageTitle />
                                <div data-cart-status={""}><CartStatusMessages /></div>
                                <$If
                                    test={$pointer("cart.items.length")}
                                    $then={() => (
                                        <>
                                            <LoadingOverlay />
                                            <div data-cart-content={""} className="pr-[4px]">
                                                <CartContent />
                                            </div>
                                            <$If
                                                test={$pointer("cart.multi_coupon_ui_enabled")}
                                                $then={() => (
                                                    <div data-cart-coupons={""} className="pr-[4px]">
                                                        <CartCoupons />
                                                    </div>
                                                )}
                                            />
                                            <div data-cart-totals={""} className="pr-[4px]">
                                                <CartTotals />
                                            </div>
                                            {region("cart_below_totals")}
                                            <$Or values={[$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))]} $then={() => (<><$If
                                                test={$pointer("cart.show_primary_checkout_button")}
                                                $then={() => (
                                                    <div className="cart-actions clear-both flow-root pr-[4px] [&_.button]:mb-0 [&_.button]:[display:block] small:[&_.button]:float-right small:[&_.button]:[display:inline-block]">
                                                        <Button
                                                            tag="a" variant="primary"
                                                            href={$pointer("urls.checkout.single_address")}
                                                            title={$lang($string("cart.checkout.title"))}
                                                            data-primary-checkout-now-action={""}
                                                        >
                                                            {" "}<$Lang keyName={$string("cart.checkout.button")} />{" "}
                                                        </Button>
                                                        {" "}
                                                        <$If
                                                            test={$pointer("cart.show_multiple_address_shipping")}
                                                            $then={() => (
                                                                <a className="checkoutMultiple clear-right float-right pt-quarter [display:block]" href={$pointer("urls.checkout.multiple_address")}>
                                                                    {" "}<$Lang keyName={$string("cart.preview.checkout_multiple")} />{" "}
                                                                </a>
                                                            )}
                                                        />
                                                    </div>
                                                )}
                                                $else={() => (
                                                    <div className="cart-actions clear-both flow-root pr-[4px] [&_.button]:mb-0 [&_.button]:[display:block] small:[&_.button]:float-right small:[&_.button]:[display:inline-block]">
                                                        <Button
                                                            tag="a"
                                                            href={$pointer("urls.home")}
                                                            title={$lang($string("cart.continue_shopping"))}
                                                        >
                                                            <$Lang keyName={$string("cart.continue_shopping")} />
                                                        </Button>
                                                    </div>
                                                )}
                                            />
                                            <$If
                                                test={$pointer("cart.additional_checkout_buttons")}
                                                $then={() => (
                                                    <div
                                                        data-cart-additional-checkout-buttons={""}
                                                        className="cart-additionalCheckoutButtons pr-[4px] [&_.FloatRight]:flow-root [&_.FloatRight_p]:float-none [&_.FloatRight_p]:my-third [&_.FloatRight_p]:text-right [&_.FloatRight_div]:float-right"
                                                    >
                                                        <CartAdditionalCheckoutButtons />
                                                    </div>
                                                )}
                                            /></>)} $else={() => (<><div className="cart-actions clear-both flow-root pr-[4px] [&_.button]:mb-0 [&_.button]:[display:block] small:[&_.button]:float-right small:[&_.button]:[display:inline-block]">
                                                <Button
                                                    tag="a"
                                                    href={$pointer("urls.auth.login")}
                                                    title={$lang($string("cart.login_to_checkout"))}
                                                >
                                                    <$Lang keyName={$string("cart.login_to_checkout")} />
                                                </Button>
                                            </div></>)} />
                                        </>
                                    )}
                                    $else={() => (
                                        <h3 tabIndex={0}>
                                            <$Lang keyName={$string("cart.checkout.empty_cart")} />
                                        </h3>
                                    )}
                                />
                            </div>
                        </div>
                    </>
                ),
            }}
            layout="layout/base"
        />
    </>
);
