import ProductsPriceRange from "../components/products/price-range.tsx";
import ProductsPrice from "../components/products/price.tsx";
import ProductsRatings from "../components/products/ratings.tsx";
import Breadcrumbs from "../components/common/breadcrumbs.tsx";
import ResponsiveImg from "../components/common/responsive-img.tsx";
import LoginForPricing from "../components/common/login-for-pricing.tsx";
import {
    $Page,
    $Each,
    $If,
    $Inject,
    $Lang,
    $lang,
    $pointer,
    $string,
    $unescaped, $unlessExpression, $Or,
} from "@mainlanddev/hbx-bigcommerce";

interface Comparison {
    id: number;
    name: string;
    url: string;
    image: unknown;
    remove_url: string;
    brand: {name: string; url: string};
    price_range: unknown;
    price: unknown;
    rating: unknown;
    summary: string;
    availability: string;
    show_cart_action: unknown;
    has_options: unknown;
    pre_order: unknown;
    add_to_cart_url: string;
    out_of_stock_message: string;
    custom_fields: {name: string; value: string}[];
}

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <$Inject keyName={$string("comparisons")} value={$pointer("comparisons")} />{" "}
                    <$Inject keyName={$string("compareRemoveMessage")} value={$lang($string("compare.no_remove"))} />
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h1 className="page-heading">
                        <$Lang keyName={$string("compare.header")} products={$pointer<number>("comparisons.length")} />
                    </h1>
                    <main className="page">
                        <div className="page-content">
                            <table className="compareTable w-full border-t border-container-border [table-layout:fixed]">
                                <tr className="compareTable-row align-top">
                                    <th className="compareTable-heading font-(family-name:--sv-fontFamily-headings) relative w-0 px-base py-base-sixth text-right text-smaller font-normal medium:w-3/12"></th>
                                    <$Each
                                        list={$pointer<Comparison[]>("comparisons")}
                                        $then={(product) => (
                                            <th className="compareTable-product px-base pt-[calc(var(--sv-spacing-single)+var(--sv-spacing-third))] pb-base-sixth font-normal">
                                                <article className="card mb-0">
                                                    <figure className="card-figure overflow-visible">
                                                        <a
                                                            className="card-figure__link"
                                                            aria-label={product.name}
                                                            href={product.url}
                                                            data-event-type="product-click"
                                                        >
                                                            <div className="card-img-container">
                                                                <ResponsiveImg image={product.image} class={$string("card-image")} fallback_size={$pointer("../theme_settings.product_size")} lazyload={$pointer("../theme_settings.lazyload_mode")} default_image={$pointer("../theme_settings.default_image_product")} />
                                                            </div>
                                                        </a>
                                                        <a
                                                            className="compareTable-removeProduct absolute -top-base -right-base size-[calc(var(--sv-spacing-single)+var(--sv-spacing-base))] rounded-[50%] bg-fill-dark [transition:background-color_0.15s_ease]"
                                                            data-comparison-remove={""}
                                                            href={`${$If({
                                                                test: product.remove_url,
                                                                $then: () => `${product.remove_url}`,
                                                                $else: () => "#",
                                                            })}`}
                                                        >
                                                            <svg className="icon mt-third size-single fill-icon">
                                                                <use href="#icon-close"></use>
                                                            </svg>
                                                        </a>
                                                    </figure>
                                                    <div className="card-body min-h-[calc(var(--sv-spacing-single)*4)] pt-base text-center small:text-left">
                                                        <$If
                                                            test={product.brand.name}
                                                            $then={() => (
                                                                <p className="card-text mb-eighth">
                                                                    <a href={product.brand.url}>{product.brand.name}</a>
                                                                </p>
                                                            )}
                                                        />
                                                        <h3 className="card-title mb-sixth text-smaller mt-0">
                                                            <a href={product.url}>{product.name}</a>
                                                        </h3>
                                                        <$Or values={[$pointer("../customer"), $unlessExpression($pointer("../settings.hide_price_from_guests"))]} $then={() => (<><$If
                                                            test={product.price_range}
                                                            $then={() => <ProductsPriceRange />}
                                                            $else={() => <ProductsPrice price={product.price} />}
                                                        /></>)} $else={() => (<><LoginForPricing /></>)} />
                                                    </div>
                                                </article>
                                            </th>
                                        )}
                                    />
                                </tr>
                                <tr className="compareTable-row align-top">
                                    <th className="compareTable-heading font-(family-name:--sv-fontFamily-headings) relative w-0 px-base py-base-sixth text-right text-smaller font-normal medium:w-3/12 border-t border-container-border empty:border-t-0"></th>
                                    <$Each
                                        list={$pointer<Comparison[]>("comparisons")}
                                        $then={(product) => (
                                            <td className="compareTable-action px-base pt-0 pb-base">
                                                <$If
                                                    test={product.show_cart_action}
                                                    $then={() => (
                                                        <>
                                                            <$If
                                                                test={product.has_options}
                                                                $then={() => (
                                                                    <a
                                                                        href={product.url}
                                                                        data-event-type="product-click"
                                                                        className="button button--primary [display:block] w-full px-half"
                                                                        data-product-id={product.id}
                                                                    >
                                                                        <$Lang keyName={$string("products.choose_options")} />
                                                                    </a>
                                                                )}
                                                            />
                                                            <$If
                                                                test={product.pre_order}
                                                                $then={() => (
                                                                    <a
                                                                        href={product.url}
                                                                        data-event-type="product-click"
                                                                        className="button button--primary [display:block] w-full px-half"
                                                                        data-product-id={product.id}
                                                                    >
                                                                        <$Lang keyName={$string("products.pre_order")} />
                                                                    </a>
                                                                )}
                                                            />
                                                            <$If
                                                                test={product.add_to_cart_url}
                                                                $then={() => (
                                                                    <a
                                                                        href={product.add_to_cart_url}
                                                                        data-event-type="product-click"
                                                                        className="button button--primary [display:block] w-full px-half"
                                                                        data-product-id={product.id}
                                                                    >
                                                                        <$Lang keyName={$string("products.add_to_cart")} />
                                                                    </a>
                                                                )}
                                                            />
                                                            <$If
                                                                test={product.out_of_stock_message}
                                                                $then={() => (
                                                                    <a href={product.url} className="button button--primary [display:block] w-full px-half" data-product-id={product.id}>
                                                                        {product.out_of_stock_message}
                                                                    </a>
                                                                )}
                                                            />
                                                        </>
                                                    )}
                                                />
                                            </td>
                                        )}
                                    />
                                </tr>
                                <tr className="compareTable-row align-top">
                                    <th className="compareTable-heading font-(family-name:--sv-fontFamily-headings) relative w-0 px-base py-base-sixth text-right text-smaller font-normal medium:w-3/12 border-t border-container-border empty:border-t-0">
                                        <span className="compareTable-headingText absolute top-base-sixth whitespace-nowrap medium:[position:inherit] medium:[top:inherit]">
                                            <$Lang keyName={$string("products.description")} />
                                        </span>
                                    </th>
                                    <$Each
                                        list={$pointer<Comparison[]>("comparisons")}
                                        $then={(product) => (
                                            <td className="compareTable-item pt-[calc(var(--sv-spacing-double)+var(--sv-spacing-sixth))] px-base pb-base-sixth medium:pt-base-sixth border-t border-container-border">{$unescaped(product.summary)}</td>
                                        )}
                                    />
                                </tr>
                                <$If
                                    test={$pointer("settings.show_product_rating")}
                                    $then={() => (
                                        <tr className="compareTable-row align-top">
                                            <th className="compareTable-heading font-(family-name:--sv-fontFamily-headings) relative w-0 px-base py-base-sixth text-right text-smaller font-normal medium:w-3/12 border-t border-container-border empty:border-t-0">
                                                <span className="compareTable-headingText absolute top-base-sixth whitespace-nowrap medium:[position:inherit] medium:[top:inherit]">
                                                    <$Lang keyName={$string("products.reviews.rating_label")} />
                                                </span>
                                            </th>
                                            <$Each
                                                list={$pointer<Comparison[]>("comparisons")}
                                                $then={(product) => (
                                                    <td className="compareTable-item pt-[calc(var(--sv-spacing-double)+var(--sv-spacing-sixth))] px-base pb-base-sixth medium:pt-base-sixth border-t border-container-border">
                                                        <$If
                                                            test={product.rating}
                                                            $then={() => <ProductsRatings rating={product.rating} />}
                                                            $else={() => <$Lang keyName={$string("products.reviews.no_reviews")} />}
                                                        />
                                                    </td>
                                                )}
                                            />
                                        </tr>
                                    )}
                                />
                                <tr className="compareTable-row align-top">
                                    <th className="compareTable-heading font-(family-name:--sv-fontFamily-headings) relative w-0 px-base py-base-sixth text-right text-smaller font-normal medium:w-3/12 border-t border-container-border empty:border-t-0">
                                        <span className="compareTable-headingText absolute top-base-sixth whitespace-nowrap medium:[position:inherit] medium:[top:inherit]">
                                            <$Lang keyName={$string("products.availability")} />
                                        </span>
                                    </th>
                                    <$Each
                                        list={$pointer<Comparison[]>("comparisons")}
                                        $then={(product) => (
                                            <td className="compareTable-item pt-[calc(var(--sv-spacing-double)+var(--sv-spacing-sixth))] px-base pb-base-sixth medium:pt-base-sixth border-t border-container-border">
                                                <$If
                                                    test={product.availability}
                                                    $then={() => <>{product.availability}</>}
                                                    $else={() => <$Lang keyName={$string("common.not_applicable")} />}
                                                />
                                            </td>
                                        )}
                                    />
                                </tr>
                                <tr className="compareTable-row align-top">
                                    <th className="compareTable-heading font-(family-name:--sv-fontFamily-headings) relative w-0 px-base py-base-sixth text-right text-smaller font-normal medium:w-3/12 border-t border-container-border empty:border-t-0">
                                        <span className="compareTable-headingText absolute top-base-sixth whitespace-nowrap medium:[position:inherit] medium:[top:inherit]">
                                            <$Lang keyName={$string("common.other_details")} />
                                        </span>
                                    </th>
                                    <$Each
                                        list={$pointer<Comparison[]>("comparisons")}
                                        $then={(product) => (
                                            <td className="compareTable-item pt-[calc(var(--sv-spacing-double)+var(--sv-spacing-sixth))] px-base pb-base-sixth medium:pt-base-sixth border-t border-container-border">
                                                <$If
                                                    test={product.custom_fields}
                                                    $then={() => (
                                                        <ul>
                                                            <$Each
                                                                list={$pointer<Comparison["custom_fields"]>("custom_fields")}
                                                                $then={(field) => (
                                                                    <li>
                                                                        {field.name}: {$unescaped(field.value)}
                                                                    </li>
                                                                )}
                                                            />
                                                        </ul>
                                                    )}
                                                    $else={() => <$Lang keyName={$string("common.not_applicable")} />}
                                                />
                                            </td>
                                        )}
                                    />
                                </tr>
                            </table>
                        </div>
                    </main>
                </>
            ),
        }}
        layout="layout/base"
    />
);
