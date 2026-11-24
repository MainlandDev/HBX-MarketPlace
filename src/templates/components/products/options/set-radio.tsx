"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import RequirenessMsg from "../../common/requireness-msg.tsx";
import {$Each, $If, $Lang, $pointer, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";

interface Value {
    id: string;
    label: string;
    selected: boolean;
}

export default (_props: PartialProps) => {
    // Read outside the loop, so inside it the path gains `../` (`{{../id}}`, `{{../required}}`).
    const id = $pointer("id");
    const required = $pointer("required");
    return (
        <div className="form-field [&_.unavailable]:opacity-[calc(var(--sv-productOptions-disable-opacity)*2)] [&_.unavailable]:line-through" data-product-attribute="set-radio" role="radiogroup" aria-labelledby={`radio-group-label-${id}`}>
            <label className="form-label form-label--alternate form-label--inlineSmall mb-half text-smallest [font-family:'Montserrat',Arial,Helvetica,sans-serif] [&_small]:float-none [&_small]:mt-quarter [&_small]:ml-quarter [&_small]:text-text-secondary [&_small]:font-normal [&_small]:normal-case [&_small]:[font-size:inherit]" id={`radio-group-label-${id}`}>
                {$pointer("display_name")}:{" "}
                <RequirenessMsg />
            </label>
            <$Unless
                test={required}
                $then={() => (
                    <>
                        <input
                            className="form-radio [&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                            type="radio"
                            id={`attribute_radio_${id}_none`}
                            dangerouslyInlineAttributes={{
                                attributes: `name="attribute[${id}]" value="" checked="${$If({test: $pointer("defaultValue"), operator: $string("=="), rvalue: $string(""), $then: () => "checked"})}"`,
                            }}
                        />{" "}
                        <label className="form-label [&_small]:float-right [&_small]:mt-quarter" htmlFor={`attribute_radio_${id}_none`}>
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
                            id={`attribute_radio_${id}_${item.id}`}
                            dangerouslyInlineAttributes={{
                                attributes: `name="attribute[${id}]" value="${item.id}"${$If({test: item.selected, $then: () => " checked data-default"})}${$If({test: required, $then: () => " required"})}`,
                            }}
                        />{" "}
                        <label data-product-attribute-value={item.id} className="form-label [&_small]:float-right [&_small]:mt-quarter" htmlFor={`attribute_radio_${id}_${item.id}`}>
                            {item.label}
                        </label>{" "}
                    </>
                )}
            />
        </div>
    );
};
