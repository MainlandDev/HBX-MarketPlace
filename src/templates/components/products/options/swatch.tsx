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
                    className="form-option-variant form-option-variant--pattern"
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
                        className="form-option-variant form-option-variant--color"
                        title={$pointer("label")}
                        dangerouslyInlineAttributes={{attributes: `style="background-color: #${$pointer("data.[0]")}"`}}
                    />{" "}
                    <span
                        className="form-option-variant form-option-variant--color"
                        title={$pointer("label")}
                        dangerouslyInlineAttributes={{attributes: `style="background-color: #${$pointer("data.[1]")}"`}}
                    />{" "}
                    <span
                        className="form-option-variant form-option-variant--color"
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
                                className="form-option-variant form-option-variant--color"
                                title={$pointer("label")}
                                dangerouslyInlineAttributes={{attributes: `style="background-color: #${$pointer("data.[0]")}"`}}
                            />{" "}
                            <span
                                className="form-option-variant form-option-variant--color"
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
                                    className="form-option-variant form-option-variant--color"
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
            <label className="form-label form-label--alternate form-label--inlineSmall" id={`swatchGroup_${id}`}>
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
                            className="form-radio"
                            type="radio"
                            id={`attribute_swatch_${id}_none`}
                            dangerouslyInlineAttributes={{
                                attributes: `name="attribute[${id}]" value="" checked="${$If({test: $pointer("defaultValue"), operator: $string("=="), rvalue: $string(""), $then: () => "checked"})}" aria-label="${$lang($string("products.none"))}"`,
                            }}
                        />{" "}
                        <label className="form-option form-option-swatch" htmlFor={`attribute_swatch_${id}_none`}>
                            <span className="form-option-variant form-option-variant--none" title={$lang($string("products.none"))}>
                                <$Lang keyName={$string("products.none")} />
                            </span>
                        </label>{" "}
                    </>
                )}
            />
            <$Each
                list={$pointer<Value[]>("values")}
                $then={(item) => (
                    <div className="form-option-wrapper">
                        <input
                            className="form-radio"
                            type="radio"
                            id={`attribute_swatch_${id}_${item.id}`}
                            dangerouslyInlineAttributes={{
                                attributes: `name="attribute[${id}]" value="${item.id}"${$If({test: item.selected, $then: () => " checked data-default"})}${$If({test: required, $then: () => " required"})} aria-label="${item.label}"`,
                            }}
                        />{" "}
                        <label className="form-option form-option-swatch" htmlFor={`attribute_swatch_${id}_${item.id}`} data-product-attribute-value={item.id}>
                            {variants()}{" "}
                            <$If
                                test={item.pattern}
                                $then={() => (
                                    <span className="form-option-expanded">
                                        <span
                                            className="form-option-image"
                                            dangerouslyInlineAttributes={{attributes: `style="background-image: url('${$raw("{{getImage image 'core-swatch'}}")}');"`}}
                                        />
                                    </span>
                                )}
                            />
                        </label>{" "}
                        {/* The colour selector shows this beside its title while the radio is checked (CSS only, so it works without JS). */}
                        <span className="form-option-active-copy" aria-hidden="true">
                            {variants()}
                        </span>
                    </div>
                )}
            />
        </div>
    );
};
