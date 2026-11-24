"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import RequirenessMsg from "../../common/requireness-msg.tsx";
import {$Each, $If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface Value {
    id: string;
    label: string;
    selected: boolean;
}

export default (_props: PartialProps) => (
    <div className="form-field" data-product-attribute="set-select">
        <label className="form-label form-label--alternate form-label--inlineSmall mb-half text-smallest [font-family:'Montserrat',Arial,Helvetica,sans-serif] [&_small]:float-none [&_small]:mt-quarter [&_small]:ml-quarter [&_small]:text-text-secondary [&_small]:font-normal [&_small]:normal-case [&_small]:[font-size:inherit]" htmlFor={`attribute_select_${$pointer("id")}`}>
            {$pointer("display_name")}:{" "}
            <RequirenessMsg />
        </label>
        <select
            className="form-select form-select--small h-[2.28571rem] max-w-[20rem] py-[0.57143rem] pr-[2rem] pl-[0.78571rem] text-[13px] leading-[1rem] [background-position:right_0.5rem_top_0.5rem] [background-size:1.28571rem]"
            id={`attribute_select_${$pointer("id")}`}
            dangerouslyInlineAttributes={{
                attributes: `name="attribute[${$pointer("id")}]" ${$If({test: $pointer("required"), $then: () => "required"})}`,
            }}
        >
            <option value="">
                <$Lang keyName={$string("products.choose_options")} />
            </option>
            <$Each
                list={$pointer<Value[]>("values")}
                $then={(item) => (
                    <option
                        dangerouslyInlineAttributes={{
                            attributes: `data-product-attribute-value="${item.id}" value="${item.id}"${$If({test: item.selected, $then: () => " selected data-default"})}`,
                        }}
                    >
                        {item.label}
                    </option>
                )}
            />
        </select>
    </div>
);
