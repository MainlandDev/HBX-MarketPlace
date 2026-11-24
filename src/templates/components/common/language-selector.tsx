"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface Language {
    code: string;
    switch_url: string;
    is_active: boolean;
}

export default (_props: PartialProps) => (
    <ul className="navUser-section float-left flow-root [.navUser-section+&]:ml-(--sv-navBar-section-margin) medium:relative">
        <li className="navUser-item [display:none] small:float-left medium:[display:block]">
            <a
                className="navUser-action font-bold uppercase no-underline px-half py-base [display:inline-flex] items-center flex-nowrap whitespace-nowrap text-(--sv-setting-navUser-color) hover:text-(--sv-setting-navUser-color-hover) is-open:text-(--sv-setting-navUser-color-hover) navUser-action--languageSelector has-dropdown"
                href="#"
                data-locale-code={$pointer("language_selector.active_language_code")}
                data-dropdown="languageSelection"
                aria-controls="languageSelection"
                aria-expanded="false"
                aria-label={$pointer("language_selector.active_language_code")}
            >
                <span>
                    <$Lang keyName={$string("common.locale")} /> <strong>{$pointer("language_selector.active_language_code")}</strong>
                </span>
                <i className="icon size-[8px] m-0 ml-quarter [&_svg]:fill-(--sv-setting-navUser-color) [&_svg]:stroke-(--sv-setting-navUser-color) [&_svg]:transition-all [&_svg]:duration-150 [&_svg]:ease-[ease] [.navUser-action:hover_&_svg]:fill-(--sv-setting-navUser-color-hover) [.navUser-action:hover_&_svg]:stroke-(--sv-setting-navUser-color-hover) [.navUser-action.is-open_&_svg]:fill-(--sv-setting-navUser-color-hover) [.navUser-action.is-open_&_svg]:stroke-(--sv-setting-navUser-color-hover)" aria-hidden="true">
                    <svg>
                        <use href="#icon-chevron-down" />
                    </svg>
                </i>
            </a>
            <ul className="dropdown-menu is-open:before:left-auto is-open:before:right-half is-open:after:left-auto is-open:after:right-[calc(var(--sv-spacing-half)+2px)] [&_[data-locale-code]]:capitalize" id="languageSelection" data-dropdown-content={""} aria-hidden="true" tabIndex={-1}>
                <$Each
                    list={$pointer<Language[]>("language_selector.languages")}
                    $then={(language) => (
                        <li className="dropdown-menu-item text-left [&:first-child>a]:pt-half [&:last-child>a]:pb-base [&>a]:m-0 [&>a]:px-[calc(var(--sv-spacing-half)+var(--sv-spacing-quarter))] [&>a]:py-sixth [&>a]:no-underline">
                            <a
                                href={language.switch_url}
                                data-locale-code={language.code}
                                data-warning={$lang($string("common.locale_switch_warning"))}
                                aria-label={language.code}
                            >
                                <$If test={language.is_active} $then={() => <strong>{language.code}</strong>} $else={() => <>{language.code}</>} />
                            </a>
                        </li>
                    )}
                />
            </ul>
        </li>
    </ul>
);
