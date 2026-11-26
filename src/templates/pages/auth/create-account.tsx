import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import {$Each, $If, $Inject, $Lang, $lang, $Page, $pointer, $string, $unescaped, $dynamicComponent} from "@mainlanddev/hbx-bigcommerce";
import {Button} from "../../../server/formParts.tsx";

export default () => (
    <>
        <$Inject keyName={$string("passwordRequirements")} value={$pointer("settings.password_requirements")} />
        {" "}
        <$Inject keyName={$string("recaptchaTitle")} value={$lang($string("create_account.recaptcha_title"))} />
        <$Page
            blocks={{
                page: () => (
                    <>
                        <div className="[&_.breadcrumbs]:text-center"><Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} /></div>
                        <h1 className="page-heading mx-0 mt-0 mb-[1rem] text-center text-[25px] font-normal text-ink">
                            <$Lang keyName={$string("create_account.heading")} />
                        </h1>
                        <div className="account account--fixed mb-single medium:mx-auto medium:mb-0 medium:w-2/3 rounded-card border-[0.8px] border-solid border-ink-border bg-white p-[12px] text-ink shadow-[0_3px_5px_var(--color-ink-border)]">
                            <div className="account-body flow-root w-auto max-w-none">
                                <$If
                                    test={$pointer("forms.create_account.error")}
                                    $then={() => <AlertAlertError $positionalHash={$pointer("forms.create_account.error")} />}
                                />
                                <$If
                                    test={$pointer("settings.account_creation_enabled")}
                                    $then={() => (
                                        <form
                                            action={$pointer("urls.auth.save_new_account")}
                                            data-create-account-form={""}
                                            method="post"
                                            className="form [:where(&)]:[margin:var(--sv-form-margin)]"
                                        >
                                            <div className="form-row form-row--half small:[&>.form-field:nth-child(odd)]:clear-left [:where(&)]:-mx-[0.75rem] [:where(&)]:max-w-none [:where(&)]:w-auto [:where(&)]:[display:flow-root] [:where(&_.form-field)]:float-left [:where(&_.form-field)]:w-full [:where(&_.form-field)]:max-w-none [:where(&_.form-field)]:px-[0.75rem] small:[:where(&_.form-field)]:w-1/2">
                                                <$Each
                                                    list={$pointer<unknown[]>("forms.create_account.account_fields")}
                                                    $then={() => $unescaped($dynamicComponent($string("components/common/forms")))}
                                                />
                                                <$Each
                                                    list={$pointer<unknown[]>("forms.create_account.address_fields")}
                                                    $then={() => $unescaped($dynamicComponent($string("components/common/forms")))}
                                                />
                                                <$Inject keyName={$string("required")} value={$lang($string("common.required"))} />{" "}
                                                <$Inject keyName={$string("state_error")} value={$lang($string("errors.state_error"))} />
                                            </div>
                                            {$unescaped($pointer("forms.create_account.recaptcha.markup"))}
                                            <div className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-left [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half [:where(&)]:[background:none] [:where(&)]:[border:0] [:where(&)]:text-center xsmall:[:where(&)]:text-left [:where(&>*)]:[display:inline-block] [:where(&>*)]:mb-[1rem] [:where(&>*)]:w-full xsmall:[:where(&>*)]:align-baseline xsmall:[:where(&>*)]:w-auto">
                                                <Button
                                                    type="submit"
                                                    tag="input" variant="primary" className="font-bold uppercase"
                                                    value={$lang($string("forms.create_account.submit_value"))}
                                                />
                                            </div>
                                        </form>
                                    )}
                                />
                            </div>
                        </div>
                    </>
                ),
            }}
            layout="layout/base"
        />
    </>
);
