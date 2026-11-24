"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {$ifAttribute} from "@/components/hbx/ifAttribute.ts";
import {FormField, FormInput, FormLabel, FormSelect} from "../../../../server/formParts.tsx";

interface SelectOption {
    value: string;
    label: string;
}

export default (_props: PartialProps) => (
    <FormField
        id={$pointer("id")}
        data-validation={$pointer("validation")}
        dangerouslyInlineAttributes={{attributes: `${$ifAttribute("data-type", "private_id")}`}}
    >
        <noscript>
            <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor={`${$pointer("id")}_input`}>
                {$pointer("label")}
                <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
            </FormLabel>
            <FormInput
                type="text"
                id={`${$pointer("id")}_input`}
                aria-required={$pointer("required")}
                aria-labelledby={$pointer("id")}
                aria-live="polite"
                data-label={$pointer("label")}
                data-input={""}
                name={$pointer("name")}
                value={$pointer("value")}
            />
        </noscript>

        <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor={`${$pointer("id")}_select`}>
            {$pointer("label")}
            <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
        </FormLabel>
        <FormSelect
            aria-required={$pointer("required")}
            aria-labelledby={$pointer("id")}
            aria-live="polite"
            id={`${$pointer("id")}_select`}
            data-label={$pointer("label")}
            data-input={""}
            dangerouslyInlineAttributes={{
                attributes: `name="${$pointer("name")}" ${$ifAttribute("data-field-type", "private_id")}`,
            }}
        >
            <$If
                test={$pointer("options")}
                $then={() => (
                    <>
                        <option value="">{$pointer("chooseprefix")}</option>
                        <$Each
                            list={$pointer<SelectOption[]>("options")}
                            $then={(item) => (
                                <option dangerouslyInlineAttributes={{attributes: `${$If({test: $pointer("selected"), $then: () => " selected "})}value="${item.value}"`}}>
                                    {item.label}
                                </option>
                            )}
                        />
                    </>
                )}
            />
        </FormSelect>
    </FormField>
);
