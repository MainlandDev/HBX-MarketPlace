"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import ProductsPrice from "../pricing/price.tsx";
import ProductsPromotionCallout from "../pricing/promotion-callout.tsx";
import ProductsRatings from "../shared/ratings.tsx";
import ProductsModalsWriteReview from "../modals/writeReview.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import LoginForPricing from "../../common/login-for-pricing.tsx";
import {$If, $Lang, $number, $pointer, $raw, $region, $string, $unescaped, $Unless, $unlessExpression, $Or} from "@mainlanddev/hbx-bigcommerce";
import type {Product, Settings} from "../../../../server/productViewTypes.ts";
import {customerRegions} from "../../../../server/regionParts.tsx";

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default (_props: PartialProps) => {
    const theme = $pointer<ThemeSettingsObject>("theme_settings");
    const product = $pointer<Product>("product");
    const settings = $pointer<Settings>("settings");
    const isAjax = $pointer<boolean>("is_ajax");
    return (
        <>
            <h1 className="productView-title mt-0 mr-0 mb-half ml-0 text-[1.75rem] leading-tight font-bold text-ink medium:text-[2.5rem]">{product.title}</h1>
            <$If
                test={product.brand}
                $then={() => (
                    <h2 className="productView-brand order-first m-0 mb-quarter text-[16px] font-bold uppercase [&_a]:text-ink-muted [&_a]:no-underline [&_a]:hover:text-ink">
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
            <div className="productView-price mb-third text-smaller medium:mb-base medium:text-larger [&_.price-section--saving]:text-smaller [&_abbr]:border-0 [&_abbr]:text-inherit [&_abbr]:[font-size:1rem] [&_.price--withTax_.price]:text-[2.5rem] [&_.price--withTax_.price]:text-ink [&_.price--rrp]:text-[1.4rem] [&_.price--rrp]:text-ink-muted [&_.price-section--saving]:font-bold [&_.price-section--saving]:text-ink">
                <$Or values={[$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))]} $then={() => (<><ProductsPrice price={$pointer("product.price")} /></>)} $else={() => (<><LoginForPricing /></>)} />
            </div>
            {customerRegions("product_below_price--global")}
            {region("product_below_price--global")}
            {customerRegions("product_below_price")}
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
                                className="productView-reviewLink productView-reviewLink--new ml-quarter inline-block p-0 align-middle text-brand-dark underline hover:text-ink"
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
            {customerRegions("product_below_rating--global")}
            {region("product_below_rating--global")}
            {customerRegions("product_below_rating")}
            {region("product_below_rating")}
            {product.detail_messages}
        </>
    );
};
