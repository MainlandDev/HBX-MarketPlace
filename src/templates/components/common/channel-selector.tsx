"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $number, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {Icon} from "../../../server/formParts.tsx";

interface Channel {
    code: string;
    name: string;
    is_active: boolean;
    switch_url: string;
}

export default (_props: PartialProps) => (
    <$If
        test={$pointer("theme_settings.channels.length")}
        operator={$string(">")}
        rvalue={$number(1)}
        $then={() => (
            <ul className="navUser-section float-left flow-root [.navUser-section+&]:ml-(--sv-navBar-section-margin) medium:relative">
                <li className="navUser-item [display:none] small:float-left medium:[display:block]">
                    <a
                        href="#"
                        className="navUser-action font-bold uppercase no-underline px-half py-base [display:inline-flex] items-center flex-nowrap whitespace-nowrap text-(--sv-setting-navUser-color) hover:text-(--sv-setting-navUser-color-hover) is-open:text-(--sv-setting-navUser-color-hover) navUser-action--channelSelector has-dropdown"
                        data-dropdown="channelSelection"
                        aria-controls="channelSelection"
                        aria-expanded="false"
                    >
                        <$Each
                            list={$pointer<Channel[]>("theme_settings.channels")}
                            $then={(channel) => <$If test={channel.is_active} $then={() => <$Lang keyName={$string("common.channel")} code={channel.code} />} />}
                        />
                        <Icon className="size-[8px] m-0 ml-quarter [&_svg]:fill-(--sv-setting-navUser-color) [&_svg]:stroke-(--sv-setting-navUser-color) [&_svg]:transition-all [&_svg]:duration-150 [&_svg]:ease-[ease] [.navUser-action:hover_&_svg]:fill-(--sv-setting-navUser-color-hover) [.navUser-action:hover_&_svg]:stroke-(--sv-setting-navUser-color-hover) [.navUser-action.is-open_&_svg]:fill-(--sv-setting-navUser-color-hover) [.navUser-action.is-open_&_svg]:stroke-(--sv-setting-navUser-color-hover)" aria-hidden="true">
                            <svg>
                                <use href="#icon-chevron-down" />
                            </svg>
                        </Icon>
                    </a>
                    <ul className="dropdown-menu is-open:before:left-auto is-open:before:right-half is-open:after:left-auto is-open:after:right-[calc(var(--sv-spacing-half)+2px)] [&_[data-locale-code]]:capitalize [:where(&)]:[list-style:var(--sv-f-dropdown-list-style)] [:where(&)]:ml-0 [:where(&)]:absolute [:where(&)]:[background:var(--sv-f-dropdown-bg)] [:where(&)]:text-(length:--sv-f-dropdown-font-size) [:where(&)]:h-(--sv-f-dropdown-height) [:where(&)]:w-full [:where(&)]:z-[89] [:where(&)]:max-w-(--sv-f-dropdown-max-width) [:where(&:not([style*=display]))]:[display:none] [:where(&:not([style*=left]))]:-left-[9999px] [&.open]:[display:block] [:where(&>*:first-child)]:mt-0 [:where(&>*:last-child)]:mb-0" id="channelSelection" data-dropdown-content={""} aria-hidden="true" tabIndex={-1}>
                        <$Each
                            list={$pointer<Channel[]>("theme_settings.channels")}
                            $then={(channel) => (
                                <li className="dropdown-menu-item text-left [&:first-child>a]:pt-half [&:last-child>a]:pb-base [&>a]:m-0 [&>a]:px-[calc(var(--sv-spacing-half)+var(--sv-spacing-quarter))] [&>a]:py-sixth [&>a]:no-underline [:where(&)]:cursor-pointer [:where(&)]:text-(length:--sv-f-dropdown-font-size) [:where(&)]:leading-(--sv-f-dropdown-line-height) [:where(&)]:m-0 [:where(&)]:px-[calc(var(--sv-f-dropdown-list-padding)*2)] [:where(&)]:py-(--sv-f-dropdown-list-padding) [:where(&_a)]:[display:block] [:where(&_a)]:p-(--sv-f-dropdown-list-padding) [:where(&_a)]:m-[calc(var(--sv-f-dropdown-list-padding)*-1)]">
                                    <a
                                        href={$unescaped(channel.switch_url)}
                                        data-channel-code={$unescaped(channel.code)}
                                        data-warning={$lang($string("common.channel_switch_warning"))}
                                    >
                                        <$If
                                            test={channel.is_active}
                                            $then={() => <strong>{channel.name}</strong>}
                                            $else={() => <>{channel.name}</>}
                                        />
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
