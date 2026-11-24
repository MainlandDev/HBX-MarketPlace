"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import ProductsProductBadge from "./product-badge.tsx";
import ProductsRatings from "./ratings.tsx";
import ProductsPrice from "./price.tsx";
import ProductsBulkDiscountRates from "./bulk-discount-rates.tsx";
import ProductsPromotionCallout from "./promotion-callout.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import ResponsiveImg from "../common/responsive-img.tsx";
import LoginForPricing from "../common/login-for-pricing.tsx";
import {
    $partial,
    $And,
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
import {Button} from "../../../server/formParts.tsx";

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
    const showRating = $pointer<boolean>("show_rating");
    return (
        <$If
            test={$pointer("alternate")}
            $then={() => (
                <article
                    className="card group/card card--alternate border-[3px] border-solid border-(--sv-setting-card--alternate-borderColor) [transition:all_0.15s_ease] hover:border-(--sv-setting-color-primary) [&_.card-body]:bg-(--sv-setting-card--alternate-backgroundColor) [&_.card-body]:p-half small:[&_.card-body]:p-single [&_.card-body]:[transition:all_0.15s_ease] hover:[&_.card-body]:bg-(--sv-setting-color-primary) hover:[&_.card-body_.card-text]:text-(--sv-setting-card--alternate-color--hover) hover:[&_.card-title>a]:text-(--sv-setting-card--alternate-color--hover)"
                    data-test={`card-${id}`}
                    data-event-type={$pointer("event")}
                    data-entity-id={id}
                    data-position={$pointer("position")}
                    data-name={name}
                    data-product-brand={brand.name}
                    dangerouslyInlineAttributes={{
                        attributes: `data-product-category="${$Each({list: $pointer<string[]>("category"), $then: (item, loop) => ` ${$If({test: loop["@last"], $then: () => ` ${item} `, $else: () => ` ${item}, `})} `})}" data-product-price="${$Or({values: [$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))], $then: () => ` ${$If({test: price.with_tax, $then: () => ` ${price.with_tax.value} `, $else: () => ` ${price.without_tax.value} `})} `, $else: () => ` ${$lang($string("common.login_for_pricing"))} `})}"`,
                    }}
                >
                    <figure className="card-figure group/fig relative mt-0 overflow-hidden p-[3px]">
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

                        <a
                            href={url}
                            className="card-figure__link relative [display:block]"
                            aria-label={$partial("components/products/product-info")}
                            data-event-type="product-click"
                        >
                            <div className="card-img-container max-w-[500px] after:block after:h-0 after:w-full after:pb-[131.8%] after:content-[''] [&_.card-image]:absolute [&_.card-image]:inset-0 [&_.card-image]:m-auto [&_.card-image]:max-h-full [&_.card-image]:w-full [&_.card-image]:border-0 [&_.card-image]:object-contain [&_.card-image]:[font-family:'object-fit:_contain;']">
                                <ResponsiveImg image={$pointer("image")} class={$string("card-image")} fallback_size={settings.productgallery_size} lazyload={settings.lazyload_mode} default_image={settings.default_image_product} />
                            </div>
                        </a>

                        <figcaption className="card-figcaption m-0 pointer-events-none [display:none] medium:[display:block] group-hover/fig:opacity-100 group-focus-within/card:opacity-100 group-[.focus-within]/card:opacity-100">
                            <div className="card-figcaption-body inline-block [pointer-events:all] [transform:translate3d(0,-50%,0)]">
                                <$Unless
                                    test={$pointer("hide_product_quick_view")}
                                    $then={() => (
                                        <$If
                                            test={settings.show_product_quick_view}
                                            $then={() => (
                                                <Button
                                                    type="button"
                                                    size="small" className="card-figcaption-button m-0 mt-quarter first:mt-0 border-none active:bg-(--sv-card-figcaption-button-backgroundHover) focus:bg-(--sv-card-figcaption-button-backgroundHover) focus:[outline:revert] [display:block] quickview bg-(--sv-card-figcaption-button-background) text-(--sv-card-figcaption-button-color)"
                                                    data-event-type="product-click"
                                                    data-product-id={id}
                                                >
                                                    <$Lang keyName={$string("products.quick_view")} />
                                                </Button>
                                            )}
                                        />
                                    )}
                                />
                                <$If
                                    test={$pointer("show_compare")}
                                    $then={() => (
                                        <Button tag="label" size="small" className="card-figcaption-button m-0 mt-quarter first:mt-0 border-none active:bg-(--sv-card-figcaption-button-backgroundHover) focus:bg-(--sv-card-figcaption-button-backgroundHover) focus:[outline:revert] [display:block] bg-(--sv-card-figcaption-button-background) text-(--sv-card-figcaption-button-color)" htmlFor={`compare-${id}`}>
                                            <$Lang keyName={$string("products.compare")} /> <input type="checkbox" name="products[]" value={id} id={`compare-${id}`} data-compare-id={id} />
                                        </Button>
                                    )}
                                />
                                <$If
                                    test={showCartAction}
                                    $then={() => (
                                        <>
                                            <$If
                                                test={$pointer("has_options")}
                                                $then={() => (
                                                    <Button href={url} data-event-type="product-click" tag="a" size="small" className="card-figcaption-button m-0 mt-quarter first:mt-0 border-none active:bg-(--sv-card-figcaption-button-backgroundHover) focus:bg-(--sv-card-figcaption-button-backgroundHover) focus:[outline:revert] [display:block] bg-(--sv-card-figcaption-button-background) text-(--sv-card-figcaption-button-color)" data-product-id={id}>
                                                        <$Lang keyName={$string("products.choose_options")} />
                                                    </Button>
                                                )}
                                            />
                                            <$If
                                                test={$pointer("pre_order")}
                                                $then={() => (
                                                    <Button href={$pointer("pre_order_add_to_cart_url")} data-event-type="product-click" tag="a" size="small" className="card-figcaption-button m-0 mt-quarter first:mt-0 border-none active:bg-(--sv-card-figcaption-button-backgroundHover) focus:bg-(--sv-card-figcaption-button-backgroundHover) focus:[outline:revert] [display:block] bg-(--sv-card-figcaption-button-background) text-(--sv-card-figcaption-button-color)">
                                                        <$Lang keyName={$string("products.pre_order")} />
                                                    </Button>
                                                )}
                                            />
                                            <$If
                                                test={addToCartUrl}
                                                $then={() => (
                                                    <>
                                                        <Button href={addToCartUrl} data-event-type="product-click" data-button-type="add-cart" tag="a" size="small" className="card-figcaption-button m-0 mt-quarter first:mt-0 border-none active:bg-(--sv-card-figcaption-button-backgroundHover) focus:bg-(--sv-card-figcaption-button-backgroundHover) focus:[outline:revert] [display:block] bg-(--sv-card-figcaption-button-background) text-(--sv-card-figcaption-button-color)">
                                                            <$Lang keyName={$string("products.add_to_cart")} />
                                                        </Button>
                                                        <span className="product-status-message aria-description--hidden">
                                                            <$Lang keyName={$string("category.add_cart_announcement")} />
                                                        </span>
                                                    </>
                                                )}
                                            />
                                            <$If
                                                test={outOfStockMessage}
                                                $then={() => (
                                                    <Button href={url} data-event-type="product-click" tag="a" size="small" className="card-figcaption-button m-0 mt-quarter first:mt-0 border-none active:bg-(--sv-card-figcaption-button-backgroundHover) focus:bg-(--sv-card-figcaption-button-backgroundHover) focus:[outline:revert] [display:block] bg-(--sv-card-figcaption-button-background) text-(--sv-card-figcaption-button-color)" data-product-id={id}>
                                                        {outOfStockMessage}
                                                    </Button>
                                                )}
                                            />
                                        </>
                                    )}
                                />
                            </div>
                        </figcaption>
                    </figure>
                    <div className="card-body text-center small:text-left">
                        <$And
                            a={$pointer("rating")}
                            b={showRating}
                            $then={() => (
                                <p className="card-text [&_abbr]:border-0 [&_abbr]:text-inherit [&_abbr]:[font-size:inherit] mb-eighth" data-test-info-type="productRating">
                                    <span className="rating--small inline-block [&_.icon]:-mt-[3px] [&_.icon]:size-[14px]">
                                        <ProductsRatings rating_target={name} rating={$pointer("rating")} />
                                    </span>
                                </p>
                            )}
                        />
                        <$If
                            test={brand.name}
                            $then={() => (
                                <p className="card-text [&_abbr]:border-0 [&_abbr]:text-inherit [&_abbr]:[font-size:inherit] mb-eighth" data-test-info-type="brandName">
                                    {brand.name}
                                </p>
                            )}
                        />
                        <h3 className="card-title [&>a]:text-(--sv-setting-card-title-color) [&>a]:no-underline [&>a]:[display:block] [&>a:hover]:text-(--sv-setting-card-title-color-hover) mb-sixth text-smaller mt-0">
                            <a aria-label={$partial("components/products/product-info")} href={url} data-event-type="product-click">
                                {name}
                            </a>
                        </h3>

                        <div className="card-text [&_abbr]:border-0 [&_abbr]:text-inherit [&_abbr]:[font-size:inherit] mb-eighth" data-test-info-type="price">
                            <$Or values={[$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))]} $then={() => (<><ProductsPrice price={$pointer("price")} /></>)} $else={() => (<><LoginForPricing /></>)} />
                        </div>
                        {region("product_item_below_price")}
                        <ProductsBulkDiscountRates />
                        <$If
                            test={settings.show_featured_promotions}
                            $then={() =>
                                <ProductsPromotionCallout promotions={$pointer("featured_promotions")} mode={$string("compact")} />
                            }
                        />
                    </div>

                </article>
            )}
            $else={() => (
                <article
                    className="card group/card"
                    data-test={`card-${id}`}
                    data-event-type={$pointer("event")}
                    data-entity-id={id}
                    data-position={$pointer("position")}
                    data-name={name}
                    data-product-brand={brand.name}
                    dangerouslyInlineAttributes={{
                        attributes: `data-product-category="${$Each({list: $pointer<string[]>("category"), $then: (item, loop) => ` ${$If({test: loop["@last"], $then: () => ` ${item} `, $else: () => ` ${item}, `})} `})}" data-product-price="${$Or({values: [$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))], $then: () => ` ${$If({test: price.with_tax, $then: () => ` ${price.with_tax.value} `, $else: () => ` ${price.without_tax.value} `})} `, $else: () => ` ${$lang($string("common.login_for_pricing"))} `})}"`,
                    }}
                >
                    <figure className="card-figure group/fig relative mt-0 overflow-hidden p-[3px]">
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

                        <a
                            href={url}
                            className="card-figure__link relative [display:block]"
                            aria-label={$partial("components/products/product-info")}
                            data-event-type="product-click"
                        >
                            <div className="card-img-container max-w-[500px] after:block after:h-0 after:w-full after:pb-[131.8%] after:content-[''] [&_.card-image]:absolute [&_.card-image]:inset-0 [&_.card-image]:m-auto [&_.card-image]:max-h-full [&_.card-image]:w-full [&_.card-image]:border-0 [&_.card-image]:object-contain [&_.card-image]:[font-family:'object-fit:_contain;']">
                                <ResponsiveImg image={$pointer("image")} class={$string("card-image")} fallback_size={settings.productgallery_size} lazyload={settings.lazyload_mode} default_image={settings.default_image_product} />
                            </div>
                        </a>

                        <figcaption className="card-figcaption m-0 pointer-events-none [display:none] medium:[display:block] group-hover/fig:opacity-100 group-focus-within/card:opacity-100 group-[.focus-within]/card:opacity-100">
                            <div className="card-figcaption-body inline-block [pointer-events:all] [transform:translate3d(0,-50%,0)]">
                                <$Unless
                                    test={$pointer("hide_product_quick_view")}
                                    $then={() => (
                                        <$If
                                            test={settings.show_product_quick_view}
                                            $then={() => (
                                                <Button
                                                    type="button"
                                                    size="small" className="card-figcaption-button m-0 mt-quarter first:mt-0 border-none active:bg-(--sv-card-figcaption-button-backgroundHover) focus:bg-(--sv-card-figcaption-button-backgroundHover) focus:[outline:revert] [display:block] quickview bg-(--sv-card-figcaption-button-background) text-(--sv-card-figcaption-button-color)"
                                                    data-event-type="product-click"
                                                    data-product-id={id}
                                                >
                                                    <$Lang keyName={$string("products.quick_view")} />
                                                </Button>
                                            )}
                                        />
                                    )}
                                />
                                <$If
                                    test={$pointer("show_compare")}
                                    $then={() => (
                                        <Button tag="label" size="small" className="card-figcaption-button m-0 mt-quarter first:mt-0 border-none active:bg-(--sv-card-figcaption-button-backgroundHover) focus:bg-(--sv-card-figcaption-button-backgroundHover) focus:[outline:revert] [display:block] bg-(--sv-card-figcaption-button-background) text-(--sv-card-figcaption-button-color)" htmlFor={`compare-${id}`}>
                                            <$Lang keyName={$string("products.compare")} /> <input type="checkbox" name="products[]" value={id} id={`compare-${id}`} data-compare-id={id} />
                                        </Button>
                                    )}
                                />
                                <$If
                                    test={showCartAction}
                                    $then={() => (
                                        <>
                                            <$If
                                                test={$pointer("has_options")}
                                                $then={() => (
                                                    <Button href={url} data-event-type="product-click" tag="a" size="small" className="card-figcaption-button m-0 mt-quarter first:mt-0 border-none active:bg-(--sv-card-figcaption-button-backgroundHover) focus:bg-(--sv-card-figcaption-button-backgroundHover) focus:[outline:revert] [display:block] bg-(--sv-card-figcaption-button-background) text-(--sv-card-figcaption-button-color)" data-product-id={id}>
                                                        <$Lang keyName={$string("products.choose_options")} />
                                                    </Button>
                                                )}
                                            />
                                            <$If
                                                test={$pointer("pre_order")}
                                                $then={() => (
                                                    <Button href={$pointer("pre_order_add_to_cart_url")} data-event-type="product-click" tag="a" size="small" className="card-figcaption-button m-0 mt-quarter first:mt-0 border-none active:bg-(--sv-card-figcaption-button-backgroundHover) focus:bg-(--sv-card-figcaption-button-backgroundHover) focus:[outline:revert] [display:block] bg-(--sv-card-figcaption-button-background) text-(--sv-card-figcaption-button-color)">
                                                        <$Lang keyName={$string("products.pre_order")} />
                                                    </Button>
                                                )}
                                            />
                                            <$If
                                                test={addToCartUrl}
                                                $then={() => (
                                                    <>
                                                        <Button href={addToCartUrl} data-event-type="product-click" data-button-type="add-cart" tag="a" size="small" className="card-figcaption-button m-0 mt-quarter first:mt-0 border-none active:bg-(--sv-card-figcaption-button-backgroundHover) focus:bg-(--sv-card-figcaption-button-backgroundHover) focus:[outline:revert] [display:block] bg-(--sv-card-figcaption-button-background) text-(--sv-card-figcaption-button-color)">
                                                            <$Lang keyName={$string("products.add_to_cart")} />
                                                        </Button>
                                                        <span className="product-status-message aria-description--hidden">
                                                            <$Lang keyName={$string("category.add_cart_announcement")} />
                                                        </span>
                                                    </>
                                                )}
                                            />
                                            <$If
                                                test={outOfStockMessage}
                                                $then={() => (
                                                    <Button href={url} data-event-type="product-click" tag="a" size="small" className="card-figcaption-button m-0 mt-quarter first:mt-0 border-none active:bg-(--sv-card-figcaption-button-backgroundHover) focus:bg-(--sv-card-figcaption-button-backgroundHover) focus:[outline:revert] [display:block] bg-(--sv-card-figcaption-button-background) text-(--sv-card-figcaption-button-color)" data-product-id={id}>
                                                        {outOfStockMessage}
                                                    </Button>
                                                )}
                                            />
                                        </>
                                    )}
                                />
                            </div>
                        </figcaption>
                    </figure>
                    <div className="card-body text-center small:text-left">
                        <$And
                            a={$pointer("rating")}
                            b={showRating}
                            $then={() => (
                                <p className="card-text [&_abbr]:border-0 [&_abbr]:text-inherit [&_abbr]:[font-size:inherit] mb-eighth" data-test-info-type="productRating">
                                    <span className="rating--small inline-block [&_.icon]:-mt-[3px] [&_.icon]:size-[14px]">
                                        <ProductsRatings rating_target={name} rating={$pointer("rating")} />
                                    </span>
                                </p>
                            )}
                        />
                        <$If
                            test={brand.name}
                            $then={() => (
                                <p className="card-text [&_abbr]:border-0 [&_abbr]:text-inherit [&_abbr]:[font-size:inherit] mb-eighth" data-test-info-type="brandName">
                                    {brand.name}
                                </p>
                            )}
                        />
                        <h3 className="card-title [&>a]:text-(--sv-setting-card-title-color) [&>a]:no-underline [&>a]:[display:block] [&>a:hover]:text-(--sv-setting-card-title-color-hover) mb-sixth text-smaller mt-0">
                            <a aria-label={$partial("components/products/product-info")} href={url} data-event-type="product-click">
                                {name}
                            </a>
                        </h3>

                        <div className="card-text [&_abbr]:border-0 [&_abbr]:text-inherit [&_abbr]:[font-size:inherit] mb-eighth" data-test-info-type="price">
                            <$Or values={[$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))]} $then={() => (<><ProductsPrice price={$pointer("price")} /></>)} $else={() => (<><LoginForPricing /></>)} />
                        </div>
                        {region("product_item_below_price")}
                        <ProductsBulkDiscountRates />
                        <$If
                            test={settings.show_featured_promotions}
                            $then={() =>
                                <ProductsPromotionCallout promotions={$pointer("featured_promotions")} mode={$string("compact")} />
                            }
                        />
                    </div>

                </article>
            )}
        />
    );
};
