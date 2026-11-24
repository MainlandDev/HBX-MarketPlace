"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {$ifAttribute} from "@/components/hbx/ifAttribute.ts";
import {FormCheck, FormField, FormLabel} from "../../../../server/formParts.tsx";

interface Checkbox {
    id: string;
    name: string;
    value: string;
    label: string;
    class: string;
}

export default (_props: PartialProps) => (
    <FormField
        id={$pointer("id")}
        data-validation={$pointer("validation")}
        dangerouslyInlineAttributes={{attributes: `${$ifAttribute("data-type", "private_id")}`}}
    >
        <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor={$pointer("id")}>
            {$pointer("label")}
            <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
        </FormLabel>
        <$If
            test={$pointer("checkboxes")}
            $then={() => (
                <$Each
                    list={$pointer<Checkbox[]>("checkboxes")}
                    $then={(item) => (
                        <>
                            <FormCheck
                                type="checkbox"
                                id={item.name}
                                data-input={""}
                                data-label={item.label}
                                kind="checkbox" className="[&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                                aria-labelledby={item.id}
                                aria-live="polite"
                                dangerouslyInlineAttributes={{
                                    attributes: `name="${item.name}" value="${item.value}" ${$If({test: $pointer("checked"), $then: () => "checked"})} ${$ifAttribute("data-field-type", "private_id")}`,
                                }}
                            />
                            <FormLabel check="checkbox" className={item.class} htmlFor={item.name}>
                                {item.label}
                            </FormLabel>
                        </>
                    )}
                />
            )}
        />
    </FormField>
);
