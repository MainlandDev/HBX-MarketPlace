import GiftCertificateNavigation from "../../components/gift-certificate/navigation.tsx";
import Breadcrumbs from "../../components/common/navigation/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import {$If, $Lang, $lang, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormField, FormInput, FormLabel} from "../../../server/formParts.tsx";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h1 className="page-heading mx-0 mt-0 mb-[12px] text-center text-[25px] font-normal text-black">
                        <$Lang keyName={$string("gift_certificate.heading")} />
                    </h1>
                    <GiftCertificateNavigation gift_page={$string("balance")} />

                    <main className="account account--fixed mb-single medium:mx-auto medium:mb-0 medium:w-2/3">
                        <h3>
                            <$Lang keyName={$string("gift_certificate.balance.heading")} />
                        </h3>
                        <p>
                            <strong>
                                <$Lang keyName={$string("gift_certificate.balance.intro")} />
                            </strong>
                        </p>

                        <$If
                            test={$pointer("gift_certificate")}
                            $then={() => (
                                <$If
                                    test={$pointer("gift_certificate.error")}
                                    $then={() => <AlertAlertError $positionalHash={$pointer("gift_certificate.error")} />}
                                    $else={() => (
                                        <>
                                            <h2>{$pointer("gift_certificate.balance.formatted")}</h2>
                                            <h3>{$pointer("gift_certificate.code")}</h3>
                                        </>
                                    )}
                                />
                            )}
                        />

                        <form className="form form--oneField [:where(&)]:[margin:var(--sv-form-margin)]" id="gift-certificate-balance" method="get">
                            <input type="hidden" name="action" value="balance" />
                            <FormField>
                                <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="giftcertificatecode">
                                    <$Lang keyName={$string("forms.gift_certificate.balance.code")} />
                                </FormLabel>
                                <div className="form-prefixPostfix wrap flex-wrap [&_.form-input]:block [&_.form-input]:w-full large:[&_.form-input]:w-auto [&_.form-input::placeholder]:text-(--sv-formInput-placeholder-color) [&_.button]:w-full [&_.button]:[display:block] large:[&_.button]:w-auto [&_.form-inlineMessage]:mb-quarter large:[&_.form-inlineMessage]:mb-0 [:where(&)]:flex [:where(&)]:flex-row [:where(&)]:flex-nowrap [:where(&_.form-input)]:flex-1 [:where(&_.button)]:h-[3rem]">
                                    <FormInput id="giftcertificatecode" name="giftcertificatecode" />{" "}
                                    <Button
                                        type="submit"
                                        tag="input" variant="primary" className="form-prefixPostfix-button--postfix order-1 mx-0 mt-half mb-0 large:order-0 large:m-0 large:ml-half"
                                        value={$lang($string("forms.gift_certificate.balance.submit_value"))}
                                    />
                                </div>
                            </FormField>
                        </form>
                    </main>
                </>
            ),
        }}
        layout="layout/base"
    />
);
