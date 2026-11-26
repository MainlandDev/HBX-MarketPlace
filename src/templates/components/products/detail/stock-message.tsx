"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$All, $Lang, $pointer, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";
import {FormField, FormLabel} from "../../../../server/formParts.tsx";
import type {Product} from "../../../../server/productViewTypes.ts";

export default (_props: PartialProps) => {
    const product = $pointer<Product>("product");
    return (
        <>
            <FormField className={`form-field--stock${$Unless({test: product.stock_level, $then: () => " sr-only"})}`}>
                <FormLabel className="form-label--alternate m-0 cursor-default text-smallest font-(family-name:--sv-fontFamily-headings) [&_small]:float-right [&_small]:mt-quarter">
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
                <FormLabel tag="p" className="form-label--alternate m-0 cursor-default text-smallest font-(family-name:--sv-fontFamily-headings) [&_small]:float-right [&_small]:mt-quarter" data-product-backordered={""} style={{display: "none"}}>
                    <span className="[&:not(:empty)]:font-bold" data-qty-backordered-message={""}></span>
                    <span className="[[data-qty-backordered-message]:not(:empty)+&:not(:empty)]:before:content-['|_']" data-backorder-message={""}></span>
                </FormLabel>
                <ul className="productView-picklist-backorder m-0 list-none p-0 text-[1rem] [&>.productView-picklist-backorder-item]:mt-0 [&>.productView-picklist-backorder-item]:text-(--sv-form-label-font-color) [&>.productView-picklist-backorder-item]:font-(family-name:--sv-fontFamily-headings) [&>.productView-picklist-backorder-item]:text-smallest [&>.productView-picklist-backorder-item]:leading-[1.8] [&_.productView-picklist-backorder-name]:font-(weight:--sv-fontWeight-bold)" data-picklist-backorder-list={""} style={{display: "none"}}></ul>
            </FormField>
        </>
    );
};
