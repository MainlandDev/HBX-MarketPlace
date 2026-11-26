"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $number, $pointer, $raw, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {moreIcon, navLink} from "../../../../server/navParts.tsx";

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
            <>
                {navLink(
                    "top",
                    false,
                    {
                        href: "#",
                        "data-collapsible": "navPages-channel",
                        "aria-controls": "navPages-channel",
                        "aria-expanded": "false",
                        dangerouslyInlineAttributes: {
                            attributes: `aria-label="\n    ${$raw("{{#each theme_settings.channels}}\n        {{#if is_active}}\n            {{lang 'common.channel' code=code}}\n        {{/if}}\n    {{/each}}")}\n   "`,
                        },
                    },
                    <>
                        <$Each
                            list={$pointer<Channel[]>("theme_settings.channels")}
                            $then={(channel) => <$If test={channel.is_active} $then={() => <$Lang keyName={$string("common.channel")} code={channel.code} />} />}
                        />
                        {moreIcon("top")}
                    </>,
                )}
                <div className="navPage-subMenu [display:none] [outline:0] is-open:[display:block] medium:absolute medium:bg-(--sv-setting-navPages-subMenu-backgroundColor) medium:px-single medium:pt-single medium:pb-single-half medium:text-left medium:is-open:left-0 medium:is-open:w-full" id="navPages-channel" aria-hidden="true" tabIndex={-1}>
                    <ul className="navPage-subMenu-list my-quarter ml-0 mr-0 pl-0 medium:m-auto medium:w-full medium:max-w-(--sv-layout-widthMax) medium:flow-root medium:p-0">
                        <$Each
                            list={$pointer<Channel[]>("theme_settings.channels")}
                            $then={(channel) => (
                                <li className="navPage-subMenu-item py-half medium:float-left medium:m-0 medium:w-1/4 medium:px-[0.75rem] medium:py-0 medium:[&>a]:mb-half-quarter medium:[&>a]:border-b medium:[&>a]:border-(--sv-setting-navPages-subMenu-separatorColor) medium:[&_a]:w-full medium:[&_a]:normal-case">
                                    {navLink(
                                        "sub",
                                        false,
                                        {
                                            href: $unescaped(channel.switch_url),
                                            "aria-label": channel.name,
                                            "data-channel-code": $unescaped(channel.code),
                                            "data-warning": $lang($string("common.channel_switch_warning")),
                                        },
                                        channel.name,
                                    )}
                                </li>
                            )}
                        />
                    </ul>
                </div>
            </>
        )}
    />
);
