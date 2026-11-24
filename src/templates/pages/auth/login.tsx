import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import AlertAlertSuccess from "../../components/common/alert/alert-success.tsx";
import {$Inject, $Lang, $lang, $Page, $pointer, $string, $If} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <div className="mx-auto mt-double mb-[calc(var(--sv-spacing-double)*2)] max-w-[900px]">
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h1 className="page-heading mx-0 mt-0 mb-double text-center">
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
                    <div className="login-row mx-auto flow-root w-full max-w-(--sv-layout-widthMax) medium:mt-[calc(var(--sv-spacing-double)*2)]">
                        <form className="login-form form float-left w-full px-gutter-half medium:mt-double medium:w-1/2" action={$pointer("urls.auth.check_login")} method="post">
                            <$Inject keyName={$string("useValidEmail")} value={$lang($string("forms.validate.common.email_address"))} />{" "}
                            <$Inject keyName={$string("enterPass")} value={$lang($string("forms.validate.common.password"))} />
                            <div className="form-field">
                                <label className="form-label [&_small]:float-right [&_small]:mt-quarter" htmlFor="login_email">
                                    <$Lang keyName={$string("login.field_email")} />
                                </label>
                                <input className="form-input" name="login_email" id="login_email" type="email" />
                            </div>
                            <div className="form-field">
                                <label className="form-label [&_small]:float-right [&_small]:mt-quarter" htmlFor="login_pass">
                                    <$Lang keyName={$string("login.field_password")} />
                                </label>
                                <input className="form-input" id="login_pass" type="password" name="login_pass" autoComplete="off" />
                            </div>
                            <div className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-center [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half">
                                <input type="submit" className="button button--primary" value={$lang($string("login.submit_value"))} />{" "}
                                <a className="forgot-password" href={$pointer("urls.auth.forgot_password")}>
                                    <$Lang keyName={$string("login.forgot_password")} />
                                </a>
                            </div>
                        </form>
                        <$If
                            test={$pointer("settings.account_creation_enabled")}
                            $then={() => (
                                <div className="new-customer float-left w-full px-gutter-half medium:w-1/2">
                                    <div className="panel">
                                        <div className="panel-header">
                                            <h2 className="panel-title text-small">
                                                <$Lang keyName={$string("login.new_customer.heading")} />
                                            </h2>
                                        </div>
                                        <div className="panel-body">
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
                                                <button className="button button--primary">
                                                    <$Lang keyName={$string("login.new_customer.create_account")} />
                                                </button>
                                            </a>
                                        </div>
                                    </div>
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
