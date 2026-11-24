"use server";
import type {PartialProps, ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import {$If, $lang, $Or, $pointer, $string, $With} from "@mainlanddev/hbx-bigcommerce";

/** Each theme setting that shows a payment method, with its label and sprite icon. */
const methods: ReadonlyArray<readonly [flag: string, label: string, icon: string]> = [
    ["show_accept_amex", "American Express", "icon-logo-american-express"],
    ["show_accept_discover", "Discover", "icon-logo-discover"],
    ["show_accept_mastercard", "Mastercard", "icon-logo-mastercard"],
    ["show_accept_paypal", "PayPal", "icon-logo-paypal"],
    ["show_accept_visa", "Visa", "icon-logo-visa"],
    ["show_accept_amazonpay", "Amazon Pay", "icon-logo-amazonpay"],
    ["show_accept_googlepay", "Google Pay", "icon-logo-googlepay"],
    ["show_accept_klarna", "Klarna", "icon-logo-klarna"],
];

export default (_props: PartialProps) => (
    <>
        <$With
            context={$pointer<ThemeSettingsObject>("theme_settings")}
            $then={() => (
                <$Or
                    values={methods.map(([flag]) => $pointer(flag))}
                    $then={() => (
                        <ul className="footer-payment-icons mt-single ml-0 flex list-none flex-wrap justify-center small:justify-normal medium:mt-double" aria-label={$lang($string("account.payment_methods.payment_icons_label"))}>
                            {methods.map(([flag, label, icon]) => (
                                <$If
                                    test={$pointer(flag)}
                                    $then={() => (
                                        <li>
                                            <svg className="footer-payment-icon m-quarter h-[40px] w-[50px] fill-icon align-middle" role="img">
                                                <title>{label}</title>
                                                <use href={`#${icon}`}></use>
                                            </svg>
                                        </li>
                                    )}
                                />
                            ))}
                        </ul>
                    )}
                />
            )}
        />
    </>
);
