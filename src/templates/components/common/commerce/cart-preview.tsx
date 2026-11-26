"use server";
import ResponsiveImg from "../responsive-img.tsx";
import LoginForPricing from "./login-for-pricing.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {
    $cdn,
    $Each,
    $If,
    $Lang,
    $limit,
    $number,
    $pointer,
    $raw,
    $string,
    $unescaped,
    $Unless,
    $unlessExpression,
    $ifExpression,
    $Or,
} from "@mainlanddev/hbx-bigcommerce";
import {Button} from "../../../../server/formParts.tsx";

interface CartItem {
    type: string;
    image: unknown;
    brand: {name: string};
    url: string;
    name: string;
    quantity: number;
    price: {formatted: string};
    price_discounted: {formatted: string};
}

export default (_props: PartialProps) => (
    <div className="previewCartWrapper max-h-[calc(100vh-6rem)] overflow-auto">
        <div className="previewCart mx-auto w-full max-w-(--sv-layout-widthMax) flow-root">
            <$If
                test={$pointer("cart.items.length")}
                $then={() => (
                    <>
                        <ul className="previewCartList m-0 p-0 [list-style:none] border-collapse table-fixed w-full">
                            <$Each
                                list={$limit($pointer<CartItem[]>("cart.items"), $number(4))}
                                $then={(item) => (
                                    <li className="previewCartItem mx-auto w-full max-w-(--sv-layout-widthMax) border-container-border leading-[19px] [.previewCartItem+&]:border-t">
                                        <div className="previewCartItem-image relative w-4/12 p-0 text-center align-middle [display:table-cell] after:h-0 after:w-full after:pb-[100%] after:content-[''] after:[display:block] xxsmall:after:pb-[75%] xsmall:after:pb-[100%] [&_img]:absolute [&_img]:inset-0 [&_img]:m-auto [&_img]:max-h-[90%]">
                                            <$If
                                                test={$pointer("type")}
                                                operator={$string("==")}
                                                rvalue={$string("GiftCertificate")}
                                                $then={() => (
                                                    <img
                                                        alt="GiftCertificate"
                                                        title="GiftCertificate"
                                                        src={$cdn($pointer("../theme_settings.default_image_gift_certificate"))}
                                                    />
                                                )}
                                                $else={() =>
                                                    <ResponsiveImg image={item.image} fallback_size={$pointer("../theme_settings.productthumb_size")} lazyload={$pointer("../theme_settings.lazyload_mode")} default_image={$pointer("../theme_settings.default_image_product")} />
                                                }
                                            />
                                        </div>
                                        <div className="previewCartItem-content w-8/12 pr-gutter-half pl-0 align-middle [display:table-cell]">
                                            <span className="previewCartItem-brand inline-block text-smallest text-(--sv-small-font-color) mb-eighth">{item.brand.name}</span>

                                            <h6 className="previewCartItem-name m-0 mb-eighth [text-transform:none] [&>a]:no-underline">
                                                <a href={item.url} alt={item.name} title={item.name}>
                                                    {item.name}
                                                </a>
                                            </h6>

                                            <span className="previewCartItem-price inline-block text-smallest text-(--sv-small-font-color)">
                                                <$If
                                                    test={$pointer("quantity")}
                                                    operator={$string(">")}
                                                    rvalue={$number(1)}
                                                    $then={() => (
                                                        <>
                                                            {item.quantity}
                                                            {$raw(" &times;")}
                                                        </>
                                                    )}
                                                />
                                                <$Or values={[$pointer("../customer"), $unlessExpression($pointer("../settings.hide_price_from_guests")), $ifExpression($pointer("type"), $string("=="), $string("GiftCertificate"))]} $then={() => (<><span
                                                    dangerouslyInlineAttributes={{
                                                        attributes: `${$If({test: item.price_discounted, $then: () => $raw(' class="price--discounted line-through"')})}`,
                                                    }}
                                                >
                                                    {item.price.formatted}
                                                </span>
                                                <$If test={item.price_discounted} $then={() => <>{item.price_discounted.formatted}</>} /></>)} $else={() => (<><LoginForPricing /></>)} />
                                            </span>
                                        </div>
                                    </li>
                                )}
                            />
                        </ul>
                        {$unescaped($pointer("cart.preview_payment_widget"))}
                        <div className="previewCartAction mx-auto w-full max-w-(--sv-layout-widthMax) flow-root border-t border-container-border xxsmall:px-quarter xxsmall:py-half xsmall:px-half xsmall:py-single [display:block] [&_.button]:m-0 [&_.button]:w-full [&_.button]:px-half [&_.previewCartAction-viewCart:not(.previewCartAction-viewCart--sole)]:float-left [&_.previewCartAction-viewCart:not(.previewCartAction-viewCart--sole)]:w-6/12 [&_.previewCartAction-viewCart]:pr-gutter-half [&_.previewCartAction-viewCart]:pl-quarter [&_.previewCartAction-viewCart--sole]:float-none [&_.previewCartAction-viewCart--sole]:mx-auto [&_.previewCartAction-viewCart--sole]:w-6/12">
                            <$If
                                test={$pointer("cart.show_primary_checkout_button")}
                                $then={() => (
                                    <div className="previewCartAction-checkout float-left w-6/12 pr-quarter pl-gutter-half">
                                        <Button
                                            href={$pointer("urls.checkout.single_address")}
                                            tag="a" variant="primary" size="small"
                                            data-primary-checkout-now-action={""}
                                        >
                                            <$Lang keyName={$string("cart.preview.checkout_now")} />
                                        </Button>
                                    </div>
                                )}
                            />

                            <div className={`previewCartAction-viewCart${$Unless({test: $pointer("cart.show_primary_checkout_button"), $then: () => " previewCartAction-viewCart--sole"})}`}>
                                <Button href={$pointer("urls.cart")} tag="a" size="small" className="button--action">
                                    <$Lang keyName={$string("cart.preview.view_cart")} />
                                </Button>
                            </div>

                            <$If
                                test={$pointer("cart.show_multiple_address_shipping")}
                                $then={() => (
                                    <div className="previewCartAction-checkoutMultiple clear-both pt-quarter pl-half">
                                        <a href={$pointer("urls.checkout.multiple_address")}>
                                            <$Lang keyName={$string("cart.preview.checkout_multiple")} />
                                        </a>
                                    </div>
                                )}
                            />
                        </div>
                        <$If
                            test={$pointer("cart.additional_checkout_buttons")}
                            $then={() => (
                                <div className="previewCart-additionalCheckoutButtons [&_.FloatRight]:flow-root [&_.FloatRight_p]:float-none [&_.FloatRight_p]:my-third [&_.FloatRight_p]:text-right [&_.FloatRight_div]:float-right">
                                    <$Each
                                        list={$pointer<string[]>("cart.additional_checkout_buttons")}
                                        $then={(button) => $unescaped(button)}
                                    />
                                </div>
                            )}
                        />
                    </>
                )}
                $else={() => (
                    <div role="alert" aria-live="polite" aria-atomic="false" className="previewCart-emptyBody p-double text-center">
                        <$Lang keyName={$string("cart.checkout.empty_cart")} />
                    </div>
                )}
            />
        </div>
    </div>
);
