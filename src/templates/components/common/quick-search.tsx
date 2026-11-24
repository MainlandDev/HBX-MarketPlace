"use server";
import {$if, type PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $lang, $pointer, $raw, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import type { $hb } from "@mainlanddev/hbx-bigcommerce/grammar";
import {FormField, FormInput} from "../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <div className="container">
        <form className="form [:where(&)]:[margin:var(--sv-form-margin)]" data-url={$pointer("urls.search")} data-quick-search-form={""}>
            <fieldset className="form-fieldset [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
                <FormField>
                    <$If test={$pointer<$hb<boolean>>("semantic_search_enabled")} $then={()=>{
                        return <label className="absolute h-px w-px overflow-hidden [border:0] p-0 [clip:rect(1px,1px,1px,1px)]" htmlFor={$pointer("name")}>
                            <$Lang keyName={$string("search.quick_search.input_label_semantic")} />
                        </label>
                    }} $else={()=>{
                        return <label className="absolute h-px w-px overflow-hidden [border:0] p-0 [clip:rect(1px,1px,1px,1px)]" htmlFor={$pointer("name")}>
                            <$Lang keyName={$string("search.quick_search.input_label")} />
                        </label>
                    }}/>
                    <FormInput
                        data-search-quick={""}
                        name={$pointer("name")}
                        id={$pointer("name")}
                        data-error-message={$lang($string("search.error.empty_field"))}
                        autoComplete="off"
                        dangerouslyInlineAttributes={{
                            attributes: `${$if($pointer<$hb<boolean>>("semantic_search_enabled")).then(()=>{
                                return [$raw('placeholder="'), $lang($string("search.quick_search.input_placeholder_semantic")), $raw('"')]
                            }).else(()=>{
                                return [$raw('placeholder="'), $lang($string("search.quick_search.input_placeholder")), $raw('"')]
                            })}`
                        }}
                    />
                </FormField>
            </fieldset>
        </form>
        <section className="quickSearchResults mt-single medium:mt-0 [&_[class~=modal-close]]:[display:none] medium:[&_[class~=modal-close]]:[display:block]" data-bind="html: results"></section>
        <p
            role="status"
            aria-live="polite"
            className="aria-description--hidden"
            data-search-aria-message-predefined-text={$unescaped($lang($string("search.results.quick_count_live")))}
        ></p>
    </div>
);
