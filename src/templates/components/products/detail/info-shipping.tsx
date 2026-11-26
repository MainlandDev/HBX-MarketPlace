"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $number, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import type {Product} from "../../../../server/productViewTypes.ts";

export default (_props: PartialProps) => {
    const product = $pointer<Product>("product");
    return (
        <>
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
        </>
    );
};
