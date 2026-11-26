"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import ProductsBulkDiscountRates from "../pricing/bulk-discount-rates.tsx";
import ProductsCustomFields from "./custom-fields.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$All, $If, $Lang, $pointer, $raw, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";
import type {Product, Settings} from "../../../../server/productViewTypes.ts";
import ProductsDetailInfoDimensions from "./info-dimensions.tsx";
import ProductsDetailInfoShipping from "./info-shipping.tsx";

export default (_props: PartialProps) => {
    const theme = $pointer<ThemeSettingsObject>("theme_settings");
    const product = $pointer<Product>("product");
    const settings = $pointer<Settings>("settings");
    return (
        <>
            <dl className="productView-info mt-half flow-root [&_.cf-hidden]:[display:none] small:mt-0 small:[&>:first-child]:mt-single [&>:last-child]:mb-0">
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
                <ProductsDetailInfoDimensions />
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
                <ProductsDetailInfoShipping />

                <$If
                    test={settings.bulk_discount_enabled}
                    $then={() => (
                        <div className="productView-info-bulkPricing">
                            <ProductsBulkDiscountRates bulk_discount_rates={$pointer("product.bulk_discount_rates")} />
                        </div>
                    )}
                />

                <ProductsCustomFields />
            </dl>
        </>
    );
};
