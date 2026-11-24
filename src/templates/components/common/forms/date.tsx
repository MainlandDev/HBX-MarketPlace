"use server";
import FormsDateOptions from "./date-options.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {$ifAttribute} from "@/components/hbx/ifAttribute.ts";
import {FormField, FormLabel, FormSelect} from "../../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <FormField id={$pointer("id")} data-validation={$pointer("validation")} dangerouslyInlineAttributes={{attributes: `${$ifAttribute("data-type", "private_id")}`}}>
        <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor={$pointer("id")}>
            {$pointer("label")}
            <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
        </FormLabel>
        <div className="form-row form-row--third [:where(&)]:-mx-[0.75rem] [:where(&)]:max-w-none [:where(&)]:w-auto [:where(&)]:[display:flow-root] [:where(&_.form-field)]:float-left [:where(&_.form-field)]:w-full [:where(&_.form-field)]:max-w-none [:where(&_.form-field)]:px-[0.75rem] small:[:where(&_.form-field)]:w-[33.33333%]">
            <FormField>
                <FormSelect
                    name={$pointer("month.name")}
                    id={`${$pointer("id")}_month`}
                    data-label="month"
                    data-input={""}
                    aria-required={$pointer("required")}
                    aria-labelledby={$pointer("id")}
                    aria-live="polite"
                    dangerouslyInlineAttributes={{attributes: `${$ifAttribute("data-field-type", "private_id")}`}}
                >
                    <FormsDateOptions $positionalHash={$pointer("month")} isRequired={$pointer("required")} />
                </FormSelect>
            </FormField>
            <FormField>
                <FormSelect
                    name={$pointer("day.name")}
                    id={`${$pointer("id")}_day`}
                    data-label="day"
                    data-input={""}
                    aria-required={$pointer("required")}
                    aria-labelledby={$pointer("id")}
                    aria-live="polite"
                    dangerouslyInlineAttributes={{attributes: `${$ifAttribute("data-field-type", "private_id")}`}}
                >
                    <FormsDateOptions $positionalHash={$pointer("day")} isRequired={$pointer("required")} />
                </FormSelect>
            </FormField>
            <FormField>
                <FormSelect
                    name={$pointer("year.name")}
                    id={`${$pointer("id")}_year`}
                    data-label="year"
                    data-input={""}
                    aria-required={$pointer("required")}
                    aria-labelledby={$pointer("id")}
                    aria-live="polite"
                    dangerouslyInlineAttributes={{attributes: `${$ifAttribute("data-field-type", "private_id")}`}}
                >
                    <FormsDateOptions $positionalHash={$pointer("year")} isRequired={$pointer("required")} />
                </FormSelect>
            </FormField>
        </div>
    </FormField>
);
