"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {$ifAttribute} from "@/components/hbx/ifAttribute.ts";
import {FormCheck, FormField, FormLabel} from "../../../../server/formParts.tsx";

interface Radio {
    id: string;
    value: string;
    label: string;
    required: string;
}

export default (_props: PartialProps) => {
    // Read outside the loop, so inside it the path gains `../` (`{{../name}}`).
    const name = $pointer("name");
    return (
        <FormField id={$pointer("id")} data-validation={$pointer("validation")}>
            <FormLabel className="[&_small]:float-right [&_small]:mt-quarter">
                {$pointer("label")}
                <$If test={$pointer("required")} $then={() => <small><$Lang keyName={$string("common.required")} /></small>} />
            </FormLabel>
            <$If
                test={$pointer("radios")}
                $then={() => (
                    <$Each
                        list={$pointer<Radio[]>("radios")}
                        $then={(item, loop) => (
                            <>
                                <FormCheck
                                    type="radio"
                                    kind="radio" className="[&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                                    id={`${name}_${loop["@index"]}`}
                                    data-label={item.label}
                                    data-input={""}
                                    aria-required={item.required}
                                    aria-labelledby={item.id}
                                    aria-live="polite"
                                    dangerouslyInlineAttributes={{
                                        attributes: `name="${name}" value="${item.value}" ${$If({test: $pointer("checked"), $then: () => "checked"})} ${$ifAttribute("data-field-type", "private_id")}`,
                                    }}
                                />
                                <FormLabel check="radio" className="[&_small]:float-right [&_small]:mt-quarter" htmlFor={`${name}_${loop["@index"]}`}>
                                    {item.label}
                                </FormLabel>
                            </>
                        )}
                    />
                )}
            />
        </FormField>
    );
};
