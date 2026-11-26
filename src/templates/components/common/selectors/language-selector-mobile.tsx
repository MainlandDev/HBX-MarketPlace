"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {moreIcon, navLink} from "../../../../server/navParts.tsx";

interface Language {
    code: string;
    switch_url: string;
    is_active: boolean;
}

export default (_props: PartialProps) => (
    <>
        {navLink(
            "top",
            false,
            {
                href: "#",
                "data-locale-code": $pointer("language_selector.active_language_code"),
                "data-collapsible": "navPages-locale",
                "aria-controls": "navPages-locale",
                "aria-expanded": "false",
                "aria-label": $pointer("language_selector.active_language_code"),
            },
            <>
                <span>
                    <$Lang keyName={$string("common.locale")} /> <strong>{$pointer("language_selector.active_language_code")}</strong>
                </span>
                {moreIcon("top")}
            </>,
        )}
        <div className="navPage-subMenu [display:none] [outline:0] is-open:[display:block] medium:absolute medium:bg-(--sv-setting-navPages-subMenu-backgroundColor) medium:px-single medium:pt-single medium:pb-single-half medium:text-left medium:is-open:left-0 medium:is-open:w-full" id="navPages-locale" aria-hidden="true" tabIndex={-1}>
            <ul className="navPage-subMenu-list my-quarter ml-0 mr-0 pl-0 medium:m-auto medium:w-full medium:max-w-(--sv-layout-widthMax) medium:flow-root medium:p-0">
                <$Each
                    list={$pointer<Language[]>("language_selector.languages")}
                    $then={(language) => (
                        <li className="navPage-subMenu-item py-half medium:float-left medium:m-0 medium:w-1/4 medium:px-[0.75rem] medium:py-0 medium:[&>a]:mb-half-quarter medium:[&>a]:border-b medium:[&>a]:border-(--sv-setting-navPages-subMenu-separatorColor) medium:[&_a]:w-full medium:[&_a]:normal-case">
                            {navLink(
                                "sub",
                                false,
                                {
                                    href: language.switch_url,
                                    "data-locale-code": $unescaped(language.code),
                                    "data-warning": $lang($string("common.locale_switch_warning")),
                                    "aria-label": language.code,
                                },
                                <$If test={language.is_active} $then={() => <strong>{language.code}</strong>} $else={() => <>{language.code}</>} />,
                            )}
                        </li>
                    )}
                />
            </ul>
        </div>
    </>
);
