"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormField, FormInput, FormLabel} from "../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <form className="form [:where(&)]:[margin:var(--sv-form-margin)]" action={$pointer("urls.search")}>
        <fieldset className="form-fieldset [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
            <FormField>
                <FormLabel className="absolute h-px w-px overflow-hidden [border:0] p-0 [clip:rect(1px,1px,1px,1px)] [&_small]:float-right [&_small]:mt-quarter" htmlFor="search_query_adv">
                    <$Lang keyName={$string("search.results.form_label")} />
                </FormLabel>
                <div className="form-prefixPostfix wrap flex-wrap [&_.form-input]:block [&_.form-input]:w-full large:[&_.form-input]:w-auto [&_.form-input::placeholder]:text-(--sv-formInput-placeholder-color) [&_.button]:w-full [&_.button]:[display:block] large:[&_.button]:w-auto [&_.form-inlineMessage]:mb-quarter large:[&_.form-inlineMessage]:mb-0 [:where(&)]:flex [:where(&)]:flex-row [:where(&)]:flex-nowrap [:where(&_.form-input)]:flex-1 [:where(&_.button)]:h-[3rem]">
                    <FormInput id="search_query_adv" name="search_query_adv" value={$pointer("forms.search.query")} />
                    <Button
                        tag="input" variant="primary" className="form-prefixPostfix-button--postfix order-1 mx-0 mt-half mb-0 large:order-0 large:m-0 large:ml-half"
                        type="submit"
                        value={$lang($string("search.results.form_button_text"))}
                    />
                </div>
            </FormField>
        </fieldset>
    </form>
);
