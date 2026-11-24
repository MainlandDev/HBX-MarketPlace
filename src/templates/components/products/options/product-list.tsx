"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import RequirenessMsg from "../../common/requireness-msg.tsx";
import ResponsiveImg from "../../common/responsive-img.tsx";
import {$Each, $If, $Lang, $pointer, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";

interface Value {
    id: string;
    label: string;
    selected: boolean;
    image: {data: string};
}

export default (_props: PartialProps) => {
    // Read outside the loops, so inside them the path gains `../` (`{{../id}}`, `{{../required}}`).
    const id = $pointer("id");
    const required = $pointer("required");
    return (
        <div className="form-field [&_.unavailable]:opacity-[calc(var(--sv-productOptions-disable-opacity)*2)] [&_.unavailable]:line-through" data-product-attribute="product-list" role="radiogroup" aria-labelledby="product-list-label">
            <label className="form-label form-label--alternate form-label--inlineSmall mb-half text-smallest [font-family:'Montserrat',Arial,Helvetica,sans-serif] [&_small]:float-none [&_small]:mt-quarter [&_small]:ml-quarter [&_small]:text-text-secondary [&_small]:font-normal [&_small]:normal-case [&_small]:[font-size:inherit]" id="product-list-label">
                {$pointer("display_name")}:{" "}
                <span data-option-value={""} />{" "}
                <RequirenessMsg />
            </label>
            <$If
                test={$pointer("values.0.image")}
                $then={() => (
                    <ul className="productOptions-list m-0 max-h-[400px] overflow-y-auto [border:var(--sv-productOptions-list-border)] [list-style:none]">
                        <$Unless
                            test={required}
                            $then={() => (
                                <li className="productOptions-list-item p-single [.productOptions-list-item+&]:[border-top:var(--sv-productOptions-list-item-borderTop)] [&_.form-label]:-top-[2px] [&_.form-label]:text-left">
                                    <input
                                        className="form-radio [&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                                        type="radio"
                                        id={`attribute_productlist_${id}_none`}
                                        dangerouslyInlineAttributes={{
                                            attributes: `name="attribute[${id}]" value="" ${$Unless({test: $pointer("defaultValue"), $then: () => "checked"})}`,
                                        }}
                                    />{" "}
                                    <label className="form-label [&_small]:float-right [&_small]:mt-quarter" htmlFor={`attribute_productlist_${id}_none`}>
                                        <$Lang keyName={$string("products.none")} />
                                    </label>
                                </li>
                            )}
                        />
                        <$Each
                            list={$pointer<Value[]>("values")}
                            $then={(item) => (
                                <li className="productOptions-list-item p-single [.productOptions-list-item+&]:[border-top:var(--sv-productOptions-list-item-borderTop)] [&_.form-label]:-top-[2px] [&_.form-label]:text-left" data-product-attribute-value={item.id}>
                                    <$If
                                        test={item.image}
                                        $then={() => (
                                            <figure className="productOptions-list-item-figure w-double align-middle [display:table-cell]">
                                                <ResponsiveImg image={item.image} class={$string("productOptions-list-item-image")} lazyload={$string("lazyload+lqip")} />
                                            </figure>
                                        )}
                                    />
                                    <div className="productOptions-list-item-content pl-base-sixth align-middle [display:table-cell]">
                                        <input
                                            className="form-radio [&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                                            type="radio"
                                            id={`attribute_productlist_${id}_${item.id}`}
                                            dangerouslyInlineAttributes={{
                                                attributes: `name="attribute[${id}]" value="${item.id}"${$If({test: item.selected, $then: () => " checked data-default"})}${$If({test: required, $then: () => " required"})}`,
                                            }}
                                        />{" "}
                                        <label data-product-attribute-value={item.id} className="form-label [&_small]:float-right [&_small]:mt-quarter" htmlFor={`attribute_productlist_${id}_${item.id}`}>
                                            {item.label}
                                        </label>
                                    </div>
                                </li>
                            )}
                        />
                    </ul>
                )}
                $else={() => (
                    <>
                        <$Unless
                            test={required}
                            $then={() => (
                                <>
                                    <input
                                        className="form-radio [&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                                        type="radio"
                                        id={`attribute_productlist_0_${id}`}
                                        dangerouslyInlineAttributes={{
                                            attributes: `name="attribute[${id}]" value="0" ${$Unless({test: $pointer("defaultValue"), $then: () => "checked"})}`,
                                        }}
                                    />{" "}
                                    <label className="form-label [&_small]:float-right [&_small]:mt-quarter" htmlFor={`attribute_productlist_0_${id}`}>
                                        <$Lang keyName={$string("products.none")} />
                                    </label>{" "}
                                </>
                            )}
                        />
                        <$Each
                            list={$pointer<Value[]>("values")}
                            $then={(item) => (
                                <>
                                    <input
                                        className="form-radio [&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                                        type="radio"
                                        id={`attribute_productlist_${id}_${item.id}`}
                                        dangerouslyInlineAttributes={{
                                            attributes: `name="attribute[${id}]" value="${item.id}"${$If({test: item.selected, $then: () => " checked data-default"})}${$If({test: required, $then: () => " required"})}`,
                                        }}
                                    />{" "}
                                    <label data-product-attribute-value={item.id} className="form-label [&_small]:float-right [&_small]:mt-quarter" htmlFor={`attribute_productlist_${id}_${item.id}`}>
                                        {item.label}
                                    </label>{" "}
                                </>
                            )}
                        />
                    </>
                )}
            />
        </div>
    );
};
