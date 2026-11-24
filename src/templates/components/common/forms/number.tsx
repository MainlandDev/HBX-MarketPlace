"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $lang, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {$ifAttribute} from "@/components/hbx/ifAttribute.ts";
import {FormField, FormInput, FormLabel} from "../../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <FormField id={$pointer("id")} data-validation={$pointer("validation")}>
        <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor={`${$pointer("id")}_input`}>
            {$pointer("label")}
            <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
        </FormLabel>
        <FormInput
            type="number"
            data-label={$pointer("label")}
            data-input={""}
            data-rule="lowerThan"
            min={$pointer("limitfrom")}
            max={$pointer("limitto")}
            title={$lang($string("forms.range"), {limitFrom: $pointer("limitfrom"), limitTo: $pointer("limitto")})}
            id={`${$pointer("id")}_input`}
            aria-required={$pointer("required")}
            aria-labelledby={$pointer("id")}
            aria-live="polite"
            dangerouslyInlineAttributes={{attributes: `name="${$pointer("name")}" value="${$pointer("value")}" ${$ifAttribute("data-field-type", "private_id")}`}}
        />
    </FormField>
);
