"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {$ifAttribute} from "@/components/hbx/ifAttribute.ts";
import {FormField, FormInput, FormLabel} from "../../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <FormField id={$pointer("id")} data-validation={$pointer("validation")}>
        <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor={`${$pointer("id")}_input`}>
            {$pointer("label")}
            <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
        </FormLabel>
        <FormInput
            id={`${$pointer("id")}_input`}
            data-label={$pointer("label")}
            aria-required={$pointer("required")}
            aria-labelledby={$pointer("id")}
            aria-live="polite"
            data-input={""}
            tag="textarea"
            value={$pointer("value")}
            dangerouslyInlineAttributes={{attributes: `name="${$pointer("name")}" rows="${$pointer("rows")}" ${$ifAttribute("data-field-type", "private_id")}`}}
        />
    </FormField>
);
