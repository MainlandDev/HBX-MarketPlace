import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import AlertAlertSuccess from "../../components/common/alert/alert-success.tsx";
import {$Inject, $Lang, $lang, $Page, $pointer, $string, $If} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormField, FormInput, FormLabel} from "../../../server/formParts.tsx";
import {Panel, PanelBody, PanelHeader, PanelTitle} from "../../../server/componentParts.tsx";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <div className="mx-auto mt-double mb-[calc(var(--sv-spacing-double)*2)] max-w-[900px] text-[16px] [&_.breadcrumbs]:text-center">
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h1 className="page-heading mx-0 mt-0 mb-[1rem] text-center text-[25px] font-normal text-ink">
                        <$Lang keyName={$string("login.heading")} />
                    </h1>
                    <$If
                        test={$pointer("forms.login.error")}
                        $then={() => <AlertAlertError $positionalHash={$pointer("forms.login.error")} />}
                    />
                    <$If
                        test={$pointer("forms.login.success")}
                        $then={() => <AlertAlertSuccess $positionalHash={$pointer("forms.login.success")} />}
                    />
                    <div className="login-row mx-auto w-full max-w-(--sv-layout-widthMax) medium:flex medium:items-start medium:gap-[45px]">
                        <form className="login-form form w-full medium:w-[450px] medium:shrink-0 mb-[1rem] rounded-card border-[0.8px] border-solid border-ink-border bg-white p-[12px] text-ink shadow-[0_3px_5px_var(--color-ink-border)] [:where(&)]:[margin:var(--sv-form-margin)]" action={$pointer("urls.auth.check_login")} method="post">
                            <$Inject keyName={$string("useValidEmail")} value={$lang($string("forms.validate.common.email_address"))} />{" "}
                            <$Inject keyName={$string("enterPass")} value={$lang($string("forms.validate.common.password"))} />
                            <FormField>
                                <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="login_email">
                                    <$Lang keyName={$string("login.field_email")} />
                                </FormLabel>
                                <FormInput name="login_email" id="login_email" type="email" />
                            </FormField>
                            <FormField>
                                <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="login_pass">
                                    <$Lang keyName={$string("login.field_password")} />
                                </FormLabel>
                                <FormInput id="login_pass" type="password" name="login_pass" autoComplete="off" />
                            </FormField>
                            <div className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-left [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half [:where(&)]:[background:none] [:where(&)]:[border:0] [:where(&)]:text-center xsmall:[:where(&)]:text-left [:where(&>*)]:[display:inline-block] [:where(&>*)]:mb-[1rem] [:where(&>*)]:w-full xsmall:[:where(&>*)]:align-baseline xsmall:[:where(&>*)]:w-auto">
                                <Button type="submit" tag="input" variant="primary" className="font-bold uppercase" value={$lang($string("login.submit_value"))} />{" "}
                                <a className="forgot-password text-brand underline" href={$pointer("urls.auth.forgot_password")}>
                                    <$Lang keyName={$string("login.forgot_password")} />
                                </a>
                            </div>
                        </form>
                        <$If
                            test={$pointer("settings.account_creation_enabled")}
                            $then={() => (
                                <div className="new-customer w-full medium:flex-1 rounded-card border-[0.8px] border-solid border-ink-border bg-white p-[12px] text-ink shadow-[0_3px_5px_var(--color-ink-border)]">
                                    <Panel>
                                        <PanelHeader className="bg-transparent p-0 mb-[1rem]">
                                            <PanelTitle className="text-[1.3rem] font-bold text-ink">
                                                <$Lang keyName={$string("login.new_customer.heading")} />
                                            </PanelTitle>
                                        </PanelHeader>
                                        <PanelBody className="bg-transparent p-0">
                                            <p className="mb-0">
                                                <$Lang keyName={$string("login.new_customer.intro")} />
                                            </p>
                                            <ul className="ml-double">
                                                <li className="pl-half">
                                                    <$Lang keyName={$string("login.new_customer.fact1")} />
                                                </li>
                                                <li className="pl-half">
                                                    <$Lang keyName={$string("login.new_customer.fact2")} />
                                                </li>
                                                <li className="pl-half">
                                                    <$Lang keyName={$string("login.new_customer.fact3")} />
                                                </li>
                                                <li className="pl-half">
                                                    <$Lang keyName={$string("login.new_customer.fact4")} />
                                                </li>
                                                <li className="pl-half">
                                                    <$Lang keyName={$string("login.new_customer.fact5")} />
                                                </li>
                                            </ul>
                                            <a href={$pointer("urls.auth.create_account")}>
                                                <Button variant="primary" className="font-bold uppercase">
                                                    <$Lang keyName={$string("login.new_customer.create_account")} />
                                                </Button>
                                            </a>
                                        </PanelBody>
                                    </Panel>
                                </div>
                            )}
                        />
                    </div>
                </div>
            ),
        }}
        layout="layout/base"
    />
);
