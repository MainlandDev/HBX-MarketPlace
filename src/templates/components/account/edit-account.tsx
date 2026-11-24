"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$dynamicComponent, $Each, $If, $Inject, $Lang, $lang, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormField, FormInput, FormLabel} from "../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <form action={$pointer("urls.account.update_action")} data-edit-account-form={""} className="form [:where(&)]:[margin:var(--sv-form-margin)]" method="post">
        <$Inject keyName={$string("firstName")} value={$lang($string("forms.validate.account.edit.first_name"))} />{" "}
        <$Inject keyName={$string("lastName")} value={$lang($string("forms.validate.account.edit.last_name"))} />{" "}
        <$Inject keyName={$string("phoneNumber")} value={$lang($string("forms.validate.account.edit.phone"))} />{" "}
        <$Inject keyName={$string("currentPassword")} value={$lang($string("forms.validate.account.edit.password"))} />
        <fieldset className="form-fieldset [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
            <div className="form-row form-row--half small:[&>.form-field:nth-child(odd)]:clear-left [:where(&)]:-mx-[0.75rem] [:where(&)]:max-w-none [:where(&)]:w-auto [:where(&)]:[display:flow-root] [:where(&_.form-field)]:float-left [:where(&_.form-field)]:w-full [:where(&_.form-field)]:max-w-none [:where(&_.form-field)]:px-[0.75rem] small:[:where(&_.form-field)]:w-1/2">
                <FormField id="account_firstname_id">
                    <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="account_firstname">
                        <$If
                            test={$lang($string("account.settings.first_name"))}
                            operator={$string("!==")}
                            rvalue={$string("First Name")}
                            $then={() => <$Lang keyName={$string("account.settings.first_name")} />}
                            $else={() => <>{$pointer("forms.edit_account.first_name_label")}</>}
                        />{" "}
                        <small>
                            <$Lang keyName={$string("common.required")} />
                        </small>
                    </FormLabel>
                    <FormInput
                        aria-labelledby="account_firstname_id"
                        aria-live="polite"
                        autoComplete="given-name"
                        type="text"
                        name="account_firstname"
                        id="account_firstname"
                        value={$pointer("forms.edit_account.first_name")}
                    />
                </FormField>
                <FormField id="account_lastname_id">
                    <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="account_lastname">
                        <$If
                            test={$lang($string("account.settings.last_name"))}
                            operator={$string("!==")}
                            rvalue={$string("Last Name")}
                            $then={() => <$Lang keyName={$string("account.settings.last_name")} />}
                            $else={() => <>{$pointer("forms.edit_account.last_name_label")}</>}
                        />{" "}
                        <small>
                            <$Lang keyName={$string("common.required")} />
                        </small>
                    </FormLabel>
                    <FormInput
                        aria-labelledby="account_lastname_id"
                        aria-live="polite"
                        autoComplete="family-name"
                        type="text"
                        name="account_lastname"
                        id="account_lastname"
                        value={$pointer("forms.edit_account.last_name")}
                    />
                </FormField>
                <FormField id="account_companyname_id">
                    <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="account_companyname">
                        <$If
                            test={$lang($string("account.settings.company"))}
                            operator={$string("!==")}
                            rvalue={$string("Company")}
                            $then={() => <$Lang keyName={$string("account.settings.company")} />}
                            $else={() => <>{$pointer("forms.edit_account.company_label")}</>}
                        />
                    </FormLabel>
                    <FormInput
                        aria-labelledby="account_companyname_id"
                        aria-live="polite"
                        autoComplete="organization"
                        type="text"
                        name="account_companyname"
                        id="account_companyname"
                        value={$pointer("forms.edit_account.company_name")}
                    />
                </FormField>
                <FormField id="account_phone_id">
                    <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="account_phone">
                        <$If
                            test={$lang($string("account.settings.phone"))}
                            operator={$string("!==")}
                            rvalue={$string("Phone Number")}
                            $then={() => <$Lang keyName={$string("account.settings.phone")} />}
                            $else={() => <>{$pointer("forms.edit_account.phone_label")}</>}
                        />
                    </FormLabel>
                    <FormInput
                        aria-labelledby="account_phone_id"
                        aria-live="polite"
                        autoComplete="tel"
                        type="text"
                        name="account_phone"
                        id="account_phone"
                        value={$pointer("forms.edit_account.phone")}
                    />
                </FormField>
                <$Each
                    list={$pointer<unknown[]>("forms.edit_account.fields")}
                    $then={() => $unescaped($dynamicComponent($string("components/common/forms")))}
                />
            </div>
        </fieldset>
        <div className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-center [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half [:where(&)]:[background:none] [:where(&)]:[border:0] [:where(&)]:text-center xsmall:[:where(&)]:text-left [:where(&>*)]:[display:inline-block] [:where(&>*)]:mb-[1rem] [:where(&>*)]:w-full xsmall:[:where(&>*)]:align-baseline xsmall:[:where(&>*)]:w-auto">
            <Button variant="primary">
                <$Lang keyName={$string("account.settings.update_details")} />
            </Button>
        </div>
    </form>
);
