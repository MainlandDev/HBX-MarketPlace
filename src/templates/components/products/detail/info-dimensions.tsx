"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$All, $If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import type {Product} from "../../../../server/productViewTypes.ts";

export default (_props: PartialProps) => {
    const theme = $pointer<ThemeSettingsObject>("theme_settings");
    const product = $pointer<Product>("product");
    return (
        <>
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
        </>
    );
};
