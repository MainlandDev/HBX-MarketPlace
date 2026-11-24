"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Each, $Inject, $Lang, $lang, $pointer, $raw, $string, $Unless, $ifExpression, $And} from "@mainlanddev/hbx-bigcommerce";

interface Option {
    id: string;
    name: string;
    selected: boolean;
}

export default (_props: PartialProps) => (
    <>
        <$Inject keyName={$string("shippingCountryErrorMessage")} value={$lang($string("cart.shipping_estimator.empty_country_error"))} />{" "}
        <$Inject keyName={$string("shippingProvinceErrorMessage")} value={$lang($string("cart.shipping_estimator.empty_province_error"))} />

        <$If
            test={$pointer("shipping_cost")}
            $then={() => (
                <div className="cart-total-value float-left py-third pr-0 pl-single text-left small:text-right medium:w-6/12 medium:py-base medium:pl-0 [[data-enhanced]_&]:float-right [[data-enhanced]_&]:py-third [[data-enhanced]_&]:pl-0 [[data-enhanced]_&]:font-semibold [&_.shipping-estimate-show]:p-0 [&_.shipping-estimate-show]:text-text-secondary [&_.shipping-estimate-show]:underline [&_.shipping-estimate-show]:[transition:color_0.15s_ease] [&_.shipping-estimate-show]:hover:text-(--sv-setting-color-textSecondary--hover) [&_.shipping-estimate-show[aria-expanded=true]]:italic [[data-enhanced]_&]:[&_.price--discounted]:text-(--sv-setting-color-greyLight)">
                    <div className={`subtotal${$Unless({test: $pointer("multi_coupon_ui_enabled"), $then: () => " shipping-estimate-show"})}`}>
                        <$If
                            test={$pointer("multi_coupon_ui_enabled")}
                            $then={() => (
                                <>
                                    <$And a={$pointer("shipping_cost_discounted")} b={$ifExpression($pointer("shipping_cost_discounted.formatted"), $string("!=="), $pointer("shipping_cost.formatted"))} $then={() => (<><span className="price--discounted line-through">{$pointer("shipping_cost.formatted")}</span>{" "}
                                    <span id="shipping-cost-discounted">{$pointer("shipping_cost_discounted.formatted")}</span></>)} $else={() => (<><span id="shipping-cost-discounted">{$pointer("shipping_cost.formatted")}</span></>)} />
                                </>
                            )}
                            $else={() => (
                                <a href="#" className="shipping-estimate-value [&_#shipping-cost-discounted]:ml-quarter">
                                    <$If
                                        test={$pointer("shipping_cost_discounted")}
                                        $then={() => <span className="price--discounted line-through">{$pointer("shipping_cost.formatted")}</span>}
                                        $else={() => <span>{$pointer("shipping_cost.formatted")}</span>}
                                    />{" "}
                                    <$If
                                        test={$pointer("shipping_cost_discounted")}
                                        $then={() => <span id="shipping-cost-discounted">{$pointer("shipping_cost_discounted.formatted")}</span>}
                                    />
                                </a>
                            )}
                        />
                    </div>
                </div>
            )}
        />

        <div id="add-shipping" className="shipping-estimator u-hidden">
            <form className="form estimator-form mb-0 [&_.button--primary]:w-[60%]" data-shipping-estimator={""}>
                <dl>
                    <dt className="estimator-form-label clear-both float-left mb-0 font-normal [&_.form-label]:mb-0 [&_.form-label]:leading-[32px]">
                        <label className="form-label [&_small]:float-right [&_small]:mt-quarter" htmlFor="shipping-country">
                            <$Lang keyName={$string("cart.shipping_estimator.select_a_country")} />
                        </label>
                    </dt>

                    <dd className="estimator-form-input float-right mb-[1em] w-[60%]">
                        <select className="form-select mb-0 h-[32px] px-half py-0 [background-position:right_5px_center] [background-size:20px_20px]" id="shipping-country" name="shipping-country" data-field-type="Country">
                            <option>
                                <$Lang keyName={$string("cart.shipping_estimator.select_a_country")} />
                            </option>
                            <$Each
                                list={$pointer<Option[]>("countries")}
                                $then={(country) => (
                                    <option
                                        dangerouslyInlineAttributes={{
                                            attributes: `value="${country.id}"${$If({test: country.selected, $then: () => $raw('selected="selected"')})}`,
                                        }}
                                    >
                                        {country.name}
                                    </option>
                                )}
                            />
                        </select>
                    </dd>

                    <dt className="estimator-form-label clear-both float-left mb-0 font-normal [&_.form-label]:mb-0 [&_.form-label]:leading-[32px]">
                        <label className="form-label [&_small]:float-right [&_small]:mt-quarter" htmlFor="shipping-state">
                            <$Lang keyName={$string("cart.shipping_estimator.select_a_state")} />
                        </label>
                    </dt>

                    <dd className="estimator-form-input float-right mb-[1em] w-[60%]">
                        <$If
                            test={$pointer("states.length")}
                            $then={() => (
                                <select className="form-select mb-0 h-[32px] px-half py-0 [background-position:right_5px_center] [background-size:20px_20px]" id="shipping-state" name="shipping-state" data-field-type="State">
                                    <option>
                                        <$Lang keyName={$string("cart.shipping_estimator.select_a_state")} />
                                    </option>
                                    <$Each
                                        list={$pointer<Option[]>("states")}
                                        $then={(state) => (
                                            <option
                                                dangerouslyInlineAttributes={{
                                                    attributes: `value="${state.id}"${$If({test: state.selected, $then: () => $raw('selected="selected"')})}`,
                                                }}
                                            >
                                                {state.name}
                                            </option>
                                        )}
                                    />
                                </select>
                            )}
                            $else={() => (
                                <input
                                    className="form-input mb-0 inline-block h-[32px] w-full p-third align-top"
                                    type="text"
                                    id="shipping-state"
                                    name="shipping-state"
                                    data-field-type="State"
                                    placeholder={$lang($string("cart.shipping_estimator.select_a_state"))}
                                />
                            )}
                        />
                    </dd>

                    <dt className="estimator-form-label clear-both float-left mb-0 font-normal [&_.form-label]:mb-0 [&_.form-label]:leading-[32px]">
                        <label className="form-label [&_small]:float-right [&_small]:mt-quarter" htmlFor="shipping-city">
                            <$Lang keyName={$string("cart.shipping_estimator.suburb_city")} />
                        </label>
                    </dt>
                    <dd className="estimator-form-input float-right mb-[1em] w-[60%]">
                        <input
                            className="form-input mb-0 inline-block h-[32px] w-full p-third align-top"
                            type="text"
                            id="shipping-city"
                            name="shipping-city"
                            value={$pointer("selected_city")}
                            placeholder={$lang($string("cart.shipping_estimator.suburb_city"))}
                        />
                    </dd>

                    <dt className="estimator-form-label clear-both float-left mb-0 font-normal [&_.form-label]:mb-0 [&_.form-label]:leading-[32px]">
                        <label className="form-label [&_small]:float-right [&_small]:mt-quarter" htmlFor="shipping-zip">
                            <$Lang keyName={$string("cart.shipping_estimator.zip_postal_code")} />
                        </label>
                    </dt>
                    <dd className="estimator-form-input float-right mb-[1em] w-[60%]">
                        <input
                            autoComplete="postal-code"
                            className="form-input mb-0 inline-block h-[32px] w-full p-third align-top"
                            type="text"
                            id="shipping-zip"
                            name="shipping-zip"
                            value={$pointer("selected_zip")}
                            placeholder={$lang($string("cart.shipping_estimator.zip_postal_code"))}
                        />
                    </dd>
                    <button className="button button--primary button--small shipping-estimate-submit">
                        <$Lang keyName={$string("cart.shipping_estimator.estimate_shipping")} />
                    </button>
                </dl>
            </form>
            <div className="shipping-quotes" role="alert" aria-atomic="true" aria-live="assertive"></div>
        </div>
    </>
);
