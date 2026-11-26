import AccountNavigation from "../../components/account/navigation.tsx";
import type {StoredInstrument} from "@mainlanddev/hbx-bigcommerce";
import Breadcrumbs from "../../components/common/navigation/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import {$dynamicComponent, $Each, $If, $Inject, $lang, $Lang, $Page, $pointer, $string, $unescaped, $With} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormCheck, FormField, FormLabel} from "../../../server/formParts.tsx";

// LIBRARY GAP: types/context/customer.ts:21 types `customer.edit_stored_instrument` as `string`, but the original reads
// `token`, `type`, `last_4`, `expiry_month`, `expiry_year`, `email` and `is_default` from it (edit-payment-method.html: the
// hidden inputs, the `type` checks, the card and PayPal details, and the default checkbox). Typed here so the pointers need
// no cast; fix upstream in the library type.
export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />

                    <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                        <$Lang keyName={$string("forms.payment_methods.edit.heading")} />
                    </h1>

                    <AccountNavigation account_page={$string("payment_methods")} />

                    <div className="account account--fixed mb-single medium:mx-auto medium:mb-0 medium:w-2/3 rounded-card border-[0.8px] border-solid border-ink-border bg-white p-[12px] text-ink shadow-[0_3px_5px_var(--color-ink-border)]">
                        <$If
                            test={$pointer("forms.error")}
                            $then={() => <AlertAlertError $positionalHash={$pointer("forms.error")} />}
                        />

                        <$With
                            context={$pointer<StoredInstrument>("customer.edit_stored_instrument")}
                            $then={() => (
                                <form action={$pointer("forms.action")} data-address-form={""} className="form [:where(&)]:[margin:var(--sv-form-margin)]" method="post">
                                    <input type="hidden" name="token" value={$pointer("token")} />
                                    <input type="hidden" name="currency_code" value={$pointer("../currency_selector.active_currency_code")} />
                                    <input type="hidden" name="type" value={$pointer("type")} />

                                    <h3 className="paymentMethodForm-heading mt-single font-(family-name:--sv-fontFamily-sans) text-grey-darker capitalize">
                                        <$Lang keyName={$string("account.payment_methods.payment_method")} />
                                    </h3>

                                    <div className="paymentMethodForm small:max-w-[60%]">
                                        <$If
                                            test={$pointer("type")}
                                            operator={$string("===")}
                                            rvalue={$string("stored_card")}
                                            $then={() => (
                                                <>
                                                    <dl className="paymentMethodForm-details mb-0 small:m-0 small:mr-double small:inline-block">
                                                        <dt className="paymentMethodForm-details-term mb-half font-normal">
                                                            <$Lang keyName={$string("account.payment_methods.credit_card_number")} />
                                                        </dt>
                                                        <dd className="paymentMethodForm-details-description text-smaller font-semibold tracking-(--sv-letterSpacing-large)">**** **** **** {$pointer("last_4")}</dd>
                                                    </dl>
                                                    <dl className="paymentMethodForm-details mb-0 small:m-0 small:mr-double small:inline-block">
                                                        <dt className="paymentMethodForm-details-term mb-half font-normal">
                                                            <$Lang keyName={$string("account.payment_methods.expiration")} />
                                                        </dt>
                                                        <dd className="paymentMethodForm-details-description text-smaller font-semibold tracking-(--sv-letterSpacing-large)">
                                                            {$pointer("expiry_month")}/{$pointer("expiry_year")}
                                                        </dd>
                                                    </dl>
                                                </>
                                            )}
                                        />
                                        <$If
                                            test={$pointer("type")}
                                            operator={$string("===")}
                                            rvalue={$string("stored_paypal_account")}
                                            $then={() => (
                                                <>
                                                    <FormField>
                                                        <h3 className="paymentMethodForm-heading mt-single font-(family-name:--sv-fontFamily-sans) text-grey-darker capitalize">
                                                            <$Lang keyName={$string("account.payment_methods.paypal")} />{" "}
                                                            <$Lang keyName={$string("common.account")} />
                                                        </h3>
                                                        <p>{$pointer("email")}</p>
                                                    </FormField>
                                                </>
                                            )}
                                        />
                                        <FormField>
                                            {/* `checked` is a block in attribute position, so the attributes go in the carrier. */}
                                            <FormCheck kind="checkbox" className="[&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                                                type="checkbox"
                                                dangerouslyInlineAttributes={{
                                                    attributes: `value="default_instrument" name="is_default" id="default_instrument" data-label="${$lang($string("forms.payment_methods.default_instrument"))}" ${$If({test: $pointer("is_default"), $then: () => "checked"})}`,
                                                }}
                                            />
                                            <FormLabel check="checkbox" className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="default_instrument">
                                                <$Lang keyName={$string("forms.payment_methods.default_instrument")} />
                                            </FormLabel>
                                        </FormField>
                                    </div>

                                    <$If
                                        test={$pointer("type")}
                                        operator={$string("===")}
                                        rvalue={$string("stored_card")}
                                        $then={() => (
                                            <>
                                                <h3 className="paymentMethodForm-heading mt-single font-(family-name:--sv-fontFamily-sans) text-grey-darker capitalize">
                                                    <$Lang keyName={$string("account.payment_methods.billing_address")} />
                                                </h3>

                                                <fieldset className="form-fieldset [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
                                                    <div className="form-row form-row--half small:[&>.form-field:nth-child(odd)]:clear-left [:where(&)]:-mx-[0.75rem] [:where(&)]:max-w-none [:where(&)]:w-auto [:where(&)]:[display:flow-root] [:where(&_.form-field)]:float-left [:where(&_.form-field)]:w-full [:where(&_.form-field)]:max-w-none [:where(&_.form-field)]:px-[0.75rem] small:[:where(&_.form-field)]:w-1/2">
                                                        <$Each
                                                            list={$pointer<unknown[]>("forms.billing_fields")}
                                                            $then={() => $unescaped($dynamicComponent($string("components/common/forms")))}
                                                        />
                                                    </div>
                                                </fieldset>
                                            </>
                                        )}
                                    />

                                    <div className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-center [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half [:where(&)]:[background:none] [:where(&)]:[border:0] [:where(&)]:text-center xsmall:[:where(&)]:text-left [:where(&>*)]:[display:inline-block] [:where(&>*)]:mb-[1rem] [:where(&>*)]:w-full xsmall:[:where(&>*)]:align-baseline xsmall:[:where(&>*)]:w-auto">
                                        <Button type="submit" tag="input" variant="primary" value={$lang($string("forms.payment_methods.submit_value"))} />
                                        <Button href={$pointer("../urls.account.payment_methods.all")} tag="a">
                                            <$Lang keyName={$string("common.cancel")} />
                                        </Button>
                                        <$Inject keyName={$string("required")} value={$lang($string("common.required"))} />{" "}
                                        <$Inject keyName={$string("state_error")} value={$lang($string("errors.state_error"))} />
                                    </div>
                                </form>
                            )}
                        />
                    </div>
                </>
            ),
        }}
        layout="layout/base"
    />
);
