"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import AlertAlertError from "../common/alert/alert-error.tsx";
import {$If, $Inject, $Lang, $lang, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormField, FormInput, FormLabel} from "../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <form data-contact-form={""} className="form [:where(&)]:[margin:var(--sv-form-margin)]" action={$pointer("urls.contact_us_submit")} method="post">
        <$Inject keyName={$string("contactEmail")} value={$lang($string("forms.validate.contact.email_address"))} />{" "}
        <$Inject keyName={$string("contactQuestion")} value={$lang($string("forms.validate.contact.question"))} />
        <$If
            test={$pointer("forms.contact.error")}
            $then={() => (
                <div id="contact-us-error">
                    <AlertAlertError $positionalHash={$pointer("forms.contact.error")} />
                </div>
            )}
        />
        <input type="hidden" name="page_id" id="page_id" value={$pointer("forms.contact.page_id")} />
        <div className="form-row form-row--half small:[&>.form-field:nth-child(odd)]:clear-left [:where(&)]:-mx-[0.75rem] [:where(&)]:max-w-none [:where(&)]:w-auto [:where(&)]:[display:flow-root] [:where(&_.form-field)]:float-left [:where(&_.form-field)]:w-full [:where(&_.form-field)]:max-w-none [:where(&_.form-field)]:px-[0.75rem] small:[:where(&_.form-field)]:w-1/2">
            <$If
                test={$pointer("forms.contact.name")}
                $then={() => (
                    <FormField>
                        <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="contact_fullname">
                            <$Lang keyName={$string("forms.contact_us.full_name")} />
                        </FormLabel>
                        <FormInput type="text" id="contact_fullname" name="contact_fullname" value={$pointer("customer.name")} />
                    </FormField>
                )}
            />

            <$If
                test={$pointer("forms.contact.phone")}
                $then={() => (
                    <FormField>
                        <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="contact_phone">
                            <$Lang keyName={$string("forms.contact_us.phone")} />
                        </FormLabel>
                        <FormInput type="text" id="contact_phone" name="contact_phone" value={$pointer("customer.phone")} />
                    </FormField>
                )}
            />

            <FormField>
                <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="contact_email">
                    <$Lang keyName={$string("forms.contact_us.email")} />{" "}
                    <small>
                        <$Lang keyName={$string("common.required")} />
                    </small>
                </FormLabel>
                <FormInput type="text" id="contact_email" name="contact_email" value={$pointer("customer.email")} />
            </FormField>

            <$If
                test={$pointer("forms.contact.order")}
                $then={() => (
                    <FormField>
                        <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="contact_orderno">
                            <$Lang keyName={$string("forms.contact_us.order")} />
                        </FormLabel>
                        <FormInput type="text" id="contact_orderno" name="contact_orderno" />
                    </FormField>
                )}
            />

            <$If
                test={$pointer("forms.contact.company")}
                $then={() => (
                    <FormField>
                        <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="contact_companyname">
                            <$Lang keyName={$string("forms.contact_us.company")} />
                        </FormLabel>
                        <FormInput type="text" id="contact_companyname" name="contact_companyname" />
                    </FormField>
                )}
            />

            <$If
                test={$pointer("forms.contact.rma")}
                $then={() => (
                    <FormField>
                        <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="contact_rma">
                            <$Lang keyName={$string("forms.contact_us.rma")} />
                        </FormLabel>
                        <FormInput type="text" id="contact_rma" name="contact_rma" />
                    </FormField>
                )}
            />
        </div>

        <FormField>
            <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="contact_question">
                <$Lang keyName={$string("forms.contact_us.question")} />{" "}
                <small>
                    <$Lang keyName={$string("common.required")} />
                </small>
            </FormLabel>
            <FormInput name="contact_question" id="contact_question" rows={5} cols={50} tag="textarea" />
        </FormField>
        <$If
            test={$pointer("forms.contact.manualcaptcha")}
            $then={() => (
                <FormField>
                    <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor={$pointer("forms.contact.manualcaptcha.name")}>
                        <$Lang keyName={$string("forms.contact_us.manual_captcha_instruction")} />{" "}
                        <small>
                            <$Lang keyName={$string("common.required")} />
                        </small>
                    </FormLabel>
                    <div className="manual-captcha-input-container flex items-center [&_[class~=form-input]]:flex-1">
                        <span className="question mr-[1rem] text-[1.25rem]">{$pointer("forms.contact.manualcaptcha.question")}</span>{" "}
                        <FormInput
                            type="text"
                            id={$pointer("forms.contact.manualcaptcha.name")}
                            name={$pointer("forms.contact.manualcaptcha.name")}
                            value=""
                            aria-disabled="true"
                            autoComplete="off"
                            required={true}
                        />
                    </div>
                </FormField>
            )}
        />
        {$unescaped($pointer("forms.contact.recaptcha.markup"))}
        <div className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-center [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half [:where(&)]:[background:none] [:where(&)]:[border:0] [:where(&)]:text-center xsmall:[:where(&)]:text-left [:where(&>*)]:[display:inline-block] [:where(&>*)]:mb-[1rem] [:where(&>*)]:w-full xsmall:[:where(&>*)]:align-baseline xsmall:[:where(&>*)]:w-auto">
            <Button tag="input" variant="primary" type="submit" value={$lang($string("forms.contact_us.submit"))} />
        </div>
    </form>
);
