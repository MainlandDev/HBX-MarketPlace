import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import {$Inject, $Lang, $lang, $Page, $pointer, $string, $unescaped, $If} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormInput, FormLabel} from "../../../server/formParts.tsx";

export default () => (
    <>
        {/* Key absent from lang/en.json (see LangContentIssues.md); `as string` skips the strict key check, output stays as in the original. */}
        <$Inject keyName={$string("recaptchaTitle")} value={$lang($string("forgot_password.recaptcha_title" as string))} />
        <$Page
            blocks={{
                page: () => (
                    <div className="account account--fixedSmall mb-single medium:mx-auto medium:mb-0 medium:w-1/2">
                        <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                        <h2 className="page-heading mx-0 mt-0 mb-double text-center">
                            <$Lang keyName={$string("reset_password.heading")} />
                        </h2>
                        <p>
                            <$Lang keyName={$string("reset_password.intro")} />
                        </p>
                        <$If
                            test={$pointer("forms.forgot_password.error")}
                            $then={() => <AlertAlertError $positionalHash={$pointer("forms.forgot_password.error")} />}
                        />
                        <form action={$pointer("urls.auth.send_password_email")} className="form forgot-password-form [:where(&)]:[margin:var(--sv-form-margin)]" method="post">
                            <$Inject keyName={$string("useValidEmail")} value={$lang($string("forms.validate.common.email_address"))} />
                            <div className="form-prefixPostfix form-prefixPostfix--centeredColumn wrap flex-col flex-wrap [&_.form-input]:block [&_.form-input]:w-full large:[&_.form-input]:w-auto [&_.form-input::placeholder]:text-(--sv-formInput-placeholder-color) [&_.button]:w-full [&_.button]:[display:block] large:[&_.button]:w-auto [&_.form-inlineMessage]:mb-quarter large:[&_.form-inlineMessage]:mb-0 [&_.g-recaptcha]:mx-auto [&_.g-recaptcha]:mt-[2em] [&_.g-recaptcha]:mb-0 large:[&_.form-prefixPostfix-button--postfix]:mt-[1em] large:[&_.form-prefixPostfix-button--postfix]:mb-half [:where(&)]:flex [:where(&)]:flex-row [:where(&)]:flex-nowrap [:where(&_.form-input)]:flex-1 [:where(&_.button)]:h-[3rem]">
                                <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="email">
                                    <$Lang keyName={$string("common.email_address")} />
                                </FormLabel>
                                <FormInput name="email" id="email" type="email" formNoValidate={true} />{" "}
                                {$unescaped($pointer("forms.forgot_password.recaptcha.markup"))}
                                <Button
                                    type="submit"
                                    tag="input" variant="primary" className="form-prefixPostfix-button--postfix order-1 mx-0 mt-half mb-0 large:order-0 large:m-0 large:ml-half"
                                    value={$lang($string("reset_password.heading"))}
                                />
                            </div>
                        </form>
                    </div>
                ),
            }}
            layout="layout/base"
        />
    </>
);
