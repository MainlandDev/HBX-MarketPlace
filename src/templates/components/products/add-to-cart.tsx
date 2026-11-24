"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import AlertAlertError from "../common/alert/alert-error.tsx";
import WalletButtons from "../common/wallet-buttons.tsx";
import {$If, $Inject, $Lang, $lang, $pointer, $raw, $string, $Unless, $unlessExpression, $Or} from "@mainlanddev/hbx-bigcommerce";

interface Product {
    can_purchase: boolean;
    show_quantity_input: boolean;
    title: string;
    min_purchase_quantity: number;
    max_purchase_quantity: number;
    out_of_stock: boolean;
    available_to_sell: boolean;
    out_of_stock_message: string;
    pre_order: boolean;
}

export default (_props: PartialProps) => {
    const product = $pointer<Product>("product");
    return (
        <div
            id="add-to-cart-wrapper"
            className="add-to-cart-wrapper"
            dangerouslyInlineAttributes={{attributes: `${$Unless({test: product.can_purchase, $then: () => $raw('style="display: none"')})}`}}
        >
            <$If
                test={product.show_quantity_input}
                $then={() => (
                    <>
                        <$Inject keyName={$string("productQuantityErrorMessage")} value={$lang($string("products.quantity_error_message"))} />
                        <div className="form-field form-field--increments">
                            <label className="form-label form-label--alternate mb-half text-smallest [font-family:'Montserrat',Arial,Helvetica,sans-serif] [&_small]:float-right [&_small]:mt-quarter" htmlFor="qty[]">
                                <$Lang keyName={$string("products.quantity")} />
                            </label>
                            <div className="form-increment [&_.button]:m-0 [&_.button]:px-quarter [&_.button]:py-[0.21429rem]" data-quantity-change={""}>
                                <button className="button button--icon" data-action="dec">
                                    <span className="absolute h-px w-px overflow-hidden [border:0] p-0 [clip:rect(1px,1px,1px,1px)]">
                                        <$Lang keyName={$string("products.quantity_decrease")} name={product.title} />
                                    </span>
                                    <i className="icon" aria-hidden="true">
                                        <svg>
                                            <use href="#icon-keyboard-arrow-down" />
                                        </svg>
                                    </i>
                                </button>
                                <input
                                    className="form-input form-input--incrementTotal inline-block h-auto w-[2.5rem] border-0 p-0 text-center align-middle text-smaller font-bold [[class~=form-field--success]_&]:float-none"
                                    id="qty[]"
                                    name="qty[]"
                                    type="tel"
                                    dangerouslyInlineAttributes={{
                                        attributes: `value="${$If({
                                            test: product.min_purchase_quantity,
                                            $then: () => `${product.min_purchase_quantity}`,
                                            $else: () => "1",
                                        })}"`,
                                    }}
                                    data-quantity-min={product.min_purchase_quantity}
                                    data-quantity-max={product.max_purchase_quantity}
                                    min="1"
                                    pattern="[0-9]*"
                                    aria-live="polite"
                                />
                                <button className="button button--icon" data-action="inc">
                                    <span className="absolute h-px w-px overflow-hidden [border:0] p-0 [clip:rect(1px,1px,1px,1px)]">
                                        <$Lang keyName={$string("products.quantity_increase")} name={product.title} />
                                    </span>
                                    <i className="icon" aria-hidden="true">
                                        <svg>
                                            <use href="#icon-keyboard-arrow-up" />
                                        </svg>
                                    </i>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            />

            <$If
                test={product.out_of_stock}
                $then={() => (
                    <$Unless
                        test={product.available_to_sell}
                        $then={() => (
                            <$If
                                test={product.out_of_stock_message}
                                $then={() => <AlertAlertError $positionalHash={product.out_of_stock_message} />}
                                $else={() => <AlertAlertError $positionalHash={$lang($string("products.sold_out"))} />}
                            />
                        )}
                    />
                )}
            />

            <div className="alertBox alertBox--error productAttributes-message rounded-[4px] text-(--sv-setting-alert-color)" style={{display: "none"}}>
                <div className="alertBox-column alertBox-icon [&_.icon]:size-[25px]">
                    <icon glyph="ic-error" className="icon" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                        </svg>
                    </icon>
                </div>
                <p className="alertBox-column alertBox-message"></p>
            </div>
            <$Or values={[$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))]} $then={() => (<><div className={`add-to-cart-buttons ${$If({test: product.pre_order, $then: () => "pre-order-buttons"})}`}>
                <div className="form-action">
                    <input
                        id="form-action-addToCart"
                        data-wait-message={$lang($string("products.adding_to_cart"))}
                        className="button button--primary"
                        type="submit"
                        value={$If({
                                test: product.pre_order,
                                $then: () => $lang($string("products.pre_order")),
                                $else: () => $lang($string("products.add_to_cart")),
                            })}
                    />
                    <span className="product-status-message aria-description--hidden">
                        <$Lang keyName={$string("products.adding_to_cart")} /> <$Lang keyName={$string("category.add_cart_announcement")} />
                    </span>
                </div>
                <$If
                    test={$pointer("with_wallet_buttons")}
                    $then={() => (
                        <div className="add-to-cart-wallet-buttons mt-half [&_div[data-smart-button-container-id]]:mt-[6px] [&_div[data-smart-button-container-id]]:leading-[0] [&_div[data-smart-button-container-id]_button]:w-full [&_div[data-smart-button-container-id]_div]:w-full [&_button.show-more-button]:mt-quarter [&_button.show-more-button]:w-full [&_button.show-more-button]:py-quarter [&_button.show-more-button]:px-0 [&_button.show-more-button]:text-center [&_button.show-more-button]:align-middle [&_button.show-more-button]:text-text-secondary [&_button.show-more-button]:underline [&_button.show-more-button]:[display:block] [&_button.show-more-button]:hover:text-(--sv-setting-color-textSecondary--hover)" data-add-to-cart-wallet-buttons={""}>
                            <WalletButtons />
                        </div>
                    )}
                />
            </div></>)} />
        </div>
    );
};
