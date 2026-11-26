import AccountNavigation from "../../components/account/navigation.tsx";
import Breadcrumbs from "../../components/common/navigation/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import FormsText from "../../components/common/forms/text.tsx";
import FormsSelect from "../../components/common/forms/select.tsx";
import {$boolean, $cdn, $concat, $Each, $If, $Inject, $lang, $Lang, $Page, $pointer, $string, $this, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormCheck, FormField, FormLabel, Icon} from "../../../server/formParts.tsx";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <$Inject keyName={$string("creditCardNumber")} value={$lang($string("forms.validate.payment_method.credit_card_number"))} />{" "}
                    <$Inject keyName={$string("expiration")} value={$lang($string("forms.validate.payment_method.expiration"))} />{" "}
                    <$Inject keyName={$string("nameOnCard")} value={$lang($string("forms.validate.payment_method.name_on_card"))} />{" "}
                    <$Inject keyName={$string("cvv")} value={$lang($string("forms.validate.payment_method.cvv"))} />{" "}
                    <$Inject keyName={$string("firstNameLabel")} value={$lang($string("forms.payment_methods.first_name"))} />{" "}
                    <$Inject keyName={$string("lastNameLabel")} value={$lang($string("forms.payment_methods.last_name"))} />{" "}
                    <$Inject keyName={$string("companyLabel")} value={$lang($string("forms.payment_methods.company"))} />{" "}
                    <$Inject keyName={$string("phoneLabel")} value={$lang($string("forms.payment_methods.phone"))} />{" "}
                    <$Inject keyName={$string("address1Label")} value={$lang($string("forms.payment_methods.address1"))} />{" "}
                    <$Inject keyName={$string("address2Label")} value={$lang($string("forms.payment_methods.address2"))} />{" "}
                    <$Inject keyName={$string("cityLabel")} value={$lang($string("forms.payment_methods.city"))} />{" "}
                    <$Inject keyName={$string("countryLabel")} value={$lang($string("forms.payment_methods.country"))} />{" "}
                    <$Inject keyName={$string("stateLabel")} value={$lang($string("forms.payment_methods.state"))} />{" "}
                    <$Inject keyName={$string("postalCodeLabel")} value={$lang($string("forms.payment_methods.postal_code"))} />{" "}
                    <$Inject keyName={$string("chooseCountryLabel")} value={$lang($string("forms.payment_methods.choose_country"))} />{" "}
                    {" "}
                    <$Inject keyName={$string("paymentMethodsUrl")} value={$pointer("urls.account.payment_methods.all")} />{" "}
                    <$Inject keyName={$string("paymentsUrl")} value={$pointer("settings.payments_url")} />{" "}
                    <$Inject keyName={$string("storeHash")} value={$pointer("settings.store_hash")} />{" "}
                    <$Inject keyName={$string("vaultToken")} value={$pointer("vault.access_token")} />{" "}
                    <$Inject keyName={$string("shopperId")} value={$pointer("customer.id")} />{" "}
                    <$Inject keyName={$string("countries")} value={$pointer("countries")} />{" "}
                    <$Inject keyName={$string("customerEmail")} value={$pointer("customer.email")} />{" "}
                    <$Inject keyName={$string("providerId")} value={$pointer("forms.provider")} />{" "}
                    <$Inject keyName={$string("currencyCode")} value={$pointer("currency_selector.active_currency_code")} />{" "}
                    <$Inject keyName={$string("paymentProviderInitializationData")} value={$pointer("initialization_data")} />{" "}
                    <$Inject keyName={$string("storeLocale")} value={$pointer("settings.request.locale")} />{" "}
                    <$Inject keyName={$string("themeSettings")} value={$pointer("theme_settings")} />

                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />

                    <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                        <$Lang keyName={$string("forms.payment_methods.add.heading")} />
                    </h1>

                    <AccountNavigation account_page={$string("payment_methods")} />

                    <div className="account account--fixed mb-single medium:mx-auto medium:mb-0 medium:w-2/3 rounded-card border-[0.8px] border-solid border-ink-border bg-white p-[12px] text-ink shadow-[0_3px_5px_var(--color-ink-border)]">
                        <$If
                            test={$pointer("forms.error")}
                            $then={() => <AlertAlertError $positionalHash={$pointer("forms.error")} />}
                        />

                        <$If
                            test={$pointer("account_payments")}
                            $then={() => (
                                <>
                                    {$unescaped($pointer("account_payments"))}
                                    <script
                                        nonce={$pointer("nonce")}
                                        dangerouslySetInnerHTML={{
                                            __html: `
                window.BigCommerce = window.BigCommerce || {};
            `,
                                        }}
                                    />
                                </>
                            )}
                            $else={() => (
                                <form data-payment-method-form={""} className="form [:where(&)]:[margin:var(--sv-form-margin)]">
                                    <input type="hidden" name="email" value={$pointer("customer.email")} />
                                    <input type="hidden" name="provider_id" value={$pointer("forms.provider")} />
                                    <input type="hidden" name="currency_code" value={$pointer("currency_selector.active_currency_code")} />

                                    <h3 className="paymentMethodForm-heading mt-single font-(family-name:--sv-fontFamily-sans) text-grey-darker capitalize">
                                        <$Lang keyName={$string("account.payment_methods.payment_method")} />
                                    </h3>
                                    <div className="paymentMethodForm small:max-w-[60%]">
                                        <p className="paymentMethodForm-subheading flex font-semibold">
                                            {$pointer("forms.payment_method.provider_name")}{" "}
                                            <span className="paymentMethodForm-cards small:ml-auto">
                                                <$Each
                                                    list={$pointer<string[]>("../theme_settings.supported_card_type_icons")}
                                                    $then={() => (
                                                        <img
                                                            className="paymentMethodForm-cards-icon mr-eighth w-[34px]"
                                                            src={$cdn($concat($concat($string("img/payment-methods/"), $this<string>()), $string(".svg")))}
                                                            alt={$lang($concat($string("account.payment_methods.card_types."), $this<string>()))}
                                                            title={$lang($concat($string("account.payment_methods.card_types."), $this<string>()))}
                                                        />
                                                    )}
                                                />
                                            </span>
                                        </p>
                                        <fieldset className="form-fieldset [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
                                            <div className="paymentMethodForm-column small:flex small:[&:first-child_.form-field]:mb-half">
                                                <div className="paymentMethodForm-inputs relative small:first:w-[70%] small:last:w-[30%] small:last:pl-single">
                                                    <FormsText id={$string("credit_card_number")} name={$string("credit_card_number")} label={$lang($string("account.payment_methods.credit_card_number"))} />
                                                    <Icon tag="svg" className="paymentMethodForm-inputs-icon absolute top-[39px] right-[9px] size-[21px] fill-grey-light">
                                                        <use href="#icon-lock" />
                                                    </Icon>
                                                </div>
                                                <div className="paymentMethodForm-inputs relative small:first:w-[70%] small:last:w-[30%] small:last:pl-single">
                                                    <FormsText id={$string("expiration")} name={$string("expiration")} label={$lang($string("account.payment_methods.expiration"))} placeholder={$string("MM/YY")} />
                                                </div>
                                            </div>
                                            <div className="paymentMethodForm-column small:flex small:[&:first-child_.form-field]:mb-half">
                                                <div className="paymentMethodForm-inputs relative small:first:w-[70%] small:last:w-[30%] small:last:pl-single">
                                                    <FormsText id={$string("name_on_card")} name={$string("name_on_card")} label={$lang($string("account.payment_methods.name_on_card"))} />
                                                </div>
                                                <div className="paymentMethodForm-inputs relative small:first:w-[70%] small:last:w-[30%] small:last:pl-single">
                                                    <FormsText id={$string("cvv")} name={$string("cvv")} label={$lang($string("account.payment_methods.cvv"))} />
                                                    <Icon tag="svg" className="paymentMethodForm-inputs-icon absolute top-[39px] right-[9px] size-[21px] fill-grey-light">
                                                        <use href="#icon-lock" />
                                                    </Icon>
                                                </div>
                                            </div>
                                            <FormField>
                                                <FormCheck
                                                    type="checkbox"
                                                    name="default_instrument"
                                                    id="default_instrument"
                                                    data-label={$lang($string("forms.payment_methods.default_instrument"))}
                                                    kind="checkbox" className="[&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                                                />
                                                <FormLabel check="checkbox" className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="default_instrument">
                                                    <$Lang keyName={$string("forms.payment_methods.default_instrument")} />
                                                </FormLabel>
                                            </FormField>
                                        </fieldset>
                                    </div>

                                    <h3 className="paymentMethodForm-heading mt-single font-(family-name:--sv-fontFamily-sans) text-grey-darker capitalize">
                                        <$Lang keyName={$string("account.payment_methods.billing_address")} />
                                    </h3>

                                    <fieldset className="form-fieldset [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
                                        <div className="form-row form-row--half small:[&>.form-field:nth-child(odd)]:clear-left [:where(&)]:-mx-[0.75rem] [:where(&)]:max-w-none [:where(&)]:w-auto [:where(&)]:[display:flow-root] [:where(&_.form-field)]:float-left [:where(&_.form-field)]:w-full [:where(&_.form-field)]:max-w-none [:where(&_.form-field)]:px-[0.75rem] small:[:where(&_.form-field)]:w-1/2">
                                            <FormsText private_id={$string("FirstName")} required={$boolean(true)} id={$string("first_name")} name={$string("first_name")} label={$lang($string("forms.payment_methods.first_name"))} />
                                            <FormsText private_id={$string("LastName")} required={$boolean(true)} id={$string("last_name")} name={$string("last_name")} label={$lang($string("forms.payment_methods.last_name"))} />
                                            <FormsText private_id={$string("CompanyName")} required={$boolean(false)} id={$string("company")} name={$string("company")} label={$lang($string("forms.payment_methods.company"))} />
                                            <FormsText private_id={$string("Phone")} required={$boolean(false)} id={$string("phone")} name={$string("phone")} label={$lang($string("forms.payment_methods.phone"))} />
                                            <FormsText private_id={$string("AddressLine1")} required={$boolean(true)} id={$string("address1")} name={$string("address1")} label={$lang($string("forms.payment_methods.address1"))} />
                                            <FormsText private_id={$string("AddressLine2")} required={$boolean(false)} id={$string("address2")} name={$string("address2")} label={$lang($string("forms.payment_methods.address2"))} />
                                            <FormsText private_id={$string("City")} required={$boolean(true)} id={$string("city")} name={$string("city")} label={$lang($string("forms.payment_methods.city"))} />
                                            <FormsSelect private_id={$string("Country")} required={$boolean(true)} id={$string("country")} name={$string("country")} label={$lang($string("forms.payment_methods.country"))} chooseprefix={$lang($string("forms.payment_methods.choose_country"))} options={$pointer("countries")} />
                                            <FormsText private_id={$string("State")} required={$boolean(true)} id={$string("state")} name={$string("state")} label={$lang($string("forms.payment_methods.state"))} />
                                            <FormsText private_id={$string("Zip")} required={$boolean(true)} id={$string("postal_code")} name={$string("postal_code")} label={$lang($string("forms.payment_methods.postal_code"))} />
                                        </div>
                                    </fieldset>
                                    <div className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-center [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half [:where(&)]:[background:none] [:where(&)]:[border:0] [:where(&)]:text-center xsmall:[:where(&)]:text-left [:where(&>*)]:[display:inline-block] [:where(&>*)]:mb-[1rem] [:where(&>*)]:w-full xsmall:[:where(&>*)]:align-baseline xsmall:[:where(&>*)]:w-auto">
                                        <Button type="submit" tag="input" variant="primary" value={$lang($string("forms.payment_methods.submit_value"))} />
                                        <Button href={$pointer("urls.account.payment_methods.all")} tag="a">
                                            <$Lang keyName={$string("common.cancel")} />
                                        </Button>
                                        <$Inject keyName={$string("required")} value={$lang($string("common.required"))} />{" "}
                                        <$Inject keyName={$string("state_error")} value={$lang($string("errors.state_error"))} />{" "}
                                        <$Inject keyName={$string("generic_error")} value={$lang($string("common.generic_error"))} />
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
