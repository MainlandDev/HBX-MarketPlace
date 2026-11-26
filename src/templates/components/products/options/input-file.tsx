"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import RequirenessMsg from "../../common/requireness-msg.tsx";
import {$And, $If, $Lang, $lang, $pointer, $string, $unescaped, $unlessExpression} from "@mainlanddev/hbx-bigcommerce";
import {FormField, FormLabel} from "../../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <FormField data-product-attribute="input-file">
        <FormLabel className="form-label--alternate form-label--inlineSmall mb-half text-smallest font-(family-name:--sv-fontFamily-headings) [&_small]:float-none [&_small]:mt-quarter [&_small]:ml-quarter [&_small]:text-text-secondary [&_small]:font-normal [&_small]:normal-case [&_small]:[font-size:inherit]" htmlFor={`attribute_file_${$pointer("id")}`}>
            {$pointer("display_name")}:{" "}
            <RequirenessMsg />
        </FormLabel>
        <input
            className="form-file mb-third"
            type="file"
            id={`attribute_file_${$pointer("id")}`}
            dangerouslyInlineAttributes={{
                attributes: `name="attribute[${$pointer("id")}]" ${$And({a: $pointer("required"), b: $unlessExpression($pointer("prefill")), $then: () => "required"})}`,
            }}
        />
        <$If
            test={$pointer("original_name")}
            $then={() => (
                <>
                    {$unescaped($lang($string("products.file_option_set"), {url: $pointer("file_url"), name: $pointer("original_name")}))}{" "}
                    <label>
                        <$Lang keyName={$string("cart.remove_file")} />
                        <input type="checkbox" name={$pointer("file_remove")} />
                    </label>
                </>
            )}
        />
        <p className="form-fileDescription text-smallest text-grey-light">
            <$If
                test={$pointer("file_size")}
                $then={() => (
                    <>
                        <$Lang keyName={$string("products.max_filesize")} />{" "}
                        <strong>
                            {$pointer("file_size")}
                            <$Lang keyName={$string("products.kilobytes_abbreviation")} />
                        </strong>
                        ,{" "}
                    </>
                )}
            />
            <$If
                test={$pointer("file_types")}
                $then={() => (
                    <>
                        <$Lang keyName={$string("products.filetypes")} />{" "}
                        <strong>{$pointer("file_types")}</strong>
                    </>
                )}
            />
        </p>
    </FormField>
);
