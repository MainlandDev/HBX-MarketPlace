"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import CarouselContentAnnouncement from "../carousel-content-announcement.tsx";
import ProductsPrice from "./price.tsx";
import ProductsPromotionCallout from "./promotion-callout.tsx";
import ProductsRatings from "./ratings.tsx";
import ProductsModalsWriteReview from "./modals/writeReview.tsx";
import ProductsBulkDiscountRates from "./bulk-discount-rates.tsx";
import ProductsCustomFields from "./custom-fields.tsx";
import ProductsAddToCart from "./add-to-cart.tsx";
import ProductsOptionsColourSize from "./options/colour-size.tsx";
import {clearFlags, setFlag, WhenColourSwatch, WhenSize} from "../../../server/variantSelector.tsx";
import ProductsDescriptionTabs from "./description-tabs.tsx";
import ProductsDescription from "./description.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import AlertAlertError from "../common/alert/alert-error.tsx";
import AlertAlertSuccess from "../common/alert/alert-success.tsx";
import ResponsiveImg from "../common/responsive-img.tsx";
import LoginForPricing from "../common/login-for-pricing.tsx";
import WishlistDropdown from "../common/wishlist-dropdown.tsx";
import Share from "../common/share.tsx";
import ModalModalCloseBtn from "../common/modal/modal-close-btn.tsx";
import {
    $All,
    $boolean,
    $cdn,
    $dynamicComponent,
    $Each,
    $getImageSrcset,
    $Gt,
    $If,
    $Inject,
    $Lang,
    $lang,
    $number,
    $pointer,
    $raw,
    $region,
    $string,
    $unescaped,
    $Unless,
    $unlessExpression,
    $$scratch,
    $Or,
} from "@mainlanddev/hbx-bigcommerce";
import {FormField, FormLabel} from "../../../server/formParts.tsx";

/** The size a `getImageSrcset` descriptor accepts; the theme-settings type is a plain string (LIBRARY GAP, see PORT-NOTES.md). */
type SrcsetSize = `${bigint}x${bigint}` | `${bigint}w`;

interface Image {
    data: string;
}

interface Message {
    error: string;
    success: string;
}

interface Product {
    id: number;
    title: string;
    url: string;
    cart_url: string;
    cart_order_source: string;
    category: string[];
    brand: {name: string; url: string};
    price: unknown;
    call_for_price: string;
    main_image: Image;
    images: Image[];
    detail_messages: string;
    rating: number;
    num_reviews: number;
    sku: string;
    upc: string;
    condition: string;
    availability: string;
    weight: string;
    width: string;
    height: string;
    depth: string;
    min_purchase_quantity: number;
    max_purchase_quantity: number;
    gift_wrapping_available: boolean;
    shipping: {calculated: boolean; price: {formatted: string}};
    bulk_discount_rates: unknown;
    release_date: string;
    stock_level: number;
    show_backorder_availability_prompt: boolean;
    available_to_sell: boolean;
    available_for_backorder: boolean;
    backorder_availability_prompt: string;
    reviews: {messages: Message[]};
    featured_promotions: unknown;
}

const hasColour = $$scratch<number>("hasColour").get();
const hasSize = $$scratch<number>("hasSize").get();

/** Body of the flag pass: sets a flag for a Colour or a Size option. */
const markOptionFlags = () => (
    <>
        {WhenColourSwatch({$then: () => setFlag("hasColour")})}
        {WhenSize({$then: () => setFlag("hasSize")})}
    </>
);

interface Settings {
    show_product_rating: boolean;
    show_product_reviews: boolean;
    show_wishlist: boolean;
    bulk_discount_enabled: boolean;
}

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default (_props: PartialProps) => {
    const theme = $pointer<ThemeSettingsObject>("theme_settings");
    const product = $pointer<Product>("product");
    const settings = $pointer<Settings>("settings");
    const isAjax = $pointer<boolean>("is_ajax");
    const zoomSizes = {"1x": $pointer<SrcsetSize>("theme_settings.zoom_size")};
    return (
        <>
            <$Inject keyName={$string("outOfStockDefaultMessage")} value={$lang($string("products.out_of_stock_default_message"))} />{" "}
            <$Inject keyName={$string("availableOnHand")} value={$pointer("product.available_on_hand")} />{" "}
            <$Inject keyName={$string("availableForBackorder")} value={$pointer("product.available_for_backorder")} />{" "}
            <$Inject keyName={$string("availableToSell")} value={$pointer("product.available_to_sell")} />{" "}
            <$Inject keyName={$string("unlimitedBackorder")} value={$pointer("product.unlimited_backorder")} />{" "}
            <$Inject keyName={$string("showQuantityOnBackorder")} value={$pointer("product.show_quantity_on_backorder")} />{" "}
            <$Inject keyName={$string("showBackorderAvailabilityPrompt")} value={$pointer("product.show_backorder_availability_prompt")} />{" "}
            <$Inject keyName={$string("backorderAvailabilityPrompt")} value={$pointer("product.backorder_availability_prompt")} />{" "}
            <$Inject keyName={$string("quantityBackorderedMessage")} value={$lang($string("products.quantity_backordered"), {quantity: $string("__QTY__")})} />{" "}
            <$Inject keyName={$string("quantityMaxMessage")} value={$lang($string("products.quantity_max"), {quantity: $string("__QTY__")})} />{" "}
            <$Inject
                keyName={$string("quantityMaxPicklistMessage")}
                value={$lang($string("products.quantity_max_picklist"), {name: $string("__NAME__"), quantity: $string("__QTY__")})}
            />{" "}
            <$Inject keyName={$string("backorderMessages")} value={$pointer("backorder_messages")} />{" "}
            <$Inject keyName={$string("showBackorderMessage")} value={$pointer("product.show_backorder_message")} />

            <div
                className="productView flex w-auto max-w-none flex-col justify-start -mx-base pt-base medium:flow-root [[class~=modal]_&]:py-0"
                data-event-type="product"
                data-entity-id={product.id}
                data-name={product.title}
                dangerouslyInlineAttributes={{
                    attributes: `data-product-category="${$Each({list: $pointer<string[]>("product.category"), $then: (item, loop) => ` ${$If({test: loop["@last"], $then: () => `${item}`, $else: () => `${item}, `})} `})}" data-product-brand="${product.brand.name}" data-product-price="${$Or({values: [$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))], $then: () => ` ${$If({test: $pointer("product.price.with_tax"), $then: () => ` ${$pointer("product.price.with_tax.value")} `, $else: () => ` ${$pointer("product.price.without_tax.value")} `})} `, $else: () => ` ${$lang($string("common.login_for_pricing"))} `})}" data-product-variant="single-product-option"`,
                }}
            >
                <$Each
                    list={$pointer<Message[]>("product.reviews.messages")}
                    $then={(message) => (
                        <>
                            <$If test={message.error} $then={() => <AlertAlertError $positionalHash={message.error} />} />
                            <$If test={message.success} $then={() => <AlertAlertSuccess $positionalHash={message.success} />} />
                        </>
                    )}
                />

                <section className="productView-images float-left mb-double w-full px-base medium:w-6/12" data-image-gallery={""}>
                    {/*
            Note that these image sizes are coupled to image sizes used in /assets/js/theme/common/product-details.js
            for variant/rule image replacement
        */}
                    <$If test={$pointer("product.images.length")} operator={$string(">")} rvalue={$number(1)} $then={() => <CarouselContentAnnouncement />} />
                    <figure
                        className="productView-image relative m-auto flex items-center justify-center min-[320px]:max-[801px]:pointer-events-none medium:min-h-[366px] medium:[min-width:inherit] [&_.easyzoom-flyout]:absolute [&_.easyzoom-flyout]:top-0 [&_.easyzoom-flyout]:left-0 [&_.easyzoom-flyout]:size-full [&_.easyzoom-flyout]:overflow-hidden [&_.easyzoom-flyout_img]:max-w-none [&_.easyzoom-flyout_img]:w-auto"
                        data-image-gallery-main={""}
                        dangerouslyInlineAttributes={{
                            attributes: `${$If({test: product.main_image, $then: () => `${$raw('data-zoom-image="')}${$getImageSrcset(product.main_image, zoomSizes, $cdn(theme.default_image_product))}${$raw('"')}`})}`,
                        }}
                    >
                        <div className="productView-img-container relative m-auto w-full max-w-[500px] after:block after:h-0 after:w-full after:pb-[131.8%] after:content-[''] [&_img]:absolute [&_img]:inset-0 [&_img]:m-auto [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_img]:[font-family:'object-fit:_contain;']">
                            {/* Remove the surrounding a-element if there is no main image. */}
                            <$If
                                test={product.main_image}
                                $then={() => (
                                    <>
                                        {$raw('<a href="')}
                                        {$getImageSrcset(product.main_image, zoomSizes, $cdn(theme.default_image_product))}
                                        {$raw('" target="_blank">')}
                                    </>
                                )}
                            />
                            <ResponsiveImg image={product.main_image} class={$string("productView-image--default")} fallback_size={theme.product_size} lazyload={theme.lazyload_mode} default_image={theme.default_image_product} otherAttributes={$string("data-main-image")} />
                            {/* Remove the surrounding a-element if there is no main image. */}
                            <$If test={product.main_image} $then={() => $raw("</a>")} />
                        </div>
                    </figure>
                    <ul
                        className="productView-thumbnails -mx-quarter my-0 w-auto max-w-none flow-root [list-style-type:none] [.productView-image+&]:mt-half [&[data-slick]]:opacity-0 [&[data-slick].slick-initialized]:opacity-100 [&_.slick-list]:mx-[40px] [&_.slick-next]:right-0 [&_.slick-prev]:left-0 [&_img]:relative [&_img]:inset-0 [&_img]:m-0 [&_img]:w-[50px] [&_img]:object-contain [&_img]:[font-family:'object-fit:_contain;']"
                        dangerouslyInlineAttributes={{
                            attributes: `${$Gt({
                                a: $pointer<number>("product.images.length"),
                                b: $number(5),
                                $then: () => $raw(` data-slick='{ "infinite": false, "mobileFirst": true, "dots": false, "accessibility": false, "slidesToShow": 5, "slidesToScroll": 5 }'`),
                            })}`,
                        }}
                    >
                        <$Each
                            list={$pointer<Image[]>("product.images")}
                            $then={(image) => {
                                const defaultImage = $cdn($pointer<string>("../theme_settings.default_image_product"));
                                const zoom = {"1x": $pointer<SrcsetSize>("../theme_settings.zoom_size")};
                                const size = {"1x": $pointer<SrcsetSize>("../theme_settings.product_size")};
                                return (
                                    <li className="productView-thumbnail float-left p-quarter text-center [&:not([style*=width])]:w-3/12 large:[&:not([style*=width])]:w-[20%]">
                                        <a
                                            className="productView-thumbnail-link relative box-content flex h-[67px] w-full max-w-[75px] justify-center border border-container-border p-[2px] hover:border-grey-darker is-active:border-grey-darker"
                                            href={`${$getImageSrcset(image, zoom, defaultImage)}`}
                                            data-image-gallery-item={""}
                                            data-image-gallery-new-image-url={`${$getImageSrcset(image, size, defaultImage)}`}
                                            data-image-gallery-new-image-srcset={`${$getImageSrcset(image, {use_default_sizes: $boolean(true)})}`}
                                            data-image-gallery-zoom-image-url={`${$getImageSrcset(image, zoom, defaultImage)}`}
                                        >
                                            <ResponsiveImg image={image} fallback_size={$pointer("../theme_settings.productview_thumb_size")} lazyload={$pointer("../theme_settings.lazyload_mode")} />
                                        </a>
                                    </li>
                                );
                            }}
                        />
                    </ul>
                </section>

                <section className="productView-details product-data float-left w-full px-base pb-single-third order-[-1] medium:clear-right medium:float-right medium:w-6/12 [[class~=productView--quickView]_&]:relative">
                    <div className="productView-product medium:border-b medium:border-container-border medium:pb-[calc(var(--sv-spacing-single)+var(--sv-spacing-third))] [&>:last-child]:mb-0">
                        <h1 className="productView-title -mt-half mr-0 mb-quarter ml-0 text-small medium:mt-single large:text-largest">{product.title}</h1>
                        <$If
                            test={product.brand}
                            $then={() => (
                                <h2 className="productView-brand m-0 mb-half text-smaller text-(--sv-productView-brand-link-color) large:-mt-eighth large:mb-base large:text-small [&_a]:text-(--sv-productView-brand-link-color) [&_a]:hover:text-(--sv-productView-brand-link-color--hover)">
                                    <a href={product.brand.url}>
                                        <span>{product.brand.name}</span>
                                    </a>
                                </h2>
                            )}
                        />
                        <$If
                            test={product.call_for_price}
                            $then={() => (
                                <p className="productView-price mb-third text-smaller medium:mb-base medium:text-larger [&_.price-section--saving]:text-smaller [&_abbr]:border-0 [&_abbr]:text-inherit [&_abbr]:[font-size:inherit]">
                                    <span>{product.call_for_price}</span>
                                </p>
                            )}
                        />
                        <div className="productView-price mb-third text-smaller medium:mb-base medium:text-larger [&_.price-section--saving]:text-smaller [&_abbr]:border-0 [&_abbr]:text-inherit [&_abbr]:[font-size:inherit]">
                            <$Or values={[$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))]} $then={() => (<><ProductsPrice price={$pointer("product.price")} /></>)} $else={() => (<><LoginForPricing /></>)} />
                        </div>
                        {region("product_below_price")}
                        <$If
                            test={theme.show_featured_promotions}
                            $then={() =>
                                <ProductsPromotionCallout promotions={$pointer("product.featured_promotions")} mode={$string("full")} />
                            }
                        />
                        <div className="productView-rating">
                            <$If
                                test={settings.show_product_rating}
                                $then={() => (
                                    <>
                                        <ProductsRatings rating={$pointer("product.rating")} />{" "}
                                        <$If
                                            test={$pointer("product.num_reviews")}
                                            operator={$string(">")}
                                            rvalue={$number(0)}
                                            $then={() => (
                                                <a href={`${product.url}${$If({test: isAjax, $then: () => "#product-reviews"})}`} id="productReview_link">
                                                    <$Lang keyName={$string("products.reviews.link_to_review")} total={product.num_reviews} />
                                                </a>
                                            )}
                                            $else={() => (
                                                <span>
                                                    <$Lang keyName={$string("products.reviews.link_to_review")} total={product.num_reviews} />
                                                </span>
                                            )}
                                        />
                                    </>
                                )}
                            />{" "}
                            <$If
                                test={settings.show_product_reviews}
                                $then={() => (
                                    <>
                                        <a
                                            href={`${product.url}${$If({test: isAjax, $then: () => "#write_review"})}`}
                                            className="productView-reviewLink productView-reviewLink--new ml-quarter inline-block p-0 align-middle text-text-secondary hover:text-(--sv-color-textSecondary-hover)"
                                            dangerouslyInlineAttributes={{
                                                attributes: `${$Unless({test: isAjax, $then: () => $raw('data-reveal-id="modal-review-form"')})}`,
                                            }}
                                            role="button"
                                        >
                                            <$Lang keyName={$string("products.reviews.new")} />
                                        </a>
                                        <$Unless test={isAjax} $then={() => <ProductsModalsWriteReview />} />
                                    </>
                                )}
                            />
                        </div>
                        {product.detail_messages}
                        <dl className="productView-info mt-half flow-root small:mt-0 small:[&>:first-child]:mt-single [&>:last-child]:mb-0">
                            <dt
                                className="productView-info-name sku-label clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal"
                                dangerouslyInlineAttributes={{attributes: `${$Unless({test: product.sku, $then: () => $raw(' style="display: none;"')})}`}}
                            >
                                <$Lang keyName={$string("products.sku")} />
                            </dt>
                            <dd className="productView-info-value float-left mb-quarter small:float-none small:mb-base" data-product-sku={""}>
                                {product.sku}
                            </dd>
                            <dt
                                className="productView-info-name upc-label clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal"
                                dangerouslyInlineAttributes={{attributes: `${$Unless({test: product.upc, $then: () => $raw(' style="display: none;"')})}`}}
                            >
                                <$Lang keyName={$string("products.upc")} />
                            </dt>
                            <dd className="productView-info-value float-left mb-quarter small:float-none small:mb-base" data-product-upc={""}>
                                {product.upc}
                            </dd>
                            <$If
                                test={product.condition}
                                $then={() => (
                                    <>
                                        <dt className="productView-info-name clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal">
                                            <$Lang keyName={$string("products.condition")} />
                                        </dt>
                                        <dd className="productView-info-value float-left mb-quarter small:float-none small:mb-base">{product.condition}</dd>
                                    </>
                                )}
                            />
                            <$If
                                test={product.availability}
                                $then={() => (
                                    <>
                                        <dt className="productView-info-name clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal">
                                            <$Lang keyName={$string("products.availability")} />
                                        </dt>
                                        <dd className="productView-info-value float-left mb-quarter small:float-none small:mb-base">{product.availability}</dd>
                                    </>
                                )}
                            />
                            <$All
                                values={[product.weight, theme.show_product_weight]}
                                $then={() => (
                                    <>
                                        <dt className="productView-info-name clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal">
                                            <$Lang keyName={$string("products.weight")} />
                                        </dt>
                                        <dd className="productView-info-value float-left mb-quarter small:float-none small:mb-base" data-product-weight={""}>
                                            {product.weight}
                                        </dd>
                                    </>
                                )}
                            />
                            <$All
                                values={[product.width, product.height, product.depth, theme.show_product_dimensions]}
                                $then={() => (
                                    <>
                                        <dt className="productView-info-name clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal">
                                            <$Lang keyName={$string("products.width")} />
                                        </dt>
                                        <dd className="productView-info-value float-left mb-quarter small:float-none small:mb-base" data-product-width={""}>
                                            {product.width}{" "}
                                            <$If
                                                test={$pointer("settings.measurements.length")}
                                                operator={$string("==")}
                                                rvalue={$string("Centimeters")}
                                                $then={() => <>(<$Lang keyName={$string("products.measurement.metric")} />)</>}
                                                $else={() => <>(<$Lang keyName={$string("products.measurement.imperial")} />)</>}
                                            />
                                        </dd>
                                        <dt className="productView-info-name clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal">
                                            <$Lang keyName={$string("products.height")} />
                                        </dt>
                                        <dd className="productView-info-value float-left mb-quarter small:float-none small:mb-base" data-product-height={""}>
                                            {product.height}{" "}
                                            <$If
                                                test={$pointer("settings.measurements.length")}
                                                operator={$string("==")}
                                                rvalue={$string("Centimeters")}
                                                $then={() => <>(<$Lang keyName={$string("products.measurement.metric")} />)</>}
                                                $else={() => <>(<$Lang keyName={$string("products.measurement.imperial")} />)</>}
                                            />
                                        </dd>
                                        <dt className="productView-info-name clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal">
                                            <$Lang keyName={$string("products.depth")} />
                                        </dt>
                                        <dd className="productView-info-value float-left mb-quarter small:float-none small:mb-base" data-product-depth={""}>
                                            {product.depth}{" "}
                                            <$If
                                                test={$pointer("settings.measurements.length")}
                                                operator={$string("==")}
                                                rvalue={$string("Centimeters")}
                                                $then={() => <>(<$Lang keyName={$string("products.measurement.metric")} />)</>}
                                                $else={() => <>(<$Lang keyName={$string("products.measurement.imperial")} />)</>}
                                            />
                                        </dd>
                                    </>
                                )}
                            />
                            <$If
                                test={product.min_purchase_quantity}
                                $then={() => (
                                    <>
                                        <dt className="productView-info-name clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal">
                                            <$Lang keyName={$string("products.min_purchase_quantity")} />
                                        </dt>
                                        <dd className="productView-info-value float-left mb-quarter small:float-none small:mb-base">
                                            <$Lang keyName={$string("products.purchase_units")} quantity={product.min_purchase_quantity} />
                                        </dd>
                                    </>
                                )}
                            />
                            <$If
                                test={product.max_purchase_quantity}
                                $then={() => (
                                    <>
                                        <dt className="productView-info-name clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal">
                                            <$Lang keyName={$string("products.max_purchase_quantity")} />
                                        </dt>
                                        <dd className="productView-info-value float-left mb-quarter small:float-none small:mb-base">
                                            <$Lang keyName={$string("products.purchase_units")} quantity={product.max_purchase_quantity} />
                                        </dd>
                                    </>
                                )}
                            />
                            <$If
                                test={product.gift_wrapping_available}
                                $then={() => (
                                    <>
                                        <dt className="productView-info-name clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal">
                                            <$Lang keyName={$string("products.gift_wrapping")} />
                                        </dt>
                                        <dd className="productView-info-value float-left mb-quarter small:float-none small:mb-base">
                                            <$Lang keyName={$string("products.gift_wrapping_available")} />
                                        </dd>
                                    </>
                                )}
                            />
                            <$If
                                test={product.shipping}
                                $then={() => (
                                    <$If
                                        test={product.shipping.calculated}
                                        $then={() => (
                                            <>
                                                <dt className="productView-info-name clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal">
                                                    <$Lang keyName={$string("products.shipping")} />
                                                </dt>
                                                <dd className="productView-info-value float-left mb-quarter small:float-none small:mb-base">
                                                    <$Lang keyName={$string("products.shipping_calculated")} />
                                                </dd>
                                            </>
                                        )}
                                        $else={() => (
                                            <>
                                                <$If
                                                    test={$pointer("product.shipping.price.value")}
                                                    operator={$string("===")}
                                                    rvalue={$number(0)}
                                                    $then={() => (
                                                        <>
                                                            <dt className="productView-info-name clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal">
                                                                <$Lang keyName={$string("products.shipping")} />
                                                            </dt>
                                                            <dd className="productView-info-value float-left mb-quarter small:float-none small:mb-base">
                                                                <$Lang keyName={$string("products.shipping_free")} />
                                                            </dd>
                                                        </>
                                                    )}
                                                    $else={() => (
                                                        <>
                                                            <dt className="productView-info-name clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal">
                                                                <$Lang keyName={$string("products.shipping")} />
                                                            </dt>
                                                            <dd className="productView-info-value float-left mb-quarter small:float-none small:mb-base">
                                                                <$Lang keyName={$string("products.shipping_fixed")} amount={product.shipping.price.formatted} />
                                                            </dd>
                                                        </>
                                                    )}
                                                />
                                            </>
                                        )}
                                    />
                                )}
                            />

                            <$If
                                test={settings.bulk_discount_enabled}
                                $then={() => (
                                    <div className="productView-info-bulkPricing">
                                        <ProductsBulkDiscountRates bulk_discount_rates={$pointer("product.bulk_discount_rates")} />
                                    </div>
                                )}
                            />

                            <$If
                                test={$pointer("theme_settings.show_custom_fields_tabs")}
                                operator={$string("!==")}
                                rvalue={$boolean(true)}
                                $then={() => <ProductsCustomFields />}
                            />
                        </dl>
                    </div>
                </section>

                <section className="productView-details product-options float-left w-full px-base pb-single-third medium:clear-right medium:float-right medium:w-6/12 [[class~=productView--quickView]_&]:relative">
                    <div className="productView-options mb-single flow-root text-center small:text-left small:[&_.form-input[type=number]]:w-2/12 [&_.form]:[display:inline] [&_.add-to-cart-wrapper:not([style*=none])]:[display:inline] [&_input[type=file]]:text-smallest [&_.form-field]:text-[0px] [&_.form-field:not([data-variant-colours]_.form-field)]:mb-[2rem] [&_.form-field--error>.form-inlineMessage]:text-[1rem] [&_.form-field>.form-checkbox+.form-label]:ml-single [&_.form-field>.form-checkbox+.form-label]:w-auto [&_.form-field>.form-checkbox+.form-label]:[display:inline-block] small:[&_.form-field>.form-checkbox+.form-label]:ml-0 small:[&_.form-field>.form-checkbox+.form-label]:w-full [&_.form-field>.form-radio+.form-label]:[display:inline-block] [&_.form-field>.form-radio+.form-label]:text-justify [&_.form-field>.form-label:nth-of-type(2)]:ml-0 [&_.add-to-cart-buttons]:[display:inline-grid] [&_.add-to-cart-buttons]:float-left [&_.add-to-cart-buttons]:mb-[1rem] [&_.add-to-cart-buttons]:w-full small:[&_.add-to-cart-buttons]:px-[10px] small:[&_.add-to-cart-buttons]:py-0 small:[&_.add-to-cart-buttons]:w-1/2 medium:[&_.add-to-cart-buttons]:pr-half large:[&_.add-to-cart-buttons]:[display:inline-block] large:[&_.add-to-cart-buttons]:mt-[1rem] small:[&_.add-to-cart-buttons.pre-order-buttons]:w-auto small:[&_.add-to-cart-buttons.pre-order-buttons]:min-w-[50%] medium:[&_.add-to-cart-buttons.pre-order-buttons]:mr-[11px] medium:[&_.add-to-cart-buttons.pre-order-buttons]:min-w-[auto] medium:[&_.add-to-cart-buttons.pre-order-buttons]:p-0 [&_.add-to-cart-buttons.pre-order-buttons_.button]:px-[24px] [&_.add-to-cart-buttons.pre-order-buttons_.button]:py-[13px] [&_.add-to-cart-buttons_.button]:mx-0 [&_.add-to-cart-buttons_.button]:mb-0 [&_.add-to-cart-buttons_.button]:w-full">
                        <$If test={product.release_date} $then={() => <p>{product.release_date}</p>} />
                        <form className="form [:where(&)]:[margin:var(--sv-form-margin)]" method="post" action={product.cart_url} encType="multipart/form-data" data-cart-item-add={""}>
                            <input type="hidden" name="action" value="add" />
                            <input type="hidden" name="product_id" value={product.id} />
                            <$If
                                test={product.cart_order_source}
                                $then={() => <input type="hidden" name="cart_order_source" value={product.cart_order_source} />}
                            />
                            {/* Hidden by `.js [data-product-option-change]` (productView scss) until product-details.js shows it, so without JS the options stay usable. */}
                            <div data-product-option-change={""}>
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
                            <FormField className={`form-field--stock${$Unless({test: product.stock_level, $then: () => " u-hiddenVisually"})}`}>
                                <FormLabel className="form-label--alternate m-0 cursor-default text-smallest [font-family:'Montserrat',Arial,Helvetica,sans-serif] [&_small]:float-right [&_small]:mt-quarter">
                                    <span className="productView-stock-message font-bold">
                                        <span data-product-stock={""}>{product.stock_level}</span>{" "}
                                        <$Lang keyName={$string("products.in_stock")} />
                                    </span>{" "}
                                    <$All
                                        values={[product.show_backorder_availability_prompt, product.available_to_sell, product.available_for_backorder]}
                                        $then={() => (
                                            <span className="productView-backorder-availability-prompt before:content-['|_']" data-backorder-prompt={""}>
                                                {product.backorder_availability_prompt}
                                            </span>
                                        )}
                                        $else={() => <span className="productView-backorder-availability-prompt before:content-['|_']" data-backorder-prompt={""} style={{display: "none"}}></span>}
                                    />
                                </FormLabel>
                                <FormLabel tag="p" className="form-label--alternate m-0 cursor-default text-smallest [font-family:'Montserrat',Arial,Helvetica,sans-serif] [&_small]:float-right [&_small]:mt-quarter" data-product-backordered={""} style={{display: "none"}}>
                                    <span className="[&:not(:empty)]:font-bold" data-qty-backordered-message={""}></span>
                                    <span className="[[data-qty-backordered-message]:not(:empty)+&:not(:empty)]:before:content-['|_']" data-backorder-message={""}></span>
                                </FormLabel>
                                <ul className="productView-picklist-backorder m-0 list-none p-0 text-[1rem]" data-picklist-backorder-list={""} style={{display: "none"}}></ul>
                            </FormField>
                            <ProductsAddToCart with_wallet_buttons={$boolean(true)} />
                        </form>
                        <$If test={settings.show_wishlist} $then={() => <WishlistDropdown />} />
                    </div>
                    <Share url={product.url} />
                </section>

                <article className="productView-description relative z-[1] float-left w-full px-base">
                    <$If
                        test={theme.show_product_details_tabs}
                        $then={() => <ProductsDescriptionTabs />}
                        $else={() => <ProductsDescription />}
                    />
                </article>
            </div>

            <div id="previewModal" className="modal modal--large left-1/2 top-1/2 m-0 max-h-[90%] min-h-[240px] max-w-[95%] overflow-hidden p-0 outline-none [transform:translate(-50%,-50%)] [&_.form-field]:relative large:w-(--sv-modal-width--large)" data-reveal={""}>
                <ModalModalCloseBtn />
                <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-header-title"></div>
                <div className="loadingOverlay"></div>
            </div>
        </>
    );
};
