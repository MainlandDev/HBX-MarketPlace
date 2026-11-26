"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import ProductsProductBadge from "./product-badge.tsx";
import ProductsRatings from "../shared/ratings.tsx";
import ProductsPrice from "../pricing/price.tsx";
import ProductsPromotionCallout from "../pricing/promotion-callout.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import ResponsiveImg from "../../common/responsive-img.tsx";
import LoginForPricing from "../../common/login-for-pricing.tsx";
import {
    $partial,
    $Each,
    $If,
    $Lang,
    $lang,
    $number,
    $Or,
    $pointer,
    $region,
    $string,
    $unescaped,
    $Unless,
    $unlessExpression,
} from "@mainlanddev/hbx-bigcommerce";
import {Button} from "../../../../server/formParts.tsx";

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default (_props: PartialProps) => {
    const settings = $pointer<ThemeSettingsObject>("theme_settings");
    const id = $pointer<number>("id");
    const url = $pointer<string>("url");
    const name = $pointer<string>("name");
    const brand = $pointer<{name: string}>("brand");
    const price = $pointer<{
        with_tax: {value: number};
        without_tax: {value: number};
        sale_price_with_tax: {value: number};
        sale_price_without_tax: {value: number};
    }>("price");
    const addToCartUrl = $pointer<string>("add_to_cart_url");
    const outOfStockMessage = $pointer<string>("out_of_stock_message");
    const showCartAction = $pointer<boolean>("show_cart_action");
    return (
        <article
            className="listItem small:-mx-gutter-half small:w-full small:max-w-none small:[display:table] large:[&:focus-within_.listItem-figureBody]:opacity-100 large:[&.focus-within_.listItem-figureBody]:opacity-100"
            data-event-type={$pointer("event")}
            data-entity-id={id}
            data-position={$pointer("position")}
            data-name={name}
            data-product-brand={brand.name}
            dangerouslyInlineAttributes={{
                attributes: `data-product-category="${$Each({list: $pointer<string[]>("category"), $then: (item, loop) => `${$If({test: loop["@last"], $then: () => `${item}`, $else: () => `${item}, `})}`})}" data-product-price="${$Or({values: [$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))], $then: () => ` ${$If({test: price.with_tax, $then: () => ` ${price.with_tax.value} `, $else: () => ` ${price.without_tax.value} `})} `, $else: () => ` ${$lang($string("common.login_for_pricing"))} `})}"`,
            }}
        >
            <figure className="listItem-figure relative m-0 mb-single small:mb-0 small:w-3/12 small:px-half small:align-top small:[display:table-cell] large:align-middle">
                <a
                    href={url}
                    className="listItem-figure__link m-[3px] [display:block] [&_.listItem-image]:w-full"
                    aria-label={$partial("components/products/listing/product-info")}
                    data-event-type="product-click"
                >
                    <$If
                        test={$pointer("stock_level")}
                        operator={$string("===")}
                        rvalue={$number(0)}
                        $then={() => (
                            <$If
                                test={$pointer("theme_settings.pdp_sold_out_label")}
                                operator={$string("===")}
                                rvalue={$string("")}
                                $then={() => <ProductsProductBadge badge-type={$string("sold-out")} badge_view={settings.product_sold_out_badges} badge_label={$lang($string("page_builder.pdp_sold_out_label"))} />}
                                $else={() => <ProductsProductBadge badge-type={$string("sold-out")} badge_view={settings.product_sold_out_badges} badge_label={settings.pdp_sold_out_label} />}
                            />
                        )}
                        $else={() => (
                            <$Or
                                values={[price.sale_price_with_tax.value, price.sale_price_without_tax.value]}
                                $then={() => (
                                    <$If
                                        test={$pointer("theme_settings.pdp_sale_badge_label")}
                                        operator={$string("===")}
                                        rvalue={$string("")}
                                        $then={() => <ProductsProductBadge badge-type={$string("sale")} badge_view={settings.product_sale_badges} badge_label={$lang($string("page_builder.pdp_sale_badge_label"))} />}
                                        $else={() => <ProductsProductBadge badge-type={$string("sale")} badge_view={settings.product_sale_badges} badge_label={settings.pdp_sale_badge_label} />}
                                    />
                                )}
                            />
                        )}
                    />
                    <ResponsiveImg image={$pointer("image")} class={$string("listItem-image")} fallback_size={settings.productgallery_size} lazyload={settings.lazyload_mode} default_image={settings.default_image_product} />
                </a>
                <$Unless
                    test={$pointer("hide_product_quick_view")}
                    $then={() => (
                        <$If
                            test={settings.show_product_quick_view}
                            $then={() => (
                                <div className="listItem-figureBody text-center opacity-100 large:absolute large:top-1/2 large:left-1/2 large:opacity-0 large:[transform:translateX(-50%)_translateY(-50%)] large:[[class~=listItem]:hover_&]:opacity-100">
                                    <Button type="button" data-event-type="product-click" size="small" className="listItem-button quickview my-single mx-0 bg-(--sv-card-figcaption-button-background) text-(--sv-card-figcaption-button-color) hover:bg-(--sv-card-figcaption-button-backgroundHover) hover:text-(--sv-card-figcaption-button-color) focus:bg-(--sv-card-figcaption-button-backgroundHover) focus:text-(--sv-card-figcaption-button-color) large:pointer-events-auto large:m-0 large:[display:inline-block]" data-product-id={id}>
                                        <$Lang keyName={$string("products.quick_view")} />
                                    </Button>
                                </div>
                            )}
                        />
                    )}
                />
            </figure>
            <div className="listItem-body small:w-9/12 small:pr-half small:pl-base-sixth small:align-top small:[display:table-cell] large:align-middle">
                <div className="listItem-content large:[display:table]">
                    <div className="listItem-details large:pr-[calc(var(--sv-spacing-double)*2)] large:align-top large:[display:table-cell] large:[&>:last-child]:mb-0 large:[[class~=page-sidebar]+[class~=page-content]_&]:pr-double">
                        <$If
                            test={$pointer("show_rating")}
                            $then={() => (
                                <p className="listItem-rating mb-quarter">
                                    <ProductsRatings rating_target={name} rating={$pointer("rating")} />
                                </p>
                            )}
                        />
                        <$If
                            test={brand.name}
                            $then={() => <p className="listItem-brand m-0 mb-eighth text-(length:--sv-fontSize-base) text-grey-light medium:mb-0 medium:text-smaller">{brand.name}</p>}
                        />
                        <h4 className="listItem-title m-0 mb-eighth text-smaller medium:text-small [&>a]:no-underline">
                            <a href={url} aria-label={$partial("components/products/listing/product-info")} data-event-type="product-click">
                                {name}
                            </a>
                        </h4>
                        <$If test={$pointer("summary")} $then={() => <p>{$unescaped($pointer("summary"))}</p>} />
                    </div>
                    <div className="listItem-actions [&_.button]:mb-0 large:w-[22%] large:align-middle large:[display:table-cell] large:[&_.button]:w-full large:[&_.button+.button]:m-0 large:[&_.button+.button]:mt-half large:[[class~=page-sidebar]+[class~=page-content]_&]:w-[30%]">
                        <$Or values={[$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))]} $then={() => (<><$If
                            test={$pointer("price")}
                            $then={() => (
                                <>
                                    <div className="listItem-price mb-base medium:text-small">
                                        <ProductsPrice price={$pointer("price")} />
                                    </div>
                                    {region("product_item_below_price")}
                                </>
                            )}
                        /></>)} $else={() => (<><LoginForPricing /></>)} />
                        <$If
                            test={settings.show_featured_promotions}
                            $then={() =>
                                <ProductsPromotionCallout promotions={$pointer("featured_promotions")} mode={$string("compact")} />
                            }
                        />
                        <$If
                            test={showCartAction}
                            $then={() => (
                                <>
                                    <$If
                                        test={$pointer("has_options")}
                                        $then={() => (
                                            <Button href={url} data-event-type="product-click" tag="a" size="small" data-product-id={id}>
                                                <$Lang keyName={$string("products.choose_options")} />
                                            </Button>
                                        )}
                                    />
                                    <$If
                                        test={$pointer("pre_order")}
                                        $then={() => (
                                            <Button href={$pointer("pre_order_add_to_cart_url")} data-event-type="product-click" tag="a" variant="primary">
                                                <$Lang keyName={$string("products.pre_order")} />
                                            </Button>
                                        )}
                                    />
                                    <$If
                                        test={addToCartUrl}
                                        $then={() => (
                                            <Button href={addToCartUrl} data-event-type="product-click" tag="a" variant="primary">
                                                <$Lang keyName={$string("products.add_to_cart")} />
                                            </Button>
                                        )}
                                    />
                                    <$If
                                        test={outOfStockMessage}
                                        $then={() => (
                                            <Button href={url} data-event-type="product-click" tag="a" size="small" data-product-id={id}>
                                                {outOfStockMessage}
                                            </Button>
                                        )}
                                    />
                                </>
                            )}
                        />
                        <$If
                            test={$pointer("show_compare")}
                            $then={() => (
                                <Button tag="label" size="small" htmlFor={`compare-${id}`}>
                                    <$Lang keyName={$string("products.compare")} /> <input type="checkbox" name="products[]" value={id} id={`compare-${id}`} data-compare-id={id} />
                                </Button>
                            )}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
};
