import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import {$Inject, $Lang, $lang, $Page, $pointer, $string, $If} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormField, FormInput, FormLabel} from "../../../server/formParts.tsx";

export default () => (
    <>
        <$Inject keyName={$string("passwordRequirements")} value={$pointer("settings.password_requirements")} />
        <$Page
            blocks={{
                page: () => (
                    <div className="account account--fixedSmall mb-single medium:mx-auto medium:mb-0 medium:w-1/2">
                        <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                        <h2 className="page-heading mx-0 mt-0 mb-double text-center">
                            <$Lang keyName={$string("forms.new_password.heading")} />
                        </h2>
                        <p>{$pointer("forms.new_password.requirements")}</p>
                        <$If
                            test={$pointer("forms.new_password.error")}
                            $then={() => <AlertAlertError $positionalHash={$pointer("forms.new_password.error")} />}
                        />
                        <form action={$pointer("forms.new_password.submit_url")} className="form new-password-form [:where(&)]:[margin:var(--sv-form-margin)]" method="post">
                            <div className="form-row [:where(&)]:-mx-[0.75rem] [:where(&)]:max-w-none [:where(&)]:w-auto [:where(&)]:[display:flow-root] [:where(&_.form-field)]:float-left [:where(&_.form-field)]:w-full [:where(&_.form-field)]:max-w-none [:where(&_.form-field)]:px-[0.75rem]">
                                <FormField>
                                    <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="password">
                                        <$Lang keyName={$string("forms.new_password.password")} />{" "}
                                        <small>
                                            <$Lang keyName={$string("common.required")} />
                                        </small>
                                    </FormLabel>
                                    <FormInput type="password" name="password" id="password" autoComplete="off" />
                                </FormField>
                                <FormField>
                                    <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="password_confirm">
                                        <$Lang keyName={$string("forms.new_password.password2")} />{" "}
                                        <small>
                                            <$Lang keyName={$string("common.required")} />
                                        </small>
                                    </FormLabel>
                                    <FormInput type="password" name="password_confirm" id="password_confirm" autoComplete="off" />
                                </FormField>
                            </div>
                            <div className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-center [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half [:where(&)]:[background:none] [:where(&)]:[border:0] [:where(&)]:text-center xsmall:[:where(&)]:text-left [:where(&>*)]:[display:inline-block] [:where(&>*)]:mb-[1rem] [:where(&>*)]:w-full xsmall:[:where(&>*)]:align-baseline xsmall:[:where(&>*)]:w-auto">
                                <Button tag="input" variant="primary" type="submit" value={$lang($string("forms.new_password.submit_value"))} />
                            </div>
                        </form>
                    </div>
                ),
            }}
            layout="layout/base"
        />
    </>
);
