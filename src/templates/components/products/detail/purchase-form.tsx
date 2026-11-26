"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import ProductsAddToCart from "./add-to-cart.tsx";
import ProductsOptionsColourSize from "../options/colour-size.tsx";
import {clearFlags, setFlag, WhenColourSwatch, WhenSize} from "../../../../server/variantSelector.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import WishlistDropdown from "../../common/commerce/wishlist-dropdown.tsx";
import Share from "../../common/share.tsx";
import {$All, $boolean, $dynamicComponent, $Each, $If, $Inject, $pointer, $string, $unescaped, $$scratch} from "@mainlanddev/hbx-bigcommerce";
import type {Product, Settings} from "../../../../server/productViewTypes.ts";
import ProductsDetailStockMessage from "./stock-message.tsx";

const hasColour = $$scratch<number>("hasColour").get();
const hasSize = $$scratch<number>("hasSize").get();

/** Body of the flag pass: sets a flag for a Colour or a Size option. */
const markOptionFlags = () => (
    <>
        {WhenColourSwatch({$then: () => setFlag("hasColour")})}
        {WhenSize({$then: () => setFlag("hasSize")})}
    </>
);

export default (_props: PartialProps) => {
    const theme = $pointer<ThemeSettingsObject>("theme_settings");
    const product = $pointer<Product>("product");
    const settings = $pointer<Settings>("settings");
    return (
        <>
            <section className="productView-details product-options float-left w-full px-base pb-single-third medium:clear-right medium:float-right medium:w-6/12 [[class~=productView--quickView]_&]:relative">
                <div className="productView-options mb-single flow-root text-center small:text-left small:[&_.form-input[type=number]]:w-2/12 [&_.form]:[display:inline] [&_.add-to-cart-wrapper:not([style*=none])]:[display:inline] [&_input[type=file]]:text-smallest [&_.form-field]:text-[0px] [&_.form-field:not([data-variant-colours]_.form-field)]:mb-[2rem] [&_.form-field--error>.form-inlineMessage]:text-[1rem] [&_.form-field>.form-checkbox+.form-label]:ml-single [&_.form-field>.form-checkbox+.form-label]:w-auto [&_.form-field>.form-checkbox+.form-label]:[display:inline-block] small:[&_.form-field>.form-checkbox+.form-label]:ml-0 small:[&_.form-field>.form-checkbox+.form-label]:w-full [&_.form-field>.form-radio+.form-label]:[display:inline-block] [&_.form-field>.form-radio+.form-label]:text-justify [&_.form-field>.form-label:nth-of-type(2)]:ml-0 [&_.add-to-cart-buttons]:[display:inline-grid] [&_.add-to-cart-buttons]:float-left [&_.add-to-cart-buttons]:mb-[1rem] [&_.add-to-cart-buttons]:w-full small:[&_.add-to-cart-buttons]:px-0 small:[&_.add-to-cart-buttons]:py-0 small:[&_.add-to-cart-buttons]:w-full medium:[&_.add-to-cart-buttons]:pr-0 large:[&_.add-to-cart-buttons]:[display:grid] large:[&_.add-to-cart-buttons]:mt-[1rem] [&_.add-to-cart-buttons_.button]:rounded-full [&_.add-to-cart-buttons_.button]:py-[0.9rem] [&_.add-to-cart-buttons_.button]:text-[1rem] [&_.add-to-cart-buttons_.button]:font-bold [&_.add-to-cart-buttons_.button]:uppercase [&_.form-wishlist]:float-none [&_.form-wishlist]:mt-0 [&_.form-wishlist]:w-full [&_.form-wishlist]:px-0 [&_.form-wishlist_.button]:rounded-full [&_.form-wishlist_.button]:border-ink-border [&_.form-wishlist_.button]:bg-white [&_.form-wishlist_.button]:py-[0.8rem] [&_.form-wishlist_.button]:text-center [&_.form-wishlist_.button]:font-bold [&_.form-wishlist_.button]:text-ink [&_.form-wishlist_.button]:uppercase small:[&_.add-to-cart-buttons.pre-order-buttons]:w-auto small:[&_.add-to-cart-buttons.pre-order-buttons]:min-w-[50%] medium:[&_.add-to-cart-buttons.pre-order-buttons]:mr-[11px] medium:[&_.add-to-cart-buttons.pre-order-buttons]:min-w-[auto] medium:[&_.add-to-cart-buttons.pre-order-buttons]:p-0 [&_.add-to-cart-buttons.pre-order-buttons_.button]:px-[24px] [&_.add-to-cart-buttons.pre-order-buttons_.button]:py-[13px] [&_.add-to-cart-buttons_.button]:mx-0 [&_.add-to-cart-buttons_.button]:mb-0 [&_.add-to-cart-buttons_.button]:w-full">
                    <$If test={product.release_date} $then={() => <p>{product.release_date}</p>} />
                    <form className="form [:where(&)]:[margin:var(--sv-form-margin)]" method="post" action={product.cart_url} encType="multipart/form-data" data-cart-item-add={""}>
                        <input type="hidden" name="action" value="add" />
                        <input type="hidden" name="product_id" value={product.id} />
                        <$If
                            test={product.cart_order_source}
                            $then={() => <input type="hidden" name="cart_order_source" value={product.cart_order_source} />}
                        />
                        {/* Hidden by its own `.js` variant until product-details.js shows it, so without JS the options stay usable. */}
                        <div className="[:where(.js_&:not([style*=display]))]:[display:none]" data-product-option-change={""}>
                            <$Inject keyName={$string("showSwatchNames")} value={theme.show_product_swatch_names} />
                            {/* Pass 1 flags a Colour and a Size option; the branch frees both flags (50-key scratchpad cap). */}
                            <$Each list={$pointer<unknown[]>("product.options")} $then={markOptionFlags} />
                            <$All
                                values={[hasColour, hasSize]}
                                $then={() => (
                                    <>
                                        {clearFlags()}
                                        <ProductsOptionsColourSize />
                                    </>
                                )}
                                $else={() => (
                                    <>
                                        {clearFlags()}
                                        <$Each
                                            list={$pointer<unknown[]>("product.options")}
                                            $then={() => $unescaped($dynamicComponent($string("components/products/options")))}
                                        />
                                    </>
                                )}
                            />
                        </div>
                        <ProductsDetailStockMessage />
                        <ProductsAddToCart with_wallet_buttons={$boolean(true)} />
                    </form>
                    <$If test={settings.show_wishlist} $then={() => <WishlistDropdown />} />
                </div>
                <Share url={product.url} />
            </section>
        </>
    );
};
