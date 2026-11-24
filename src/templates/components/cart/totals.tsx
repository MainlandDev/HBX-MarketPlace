"use server";
import CartShippingEstimatorTrigger from "./shipping-estimator-trigger.tsx";
import CartShippingEstimator from "./shipping-estimator.tsx";
import CartCouponInput from "./coupon-input.tsx";
import CartGiftCertificate from "./gift-certificate.tsx";
import CartGiftCertificateInput from "./gift-certificate-input.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import LoginForPricing from "../common/login-for-pricing.tsx";
import {
    $All,
    $AssignVar,
    $concat,
    $Each,
    $getVar,
    $If,
    $Lang,
    $lang,
    $Neither,
    $number,
    $Or,
    $pointer,
    $string,
    $Unless, $unlessExpression,
} from "@mainlanddev/hbx-bigcommerce";
import {Icon} from "../../../server/formParts.tsx";

interface Money {
    value: number;
    formatted: string;
}

interface Coupon {
    code: string;
    display_name: string;
    has_max_limit_reached: boolean;
    discount: Money;
    remove_url: string;
}

interface GiftCertificate {
    code: string;
    remove_url: string;
    remaining: Money;
    used: Money;
}

interface Fee {
    display_name: string;
    cost: Money;
}

interface Tax {
    name: string;
    included: boolean;
    cost: Money;
}

interface Item {
    stock_position: {quantity_backordered: number};
    options: Array<{linked_bundled_item: {stock_position: {quantity_backordered: number}}}>;
}

interface Cart {
    multi_coupon_ui_enabled: boolean;
    sub_total: Money;
    coupons: Coupon[];
    display_discount_total: Money;
    order_based_auto_discount_total: Money;
    order_based_auto_discount_max_limit_reached: boolean;
    manual_discount_total: Money;
    gift_wrapping_cost: Money;
    fees: Fee[];
    shipping_handling: {show_estimator: boolean; shipping_cost: Money};
    items: Item[];
    inventory_settings: {show_default_shipping_expectation_prompt: boolean; default_shipping_expectation_prompt: string};
    taxes: Tax[];
    discount: Money;
    gift_certificates: GiftCertificate[];
    grand_total: Money;
    total_discount: Money;
}

/** The trailing colon the original prints when `multi_coupon_ui_enabled` is off. */
const colon = (multi: ReturnType<typeof $pointer<boolean>>) => <$Unless test={multi} $then={() => ":"} />;

export default (_props: PartialProps) => {
    const cart = $pointer<Cart>("cart");
    const multi = cart.multi_coupon_ui_enabled;
    return (
        <ul className="cart-totals mb-single ml-0 w-full text-right [list-style-type:none] small:clear-both small:float-right small:w-9/12 medium:mb-base medium:w-7/12 large:w-5/12" dangerouslyInlineAttributes={{attributes: `${$If({test: multi, $then: () => 'data-enhanced=""'})}`}}>
            <li className="cart-total flow-root border-b-0 medium:[ul:not([data-enhanced])>.cart-total+&]:border-t medium:[ul:not([data-enhanced])>.cart-total+&]:border-container-border">
                <div className="cart-total-label float-left w-4/12 py-third pr-0 pl-single text-text-secondary small:w-6/12 medium:py-base medium:pl-0 medium:text-left medium:[display:block] [[data-enhanced]_&]:w-6/12 [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:text-left [[data-enhanced]_&]:text-text-base">
                    <strong>
                        <$Lang keyName={$string("cart.checkout.subtotal")} />
                        {colon(multi)}
                    </strong>
                </div>
                <div className="cart-total-value float-left py-third pr-0 pl-single text-left small:text-right medium:w-6/12 medium:py-base medium:pl-0 [[data-enhanced]_&]:float-right [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:font-semibold">
                    <$Or values={[$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))]} $then={() => (<><span>{cart.sub_total.formatted}</span></>)} $else={() => (<><LoginForPricing /></>)} />
                </div>
            </li>
            <$If
                test={multi}
                $then={() => (
                    <$Or
                        values={[cart.coupons, cart.display_discount_total.value]}
                        $then={() => (
                            <div className="cart-total cart-total-discounts flow-root border-b-0">
                                <div className="cart-total-label float-left w-4/12 py-third pr-0 pl-single text-text-secondary small:w-6/12 medium:py-base medium:pl-0 medium:text-left medium:[display:block] [[data-enhanced]_&]:w-6/12 [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:text-left [[data-enhanced]_&]:text-text-base [[data-enhanced]_&]:cursor-pointer" data-discount-toggle={""}>
                                    <strong>
                                        <$Lang keyName={$string("cart.discounts")} />
                                    </strong>
                                    <Icon className="cart-discount-icon [transition:transform_0.3s_ease] is-open:[transform:rotate(180deg)] [&_svg]:fill-text-base" aria-hidden="true">
                                        <svg>
                                            <use href="#icon-keyboard-arrow-up" />
                                        </svg>
                                    </Icon>
                                </div>
                                <div className="cart-total-value float-left py-third pr-0 pl-single text-left small:text-right medium:w-6/12 medium:py-base medium:pl-0 [[data-enhanced]_&]:float-right [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:font-semibold" data-discount-toggle={""}>
                                    <span>{cart.display_discount_total.formatted}</span>
                                </div>
                                <ul data-discount-details={""} className="cart-discount-list ml-0 w-full flex-col [&:not([style*=none])]:flex">
                                    <$If
                                        test={cart.order_based_auto_discount_total.value}
                                        $then={() => (
                                            <li className="cart-discount-item justify-between py-eighth text-text-secondary [&:not([style*=none])]:flex">
                                                <div className="cart-discount-item-label text-left">
                                                    <Icon aria-hidden="true">
                                                        <svg>
                                                            <use href="#icon-promotions" />
                                                        </svg>
                                                    </Icon>
                                                    <span className="cart-coupon-name ml-sixth inline-flex flex-1 flex-col">
                                                        <$Lang keyName={$string("cart.automatic_discount")} />{" "}
                                                        <$If
                                                            test={cart.order_based_auto_discount_max_limit_reached}
                                                            $then={() => (
                                                                <span className="cart-coupon-limit text-tiny text-success">
                                                                    <$Lang keyName={$string("cart.coupons.maximum_discount_applied")} />
                                                                </span>
                                                            )}
                                                        />
                                                    </span>
                                                </div>
                                                <div className="cart-discount-item-value">{cart.order_based_auto_discount_total.formatted}</div>
                                            </li>
                                        )}
                                    />
                                    <$If
                                        test={cart.manual_discount_total.value}
                                        $then={() => (
                                            <li className="cart-discount-item justify-between py-eighth text-text-secondary [&:not([style*=none])]:flex">
                                                <div className="cart-discount-item-label text-left">
                                                    <Icon aria-hidden="true">
                                                        <svg>
                                                            <use href="#icon-promotions" />
                                                        </svg>
                                                    </Icon>
                                                    <span className="cart-coupon-name ml-sixth inline-flex flex-1 flex-col">
                                                        <$Lang keyName={$string("cart.manual_discount")} />
                                                    </span>
                                                </div>
                                                <div className="cart-discount-item-value">{cart.manual_discount_total.formatted}</div>
                                            </li>
                                        )}
                                    />
                                    <$Each
                                        list={cart.coupons}
                                        $then={(coupon) => (
                                            <li className="cart-discount-item justify-between py-eighth text-text-secondary [&:not([style*=none])]:flex">
                                                <div className="cart-discount-item-label text-left">
                                                    <Icon aria-hidden="true">
                                                        <svg>
                                                            <use href="#icon-promotions" />
                                                        </svg>
                                                    </Icon>
                                                    <span className="cart-coupon-name ml-sixth inline-flex flex-1 flex-col">
                                                        <$If
                                                            test={coupon.display_name}
                                                            $then={() => (
                                                                <>
                                                                    {coupon.display_name} ({coupon.code})
                                                                </>
                                                            )}
                                                            $else={() => coupon.code}
                                                        />{" "}
                                                        <$If
                                                            test={coupon.has_max_limit_reached}
                                                            $then={() => (
                                                                <span className="cart-coupon-limit text-tiny text-success">
                                                                    <$Lang keyName={$string("cart.coupons.maximum_discount_applied")} />
                                                                </span>
                                                            )}
                                                        />
                                                    </span>
                                                </div>
                                                <div className="cart-discount-item-value">
                                                    <$If
                                                        test={$pointer("discount.value")}
                                                        operator={$string("===")}
                                                        rvalue={$number(0)}
                                                        $then={() => <>-</>}
                                                    />
                                                    {coupon.discount.formatted}
                                                </div>
                                            </li>
                                        )}
                                    />
                                </ul>
                            </div>
                        )}
                    />
                )}
            />
            <$If
                test={cart.gift_wrapping_cost.value}
                $then={() => (
                    <li className="cart-total flow-root border-b-0 medium:[ul:not([data-enhanced])>.cart-total+&]:border-t medium:[ul:not([data-enhanced])>.cart-total+&]:border-container-border">
                        <div className="cart-total-label float-left w-4/12 py-third pr-0 pl-single text-text-secondary small:w-6/12 medium:py-base medium:pl-0 medium:text-left medium:[display:block] [[data-enhanced]_&]:w-6/12 [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:text-left [[data-enhanced]_&]:text-text-base">
                            <strong>
                                <$Lang keyName={$string("cart.checkout.gift_wrapping")} />
                                {colon(multi)}
                            </strong>
                        </div>
                        <div className="cart-total-value float-left py-third pr-0 pl-single text-left small:text-right medium:w-6/12 medium:py-base medium:pl-0 [[data-enhanced]_&]:float-right [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:font-semibold">
                            <span>{cart.gift_wrapping_cost.formatted}</span>
                        </div>
                    </li>
                )}
            />
            <$If
                test={cart.fees}
                $then={() => (
                    <$Each
                        list={cart.fees}
                        $then={(fee) => (
                            <li className="cart-total flow-root border-b-0 medium:[ul:not([data-enhanced])>.cart-total+&]:border-t medium:[ul:not([data-enhanced])>.cart-total+&]:border-container-border">
                                <div className="cart-total-label float-left w-4/12 py-third pr-0 pl-single text-text-secondary small:w-6/12 medium:py-base medium:pl-0 medium:text-left medium:[display:block] [[data-enhanced]_&]:w-6/12 [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:text-left [[data-enhanced]_&]:text-text-base">
                                    <strong>
                                        {fee.display_name}
                                        {colon($pointer<boolean>("../cart.multi_coupon_ui_enabled"))}
                                    </strong>
                                </div>
                                <div className="cart-total-value float-left py-third pr-0 pl-single text-left small:text-right medium:w-6/12 medium:py-base medium:pl-0 [[data-enhanced]_&]:float-right [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:font-semibold">
                                    <span>{fee.cost.formatted}</span>
                                </div>
                            </li>
                        )}
                    />
                )}
            />
            <$If
                test={cart.shipping_handling.show_estimator}
                $then={() => (
                    <>
                        <$AssignVar keyName={$string("hasBackorderedItem")} value={$number(0)} />
                        <$Each
                            list={cart.items}
                            $then={(item) => (
                                <>
                                    <$If
                                        test={item.stock_position.quantity_backordered}
                                        $then={() => <$AssignVar keyName={$string("hasBackorderedItem")} value={$number(1)} />}
                                    />
                                    <$Each
                                        list={item.options}
                                        $then={(option) => (
                                            <$If
                                                test={option.linked_bundled_item.stock_position.quantity_backordered}
                                                $then={() => <$AssignVar keyName={$string("hasBackorderedItem")} value={$number(1)} />}
                                            />
                                        )}
                                    />
                                </>
                            )}
                        />
                        <li className="cart-total flow-root border-b-0 medium:[ul:not([data-enhanced])>.cart-total+&]:border-t medium:[ul:not([data-enhanced])>.cart-total+&]:border-container-border">
                            <div className="cart-total-label float-left w-4/12 py-third pr-0 pl-single text-text-secondary small:w-6/12 medium:py-base medium:pl-0 medium:text-left medium:[display:block] [[data-enhanced]_&]:w-6/12 [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:text-left [[data-enhanced]_&]:text-text-base">
                                <strong>
                                    <$Lang keyName={$string("cart.checkout.shipping")} />
                                    {colon(multi)}
                                </strong>
                                <$If test={multi} $then={() => <CartShippingEstimatorTrigger />} />
                            </div>
                            <$Neither a={multi} b={cart.shipping_handling.shipping_cost} $then={() => <CartShippingEstimatorTrigger />} />
                            <CartShippingEstimator $positionalHash={cart.shipping_handling} multi_coupon_ui_enabled={multi} />
                            <$All
                                values={[cart.inventory_settings.show_default_shipping_expectation_prompt, $getVar($string("hasBackorderedItem"))]}
                                $then={() => <p className="cart-shipping-expectation-message">{cart.inventory_settings.default_shipping_expectation_prompt}</p>}
                            />
                        </li>
                    </>
                )}
            />
            <$Each
                list={cart.taxes}
                $then={(tax) => (
                    <$Unless
                        test={tax.included}
                        $then={() => (
                            <li className="cart-total flow-root border-b-0 medium:[ul:not([data-enhanced])>.cart-total+&]:border-t medium:[ul:not([data-enhanced])>.cart-total+&]:border-container-border">
                                <div className="cart-total-label float-left w-4/12 py-third pr-0 pl-single text-text-secondary small:w-6/12 medium:py-base medium:pl-0 medium:text-left medium:[display:block] [[data-enhanced]_&]:w-6/12 [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:text-left [[data-enhanced]_&]:text-text-base">
                                    <strong>
                                        {tax.name}
                                        {colon($pointer<boolean>("../cart.multi_coupon_ui_enabled"))}
                                    </strong>
                                </div>
                                <div className="cart-total-value float-left py-third pr-0 pl-single text-left small:text-right medium:w-6/12 medium:py-base medium:pl-0 [[data-enhanced]_&]:float-right [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:font-semibold">
                                    <span>{tax.cost.formatted}</span>
                                </div>
                            </li>
                        )}
                    />
                )}
            />
            <$Unless
                test={multi}
                $then={() => (
                    <>
                        <$If
                            test={cart.discount}
                            $then={() => (
                                <li className="cart-total flow-root border-b-0 medium:[ul:not([data-enhanced])>.cart-total+&]:border-t medium:[ul:not([data-enhanced])>.cart-total+&]:border-container-border">
                                    <div className="cart-total-label float-left w-4/12 py-third pr-0 pl-single text-text-secondary small:w-6/12 medium:py-base medium:pl-0 medium:text-left medium:[display:block] [[data-enhanced]_&]:w-6/12 [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:text-left [[data-enhanced]_&]:text-text-base">
                                        <strong>
                                            <$Lang keyName={$string("cart.discount")} />:
                                        </strong>
                                    </div>
                                    <div className="cart-total-value float-left py-third pr-0 pl-single text-left small:text-right medium:w-6/12 medium:py-base medium:pl-0 [[data-enhanced]_&]:float-right [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:font-semibold">{cart.discount.formatted}</div>
                                </li>
                            )}
                        />
                        <$If
                            test={cart.coupons}
                            $then={() => (
                                <$Each
                                    list={cart.coupons}
                                    $then={(coupon) => (
                                        <li className="cart-total flow-root border-b-0 medium:[ul:not([data-enhanced])>.cart-total+&]:border-t medium:[ul:not([data-enhanced])>.cart-total+&]:border-container-border">
                                            <div className="cart-total-label float-left w-4/12 py-third pr-0 pl-single text-text-secondary small:w-6/12 medium:py-base medium:pl-0 medium:text-left medium:[display:block] [[data-enhanced]_&]:w-6/12 [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:text-left [[data-enhanced]_&]:text-text-base">
                                                <strong>
                                                    <$Lang keyName={$string("cart.coupons.code_label")} code={coupon.code} />
                                                </strong>
                                                <div>
                                                    <a href={coupon.remove_url}>
                                                        <$Lang keyName={$string("cart.coupons.remove")} />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="cart-total-value float-left py-third pr-0 pl-single text-left small:text-right medium:w-6/12 medium:py-base medium:pl-0 [[data-enhanced]_&]:float-right [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:font-semibold">
                                                <span>{coupon.discount.formatted}</span>
                                            </div>
                                        </li>
                                    )}
                                />
                            )}
                            $else={() => (
                                <li className="cart-total flow-root border-b-0 medium:[ul:not([data-enhanced])>.cart-total+&]:border-t medium:[ul:not([data-enhanced])>.cart-total+&]:border-container-border">
                                    <div className="cart-total-label float-left w-4/12 py-third pr-0 pl-single text-text-secondary small:w-6/12 medium:py-base medium:pl-0 medium:text-left medium:[display:block] [[data-enhanced]_&]:w-6/12 [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:text-left [[data-enhanced]_&]:text-text-base">
                                        <strong>
                                            <$Lang keyName={$string("cart.coupon_code")} />:
                                        </strong>
                                    </div>
                                    <CartCouponInput />
                                </li>
                            )}
                        />
                    </>
                )}
            />
            <$If
                test={$pointer<boolean>("settings.gift_certificates_enabled")}
                $then={() => (
                    <>
                        <$Unless
                            test={multi}
                            $then={() => (
                                <$Each
                                    list={cart.gift_certificates}
                                    $then={(certificate) => (
                                        <li className="cart-total flow-root border-b-0 medium:[ul:not([data-enhanced])>.cart-total+&]:border-t medium:[ul:not([data-enhanced])>.cart-total+&]:border-container-border">
                                            <div className="cart-total-label float-left w-4/12 py-third pr-0 pl-single text-text-secondary small:w-6/12 medium:py-base medium:pl-0 medium:text-left medium:[display:block] [[data-enhanced]_&]:w-6/12 [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:text-left [[data-enhanced]_&]:text-text-base [[data-enhanced]_&]:flex [[data-enhanced]_&]:flex-wrap [[data-enhanced]_&]:gap-third">
                                                <strong>
                                                    <$Lang keyName={$string("cart.gift_certificates.code_label")} code={certificate.code} />
                                                </strong>
                                                <span>
                                                    {certificate.remaining.formatted} |{" "}
                                                    <a href={certificate.remove_url}>
                                                        <$Lang keyName={$string("cart.gift_certificates.remove")} />
                                                    </a>
                                                </span>
                                            </div>
                                            <div className="cart-total-value float-left py-third pr-0 pl-single text-left small:text-right medium:w-6/12 medium:py-base medium:pl-0 [[data-enhanced]_&]:float-right [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:font-semibold">{certificate.used.formatted}</div>
                                        </li>
                                    )}
                                />
                            )}
                        />
                        <li className="cart-total flow-root border-b-0 medium:[ul:not([data-enhanced])>.cart-total+&]:border-t medium:[ul:not([data-enhanced])>.cart-total+&]:border-container-border">
                            <div className="cart-total-label float-left w-4/12 py-third pr-0 pl-single text-text-secondary small:w-6/12 medium:py-base medium:pl-0 medium:text-left medium:[display:block] [[data-enhanced]_&]:w-6/12 [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:text-left [[data-enhanced]_&]:text-text-base">
                                <strong>
                                    <$Lang keyName={$string("cart.gift_certificates.gift_certificate")} />
                                    {colon(multi)}
                                </strong>
                                <$If test={multi} $then={() => <CartGiftCertificate />} />
                            </div>
                            <$Unless test={multi} $then={() => <CartGiftCertificate />} />
                            <CartGiftCertificateInput />
                        </li>
                        <$If
                            test={multi}
                            $then={() => (
                                <$Each
                                    list={cart.gift_certificates}
                                    $then={(certificate) => (
                                        <li className="cart-total cart-total-gift-certificate-list-item flow-root border-b-0">
                                            <div className="cart-total-label float-left flex w-auto max-w-[80%] flex-wrap items-center gap-third py-third pr-0 pl-0 text-left text-text-secondary [&_.icon]:shrink-0 [&_a]:text-(--sv-setting-optimizedCheckout-link-color) [&_a]:font-normal [&_a]:no-underline [&_a]:hover:underline">
                                                <Icon aria-hidden="true">
                                                    <svg>
                                                        <use href="#icon-gifts" />
                                                    </svg>
                                                </Icon>{" "}
                                                <span>{certificate.code}</span>{" "}
                                                <$If test={certificate.remaining.value} $then={() => <span>| {certificate.remaining.formatted} left</span>} />{" "}
                                                <a href={certificate.remove_url}>
                                                    <$Lang keyName={$string("cart.gift_certificates.remove")} />
                                                </a>
                                            </div>
                                            <div className="cart-total-value float-right w-auto py-third pr-0 pl-0 text-left font-semibold small:text-right">{certificate.used.formatted}</div>
                                        </li>
                                    )}
                                />
                            )}
                        />
                    </>
                )}
            />
            <li className="cart-total cart-total-with-savings flow-root border-b-0 medium:[ul:not([data-enhanced])>.cart-total+&]:border-t medium:[ul:not([data-enhanced])>.cart-total+&]:border-container-border [[data-enhanced]_&]:border-t [[data-enhanced]_&]:border-container-border">
                <$If
                    test={multi}
                    $then={() => (
                        <>
                            <div className="cart-total-label float-left w-4/12 py-third pr-0 pl-single text-text-secondary small:w-6/12 medium:py-base medium:pl-0 medium:text-left medium:[display:block] [[data-enhanced]_&]:w-6/12 [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:text-left [[data-enhanced]_&]:text-text-base text-larger">
                                <strong>
                                    <$Lang keyName={$string("cart.checkout.total")} />
                                </strong>
                            </div>
                            <div className="cart-total-value cart-total-grandTotal relative float-right flex flex-col py-third pr-0 pl-0 text-right font-(family-name:--sv-fontFamily-headings) text-small font-normal medium:-top-sixth medium:w-6/12">
                                <$Or values={[$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))]} $then={() => (<><span className="cart-total-amount text-larger font-semibold">{cart.grand_total.formatted}</span>
                                <$If
                                    test={cart.total_discount.value}
                                    $then={() => (
                                        <span className="cart-total-savings mt-eighth font-(family-name:--sv-body-font-family) text-smaller font-bold text-text-secondary [display:block]">
                                            <$Lang keyName={$string("cart.checkout.you_saved")} /> <span className="cart-savings-amount text-success">{cart.total_discount.formatted}</span>{" "}
                                            <$Lang keyName={$string("cart.checkout.in_total")} />
                                        </span>
                                    )}
                                /></>)} $else={() => (<><LoginForPricing /></>)} />
                            </div>
                        </>
                    )}
                    $else={() => (
                        <>
                            <div className="cart-total-label float-left w-4/12 py-third pr-0 pl-single text-text-secondary small:w-6/12 medium:py-base medium:pl-0 medium:text-left medium:[display:block] [[data-enhanced]_&]:w-6/12 [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:text-left [[data-enhanced]_&]:text-text-base">
                                <strong>
                                    <$Lang keyName={$string("cart.checkout.grand_total")} />:
                                </strong>
                            </div>
                            <div className="cart-total-value cart-total-grandTotal relative float-left py-eighth pr-0 pl-single text-left font-(family-name:--sv-fontFamily-headings) text-small small:text-right medium:-top-sixth medium:w-6/12 medium:py-base">
                                <$Or values={[$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))]} $then={() => (<><span>{cart.grand_total.formatted}</span></>)} $else={() => (<><LoginForPricing /></>)} />
                            </div>
                        </>
                    )}
                />
            </li>
            <$Each
                list={cart.taxes}
                $then={(tax) => (
                    <$If
                        test={tax.included}
                        $then={() => (
                            <li className="cart-total flow-root border-b-0 medium:[ul:not([data-enhanced])>.cart-total+&]:border-t medium:[ul:not([data-enhanced])>.cart-total+&]:border-container-border">
                                <div className="cart-total-label float-left w-4/12 py-third pr-0 pl-single text-text-secondary small:w-6/12 medium:py-base medium:pl-0 medium:text-left medium:[display:block] [[data-enhanced]_&]:w-6/12 [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:text-left [[data-enhanced]_&]:text-text-base">
                                    <strong>
                                        {$concat(tax.name, $lang($string("cart.included_in_total")))}
                                        {colon($pointer<boolean>("../cart.multi_coupon_ui_enabled"))}
                                    </strong>
                                </div>
                                <div className="cart-total-value float-left py-third pr-0 pl-single text-left small:text-right medium:w-6/12 medium:py-base medium:pl-0 [[data-enhanced]_&]:float-right [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:font-semibold">
                                    <span>{tax.cost.formatted}</span>
                                </div>
                            </li>
                        )}
                    />
                )}
            />
        </ul>
    );
};
