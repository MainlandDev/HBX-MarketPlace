"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import RequirenessMsg from "../../common/requireness-msg.tsx";
import {$Each, $If, $Lang, $lang, $pointer, $string, $Unless, $raw} from "@mainlanddev/hbx-bigcommerce";

interface Value {
    id: string;
    label: string;
    selected: boolean;
    image: {data: string};
    pattern: boolean;
}

/**
 * The swatch of one value: its image and/or up to three colours. Used by the label and by the active-colour copy beside it.
 * An image swatch also carries a larger image (`gallery_size`) in `--swatch-image-large`: the 22x22 `swatch_option_size` one is made for the
 * small default swatch, and the colour selector's tiles would show it tiny and blurred. Only CSS that reads the variable fetches it.
 */
const variants = () => (
    <>
        <$If
            test={$pointer("image")}
            $then={() => (
                <span
                    className="form-option-variant text-center text-(length:--sv-body-fontSize) [pointer-events:none] [display:inline-block] min-w-[initial] p-0 small:[pointer-events:inherit] form-option-variant--pattern bg-center bg-no-repeat"
                    title={$pointer("label")}
                    dangerouslyInlineAttributes={{attributes: `style="background-image: url('${$raw('{{getImage image "swatch_option_size"}}')}'); --swatch-image-large: url('${$raw('{{getImage image "gallery_size"}}')}');"`}}
                />
            )}
        />{" "}
        <$If
            test={$pointer("data.[2]")}
            $then={() => (
                <>
                    <span
                        className="form-option-variant text-center text-(length:--sv-body-fontSize) [pointer-events:none] [display:inline-block] min-w-[initial] p-0 small:[pointer-events:inherit] form-option-variant--color"
                        title={$pointer("label")}
                        dangerouslyInlineAttributes={{attributes: `style="background-color: #${$pointer("data.[0]")}"`}}
                    />{" "}
                    <span
                        className="form-option-variant text-center text-(length:--sv-body-fontSize) [pointer-events:none] [display:inline-block] min-w-[initial] p-0 small:[pointer-events:inherit] form-option-variant--color"
                        title={$pointer("label")}
                        dangerouslyInlineAttributes={{attributes: `style="background-color: #${$pointer("data.[1]")}"`}}
                    />{" "}
                    <span
                        className="form-option-variant text-center text-(length:--sv-body-fontSize) [pointer-events:none] [display:inline-block] min-w-[initial] p-0 small:[pointer-events:inherit] form-option-variant--color"
                        title={$pointer("label")}
                        dangerouslyInlineAttributes={{attributes: `style="background-color: #${$pointer("data.[2]")}"`}}
                    />
                </>
            )}
            $else={() => (
                <$If
                    test={$pointer("data.[1]")}
                    $then={() => (
                        <>
                            <span
                                className="form-option-variant text-center text-(length:--sv-body-fontSize) [pointer-events:none] [display:inline-block] min-w-[initial] p-0 small:[pointer-events:inherit] form-option-variant--color"
                                title={$pointer("label")}
                                dangerouslyInlineAttributes={{attributes: `style="background-color: #${$pointer("data.[0]")}"`}}
                            />{" "}
                            <span
                                className="form-option-variant text-center text-(length:--sv-body-fontSize) [pointer-events:none] [display:inline-block] min-w-[initial] p-0 small:[pointer-events:inherit] form-option-variant--color"
                                title={$pointer("label")}
                                dangerouslyInlineAttributes={{attributes: `style="background-color: #${$pointer("data.[1]")}"`}}
                            />
                        </>
                    )}
                    $else={() => (
                        <$If
                            test={$pointer("data.[0]")}
                            $then={() => (
                                <span
                                    className="form-option-variant text-center text-(length:--sv-body-fontSize) [pointer-events:none] [display:inline-block] min-w-[initial] p-0 small:[pointer-events:inherit] form-option-variant--color"
                                    title={$pointer("label")}
                                    dangerouslyInlineAttributes={{attributes: `style="background-color: #${$pointer("data.[0]")}"`}}
                                />
                            )}
                        />
                    )}
                />
            )}
        />
    </>
);

export default (_props: PartialProps) => {
    // Read outside the loop, so inside it the path gains `../` (`{{../id}}`, `{{../required}}`).
    const id = $pointer("id");
    const required = $pointer("required");
    return (
        <div className="form-field" data-product-attribute="swatch" role="radiogroup" aria-labelledby={`swatchGroup_${id}`}>
            <label className="form-label form-label--alternate form-label--inlineSmall mb-half text-smallest [font-family:'Montserrat',Arial,Helvetica,sans-serif] [&_small]:float-none [&_small]:mt-quarter [&_small]:ml-quarter [&_small]:text-text-secondary [&_small]:font-normal [&_small]:normal-case [&_small]:[font-size:inherit]" id={`swatchGroup_${id}`}>
                {$pointer("display_name")}:{" "}
                <span data-option-value={""} />{" "}
                <RequirenessMsg />
            </label>
            <span className="swatch-option-message aria-description--hidden u-hidden">
                <$Lang keyName={$string("products.swatch_option_announcement")} swatch_name={$pointer("display_name")} />
            </span>
            <$Unless
                test={required}
                $then={() => (
                    <>
                        <input
                            className="form-radio [&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                            type="radio"
                            id={`attribute_swatch_${id}_none`}
                            dangerouslyInlineAttributes={{
                                attributes: `name="attribute[${id}]" value="" checked="${$If({test: $pointer("defaultValue"), operator: $string("=="), rvalue: $string(""), $then: () => "checked"})}" aria-label="${$lang($string("products.none"))}"`,
                            }}
                        />{" "}
                        <label className="form-option mr-third mb-third cursor-pointer border border-(--sv-setting-input-border-color) p-px text-[0px] text-(--sv-setting-form-label-font-color) [display:inline-block] [transition:all_0.15s_ease] hover:border-(--sv-setting-input-border-color-active) [[class~=form-radio]:checked+&]:border-(--sv-setting-checkRadio-color) [[class~=form-radio]:checked+&]:[box-shadow:0_0_0_1px_var(--sv-setting-checkRadio-color)] [[data-product-attribute]_&]:relative [[data-product-attribute]_&]:overflow-hidden [&.unavailable]:bg-(--sv-productOptions-disable-background-color) [&.unavailable]:opacity-(--sv-productOptions-disable-opacity) [&.unavailable]:before:absolute [&.unavailable]:before:top-[11px] [&.unavailable]:before:-left-[5px] [&.unavailable]:before:h-[2px] [&.unavailable]:before:w-[141%] [&.unavailable]:before:bg-(--sv-productOptions-strikethrough-color) [&.unavailable]:before:[transform:rotate(-45deg)] [&.unavailable]:before:content-[''] form-option-swatch" htmlFor={`attribute_swatch_${id}_none`}>
                            <span className="form-option-variant min-w-[2.71429rem] px-quarter py-px text-center text-(length:--sv-body-fontSize) [pointer-events:none] [display:inline-block] form-option-variant--none h-[22px] overflow-hidden" title={$lang($string("products.none"))}>
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
                        <input
                            className="form-radio [&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                            type="radio"
                            id={`attribute_swatch_${id}_${item.id}`}
                            dangerouslyInlineAttributes={{
                                attributes: `name="attribute[${id}]" value="${item.id}"${$If({test: item.selected, $then: () => " checked data-default"})}${$If({test: required, $then: () => " required"})} aria-label="${item.label}"`,
                            }}
                        />{" "}
                        <label className="form-option mr-third mb-third cursor-pointer border border-(--sv-setting-input-border-color) p-px text-[0px] text-(--sv-setting-form-label-font-color) [display:inline-block] [transition:all_0.15s_ease] hover:border-(--sv-setting-input-border-color-active) [[class~=form-radio]:checked+&]:border-(--sv-setting-checkRadio-color) [[class~=form-radio]:checked+&]:[box-shadow:0_0_0_1px_var(--sv-setting-checkRadio-color)] [[data-product-attribute]_&]:relative [[data-product-attribute]_&]:overflow-hidden [&.unavailable]:bg-(--sv-productOptions-disable-background-color) [&.unavailable]:opacity-(--sv-productOptions-disable-opacity) [&.unavailable]:before:absolute [&.unavailable]:before:top-[11px] [&.unavailable]:before:-left-[5px] [&.unavailable]:before:h-[2px] [&.unavailable]:before:w-[141%] [&.unavailable]:before:bg-(--sv-productOptions-strikethrough-color) [&.unavailable]:before:[transform:rotate(-45deg)] [&.unavailable]:before:content-[''] form-option-swatch" htmlFor={`attribute_swatch_${id}_${item.id}`} data-product-attribute-value={item.id}>
                            {variants()}{" "}
                            <$If
                                test={item.pattern}
                                $then={() => (
                                    <span className="form-option-expanded absolute top-[calc(100%+5px)] left-[calc(100%+55px)] border border-(color:--sv-setting-input-border-color-active) bg-(--sv-setting-body-bg) p-[3px] opacity-0 [transition:opacity_0.3s_cubic-bezier(0.25,0.46,0.45,0.94)] [visibility:hidden] [[class~=form-option]:hover_&]:z-[5000] [[class~=form-option]:hover_&]:opacity-100 [[class~=form-option]:hover_&]:[transform:translate(-50%,0)] [[class~=form-option]:hover_&]:[visibility:visible]">
                                        <span
                                            className="form-option-image h-[100px] w-[100px] bg-[position:50%] bg-cover bg-no-repeat [display:block]"
                                            dangerouslyInlineAttributes={{attributes: `style="background-image: url('${$raw("{{getImage image 'core-swatch'}}")}');"`}}
                                        />
                                    </span>
                                )}
                            />
                        </label>{" "}
                        {/* The colour selector shows this beside its title while the radio is checked (CSS only, so it works without JS). */}
                        <span className="form-option-active-copy [display:none] [[data-variant-colours]_[class~=form-radio]:checked~&]:[display:flex] [[data-variant-colours]_[class~=form-radio]:checked~&]:absolute [[data-variant-colours]_[class~=form-radio]:checked~&]:top-[1rem] [[data-variant-colours]_[class~=form-radio]:checked~&]:left-[1rem] [[data-variant-colours]_[class~=form-radio]:checked~&]:z-[1] [[data-variant-colours]_[class~=form-radio]:checked~&]:h-[3rem] [[data-variant-colours]_[class~=form-radio]:checked~&]:w-[3rem] [[data-variant-colours]_[class~=form-radio]:checked~&]:overflow-hidden [[data-variant-colours]_[class~=form-radio]:checked~&]:rounded-[12px] [[data-variant-colours]_[class~=form-radio]:checked~&]:pointer-events-none" aria-hidden="true">
                            {variants()}
                        </span>
                    </div>
                )}
            />
        </div>
    );
};
