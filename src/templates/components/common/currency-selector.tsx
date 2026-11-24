"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $number, $pointer, $raw, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface Currency {
    code: string;
    name: string;
    is_active: boolean;
    switch_url: string;
    cart_currency_switch_url: string;
}

export default (_props: PartialProps) => (
    <$If
        test={$pointer("currency_selector.currencies.length")}
        operator={$string(">")}
        rvalue={$number(1)}
        $then={() => (
            <ul className="navUser-section float-left flow-root [.navUser-section+&]:ml-(--sv-navBar-section-margin) medium:relative">
                <li className="navUser-item [display:none] small:float-left medium:[display:block]">
                    <a
                        className="navUser-action font-bold uppercase no-underline px-half py-base [display:inline-flex] items-center flex-nowrap whitespace-nowrap text-(--sv-setting-navUser-color) hover:text-(--sv-setting-navUser-color-hover) is-open:text-(--sv-setting-navUser-color-hover) navUser-action--currencySelector has-dropdown"
                        href="#"
                        data-dropdown="currencySelection"
                        aria-controls="currencySelection"
                        aria-expanded="false"
                    >
                        <$Lang keyName={$string("common.currency")} code={$pointer("currency_selector.active_currency_code")} />
                        <i className="icon size-[8px] m-0 ml-quarter [&_svg]:fill-(--sv-setting-navUser-color) [&_svg]:stroke-(--sv-setting-navUser-color) [&_svg]:transition-all [&_svg]:duration-150 [&_svg]:ease-[ease] [.navUser-action:hover_&_svg]:fill-(--sv-setting-navUser-color-hover) [.navUser-action:hover_&_svg]:stroke-(--sv-setting-navUser-color-hover) [.navUser-action.is-open_&_svg]:fill-(--sv-setting-navUser-color-hover) [.navUser-action.is-open_&_svg]:stroke-(--sv-setting-navUser-color-hover)" aria-hidden="true">
                            <svg>
                                <use href="#icon-chevron-down" />
                            </svg>
                        </i>
                    </a>
                    <ul className="dropdown-menu is-open:before:left-auto is-open:before:right-half is-open:after:left-auto is-open:after:right-[calc(var(--sv-spacing-half)+2px)] [&_[data-locale-code]]:capitalize" id="currencySelection" data-dropdown-content={""} aria-hidden="true" tabIndex={-1}>
                        <$Each
                            list={$pointer<Currency[]>("currency_selector.currencies")}
                            $then={(currency) => (
                                <li className="dropdown-menu-item text-left [&:first-child>a]:pt-half [&:last-child>a]:pb-base [&>a]:m-0 [&>a]:px-[calc(var(--sv-spacing-half)+var(--sv-spacing-quarter))] [&>a]:py-sixth [&>a]:no-underline">
                                    <a
                                        dangerouslyInlineAttributes={{
                                            attributes: `href="${$unescaped(currency.switch_url)}" data-currency-code="${$unescaped(currency.code)}" ${$If({test: $pointer<number>("cart_currency_switch_url.length"), operator: $string(">"), rvalue: $number(0), $then: () => `${$raw('data-cart-currency-switch-url="')}${$unescaped(currency.cart_currency_switch_url)}${$raw('"')}`})} data-warning="${$lang($string("common.currency_switch_promotion"))}"`,
                                        }}
                                    >
                                        <$If test={currency.is_active} $then={() => <strong>{currency.name}</strong>} $else={() => <>{currency.name}</>} />
                                    </a>
                                </li>
                            )}
                        />
                    </ul>
                </li>
            </ul>
        )}
    />
);
