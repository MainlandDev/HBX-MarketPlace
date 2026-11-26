"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import ModalModalCloseBtn from "../../common/modal/modal-close-btn.tsx";
import {$Each, $If, $Lang, $pointer, $raw, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";
import {Modal, ModalBody, ModalHeader, ModalTitle} from "../../../../server/componentParts.tsx";

interface Rate {
    min: string;
    max: number;
    type: string;
    discount: {formatted: string};
    discount_inc_tax: {formatted: string};
}

export default (_props: PartialProps) => {
    const id = $pointer<number>("id");
    const product = $pointer<{url: string; price: {tax_label: string}}>("product");
    return (
        <$If
            test={$pointer("bulk_discount_rates.length")}
            $then={() => (
                <>
                    <$If
                        test={$pointer("product")}
                        $then={() => (
                            <dt className="productView-info-name clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal">
                                <$Lang keyName={$string("products.bulk_pricing.title")} />
                            </dt>
                        )}
                    />
                    <dd className="productView-info-value float-left mb-quarter small:float-none small:mb-base">
                        <a
                            href={`${product.url}#bulk_pricing`}
                            dangerouslyInlineAttributes={{
                                attributes: `${$Unless({
                                    test: $pointer("is_ajax"),
                                    $then: () => `${$raw("data-reveal-id=\"modal-bulk-pricing")}${$If({test: id, $then: () => `-${id}`})}${$raw("\"")}`,
                                })}`,
                            }}
                        >
                            <$Lang keyName={$string("products.bulk_pricing.view")} />
                        </a>
                    </dd>
                    <Modal id={`modal-bulk-pricing${$If({test: id, $then: () => `-${id}`})}`} className="modal--small left-1/2 top-1/2 m-0 max-h-[90%] min-h-[240px] max-w-[95%] overflow-hidden p-0 outline-none [transform:translate(-50%,-50%)] [&_.form-field]:relative" data-reveal={""}>
                        <ModalHeader className="pl-(--sv-reveal-modal-paddingHorizontal) pr-[calc(32px+var(--sv-reveal-close-side))]">
                            <ModalTitle className="text-center text-large medium:text-larger">
                                <$Lang keyName={$string("products.bulk_pricing.modal_title")} />
                            </ModalTitle>
                            <ModalModalCloseBtn />
                        </ModalHeader>
                        <ModalBody className="overflow-auto p-(--sv-reveal-modal-padding) [-webkit-overflow-scrolling:touch]">
                            <p>
                                <$Lang keyName={$string("products.bulk_pricing.instructions")} />
                            </p>
                            <ul>
                                <$Each
                                    list={$pointer<Rate[]>("bulk_discount_rates")}
                                    $then={(rate) => (
                                        <li>
                                            <$Lang keyName={$string("products.bulk_pricing.range")} min={rate.min} max={rate.max} />
                                            <$If
                                                test={$pointer("type")}
                                                operator={$string("===")}
                                                rvalue={$string("percent")}
                                                $then={() => (
                                                    <>
                                                        <$Lang keyName={$string("products.bulk_pricing.percent")} discount={rate.discount.formatted} />
                                                        {" "}
                                                    </>
                                                )}
                                                $elseThen={[
                                                    {
                                                        test: $pointer("type"),
                                                        operator: $string("==="),
                                                        rvalue: $string("fixed"),
                                                        $then: () => (
                                                            <>
                                                                {" "}
                                                                <$If
                                                                    test={rate.discount_inc_tax}
                                                                    $then={() => (
                                                                        <>
                                                                            <$Lang keyName={$string("products.bulk_pricing.fixed_both.prefix")} />
                                                                            <br />
                                                                            {rate.discount_inc_tax.formatted}{" "}
                                                                            <$Lang keyName={$string("products.price_with_tax")} tax_label={$pointer("../product.price.tax_label")} />
                                                                            <br />
                                                                            {rate.discount.formatted}{" "}
                                                                            <$Lang keyName={$string("products.price_without_tax")} tax_label={$pointer("../product.price.tax_label")} />{" "}
                                                                            <$Lang keyName={$string("products.bulk_pricing.fixed_both.suffix")} />
                                                                        </>
                                                                    )}
                                                                    $else={() => <$Lang keyName={$string("products.bulk_pricing.fixed")} discount={rate.discount.formatted} />}
                                                                />
                                                                {" "}
                                                            </>
                                                        ),
                                                    },
                                                    {
                                                        test: $pointer("type"),
                                                        operator: $string("==="),
                                                        rvalue: $string("price"),
                                                        $then: () => (
                                                            <>
                                                                {" "}
                                                                <$Lang keyName={$string("products.bulk_pricing.price")} discount={rate.discount.formatted} />
                                                            </>
                                                        ),
                                                    },
                                                ]}
                                            />
                                        </li>
                                    )}
                                />
                            </ul>
                        </ModalBody>
                    </Modal>
                </>
            )}
        />
    );
};
