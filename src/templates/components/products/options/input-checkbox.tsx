"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import RequirenessMsg from "../../common/requireness-msg.tsx";
import {$If, $pointer} from "@mainlanddev/hbx-bigcommerce";
import {FormCheck, FormField, FormLabel} from "../../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <FormField data-product-attribute="input-checkbox">
        <FormLabel className="form-label--alternate form-label--inlineSmall mb-half text-smallest font-(family-name:--sv-fontFamily-headings) [&_small]:float-none [&_small]:mt-quarter [&_small]:ml-quarter [&_small]:text-text-secondary [&_small]:font-normal [&_small]:normal-case [&_small]:[font-size:inherit]">
            {$pointer("display_name")}:{" "}
            <RequirenessMsg />
        </FormLabel>
        <input type="hidden" name={`attribute[${$pointer("id")}]`} value={$pointer("noValue")} />
        <div className="form-option-wrapper relative [display:inline-block] [&_.form-radio]:bottom-[0.5rem] [&_.form-radio]:left-[0.5rem] [&_.form-checkbox]:bottom-[0.5rem] [&_.form-checkbox]:left-[0.5rem]">
            <FormCheck
                kind="checkbox" className="[&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                type="checkbox"
                id={`attribute-check-${$pointer("id")}`}
                dangerouslyInlineAttributes={{
                    attributes: `name="attribute[${$pointer("id")}]" value="${$pointer("value")}"${$If({test: $pointer("checked"), $then: () => " checked data-default"})}${$If({test: $pointer("required"), $then: () => " required"})}`,
                }}
            />
            <FormLabel check="checkbox" className={$pointer("class")} htmlFor={`attribute-check-${$pointer("id")}`}>
                {$pointer("label")}
            </FormLabel>
        </div>
    </FormField>
);
