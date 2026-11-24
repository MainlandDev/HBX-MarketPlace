"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {$ifAttribute} from "@/components/hbx/ifAttribute.ts";
import {FormField, FormLabel, FormSelect} from "../../../../server/formParts.tsx";

interface SelectOption {
    value: string;
    label: string;
}

export default (_props: PartialProps) => (
    <FormField
        id={$pointer("id")}
        data-validation={$pointer("validation")}
        dangerouslyInlineAttributes={{attributes: `${$ifAttribute("data-type", "private_id", " ", " ")}`}}
    >
        <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor={`${$pointer("id")}_select`}>
            {$pointer("label")}
            <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
        </FormLabel>
        <FormSelect
            className={$pointer("class")}
            id={`${$pointer("id")}_select`}
            data-label={$pointer("label")}
            data-input={""}
            aria-required={$pointer("required")}
            aria-labelledby={$pointer("id")}
            aria-live="polite"
            dangerouslyInlineAttributes={{
                attributes: `name="${$pointer("name")}" ${$ifAttribute("data-field-type", "private_id", " ", " ")}`,
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
                                    {$unescaped(item.label)}
                                </option>
                            )}
                        />
                    </>
                )}
            />
        </FormSelect>
    </FormField>
);
