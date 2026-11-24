"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import RequirenessMsg from "../../common/requireness-msg.tsx";
import {$If, $pointer, $raw, $Unless} from "@mainlanddev/hbx-bigcommerce";
import {FormField, FormInput, FormLabel} from "../../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <FormField data-product-attribute="input-number">
        <FormLabel className="form-label--alternate form-label--inlineSmall mb-half text-smallest [font-family:'Montserrat',Arial,Helvetica,sans-serif] [&_small]:float-none [&_small]:mt-quarter [&_small]:ml-quarter [&_small]:text-text-secondary [&_small]:font-normal [&_small]:normal-case [&_small]:[font-size:inherit]" htmlFor={`attribute_number_${$pointer("id")}`}>
            {$pointer("display_name")}:{" "}
            <RequirenessMsg />
        </FormLabel>
        <FormInput
            type="number"
            id={`attribute_number_${$pointer("id")}`}
            dangerouslyInlineAttributes={{
                attributes: `${$Unless({test: $pointer("integer_only"), $then: () => $raw('step="any"')})} name="attribute[${$pointer("id")}]" value="${$pointer("prefill")}" ${$If({test: $pointer("required"), $then: () => "required"})}`,
            }}
        />
    </FormField>
);
