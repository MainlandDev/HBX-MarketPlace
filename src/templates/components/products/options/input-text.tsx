"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import RequirenessMsg from "../../common/requireness-msg.tsx";
import {$If, $pointer, $raw} from "@mainlanddev/hbx-bigcommerce";
import {FormField, FormInput, FormLabel} from "../../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <FormField data-product-attribute="input-text">
        <FormLabel className="form-label--alternate form-label--inlineSmall mb-half text-smallest [font-family:'Montserrat',Arial,Helvetica,sans-serif] [&_small]:float-none [&_small]:mt-quarter [&_small]:ml-quarter [&_small]:text-text-secondary [&_small]:font-normal [&_small]:normal-case [&_small]:[font-size:inherit]" htmlFor={`attribute_text_${$pointer("id")}`}>
            {$pointer("display_name")}:{" "}
            <RequirenessMsg />
        </FormLabel>
        <FormInput
            className="form-input--small h-[2.28571rem] px-[0.78571rem] py-[0.57143rem] text-[13px] leading-[1rem]"
            type="text"
            id={`attribute_text_${$pointer("id")}`}
            dangerouslyInlineAttributes={{
                attributes: `name="attribute[${$pointer("id")}]" value="${$pointer("prefill")}" ${$If({test: $pointer("required"), $then: () => "required"})} ${$If({test: $pointer("max_length"), $then: () => `${$raw('maxlength="')}${$pointer("max_length")}${$raw('"')}`})}`,
            }}
        />
    </FormField>
);
