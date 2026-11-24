import GiftCertificateNavigation from "../../components/gift-certificate/navigation.tsx";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import {$Each, $If, $Inject, $Lang, $lang, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormCheck, FormField, FormInput, FormLabel, FormSelect} from "../../../server/formParts.tsx";

// The original iterates `forms.gift_certificate.themes` and `amount_options`; the library types neither key (see PORT-NOTES.md, Task 8c).
interface Theme {
    value: string;
    display: string;
}

interface AmountOption {
    value: string;
    formatted: string;
}

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                        <$Lang keyName={$string("gift_certificate.heading")} />
                    </h1>
                    <GiftCertificateNavigation gift_page={$string("purchase")} />

                    <main className="account account--fixed mb-single medium:mx-auto medium:mb-0 medium:w-2/3">
                        <$Each
                            list={$pointer<string[]>("forms.gift_certificate.errors")}
                            $then={(error) => <AlertAlertError $positionalHash={error} />}
                        />

                        <form
                            className="form gift-certificate-form [:where(&)]:[margin:var(--sv-form-margin)]"
                            method="post"
                            id="gift-certificate-form"
                            action={$pointer("forms.gift_certificate.action")}
                        >
                            <$If
                                test={$pointer("forms.gift_certificate.cart_item_id")}
                                $then={() => (
                                    <input type="hidden" name="cartitemid" value={$pointer("forms.gift_certificate.cart_item_id")} />
                                )}
                            />
                            <div className="form-row form-row--half small:[&>.form-field:nth-child(odd)]:clear-left [:where(&)]:-mx-[0.75rem] [:where(&)]:max-w-none [:where(&)]:w-auto [:where(&)]:[display:flow-root] [:where(&_.form-field)]:float-left [:where(&_.form-field)]:w-full [:where(&_.form-field)]:max-w-none [:where(&_.form-field)]:px-[0.75rem] small:[:where(&_.form-field)]:w-1/2">
                                <FormField>
                                    <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="from_name">
                                        <$Lang keyName={$string("forms.gift_certificate.purchase.from_name")} />{" "}
                                        <small>
                                            <$Lang keyName={$string("common.required")} />
                                        </small>
                                    </FormLabel>
                                    <FormInput
                                        type="text"
                                        name="from_name"
                                        id="from_name"
                                        value={$pointer("forms.gift_certificate.values.from_name")}
                                    />
                                </FormField>
                                <FormField>
                                    <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="from_email">
                                        <$Lang keyName={$string("forms.gift_certificate.purchase.from_email")} />{" "}
                                        <small>
                                            <$Lang keyName={$string("common.required")} />
                                        </small>
                                    </FormLabel>
                                    <FormInput
                                        type="text"
                                        name="from_email"
                                        id="from_email"
                                        value={$pointer("forms.gift_certificate.values.from_email")}
                                    />
                                </FormField>
                            </div>
                            <div className="form-row form-row--half small:[&>.form-field:nth-child(odd)]:clear-left [:where(&)]:-mx-[0.75rem] [:where(&)]:max-w-none [:where(&)]:w-auto [:where(&)]:[display:flow-root] [:where(&_.form-field)]:float-left [:where(&_.form-field)]:w-full [:where(&_.form-field)]:max-w-none [:where(&_.form-field)]:px-[0.75rem] small:[:where(&_.form-field)]:w-1/2">
                                <FormField>
                                    <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="to_name">
                                        <$Lang keyName={$string("forms.gift_certificate.purchase.to_name")} />{" "}
                                        <small>
                                            <$Lang keyName={$string("common.required")} />
                                        </small>
                                    </FormLabel>
                                    <FormInput
                                        type="text"
                                        name="to_name"
                                        id="to_name"
                                        value={$pointer("forms.gift_certificate.values.to_name")}
                                    />
                                </FormField>
                                <FormField>
                                    <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="to_email">
                                        <$Lang keyName={$string("forms.gift_certificate.purchase.to_email")} />{" "}
                                        <small>
                                            <$Lang keyName={$string("common.required")} />
                                        </small>
                                    </FormLabel>
                                    <FormInput
                                        type="text"
                                        name="to_email"
                                        id="to_email"
                                        value={$pointer("forms.gift_certificate.values.to_email")}
                                    />
                                </FormField>
                            </div>
                            <div className="form-row [:where(&)]:-mx-[0.75rem] [:where(&)]:max-w-none [:where(&)]:w-auto [:where(&)]:[display:flow-root] [:where(&_.form-field)]:float-left [:where(&_.form-field)]:w-full [:where(&_.form-field)]:max-w-none [:where(&_.form-field)]:px-[0.75rem]">
                                <fieldset className="form-fieldset form-column float-left w-full px-[0.75rem] small:w-6/12 [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
                                    <$If
                                        test={$pointer("forms.gift_certificate.can_use_custom_amount")}
                                        $then={() => (
                                            <FormField>
                                                <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="certificate_amount">
                                                    <$Lang keyName={$string("forms.gift_certificate.purchase.amount")} />{" "}
                                                    <small>
                                                        <$Lang keyName={$string("common.required")} />
                                                    </small>
                                                </FormLabel>
                                                <FormInput
                                                    type="text"
                                                    data-min={$pointer("forms.gift_certificate.minimum.value")}
                                                    data-max={$pointer("forms.gift_certificate.maximum.value")}
                                                    data-min-formatted={$pointer("forms.gift_certificate.minimum.formatted")}
                                                    data-max-formatted={$pointer("forms.gift_certificate.maximum.formatted")}
                                                    name="certificate_amount"
                                                    id="certificate_amount"
                                                    value={$pointer("forms.gift_certificate.values.amount.value")}
                                                />
                                            </FormField>
                                        )}
                                        $else={() => (
                                            <FormField>
                                                <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="selected_amount">
                                                    <$Lang keyName={$string("forms.gift_certificate.purchase.amount")} />{" "}
                                                    <small>
                                                        <$Lang keyName={$string("common.required")} />
                                                    </small>
                                                </FormLabel>
                                                <FormSelect name="selected_amount" id="selected_amount">
                                                    <$Each
                                                        list={$pointer<AmountOption[]>("forms.gift_certificate.amount_options")}
                                                        $then={(option) => (
                                                            <option value={option.value}>{option.formatted}</option>
                                                        )}
                                                    />
                                                </FormSelect>
                                            </FormField>
                                        )}
                                    />
                                    <$If
                                        test={$pointer("forms.gift_certificate.expires_in_days")}
                                        $then={() => (
                                            <FormField>
                                                <FormCheck type="checkbox" kind="checkbox" className="[&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]" name="agree" id="agree" />{" "}
                                                <FormLabel check="checkbox" className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="agree">
                                                    {$lang($string("forms.gift_certificate.purchase.agree"), {
                                                        days: $pointer<number>("forms.gift_certificate.expires_in_days"),
                                                    })}
                                                </FormLabel>
                                            </FormField>
                                        )}
                                    />
                                    <FormField>
                                        <FormCheck kind="checkbox" className="[&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                                            dangerouslyInlineAttributes={{
                                                attributes: `type="checkbox" name="agree2" id="agree2"${$If({
                                                    test: $pointer("forms.gift_certificate.editing"),
                                                    $then: () => " checked",
                                                })}`,
                                            }}
                                        />{" "}
                                        <FormLabel check="checkbox" className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="agree2">
                                            <$Lang keyName={$string("forms.gift_certificate.purchase.agree2")} />
                                        </FormLabel>
                                    </FormField>
                                </fieldset>
                                <fieldset className="form-fieldset form-column float-left w-full px-[0.75rem] small:w-6/12 [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
                                    <FormField>
                                        <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="message">
                                            <$Lang keyName={$string("forms.gift_certificate.purchase.message")} />
                                        </FormLabel>
                                        <FormInput
                                            tag="textarea"
                                            name="message"
                                            id="message"
                                            rows={8}
                                            value={$pointer("forms.gift_certificate.values.message")}
                                        />
                                    </FormField>
                                    <FormLabel className="[&_small]:float-right [&_small]:mt-quarter">
                                        <$Lang keyName={$string("forms.gift_certificate.purchase.theme")} />{" "}
                                        <small>
                                            <$Lang keyName={$string("common.required")} />
                                        </small>
                                    </FormLabel>
                                    <FormField className="form-field-group rounded-[4px] border border-(--sv-setting-input-border-color) p-single">
                                        <$Each
                                            list={$pointer<Theme[]>("forms.gift_certificate.themes")}
                                            $then={(theme) => (
                                                <>
                                                    <FormCheck kind="radio" className="[&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                                                        dangerouslyInlineAttributes={{
                                                            attributes: `type="radio" name="certificate_theme" id="theme_${theme.value}" value="${theme.value}"${$If({test: $pointer("this.value"), operator: $string("=="), rvalue: $pointer("../forms.gift_certificate.values.theme"), $then: () => " checked"})}`,
                                                        }}
                                                    />{" "}
                                                    <FormLabel check="radio" className="[&_small]:float-right [&_small]:mt-quarter" htmlFor={`theme_${theme.value}`}>
                                                        {theme.display}
                                                    </FormLabel>
                                                </>
                                            )}
                                        />
                                    </FormField>
                                </fieldset>
                            </div>
                            <div className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-center [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half [:where(&)]:[background:none] [:where(&)]:[border:0] [:where(&)]:text-center xsmall:[:where(&)]:text-left [:where(&>*)]:[display:inline-block] [:where(&>*)]:mb-[1rem] [:where(&>*)]:w-full xsmall:[:where(&>*)]:align-baseline xsmall:[:where(&>*)]:w-auto">
                                <$Inject keyName={$string("previewError")} value={$lang($string("forms.gift_certificate.purchase.preview_error"))} />{" "}
                                {/* Key absent from lang/en.json (see LangContentIssues.md); `as string` skips the strict key check, output stays as in the original. */}
                                <$Inject keyName={$string("enterAmount")} value={$lang($string("forms.validate.gift.amount" as string))} />{" "}
                                <$Inject keyName={$string("toName")} value={$lang($string("forms.validate.gift.to_name"))} />{" "}
                                <$Inject keyName={$string("toEmail")} value={$lang($string("forms.validate.gift.to_email"))} />{" "}
                                <$Inject keyName={$string("fromName")} value={$lang($string("forms.validate.gift.from_name"))} />{" "}
                                <$Inject keyName={$string("fromEmail")} value={$lang($string("forms.validate.gift.from_email"))} />{" "}
                                <$Inject keyName={$string("certTheme")} value={$lang($string("forms.validate.gift.cert_theme"))} />{" "}
                                <$Inject keyName={$string("agreeToTerms")} value={$lang($string("forms.validate.gift.agree_terms"))} />{" "}
                                <Button
                                    id="gift-certificate-preview"
                                    tag="input"
                                    type="submit"
                                    value={$lang($string("forms.gift_certificate.purchase.preview"))}
                                    data-preview-url={$pointer("forms.gift_certificate.preview")}
                                />{" "}
                                <Button
                                    id="gift-certificate-submit"
                                    tag="input" variant="primary"
                                    type="submit"
                                    value={$lang($string("forms.gift_certificate.purchase.submit_value"))}
                                />
                            </div>
                        </form>
                    </main>
                </>
            ),
        }}
        layout="layout/base"
    />
);
