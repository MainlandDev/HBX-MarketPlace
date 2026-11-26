"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import RequirenessMsg from "../../common/requireness-msg.tsx";
import {$Each, $If, $Lang, $pointer, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";
import {FormCheck, FormField, FormLabel} from "../../../../server/formParts.tsx";

interface Value {
    id: string;
    label: string;
    selected: boolean;
}

export default (_props: PartialProps) => {
    // Read outside the loop, so inside it the path gains `../` (`{{../id}}`, `{{../required}}`).
    const id = $pointer("id");
    const required = $pointer("required");
    return (
        <FormField data-product-attribute="set-rectangle" role="radiogroup" aria-labelledby="rectangle-group-label">
            <FormLabel className="form-label--alternate form-label--inlineSmall mb-half text-smallest font-(family-name:--sv-fontFamily-headings) [&_small]:float-none [&_small]:mt-quarter [&_small]:ml-quarter [&_small]:text-text-secondary [&_small]:font-normal [&_small]:normal-case [&_small]:[font-size:inherit]" id="rectangle-group-label">
                {$pointer("display_name")}:{" "}
                <span data-option-value={""} />{" "}
                <RequirenessMsg />
            </FormLabel>
            <$Unless
                test={required}
                $then={() => (
                    <>
                        <FormCheck
                            kind="radio" className="[&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                            type="radio"
                            id={`attribute_rectangle__${id}_none`}
                            dangerouslyInlineAttributes={{
                                attributes: `name="attribute[${id}]" value="" checked="${$If({test: $pointer("defaultValue"), operator: $string("=="), rvalue: $string(""), $then: () => "checked"})}"`,
                            }}
                        />{" "}
                        <label className="form-option mr-third mb-third cursor-pointer border border-(--sv-setting-input-border-color) p-px text-[0px] text-(--sv-setting-form-label-font-color) [display:inline-block] [transition:all_0.15s_ease] hover:border-(--sv-setting-input-border-color-active) [[class~=form-radio]:checked+&]:border-(--sv-setting-checkRadio-color) [[class~=form-radio]:checked+&]:[box-shadow:0_0_0_1px_var(--sv-setting-checkRadio-color)] [[data-product-attribute]_&]:relative [[data-product-attribute]_&]:overflow-hidden [&.unavailable]:bg-(--sv-productOptions-disable-background-color) [&.unavailable]:opacity-(--sv-productOptions-disable-opacity) [&.unavailable]:before:absolute [&.unavailable]:before:top-[11px] [&.unavailable]:before:-left-[5px] [&.unavailable]:before:h-[2px] [&.unavailable]:before:w-[141%] [&.unavailable]:before:bg-(--sv-productOptions-strikethrough-color) [&.unavailable]:before:[transform:rotate(-45deg)] [&.unavailable]:before:content-['']" htmlFor={`attribute_rectangle__${id}_none`}>
                            <span className="form-option-variant min-w-[2.71429rem] text-center text-(length:--sv-body-fontSize) [pointer-events:none] [display:inline-block]">
                                <$Lang keyName={$string("products.none")} />
                            </span>
                        </label>{" "}
                    </>
                )}
            />
            <$Each
                list={$pointer<Value[]>("values")}
                $then={(item) => (
                    <div className="form-option-wrapper relative [display:inline-block] [&_.form-radio]:bottom-[0.5rem] [&_.form-radio]:left-[0.5rem] [&_.form-checkbox]:bottom-[0.5rem] [&_.form-checkbox]:left-[0.5rem]">
                        <FormCheck
                            kind="radio" className="[&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                            type="radio"
                            id={`attribute_rectangle__${id}_${item.id}`}
                            dangerouslyInlineAttributes={{
                                attributes: `name="attribute[${id}]" value="${item.id}"${$If({test: item.selected, $then: () => " checked data-default"})}${$If({test: required, $then: () => " required"})}`,
                            }}
                        />{" "}
                        <label className="form-option mr-third mb-third cursor-pointer border border-(--sv-setting-input-border-color) p-px text-[0px] text-(--sv-setting-form-label-font-color) [display:inline-block] [transition:all_0.15s_ease] hover:border-(--sv-setting-input-border-color-active) [[class~=form-radio]:checked+&]:border-(--sv-setting-checkRadio-color) [[class~=form-radio]:checked+&]:[box-shadow:0_0_0_1px_var(--sv-setting-checkRadio-color)] [[data-product-attribute]_&]:relative [[data-product-attribute]_&]:overflow-hidden [&.unavailable]:bg-(--sv-productOptions-disable-background-color) [&.unavailable]:opacity-(--sv-productOptions-disable-opacity) [&.unavailable]:before:absolute [&.unavailable]:before:top-[11px] [&.unavailable]:before:-left-[5px] [&.unavailable]:before:h-[2px] [&.unavailable]:before:w-[141%] [&.unavailable]:before:bg-(--sv-productOptions-strikethrough-color) [&.unavailable]:before:[transform:rotate(-45deg)] [&.unavailable]:before:content-['']" htmlFor={`attribute_rectangle__${id}_${item.id}`} data-product-attribute-value={item.id}>
                            <span className="form-option-variant min-w-[2.71429rem] text-center text-(length:--sv-body-fontSize) [pointer-events:none] [display:inline-block]">{item.label}</span>
                        </label>{" "}
                    </div>
                )}
            />
        </FormField>
    );
};
