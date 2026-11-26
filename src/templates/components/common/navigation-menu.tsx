"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import QuickSearch from "./quick-search.tsx";
import NavigationList from "./navigation-list.tsx";
import NavigationListAlternate from "./navigation-list-alternate.tsx";
import LanguageSelectorMobile from "./language-selector-mobile.tsx";
import ChannelSelectorMobile from "./channel-selector-mobile.tsx";
import SocialLinks from "./social-links.tsx";
import {moreIcon, navLink} from "../../../server/navParts.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $number, $pointer, $raw, $string, $Unless, $And, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface Category {
    id: string;
}

interface ContentPage {
    url: string;
    name: string;
}

interface Currency {
    code: string;
    switch_url: string;
    cart_currency_switch_url: string;
    name: string;
    is_active: boolean;
}

const accountLink = (url: string, key: string) => (
    <li className="navPage-subMenu-item py-half medium:float-left medium:m-0 medium:w-1/4 medium:px-[0.75rem] medium:py-0 medium:[&>a]:mb-half-quarter medium:[&>a]:border-b medium:[&>a]:border-(--sv-setting-navPages-subMenu-separatorColor) medium:[&_a]:w-full medium:[&_a]:normal-case">
        {navLink("sub", false, {href: $pointer(url), "aria-label": $lang($string(key))}, <$Lang keyName={$string(key)} />)}
    </li>
);

export default (_props: PartialProps) => {
    const theme = $pointer<ThemeSettingsObject>("theme_settings");
    // The list is rendered twice (depth-max design or not) only because its `navPages-list-depth-max` hook class is a render-time condition.
    const listItems = (
        <>
            <li className="navPages-item navPages-item--categories medium:relative medium:float-left medium:m-0 medium:p-0">
                <details className="group/categories m-0 rounded-none bg-transparent p-0 [box-shadow:none]">
                    <summary className="navPages-categoriesToggle before:[display:none] m-0 h-[40px] flex flex-row cursor-pointer list-none flex-nowrap items-center justify-between gap-half rounded-card bg-border px-double py-[6px] text-small leading-6 font-bold text-text uppercase medium:min-w-[206px] [&::-webkit-details-marker]:[display:none]">
                        <$Lang keyName={$string("category.label")} />
                        <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </summary>
                    <ul className="navPages-list navPages-list--categories m-0 bg-surface p-single text-text [--sv-setting-navPages-color:var(--color-text)] medium:[&>li]:float-none medium:[&>li]:w-full medium:absolute medium:top-full medium:left-0 medium:z-(--sv-zIndex-high) medium:w-[260px] medium:rounded-card medium:[box-shadow:var(--sv-container-drop-shadow-base)]">
            <$Each
                list={$pointer<Category[]>("categories")}
                $then={() => (
                    <li className="navPages-item medium:[display:block] medium:float-left medium:m-0 medium:p-0 [[class~=navPages-list-depth-max][class~=subMenu-is-open]_&[class~=is-hidden]]:[display:none] medium:[[class~=navPages-list-depth-max][class~=subMenu-is-open]_&[class~=is-hidden]]:[display:inline-block]">
                        <$If
                            test={$pointer("../theme_settings.navigation_design")}
                            operator={$string("===")}
                            rvalue={$string("simple")}
                            $then={() => <NavigationList />}
                        />
                        <$If
                            test={$pointer("../theme_settings.navigation_design")}
                            operator={$string("===")}
                            rvalue={$string("alternate")}
                            $then={() => <NavigationListAlternate />}
                        />
                    </li>
                )}
            />
                    </ul>
                </details>
            </li>
            <$Unless
                test={theme.hide_content_navigation}
                $then={() => (
                    <$Each
                        list={$pointer<ContentPage[]>("pages")}
                        $then={(page) => (
                            <li className="navPages-item navPages-item-page medium:[display:block] medium:float-left medium:m-0 medium:p-0 [[class~=navPages-list-depth-max][class~=subMenu-is-open]_&]:[display:none] medium:[[class~=navPages-list-depth-max][class~=subMenu-is-open]_&]:[display:inline-block] [[class~=navPages-list-depth-max][class~=subMenu-is-open]_&[class~=is-hidden]]:[display:none] medium:[[class~=navPages-list-depth-max][class~=subMenu-is-open]_&[class~=is-hidden]]:[display:inline-block]">
                                <$If
                                    test={$pointer("name")}
                                    operator={$string("==")}
                                    rvalue={$pointer("../page.title")}
                                    $then={() => navLink("plain", true, {href: page.url, "aria-label": page.name}, page.name)}
                                    $else={() => navLink("plain", false, {href: page.url, "aria-label": page.name}, page.name)}
                                />
                            </li>
                        )}
                    />
                )}
            />
            <li className="navPages-item [display:none] medium:float-left medium:m-0 medium:p-0 medium:[display:block]">
                <a className="navPages-action [display:block] py-half-quarter px-half-quarter text-(--sv-setting-navPages-color)" href="/contact-support/" aria-label="Contact support">
                    <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                </a>
            </li>
            <$If
                test={$pointer("settings.phone_number")}
                $then={() => (
                    <li className="navPages-item [display:none] medium:float-left medium:m-0 medium:p-0 medium:[display:block]">
                        <a className="navPages-action [display:block] py-half-quarter px-half-quarter text-(--sv-setting-navPages-color)" href={`tel:${$pointer("settings.phone_number")}`} aria-label="Call us">
                            <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
                        </a>
                    </li>
                )}
            />
            <li className="navPages-item navPages-item--social [display:none] medium:ml-auto medium:float-right medium:m-0 medium:p-0 medium:[display:block]">
                <SocialLinks />
            </li>
        </>
    );
    return (
        <nav className="navPages h-full overflow-y-auto bg-(--sv-navPages-backgroundColor) p-single [&_ul]:list-none medium:mx-auto medium:w-full medium:max-w-(--sv-layout-widthMax) medium:flow-root medium:overflow-y-visible medium:[background:none] medium:p-0 medium:text-center medium:text-[0px]">
            <div className="navPages-quickSearch mb-half border-b border-container-border medium:[display:none] [&>[class~=container]]:p-0 [&_[class~=form]]:m-0 [&_[class~=form-field]]:mb-0"><QuickSearch name={$string("nav-menu-quick-search")} /></div>
            <$If
                test={$pointer("theme_settings.navigation_design")}
                operator={$string("!==")}
                rvalue={$string("simple")}
                $then={() => <ul className="navPages-list navPages-list-depth-max m-0 medium:inline-block medium:float-none medium:p-0">{listItems}</ul>}
                $else={() => <ul className="navPages-list m-0 medium:inline-block medium:float-none medium:p-0">{listItems}</ul>}
            />
            <ul className="navPages-list navPages-list--user m-0 mt-half border-t border-(--sv-navPages-list--user-borderColor) pt-half medium:[display:none]">
                <$And a={$pointer("language_selector")} b={$pointer("language_selector.languages.length")} rest={[$string(">"), $number(1)]} $then={() => (<><li className="navPages-item medium:[display:block] medium:float-left medium:m-0 medium:p-0"><LanguageSelectorMobile /></li></>)} />
                <$If
                    test={$pointer("currency_selector.currencies.length")}
                    operator={$string(">")}
                    rvalue={$number(1)}
                    $then={() => (
                <li className="navPages-item medium:[display:block] medium:float-left medium:m-0 medium:p-0">
                    {navLink(
                        "top",
                        false,
                        {
                            href: "#",
                            "data-collapsible": "navPages-currency",
                            "aria-controls": "navPages-currency",
                            "aria-expanded": "false",
                            "aria-label": $lang($string("common.currency"), {code: $pointer("currency_selector.active_currency_code")}),
                        },
                        <>
                            <$Lang keyName={$string("common.currency")} code={$pointer("currency_selector.active_currency_code")} />{" "}
                            {moreIcon("top")}
                        </>,
                    )}
                    <div className="navPage-subMenu [display:none] [outline:0] is-open:[display:block] medium:absolute medium:bg-(--sv-setting-navPages-subMenu-backgroundColor) medium:px-single medium:pt-single medium:pb-single-half medium:text-left medium:is-open:left-0 medium:is-open:w-full" id="navPages-currency" aria-hidden="true" tabIndex={-1}>
                        <ul className="navPage-subMenu-list my-quarter ml-0 mr-0 pl-0 medium:m-auto medium:w-full medium:max-w-(--sv-layout-widthMax) medium:flow-root medium:p-0">
                            <$Each
                                list={$pointer<Currency[]>("currency_selector.currencies")}
                                $then={(currency) => (
                                    <li className="navPage-subMenu-item py-half medium:float-left medium:m-0 medium:w-1/4 medium:px-[0.75rem] medium:py-0 medium:[&>a]:mb-half-quarter medium:[&>a]:border-b medium:[&>a]:border-(--sv-setting-navPages-subMenu-separatorColor) medium:[&_a]:w-full medium:[&_a]:normal-case">
                                        {navLink(
                                            "sub",
                                            false,
                                            {
                                                dangerouslyInlineAttributes: {
                                                    attributes: `href="${$unescaped(currency.switch_url)}" aria-label="${currency.name}" data-currency-code="${$unescaped(currency.code)}" ${$If({test: $pointer<number>("cart_currency_switch_url.length"), operator: $string(">"), rvalue: $number(0), $then: () => `${$raw('data-cart-currency-switch-url="')}${$unescaped(currency.cart_currency_switch_url)}${$raw('"')}`})} data-warning="${$lang($string("common.currency_switch_promotion"))}"`,
                                                },
                                            },
                                            <$If test={currency.is_active} $then={() => <strong>{currency.name}</strong>} $else={() => <>{currency.name}</>} />,
                                        )}
                                    </li>
                                )}
                            />
                        </ul>
                    </div>
                </li>
                    )}
                />
                <$If test={theme.show_channels} $then={() => <li className="navPages-item medium:[display:block] medium:float-left medium:m-0 medium:p-0"><ChannelSelectorMobile /></li>} />
                <$If
                    test={$pointer("settings.gift_certificates_enabled")}
                    $then={() => (
                        <li className="navPages-item medium:[display:block] medium:float-left medium:m-0 medium:p-0">
                            {navLink("plain", false, {href: $pointer("urls.gift_certificate.purchase"), "aria-label": $lang($string("common.gift_cert"))}, <$Lang keyName={$string("common.gift_cert")} />)}
                        </li>
                    )}
                />
                <$If
                    test={$pointer("customer.store_credit.value")}
                    operator={$string(">")}
                    rvalue={$number(0)}
                    $then={() => (
                <li className="navPages-item medium:[display:block] medium:float-left medium:m-0 medium:p-0">
                    <a className="navPages-action navPages-action--storeCredit [display:block] py-half text-smaller font-bold text-(--sv-setting-color-textSecondary) uppercase no-underline hover:text-(--sv-navPage-subMenu-item--is-highlighted-color) medium:inline-block medium:px-half-quarter medium:pt-half medium:pb-half-quarter">
                        <$Lang keyName={$string("common.store_credit_overview")} credit={$pointer("customer.store_credit.formatted")} />
                    </a>
                </li>
                    )}
                />
                <$If
                    test={$pointer("theme_settings.product_list_display_mode")}
                    operator={$string("==")}
                    rvalue={$string("list")}
                    $then={() => (
                <li className="navPages-item medium:[display:block] medium:float-left medium:m-0 medium:p-0">
                    <a className="navPages-action navPages-action--compare [display:none] [&.show]:[display:block] py-half text-smaller font-bold text-(--sv-setting-navPages-color) uppercase no-underline hover:text-(--sv-navPage-subMenu-item--is-highlighted-color) medium:px-half-quarter medium:pt-half medium:pb-half-quarter" href={$pointer("urls.compare")} data-compare-nav={""} aria-label={$lang($string("common.compare"))}>
                        <$Lang keyName={$string("common.compare")} />{" "}
                        <span className="countPill countPill--positive countPill--alt ml-eighth inline-block size-[20px] rounded-[50%] bg-grey-lighter text-center text-tiny leading-[20px] font-bold text-grey-darker"></span>
                    </a>
                </li>
                    )}
                />
                <$If
                    test={$pointer("customer")}
                    $then={() => (
                        <>
                            <li className="navPages-item medium:[display:block] medium:float-left medium:m-0 medium:p-0">
                                {navLink(
                                    "top",
                                    false,
                                    {href: $pointer("urls.account.index"), "data-collapsible": "navPages-account", "aria-label": $lang($string("common.account"))},
                                    <>
                                        <$Lang keyName={$string("common.account")} />{" "}
                                        {moreIcon("top")}
                                    </>,
                                )}
                                <div className="navPage-subMenu [display:none] [outline:0] is-open:[display:block] medium:absolute medium:bg-(--sv-setting-navPages-subMenu-backgroundColor) medium:px-single medium:pt-single medium:pb-single-half medium:text-left medium:is-open:left-0 medium:is-open:w-full" id="navPages-account" aria-hidden="true" tabIndex={-1}>
                                    <ul className="navPage-subMenu-list my-quarter ml-0 mr-0 pl-0 medium:m-auto medium:w-full medium:max-w-(--sv-layout-widthMax) medium:flow-root medium:p-0">
                                        {accountLink("urls.account.orders.all", "account.nav.orders")}
                                        <$If test={$pointer("settings.returns_enabled")} $then={() => accountLink("urls.account.returns", "account.nav.returns")} />
                                        {accountLink("urls.account.inbox", "account.mobile_nav.messages")}
                                        {accountLink("urls.account.addresses", "account.nav.addresses")}
                                        <$If
                                            test={$pointer("settings.show_payment_methods")}
                                            $then={() => accountLink("urls.account.payment_methods.all", "account.nav.payment_methods")}
                                        />
                                        {accountLink("urls.account.wishlists.all", "account.mobile_nav.wishlists")}
                                        {accountLink("urls.account.recent_items", "account.nav.recently_viewed")}
                                        {accountLink("urls.account.details", "account.nav.settings")}
                                    </ul>
                                </div>
                            </li>
                            <li className="navPages-item medium:[display:block] medium:float-left medium:m-0 medium:p-0">
                                {navLink("plain", false, {href: $pointer("urls.auth.logout"), "aria-label": $lang($string("common.logout"))}, <$Lang keyName={$string("common.logout")} />)}
                            </li>
                        </>
                    )}
                    $else={() => (
                        <li className="navPages-item medium:[display:block] medium:float-left medium:m-0 medium:p-0">
                            {navLink("plain", false, {href: $pointer("urls.auth.login"), "aria-label": $lang($string("common.login"))}, <$Lang keyName={$string("common.login")} />)}{" "}
                            <$If
                                test={$pointer("settings.account_creation_enabled")}
                                $then={() => (
                                    <>
                                        <$Lang keyName={$string("common.or")} />{" "}
                                        {navLink("plain", false, {href: $pointer("urls.auth.create_account"), "aria-label": $lang($string("common.sign_up"))}, <$Lang keyName={$string("common.sign_up")} />)}
                                    </>
                                )}
                            />
                        </li>
                    )}
                />
                <$If test={theme.social_icon_placement_top} $then={() => <li className="navPages-item medium:[display:block] medium:float-left medium:m-0 medium:p-0"><SocialLinks /></li>} />
            </ul>
        </nav>
    );
};
