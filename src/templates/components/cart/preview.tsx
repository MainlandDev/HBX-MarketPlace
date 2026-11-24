"use server";
import ProductsCard from "../products/card.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import LoginForPricing from "../common/login-for-pricing.tsx";
import ResponsiveImg from "../common/responsive-img.tsx";
import ProductOptions from "../common/product-options.tsx";
import {$boolean, $Each, $If, $Lang, $pointer, $string, $unescaped, $With, $unlessExpression, $Or, $raw} from "@mainlanddev/hbx-bigcommerce";
import {Button} from "../../../server/formParts.tsx";
import {ModalBody, ModalHeader, ModalTitle} from "../../../server/componentParts.tsx";

interface AddedItem {
    name: string;
    quantity: number;
    brand: {name: string};
    price: {formatted: string};
    options: Array<{name: string}>;
}

export default (_props: PartialProps) => (
    <>
        <ModalHeader className="pl-(--sv-reveal-modal-paddingHorizontal) pr-[calc(32px+var(--sv-reveal-close-side))]">
            <ModalTitle id="modal-header-title" className="text-center text-large medium:text-larger" tag="h1">
                <$Lang keyName={$string("cart.added_to_cart.what_next")} num_products={$pointer<number>("cart.quantity")} />
            </ModalTitle>
        </ModalHeader>

        <ModalBody className="overflow-auto p-(--sv-reveal-modal-padding) [-webkit-overflow-scrolling:touch]">
            <div className="previewCart mx-auto w-full max-w-(--sv-layout-widthMax) flow-root">
                <section className="previewCartCheckout bg-fill-dark p-base text-center medium:float-right medium:w-3/12 medium:p-single [&_.button]:m-0 [&_.button]:w-full [&_.button]:[display:block] [&_.button+p]:mt-half [&_.button:not(:last-child)]:mb-half">
                    <$If
                        test={$pointer("cart.show_primary_checkout_button")}
                        $then={() => (
                            <Button href={$pointer("urls.checkout.single_address")} tag="a" variant="primary" data-primary-checkout-now-action={""}>
                                <$Lang keyName={$string("cart.added_to_cart.proceed_to_checkout")} />
                            </Button>
                        )}
                    />

                    <div className="previewCartCheckout-additionalCheckoutButtons [&_p]:float-none [&_p]:my-third [&_.CheckoutButton]:mb-base [&_.CheckoutButton:first-child]:mt-single [&_.CheckoutButton:last-child]:mb-single">
                        <$Each list={$pointer<string[]>("cart.additional_checkout_buttons")} $then={(button) => $unescaped(button)} />
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

                    <div className="previewCartCheckout-subtotal my-single [display:block]">
                        <$Lang keyName={$string("cart.added_to_cart.order_subtotal")} />{" "}
                        <strong className="previewCartCheckout-price text-center text-largest font-bold [display:block]">
                            <$Or values={[$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))]} $then={() => (<>{$pointer("cart.sub_total.formatted")}</>)} $else={() => (<><LoginForPricing /></>)} />
                        </strong>
                    </div>

                    <p data-cart-quantity={$pointer("cart.quantity")}>
                        <$Lang keyName={$string("cart.added_to_cart.your_cart_contains")} num_products={$pointer<number>("cart.quantity")} />
                    </p>

                    <Button href="#" tag="a" variant="primary" role="button" data-reveal-close={""}>
                        <$Lang keyName={$string("cart.added_to_cart.continue_shopping")} />
                    </Button>

                    <Button href={$pointer("urls.cart")} tag="a">
                        <$Lang keyName={$string("cart.added_to_cart.view_or_edit_cart")} />
                    </Button>
                </section>

                <section className="productView flex w-auto max-w-none flex-col justify-start -mx-base py-0 medium:float-left medium:m-0 medium:w-9/12 medium:px-gutter-half">
                    <$With
                        context={$pointer<AddedItem>("cart.added_item")}
                        $then={() => (
                            <>
                                <figure className="productView-image relative m-auto flex items-center justify-center min-[320px]:max-[801px]:pointer-events-none medium:float-left medium:min-h-[366px] medium:w-7/12 medium:flex-col medium:px-gutter-half medium:[min-width:inherit] medium:[&_.productView-image--cart]:mx-auto medium:[&_.productView-image--cart]:my-0 medium:[&_.productView-image--cart]:w-full medium:[&_.productView-image--cart]:self-start">
                                    <div className="productView-img-container relative m-auto w-full max-w-[500px] after:block after:h-0 after:w-full after:pb-[131.8%] after:content-[''] [&_img]:absolute [&_img]:inset-0 [&_img]:m-auto [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_img]:[font-family:'object-fit:_contain;']">
                                        <ResponsiveImg image={$pointer("image")} class={$string("productView-image--cart")} fallback_size={$pointer("../theme_settings.product_size")} lazyload={$pointer("../theme_settings.lazyload_mode")} default_image={$pointer("../theme_settings.default_image_product")} />
                                    </div>
                                </figure>

                                <div className="productView-details float-left w-full px-base pb-single-third medium:clear-right medium:w-5/12 medium:px-gutter-half">
                                    <h2 className="productView-title mt-0 mr-0 mb-quarter ml-0 text-small large:text-largest">{$pointer("name")}</h2>

                                    <div className="productView-brand m-0 mb-half text-smaller text-(--sv-productView-brand-link-color) large:-mt-eighth large:mb-base large:text-small [&_a]:text-(--sv-productView-brand-link-color) [&_a]:hover:text-(--sv-productView-brand-link-color--hover)">{$pointer("brand.name")}</div>

                                    <div className="productView-price mb-third text-smaller medium:mb-base medium:text-larger [&_.price-section--saving]:text-smaller [&_abbr]:border-0 [&_abbr]:text-inherit [&_abbr]:[font-size:inherit]">
                                        <$Or values={[$pointer("../customer"), $unlessExpression($pointer("../settings.hide_price_from_guests"))]} $then={() => (<>{$pointer("quantity")} {$raw("&times;")} {$pointer("price.formatted")}</>)} $else={() => (<><LoginForPricing /></>)} />
                                    </div>

                                    <$Each
                                        list={$pointer<Array<{name: string}>>("options")}
                                        $then={() => (
                                            <dl className="productView-info mt-half flow-root small:mt-0 small:[&>:first-child]:mt-single [&>:last-child]:mb-0">
                                                <dt className="productView-info-name clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal">{$pointer("name")}</dt>
                                                <dd className="productView-info-value float-left mb-quarter small:float-none small:mb-base"><ProductOptions /></dd>
                                            </dl>
                                        )}
                                    />
                                </div>
                            </>
                        )}
                    />
                </section>
            </div>

            <$If
                test={$pointer("cart.suggested_products")}
                $then={() => (
                    <section className="suggestiveCart text-center [display:none] medium:[display:block]">
                        <h2>
                            <$Lang keyName={$string("cart.added_to_cart.you_might_also_like")} />
                            {$raw("&hellip;")}
                        </h2>

                        <ul className="productGrid -mx-gutter-half mb-single w-auto max-w-none flow-root text-[0px] [list-style-type:none]">
                            <$Each
                                list={$pointer<unknown[]>("cart.suggested_products")}
                                $then={() => (
                                    <li className="product inline-block w-6/12 overflow-hidden px-gutter-half align-top text-(length:--sv-fontSize-base) small:w-4/12 medium:w-3/12 small:[[class~=page-sidebar]+[class~=page-content]_&]:w-4/12">
                                        <ProductsCard settings={$pointer("../settings")} hide_product_quick_view={$boolean(true)} theme_settings={$pointer("../theme_settings")} />
                                    </li>
                                )}
                            />
                        </ul>
                    </section>
                )}
            />
        </ModalBody>
    </>
);
