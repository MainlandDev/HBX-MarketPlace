"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <>
        <h3 className="footer-info-heading text-(length:--sv-fontSize-base) [text-transform:inherit]">
            <$Lang keyName={$string("newsletter.subscribe")} />
        </h3>
        <p>
            <$Lang keyName={$string("newsletter.subscribe_intro")} />
        </p>

        <form className="form" action={$pointer("urls.subscribe.action")} method="post">
            <fieldset className="form-fieldset">
                <input type="hidden" name="action" value="subscribe" />
                <input type="hidden" name="nl_first_name" value="bc" />
                <input type="hidden" name="check" value="1" />
                <div className="form-field">
                    <label className="form-label is-srOnly [&_small]:float-right [&_small]:mt-quarter" htmlFor="nl_email">
                        <$Lang keyName={$string("common.email_address")} />
                    </label>
                    <div className="form-prefixPostfix wrap flex-wrap [&_.form-input]:block [&_.form-input]:w-full large:[&_.form-input]:w-auto [&_.form-input::placeholder]:text-(--sv-formInput-placeholder-color) [&_.button]:w-full [&_.button]:[display:block] large:[&_.button]:w-auto [&_.form-inlineMessage]:mb-quarter large:[&_.form-inlineMessage]:mb-0">
                        <input
                            className="form-input"
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
                        <input
                            className="button button--primary form-prefixPostfix-button--postfix order-1 mx-0 mt-half mb-0 large:order-0 large:m-0 large:ml-half"
                            type="submit"
                            value={$lang($string("newsletter.subscribe_submit"))}
                        />
                    </div>
                    <$If
                        test={$pointer("settings.show_newsletter_summary")}
                        $then={() => <div className="footer-newsletter-summary text-left">{$pointer("settings.newsletter_summary")}</div>}
                    />
                </div>
            </fieldset>
        </form>
    </>
);
