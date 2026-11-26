"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import LanguageSelector from "../selectors/language-selector.tsx";
import CurrencySelector from "../selectors/currency-selector.tsx";
import ChannelSelector from "../selectors/channel-selector.tsx";
import SocialLinks from "../social-links.tsx";
import QuickSearch from "./quick-search.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $lang, $number, $pointer, $string, $unescaped, $And, $unlessExpression, $Or} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => {
    const theme = $pointer<ThemeSettingsObject>("theme_settings");
    return (
        <nav className="navUser absolute top-[26px] right-0 z-(--sv-zIndex-lowest) w-full flow-root [transform:translateY(-50%)] medium:contents medium:top-auto medium:right-auto medium:z-(--sv-zIndex-high) medium:px-single medium:[transform:none] [&_ul]:m-0 [&_ul]:list-none [&_ul]:p-0 [&_:where(.dropdown-menu)]:absolute [&_:where(.dropdown-menu)]:z-(--sv-zIndex-lowest) [&_.dropdown-menu.is-open]:[display:block] [&_.dropdown-menu_.button:focus]:z-(--sv-zIndex-lowest) [&_.dropdown-menu.is-loading_.loadingOverlay]:[background:none] [&_.dropdown-menu.is-loading_.loadingOverlay]:relative [&_.dropdown-menu.is-loading_.loadingOverlay]:px-0 [&_.dropdown-menu.is-loading_.loadingOverlay]:py-[calc(var(--sv-spacing-double)+var(--sv-spacing-single))] [&_:where(.dropdown-menu)]:border [&_:where(.dropdown-menu)]:border-(--sv-setting-navUser-dropdown-borderColor) [&_:where(.dropdown-menu)]:bg-(--sv-setting-navUser-dropdown-backgroundColor) [&_:where(.dropdown-menu)]:[box-shadow:var(--sv-container-drop-shadow-base)] [&_:where(.dropdown-menu.is-open)]:before:absolute [&_:where(.dropdown-menu.is-open)]:before:bottom-full [&_:where(.dropdown-menu.is-open)]:before:left-half [&_:where(.dropdown-menu.is-open)]:before:content-[''] [&_:where(.dropdown-menu.is-open)]:before:[display:block] [&_:where(.dropdown-menu.is-open)]:before:size-0 [&_:where(.dropdown-menu.is-open)]:before:[border-width:10px] [&_:where(.dropdown-menu.is-open)]:before:[border-style:inset_inset_solid_inset] [&_:where(.dropdown-menu.is-open)]:before:[border-color:transparent_transparent_var(--sv-setting-navUser-dropdown-borderColor)_transparent] [&_:where(.dropdown-menu.is-open)]:after:absolute [&_:where(.dropdown-menu.is-open)]:after:bottom-full [&_:where(.dropdown-menu.is-open)]:after:left-[calc(var(--sv-spacing-half)+2px)] [&_:where(.dropdown-menu.is-open)]:after:content-[''] [&_:where(.dropdown-menu.is-open)]:after:[display:block] [&_:where(.dropdown-menu.is-open)]:after:size-0 [&_:where(.dropdown-menu.is-open)]:after:[border-width:8px] [&_:where(.dropdown-menu.is-open)]:after:[border-style:inset_inset_solid_inset] [&_:where(.dropdown-menu.is-open)]:after:[border-color:transparent_transparent_var(--sv-setting-navUser-dropdown-backgroundColor)_transparent]">
            <$And a={$pointer("language_selector")} b={$pointer("language_selector.languages.length")} rest={[$string(">"), $number(1)]} $then={() => (<><LanguageSelector /></>)} />

            <$Or values={[$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))]} $then={() => (<><CurrencySelector /></>)} />

            <$If test={theme.show_channels} $then={() => <ChannelSelector />} />

            <ul className="navUser-section navUser-section--alt float-right flow-root ml-(--sv-navBar-section-margin) medium:relative medium:col-start-3 medium:row-start-1 medium:flex medium:items-center medium:gap-half">
                <$If
                    test={$pointer("customer.store_credit.value")}
                    operator={$string(">")}
                    rvalue={$number(0)}
                    $then={() => (
                <li className="navUser-item [display:none] small:float-left medium:[display:block]">
                    <a
                        className="navUser-action font-bold uppercase no-underline px-half py-base [display:block] text-(--sv-setting-navUser-color) hover:text-(--sv-setting-navUser-color-hover) is-open:text-(--sv-setting-navUser-color-hover) navUser-action--storeCredit"
                        data-dropdown="storeCredit-dropdown"
                        data-options="align:bottom"
                        href={$pointer("urls.cart")}
                        aria-label={$lang($string("common.store_credit_overview"), {credit: $pointer("customer.store_credit.formatted")})}
                    >
                        <span className="navUser-action-divider inline-block border-r border-(--sv-container-border-global-color-base) pr-[20px] text-(--sv-setting-color-textSecondary) no-underline">
                            <$Lang keyName={$string("common.store_credit_overview")} credit={$pointer("customer.store_credit.formatted")} />
                        </span>
                    </a>
                    <div className="dropdown-menu max-w-[300px] p-single is-open:before:left-[140px] is-open:after:left-[142px] [:where(&)]:[list-style:var(--sv-f-dropdown-list-style)] [:where(&)]:ml-0 [:where(&)]:absolute [:where(&)]:[background:var(--sv-f-dropdown-bg)] [:where(&)]:text-(length:--sv-f-dropdown-font-size) [:where(&)]:h-(--sv-f-dropdown-height) [:where(&)]:w-full [:where(&)]:z-[89] [:where(&)]:max-w-(--sv-f-dropdown-max-width) [:where(&:not([style*=display]))]:[display:none] [:where(&:not([style*=left]))]:-left-[9999px] [&.open]:[display:block] [:where(&>*:first-child)]:mt-0 [:where(&>*:last-child)]:mb-0" id="storeCredit-dropdown" data-dropdown-content={""} aria-hidden="true">
                        {$unescaped($lang($string("common.store_credit"), {store_credit: $pointer("customer.store_credit.formatted")}))}
                    </div>
                </li>
                    )}
                />

                <li className="navUser-item [display:none] small:float-left medium:[display:block]">
                    <a
                        className="navUser-action font-bold uppercase no-underline px-half py-base [display:none] [&.show]:[display:block] text-(--sv-setting-navUser-color) hover:text-(--sv-setting-navUser-color-hover) is-open:text-(--sv-setting-navUser-color-hover) navUser-item--compare"
                        href={$pointer("urls.compare")}
                        data-compare-nav={""}
                        aria-label={$lang($string("common.compare"))}
                    >
                        <$Lang keyName={$string("common.compare")} /> <span className="countPill countPill--positive countPill--alt ml-eighth inline-block size-[20px] rounded-[50%] bg-grey-lighter text-center text-tiny leading-[20px] font-bold text-grey-darker"></span>
                    </a>
                </li>
                <$If
                    test={theme.social_icon_placement_top}
                    $then={() => (
                        <>
                            <li className="navUser-item [display:none] small:float-left medium:[display:block] navUser-item--social medium:mt-[5px] medium:pr-[5px]"><SocialLinks /></li>
                            <li className="navUser-item [display:none] small:float-left medium:[display:block] navUser-item--divider medium:mt-[8px] medium:pl-[2px] medium:text-[25px]">|</li>
                        </>
                    )}
                />
                <li className="navUser-item [display:none] small:float-left medium:[display:block]">
                    <button
                        className="navUser-action font-bold uppercase no-underline px-half py-base [display:block] text-(--sv-setting-navUser-color) hover:text-(--sv-setting-navUser-color-hover) is-open:text-(--sv-setting-navUser-color-hover) navUser-action--quickSearch is-open:relative is-open:before:absolute is-open:before:bottom-0 is-open:before:left-1/2 is-open:before:content-[''] is-open:before:[display:block] is-open:before:size-0 is-open:before:[border-width:10px] is-open:before:[border-style:inset_inset_solid_inset] is-open:before:[border-color:transparent_transparent_var(--color-grey-lightest)_transparent] is-open:before:[transform:translateX(-50%)] medium:[display:none]"
                        type="button"
                        id="quick-search-expand"
                        data-search="quickSearch"
                        aria-controls="quickSearch"
                        aria-label={$lang($string("common.search"))}
                    >
                        <$Lang keyName={$string("common.search")} />
                    </button>
                </li>
                <$If
                    test={$pointer("settings.gift_certificates_enabled")}
                    $then={() => (
                        <li className="navUser-item [display:none] small:float-left medium:[display:block]">
                            <a className="navUser-action font-bold uppercase no-underline px-half py-base [display:block] text-(--sv-setting-navUser-color) hover:text-(--sv-setting-navUser-color-hover) is-open:text-(--sv-setting-navUser-color-hover)" href={$pointer("urls.gift_certificate.purchase")} aria-label={$lang($string("common.gift_cert"))}>
                                <$Lang keyName={$string("common.gift_cert")} />
                            </a>
                        </li>
                    )}
                />
                <li className="navUser-item [display:none] small:float-left medium:[display:block] navUser-item--account medium:relative medium:pl-[48px] [&_.navUser-action]:medium:block [&_.navUser-action]:medium:py-0 [&_.navUser-action]:medium:font-medium [&_.navUser-action]:medium:normal-case [&_.navUser-or]:[display:none]">
                    <svg className="text-white [display:none] medium:absolute medium:left-0 medium:top-1/2 medium:[display:block] medium:-translate-y-1/2" aria-hidden="true" viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>
                    <$If
                        test={$pointer("customer")}
                        $then={() => (
                            <>
                                <a className="navUser-action font-bold uppercase no-underline px-half py-base inline-block text-(--sv-setting-navUser-color) hover:text-(--sv-setting-navUser-color-hover) is-open:text-(--sv-setting-navUser-color-hover)" href={$pointer("urls.account.index")} aria-label={$lang($string("common.account"))}>
                                    <$Lang keyName={$string("common.account")} />
                                </a>
                                <a className="navUser-action font-bold uppercase no-underline px-half py-base inline-block text-(--sv-setting-navUser-color) hover:text-(--sv-setting-navUser-color-hover) is-open:text-(--sv-setting-navUser-color-hover)" href={$pointer("urls.auth.logout")} aria-label={$lang($string("common.logout"))}>
                                    <$Lang keyName={$string("common.logout")} />
                                </a>
                            </>
                        )}
                        $else={() => (
                            <>
                                <a className="navUser-action font-bold uppercase no-underline px-half py-base inline-block text-(--sv-setting-navUser-color) hover:text-(--sv-setting-navUser-color-hover) is-open:text-(--sv-setting-navUser-color-hover)" href={$pointer("urls.auth.login")} aria-label={$lang($string("common.login"))}>
                                    <$Lang keyName={$string("common.login")} />
                                </a>
                                <$If
                                    test={$pointer("settings.account_creation_enabled")}
                                    $then={() => (
                                        <>
                                            <span className="navUser-or relative z-1 inline-block cursor-default -mx-[12px] px-[2px] text-(--sv-setting-navUser-color)">
                                                <$Lang keyName={$string("common.or")} />
                                            </span>
                                            <a
                                                className="navUser-action font-bold uppercase no-underline px-half py-base inline-block text-(--sv-setting-navUser-color) hover:text-(--sv-setting-navUser-color-hover) is-open:text-(--sv-setting-navUser-color-hover) [.navUser-or+&]:-mr-[0.5rem]"
                                                href={$pointer("urls.auth.create_account")}
                                                aria-label={$lang($string("common.sign_up"))}
                                            >
                                                <$Lang keyName={$string("common.sign_up")} />
                                            </a>
                                        </>
                                    )}
                                />
                            </>
                        )}
                    />
                </li>
                <li className="navUser-item navUser-item--cart [display:block] small:float-left [&.navUser-item--cart__hidden-s]:max-[551px]:[display:none]">
                    <a
                        className="navUser-action font-bold uppercase no-underline px-half py-base [display:block] text-(--sv-setting-navUser-color) hover:text-(--sv-setting-navUser-color-hover) is-open:text-(--sv-setting-navUser-color-hover) medium:rounded-card medium:bg-brand-dark medium:text-white"
                        data-cart-preview={""}
                        data-dropdown="cart-preview-dropdown"
                        data-options="align:right"
                        href={$pointer("urls.cart")}
                        aria-label={$lang($string("cart.nav_aria_label"))}
                    >
                        <svg className="[display:none] medium:mr-half medium:inline-block medium:align-middle" aria-hidden="true" viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h3l2.5 12h11L21 7H6" /><circle cx="9" cy="20" r="1.5" /><circle cx="17" cy="20" r="1.5" /></svg>
                        <span className="navUser-item-cartLabel [display:none] small:inline">
                            <$Lang keyName={$string("common.cart")} />
                        </span>
                        <span className="countPill cart-quantity medium:bg-accent-amber medium:text-on-amber ml-eighth [display:none] size-[20px] rounded-[50%] bg-(--sv-setting-navUser-indicator-backgroundColor) text-center text-tiny leading-[20px] font-bold text-(--sv-color-white) [&.countPill--positive]:inline-block"></span>
                    </a>

                    <div className="dropdown-menu [&:not([style*=max-width])]:max-w-[320px] is-open:top-auto is-open:right-[5px] is-open:left-auto medium:is-open:right-0 is-open:before:left-auto is-open:before:right-[calc(var(--sv-spacing-half)-5px)] medium:is-open:before:right-half is-open:after:left-auto is-open:after:right-[calc(var(--sv-spacing-half)-3px)] medium:is-open:after:right-[calc(var(--sv-spacing-half)+2px)] [:where(&)]:[list-style:var(--sv-f-dropdown-list-style)] [:where(&)]:ml-0 [:where(&)]:absolute [:where(&)]:[background:var(--sv-f-dropdown-bg)] [:where(&)]:text-(length:--sv-f-dropdown-font-size) [:where(&)]:h-(--sv-f-dropdown-height) [:where(&)]:w-full [:where(&)]:z-[89] [:where(&)]:max-w-(--sv-f-dropdown-max-width) [:where(&:not([style*=display]))]:[display:none] [:where(&:not([style*=left]))]:-left-[9999px] [&.open]:[display:block] [:where(&>*:first-child)]:mt-0 [:where(&>*:last-child)]:mb-0" id="cart-preview-dropdown" data-dropdown-content={""} aria-hidden="true"></div>
                </li>
            </ul>
            <div className="dropdown dropdown--quickSearch absolute -left-[9999px] [display:none] bg-(--sv-dropdown--quickSearch-backgroundColor) py-single outline-none small:p-double is-open:left-0 is-open:right-0 is-open:z-(--sv-zIndex-high) is-open:w-full is-open:[display:block] medium:static medium:col-start-2 medium:row-start-1 medium:[display:block] medium:w-full medium:bg-transparent medium:p-0 medium:[&_.container]:px-0 medium:[&_.form]:max-w-none [&_.form]:mx-auto [&_.form]:max-w-[30rem] [&_.form]:mb-0 [&_.form-field]:mb-0 [&_.form-input]:h-[unset] [&_.form-input]:text-small medium:[&_.form-input]:rounded-r-none [&_.productGrid]:pt-single [&_.productGrid]:px-0 [&_.productGrid]:pb-0 small:[&_.productGrid]:pt-double" id="quickSearch" data-prevent-quick-search-close={""}>
                <QuickSearch name={$string("nav-quick-search")} />
            </div>
        </nav>
    );
};
