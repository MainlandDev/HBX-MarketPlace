"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormField, FormInput, FormLabel} from "../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <div className="flex flex-col items-center gap-half medium:flex-row medium:justify-center medium:gap-double">
        <h3 className="footer-info-heading m-0 text-[30px] leading-[1.25] font-bold text-text [text-transform:inherit]">
            <$Lang keyName={$string("newsletter.subscribe")} />
        </h3>
        <p className="sr-only">
            <$Lang keyName={$string("newsletter.subscribe_intro")} />
        </p>

        <form className="form [&_fieldset]:bg-transparent [&_fieldset]:p-0 [:where(&)]:[margin:var(--sv-form-margin)]" action={$pointer("urls.subscribe.action")} method="post">
            <fieldset className="form-fieldset [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
                <input type="hidden" name="action" value="subscribe" />
                <input type="hidden" name="nl_first_name" value="bc" />
                <input type="hidden" name="check" value="1" />
                <FormField>
                    <FormLabel className="absolute h-px w-px overflow-hidden [border:0] p-0 [clip:rect(1px,1px,1px,1px)] [&_small]:float-right [&_small]:mt-quarter" htmlFor="nl_email">
                        <$Lang keyName={$string("common.email_address")} />
                    </FormLabel>
                    <div className="form-prefixPostfix wrap flex-wrap rounded-full bg-surface p-[6px] medium:w-[470px] [&_.form-input]:rounded-full [&_.form-input]:border-0 [&_.form-field]:mb-0 [&_.form-input]:block [&_.form-input]:w-full large:[&_.form-input]:w-auto [&_.form-input::placeholder]:text-(--sv-formInput-placeholder-color) [&_.button]:w-full [&_.button]:[display:block] large:[&_.button]:w-auto [&_.form-inlineMessage]:mb-quarter large:[&_.form-inlineMessage]:mb-0 [:where(&)]:flex [:where(&)]:flex-row [:where(&)]:flex-nowrap [:where(&_.form-input)]:flex-1 [:where(&_.button)]:h-[3rem]">
                        <FormInput
                            id="nl_email"
                            name="nl_email"
                            type="email"
                            value={$pointer("customer.email")}
                            placeholder={$lang($string("newsletter.email_placeholder"))}
                            aria-describedby="alertBox-message-text"
                            aria-required="true"
                            autoComplete="email"
                            required={true}
                        />
                        <Button
                            tag="input" variant="primary" className="form-prefixPostfix-button--postfix rounded-full bg-brand text-white font-bold uppercase h-[50px] min-w-[162px] order-1 mx-0 mt-half mb-0 large:order-0 large:m-0 large:ml-half"
                            type="submit"
                            value={$lang($string("newsletter.subscribe_submit"))}
                        />
                    </div>
                    <$If
                        test={$pointer("settings.show_newsletter_summary")}
                        $then={() => <div className="footer-newsletter-summary text-left">{$pointer("settings.newsletter_summary")}</div>}
                    />
                </FormField>
            </fieldset>
        </form>
    </div>
);
