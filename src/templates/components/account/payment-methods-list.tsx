"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import AlertAlertInfo from "../common/alert/alert-info.tsx";
import {$cdn, $concat, $Each, $If, $InArray, $lang, $Lang, $pointer, $string, $Unless, $raw} from "@mainlanddev/hbx-bigcommerce";
import {Button} from "../../../server/formParts.tsx";

interface Instrument {
    type: string;
    brand: string;
    last_4: string;
    masked_account_number: string;
    email: string;
    expiry_month: string;
    expiry_year: string;
    is_default: boolean;
    edit_url: string;
    delete_url: string;
    billing_address: {
        address1: string;
        address2: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
}

interface PaymentMethod {
    type: string;
    display_name: string;
    description: string;
    add_url: string;
    stored_instruments: Instrument[];
}

export default (_props: PartialProps) => (
    <>
        <$Unless
            test={$pointer("customer.payment_methods")}
            $then={() => <AlertAlertInfo $positionalHash={$lang($string("account.payment_methods.no_methods"))} />}
        />

        <$Each
            list={$pointer<PaymentMethod[]>("customer.payment_methods")}
            $then={(method) => (
                <>
                {/* Check that the current instrument type is within our whitelist to stop future ones automagically coming through */}
                <$InArray
                    array={$pointer("../theme_settings.supported_payment_methods")}
                    value={method.type}
                    $then={() => (
                        <>
                            <h4 className="paymentMethodsTitle m-0 mb-half w-full p-0 [text-transform:none]">{method.display_name}</h4>
                            <$If test={method.description} $then={() => <p>{method.description}</p>} />
                            <div className="paymentMethodsGrid -m-half mb-single flex flex-wrap">
                                <$Each
                                    list={method.stored_instruments}
                                    $then={(inst) => (
                                        <div className="paymentMethodsGrid-item min-h-[250px] w-full p-half small:w-1/2">
                                            <div className="paymentMethod flex h-full flex-col flex-nowrap rounded-[3px] border border-container-border bg-[#e5e5e5] [&_.button]:mb-0">
                                                <div className="paymentMethod-row p-single first:bg-[#fff] last:mt-auto only:h-full">
                                                    <div className="methodHeader flex flex-row items-center justify-between">
                                                        <$If
                                                            test={$pointer("type")}
                                                            operator={$string("===")}
                                                            rvalue={$string("stored_card")}
                                                            $then={() => (
                                                                <>
                                                                    {/* If credit card STARTS */}
                                                                    <$If
                                                                        test={inst.brand}
                                                                        $then={() => (
                                                                            <>
                                                                                <$InArray
                                                                                    array={$pointer("../../theme_settings.supported_card_type_icons")}
                                                                                    value={inst.brand}
                                                                                    $then={() => (
                                                                                        <img
                                                                                            className="methodHeader-icon mr-half w-[28px] large:w-[42px]"
                                                                                            src={$cdn($concat($concat($string("img/payment-methods/"), inst.brand), $string(".svg")))}
                                                                                            alt={$lang($concat($string("account.payment_methods.card_types."), inst.brand))}
                                                                                            title={$lang($concat($string("account.payment_methods.card_types."), inst.brand))}
                                                                                        />
                                                                                    )}
                                                                                />{" "}
                                                                                <span className="methodHeader-brand text-smallest font-semibold text-grey-dark large:text-(length:--sv-fontSize-base)">
                                                                                    <$Lang keyName={$concat($string("account.payment_methods.card_types."), inst.brand)} />{" "}
                                                                                    <$Lang keyName={$string("account.payment_methods.card_ending_in")} last_four={inst.last_4} />
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                        $else={() => (
                                                                            <>
                                                                                <img
                                                                                    className="methodHeader-icon mr-half w-[28px] large:w-[42px]"
                                                                                    src={$cdn($string("img/payment-methods/card.svg"))}
                                                                                    alt={$lang($string("account.payment_methods.card_types.credit_card"))}
                                                                                    title={$lang($string("account.payment_methods.card_types.credit_card"))}
                                                                                />{" "}
                                                                                <span className="methodHeader-brand text-smallest font-semibold text-grey-dark large:text-(length:--sv-fontSize-base)">
                                                                                    <$Lang keyName={$string("account.payment_methods.card_types.credit_card")} />{" "}
                                                                                    <$Lang keyName={$string("account.payment_methods.card_ending_in")} last_four={inst.last_4} />
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                    />
                                                                    {/* If credit card ENDS */}
                                                                </>
                                                            )}
                                                        />{" "}

                                                        <$If
                                                            test={$pointer("type")}
                                                            operator={$string("===")}
                                                            rvalue={$string("stored_bank_account")}
                                                            $then={() => (
                                                                <>
                                                                    {/* If bank_account STARTS */}
                                                                    <$If
                                                                        test={$pointer("../methodId")}
                                                                        operator={$string("===")}
                                                                        rvalue={$string("ach")}
                                                                        $then={() => (
                                                                            <>
                                                                                <img
                                                                                    className="methodHeader-icon mr-half w-[28px] large:w-[42px]"
                                                                                    src={$cdn($string("img/payment-methods/ach.svg"))}
                                                                                    alt={$lang($string("account.payment_methods.ach"))}
                                                                                    title={$lang($string("account.payment_methods.ach"))}
                                                                                />{" "}
                                                                                <span className="methodHeader-brand text-smallest font-semibold text-grey-dark large:text-(length:--sv-fontSize-base)">
                                                                                    <$Lang keyName={$string("account.payment_methods.bank_account")} />{" "}
                                                                                    <$Lang
                                                                                        keyName={$string("account.payment_methods.card_ending_in")}
                                                                                        last_four={inst.masked_account_number}
                                                                                    />
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                        $elseThen={[
                                                                            {
                                                                                test: $pointer("../methodId"),
                                                                                operator: $string("==="),
                                                                                rvalue: $string("ecp"),
                                                                                $then: () => (
                                                                                    <>
                                                                                        <img
                                                                                            className="methodHeader-icon mr-half w-[28px] large:w-[42px]"
                                                                                            src={$cdn($string("img/payment-methods/ach.svg"))}
                                                                                            alt={$lang($string("account.payment_methods.ach"))}
                                                                                            title={$lang($string("account.payment_methods.ach"))}
                                                                                        />{" "}
                                                                                        <span className="methodHeader-brand text-smallest font-semibold text-grey-dark large:text-(length:--sv-fontSize-base)">
                                                                                            <$Lang keyName={$string("account.payment_methods.bank_account")} />{" "}
                                                                                            <$Lang
                                                                                                keyName={$string("account.payment_methods.card_ending_in")}
                                                                                                last_four={inst.masked_account_number}
                                                                                            />
                                                                                        </span>
                                                                                    </>
                                                                                ),
                                                                            },
                                                                            {
                                                                                test: $pointer("../methodId"),
                                                                                operator: $string("==="),
                                                                                rvalue: $string("sepa_direct_debit"),
                                                                                $then: () => (
                                                                                    <>
                                                                                        <img
                                                                                            className="methodHeader-icon mr-half w-[28px] large:w-[42px]"
                                                                                            src={$cdn($string("img/payment-methods/sepa.svg"))}
                                                                                            alt={$lang($string("account.payment_methods.sepa_direct_debit"))}
                                                                                            title={$lang($string("account.payment_methods.sepa_direct_debit"))}
                                                                                        />{" "}
                                                                                        <span className="methodHeader-brand text-smallest font-semibold text-grey-dark large:text-(length:--sv-fontSize-base)">
                                                                                            <$Lang keyName={$string("account.payment_methods.bank_account")} />{" "}
                                                                                            {inst.masked_account_number}
                                                                                        </span>
                                                                                    </>
                                                                                ),
                                                                            },
                                                                        ]}
                                                                        $else={() => (
                                                                            <>
                                                                                <img
                                                                                    className="methodHeader-icon mr-half w-[28px] large:w-[42px]"
                                                                                    src={$cdn($string("img/payment-methods/card.svg"))}
                                                                                    alt={$lang($string("account.payment_methods.card_types.credit_card"))}
                                                                                    title={$lang($string("account.payment_methods.card_types.credit_card"))}
                                                                                />{" "}
                                                                                <span className="methodHeader-brand text-smallest font-semibold text-grey-dark large:text-(length:--sv-fontSize-base)">
                                                                                    <$Lang keyName={$string("account.payment_methods.payment_method")} />
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                    />
                                                                    {/* If bank_account ENDS */}
                                                                </>
                                                            )}
                                                        />{" "}

                                                        <$If
                                                            test={$pointer("type")}
                                                            operator={$string("===")}
                                                            rvalue={$string("stored_paypal_account")}
                                                            $then={() => (
                                                                <>
                                                                    {/* If paypal STARTS */}
                                                                    <img
                                                                        className="methodHeader-icon mr-half w-[28px] large:w-[42px]"
                                                                        src={$cdn($string("img/payment-methods/paypal.svg"))}
                                                                        alt={$lang($string("account.payment_methods.paypal"))}
                                                                        title={$lang($string("account.payment_methods.paypal"))}
                                                                    />{" "}
                                                                    <span className="methodHeader-brand text-smallest font-semibold text-grey-dark large:text-(length:--sv-fontSize-base)">{inst.email}</span>
                                                                    {/* If paypal ENDS */}
                                                                </>
                                                            )}
                                                        />
                                                        <div className="methodHeader-meta ml-auto flex flex-nowrap pl-half">
                                                            <$If
                                                                test={inst.expiry_year}
                                                                $then={() => (
                                                                    <span className="methodHeader-expiry text-smaller capitalize">
                                                                        <$Lang
                                                                            keyName={$string("account.payment_methods.card_expiry")}
                                                                            month={inst.expiry_month}
                                                                            year={inst.expiry_year}
                                                                        />
                                                                    </span>
                                                                )}
                                                            />{" "}
                                                            <$If
                                                                test={inst.is_default}
                                                                $then={() => (
                                                                    <svg className="methodHeader-default ml-half h-[18px] w-[18px] fill-grey-dark large:h-[20px] large:w-[20px]">
                                                                        <use href="#icon-star" />
                                                                    </svg>
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <$If
                                                    test={inst.billing_address}
                                                    $then={() => (
                                                        <div className="paymentMethod-row p-single first:bg-[#fff] last:mt-auto only:h-full">
                                                            {/* If there is an address STARTS */}
                                                            <p className="methodDetails m-0 flex">
                                                                <span className="methodDetails-label flex-1 font-semibold">
                                                                    <$Lang keyName={$string("account.payment_methods.billing_address")} />:
                                                                </span>{" "}
                                                                <span className="methodDetails-description flex-2 text-smallest">
                                                                    <span>{inst.billing_address.address1}, </span>
                                                                    <$If
                                                                        test={inst.billing_address.address2}
                                                                        $then={() => <span>{inst.billing_address.address2}, </span>}
                                                                    />
                                                                    <span>
                                                                        {inst.billing_address.city}, {inst.billing_address.state} {inst.billing_address.zip}{" "}
                                                                        {inst.billing_address.country}
                                                                    </span>
                                                                </span>
                                                            </p>
                                                            {/* If there is an address ENDS */}
                                                        </div>
                                                    )}
                                                />
                                                <div className="paymentMethod-row p-single first:bg-[#fff] last:mt-auto only:h-full">
                                                    <form
                                                        action={inst.delete_url}
                                                        method="post"
                                                        data-delete-payment-method={$lang($string("forms.payment_methods.confirm_delete"))}
                                                    >
                                                        <$If
                                                            test={inst.edit_url}
                                                            $then={() => (
                                                                <Button tag="a" variant="primary" size="small" className="methodActions-button" href={inst.edit_url}>
                                                                    <$Lang keyName={$string("common.edit")} />
                                                                </Button>
                                                            )}
                                                        />{" "}
                                                        <$If
                                                            test={inst.delete_url}
                                                            $then={() => (
                                                                <Button type="submit" size="small" className="methodActions-button">
                                                                    <$Lang keyName={$string("common.delete")} />
                                                                </Button>
                                                            )}
                                                        />
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                                <$If
                                    test={method.add_url}
                                    $then={() => (
                                        <div className="paymentMethodsGrid-item min-h-[250px] w-full p-half small:w-1/2">
                                            <div className="paymentMethod flex h-full flex-col flex-nowrap rounded-[3px] border border-container-border bg-[#e5e5e5] [&_.button]:mb-0">
                                                <div className="paymentMethod-row p-single first:bg-[#fff] last:mt-auto only:h-full">
                                                    <a className="newPaymentMethod flex h-full min-h-[186px] flex-col items-center justify-items-center no-underline" href={method.add_url}>
                                                        <div className="newPaymentMethod-icon m-0 mt-auto mb-half text-[50px] leading-none">{$raw("&plus;")}</div>
                                                        <h5 className="newPaymentMethod-title m-0 mx-auto mb-auto text-center">
                                                            <$Lang keyName={$string("account.payment_methods.new_payment_method")} />
                                                        </h5>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        </>
                    )}
                />
                </>
            )}
        />
    </>
);
