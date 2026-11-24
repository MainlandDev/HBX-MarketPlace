"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $number, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

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
                        <i className="icon size-[8px] m-0 ml-quarter [&_svg]:fill-(--sv-setting-navUser-color) [&_svg]:stroke-(--sv-setting-navUser-color) [&_svg]:transition-all [&_svg]:duration-150 [&_svg]:ease-[ease] [.navUser-action:hover_&_svg]:fill-(--sv-setting-navUser-color-hover) [.navUser-action:hover_&_svg]:stroke-(--sv-setting-navUser-color-hover) [.navUser-action.is-open_&_svg]:fill-(--sv-setting-navUser-color-hover) [.navUser-action.is-open_&_svg]:stroke-(--sv-setting-navUser-color-hover)" aria-hidden="true">
                            <svg>
                                <use href="#icon-chevron-down" />
                            </svg>
                        </i>
                    </a>
                    <ul className="dropdown-menu is-open:before:left-auto is-open:before:right-half is-open:after:left-auto is-open:after:right-[calc(var(--sv-spacing-half)+2px)] [&_[data-locale-code]]:capitalize" id="channelSelection" data-dropdown-content={""} aria-hidden="true" tabIndex={-1}>
                        <$Each
                            list={$pointer<Channel[]>("theme_settings.channels")}
                            $then={(channel) => (
                                <li className="dropdown-menu-item text-left [&:first-child>a]:pt-half [&:last-child>a]:pb-base [&>a]:m-0 [&>a]:px-[calc(var(--sv-spacing-half)+var(--sv-spacing-quarter))] [&>a]:py-sixth [&>a]:no-underline">
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
