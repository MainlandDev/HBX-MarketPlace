"use server";
import {$if, type PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $lang, $pointer, $raw, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import type { $hb } from "@mainlanddev/hbx-bigcommerce/grammar";
import {FormField, FormInput} from "../../../server/formParts.tsx";
import {Container} from "../../../server/componentParts.tsx";

export default (_props: PartialProps) => (
    <Container>
        <form className="form [:where(&)]:[margin:var(--sv-form-margin)]" action={$pointer("urls.search")} method="get" data-url={$pointer("urls.search")} data-quick-search-form={""}>
            <fieldset className="form-fieldset medium:flex medium:items-stretch medium:[&>.form-field]:flex-1 [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
                <input type="hidden" name="section" value="product" />
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
                        name="search_query"
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
                <button type="submit" className="[display:none] shrink-0 cursor-pointer rounded-l-none rounded-r-full border-0 bg-brand-dark px-double text-white medium:[display:block]">
                    <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                    <span className="sr-only"><$Lang keyName={$string("common.search")} /></span>
                </button>
            </fieldset>
        </form>
        <section className="quickSearchResults mt-single medium:mt-0 [&_[class~=modal-close]]:[display:none] medium:[&_[class~=modal-close]]:[display:block]" data-bind="html: results"></section>
        <p
            role="status"
            aria-live="polite"
            className="aria-description--hidden absolute top-0 left-0 -ml-[10000px] size-px overflow-hidden"
            data-search-aria-message-predefined-text={$unescaped($lang($string("search.results.quick_count_live")))}
        ></p>
    </Container>
);
