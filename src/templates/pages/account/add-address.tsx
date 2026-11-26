import AccountNavigation from "../../components/account/navigation.tsx";
import Breadcrumbs from "../../components/common/navigation/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import {$dynamicComponent, $Each, $If, $Inject, $Lang, $lang, $Page, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {Button} from "../../../server/formParts.tsx";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <$If
                        test={$pointer("forms.address.address_id")}
                        $then={() => (
                            <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                                <$Lang keyName={$string("forms.address.edit.heading")} />
                            </h1>
                        )}
                        $else={() => (
                            <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                                <$Lang keyName={$string("forms.address.add.heading")} />
                            </h1>
                        )}
                    />
                    <AccountNavigation account_page={$string("addresses")} />

                    <div className="account account--fixed mb-single medium:mx-auto medium:mb-0 medium:w-2/3 rounded-card border-[0.8px] border-solid border-ink-border bg-white p-[12px] text-ink shadow-[0_3px_5px_var(--color-ink-border)]">
                        <$If
                            test={$pointer("forms.address.error")}
                            $then={() => <AlertAlertError $positionalHash={$pointer("forms.address.error")} />}
                        />

                        <div className="account-body -mx-gutter-half flow-root w-auto max-w-none">
                            <section className="account-content float-left w-full px-gutter-half">
                                <form action={$pointer("forms.address.action")} data-address-form={""} className="form [:where(&)]:[margin:var(--sv-form-margin)]" method="post">
                                    <$If
                                        test={$pointer("forms.address.address_id")}
                                        $then={() => (
                                            <input type="hidden" name="shipid" value={$pointer("forms.address.address_id")} />
                                        )}
                                    />
                                    <fieldset className="form-fieldset [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
                                        <div className="form-row form-row--half small:[&>.form-field:nth-child(odd)]:clear-left [:where(&)]:-mx-[0.75rem] [:where(&)]:max-w-none [:where(&)]:w-auto [:where(&)]:[display:flow-root] [:where(&_.form-field)]:float-left [:where(&_.form-field)]:w-full [:where(&_.form-field)]:max-w-none [:where(&_.form-field)]:px-[0.75rem] small:[:where(&_.form-field)]:w-1/2">
                                            <$Each
                                                list={$pointer<unknown[]>("forms.address.shipping_fields")}
                                                $then={() => $unescaped($dynamicComponent($string("components/common/forms")))}
                                            />
                                        </div>
                                    </fieldset>
                                    <div className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-center [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half [:where(&)]:[background:none] [:where(&)]:[border:0] [:where(&)]:text-center xsmall:[:where(&)]:text-left [:where(&>*)]:[display:inline-block] [:where(&>*)]:mb-[1rem] [:where(&>*)]:w-full xsmall:[:where(&>*)]:align-baseline xsmall:[:where(&>*)]:w-auto">
                                        <Button type="submit" tag="input" variant="primary" value={$lang($string("forms.address.submit_value"))} />
                                        <Button href={$pointer("urls.account.addresses")} tag="a">
                                            <$Lang keyName={$string("common.cancel")} />
                                        </Button>
                                        <$Inject keyName={$string("required")} value={$lang($string("common.required"))} />{" "}
                                        <$Inject keyName={$string("state_error")} value={$lang($string("errors.state_error"))} />
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </>
            ),
        }}
        layout="layout/base"
    />
);
