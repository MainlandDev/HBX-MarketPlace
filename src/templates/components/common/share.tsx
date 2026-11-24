"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$capitalize, $Each, $getVar, $If, $pointer, $raw, $string, $unescaped, $AssignVar, $encodeURI, $cdn, $getImageSrcset} from "@mainlanddev/hbx-bigcommerce";
import {Icon} from "../../../server/formParts.tsx";

/** The size a `getImageSrcset` descriptor accepts; theme settings are typed as plain strings (see PORT-NOTES.md, Library gaps). */
type SrcsetSize = `${bigint}x${bigint}` | `${bigint}w`;

interface ShareButton {
    service: string;
    annotation: string;
}

const encodedUrl = () => $getVar($string("encodedUrl"));
const encodedTitle = () => $getVar($string("encodedTitle"));

export default (_props: PartialProps) => {
    return (
        <>
            <$If
                test={$pointer("settings.add_this.buttons")}
                $then={() => (
                    <>
                        <$AssignVar keyName={$string("encodedUrl")} value={$encodeURI($pointer<string>("url"))} />
                        {" "}
                        <$AssignVar keyName={$string("encodedTitle")} value={$encodeURI($pointer<string>("head.title"))} />
                        <div>
                            <ul className="socialLinks m-0 p-0 flow-root leading-[37px] [list-style-type:none] [&_.socialLinks-item]:mr-half [&_.socialLinks-item]:mb-quarter [&_.socialLinks-item]:p-0 [&_.socialLinks-item]:text-[0px] [&_.socialLinks-item]:[display:inline-block] [&_.socialLinks-item:last-child]:mr-0 [&_.socialLinks-item--pinterest]:w-[25px] [&_.icon]:m-0 [&_.icon]:size-[20px] [&_.icon]:no-underline [&_.icon:hover_svg]:fill-(--sv-setting-icon-color-hover) [&_.icon_svg]:fill-(--sv-setting-icon-color) [&_.icon_svg]:[transition:all_0.15s_ease] [&_.socialLinks__link]:relative [&_.socialLinks__link]:h-[2rem] [&_.socialLinks__link]:before:absolute [&_.socialLinks__link]:before:top-1/2 [&_.socialLinks__link]:before:right-0 [&_.socialLinks__link]:before:border-[length:10px] [&_.socialLinks__link]:before:border-solid [&_.socialLinks__link]:before:border-transparent [&_.socialLinks__link]:before:border-b-(color:--sv-setting-focusTooltip-backgroundColor) [&_.socialLinks__link]:before:content-[' '] [&_.socialLinks__link]:before:[display:none] [&_.socialLinks__link]:after:absolute [&_.socialLinks__link]:after:top-full [&_.socialLinks__link]:after:right-0 [&_.socialLinks__link]:after:cursor-default [&_.socialLinks__link]:after:rounded-[8px] [&_.socialLinks__link]:after:bg-(--sv-setting-focusTooltip-backgroundColor) [&_.socialLinks__link]:after:px-[6px] [&_.socialLinks__link]:after:py-[4px] [&_.socialLinks__link]:after:text-[1rem] [&_.socialLinks__link]:after:whitespace-nowrap [&_.socialLinks__link]:after:text-(--sv-setting-focusTooltip-textColor) [&_.socialLinks__link]:after:content-[attr(title)] [&_.socialLinks__link]:after:[display:none] [&_.socialLinks__link]:focus:before:[display:block] [&_.socialLinks__link]:focus:after:[display:block] [&_.socialLinks__link]:focus:after:left-0 [&_.socialLinks__link]:focus:after:right-auto [&_.socialLinks__link]:focus:after:z-20">
                                <$Each
                                    list={$pointer<ShareButton[]>("settings.add_this.buttons")}
                                    $then={(button) => (
                                        <li className={`socialLinks-item socialLinks-item--${button.service}`}>
                                            <$If
                                                test={$pointer("service")}
                                                operator={$string("===")}
                                                rvalue={$string("facebook")}
                                                $then={() => (
                                                    <Icon tag="a"
                                                        className={`socialLinks__link icon--${button.service}`}
                                                        dangerouslyInlineAttributes={{
                                                            attributes: `title="${$unescaped($capitalize(button.service))}" href="https://facebook.com/sharer/sharer.php?u=${encodedUrl()}" target="_blank" rel="noopener" ${$unescaped(button.annotation)}`,
                                                        }}
                                                    >
                                                        <span className="aria-description--hidden absolute top-0 left-0 -ml-[10000px] size-px overflow-hidden">{$unescaped($capitalize(button.service))}</span>
                                                        <svg>
                                                            <use href="#icon-facebook" />
                                                        </svg>
                                                    </Icon>
                                                )}
                                                $elseThen={[
                                                    {
                                                        test: $pointer("service"),
                                                        operator: $string("==="),
                                                        rvalue: $string("email"),
                                                        $then: () => (
                                                            <Icon tag="a"
                                                                className={`socialLinks__link icon--${button.service}`}
                                                                dangerouslyInlineAttributes={{
                                                                    attributes: `title="${$unescaped($capitalize(button.service))}" href="mailto:?subject=${encodedTitle()}&amp;body=${encodedUrl()}" target="_self" rel="noopener" ${$unescaped(button.annotation)}`,
                                                                }}
                                                            >
                                                                <span className="aria-description--hidden absolute top-0 left-0 -ml-[10000px] size-px overflow-hidden">{$unescaped($capitalize(button.service))}</span>
                                                                <svg>
                                                                    <use href="#icon-envelope" />
                                                                </svg>
                                                            </Icon>
                                                        ),
                                                    },
                                                    {
                                                        test: $pointer("service"),
                                                        operator: $string("==="),
                                                        rvalue: $string("print"),
                                                        $then: () => (
                                                            <Icon tag="a"
                                                                className={`socialLinks__link icon--${button.service}`}
                                                                dangerouslyInlineAttributes={{
                                                                    attributes: `title="${$unescaped($capitalize(button.service))}" onclick="window.print();return false;" ${$unescaped(button.annotation)}`,
                                                                }}
                                                            >
                                                                <span className="aria-description--hidden absolute top-0 left-0 -ml-[10000px] size-px overflow-hidden">{$unescaped($capitalize(button.service))}</span>
                                                                <svg>
                                                                    <use href="#icon-print" />
                                                                </svg>
                                                            </Icon>
                                                        ),
                                                    },
                                                    {
                                                        test: $pointer("service"),
                                                        operator: $string("==="),
                                                        rvalue: $string("twitter"),
                                                        $then: () => (
                                                            <Icon
                                                                tag="a" className="socialLinks__link icon--x"
                                                                dangerouslyInlineAttributes={{
                                                                    attributes: `href="https://x.com/intent/tweet/?text=${encodedTitle()}&amp;url=${encodedUrl()}" target="_blank" rel="noopener" title="X" ${$unescaped(button.annotation)}`,
                                                                }}
                                                            >
                                                                <span className="aria-description--hidden absolute top-0 left-0 -ml-[10000px] size-px overflow-hidden">X</span>
                                                                <svg>
                                                                    <use href="#icon-x" />
                                                                </svg>
                                                            </Icon>
                                                        ),
                                                    },
                                                    {
                                                        test: $pointer("service"),
                                                        operator: $string("==="),
                                                        rvalue: $string("linkedin"),
                                                        $then: () => (
                                                            <Icon tag="a"
                                                                className={`socialLinks__link icon--${button.service}`}
                                                                dangerouslyInlineAttributes={{
                                                                    attributes: `title="${$unescaped($capitalize(button.service))}" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=${encodedUrl()}&amp;title=${encodedTitle()}&amp;summary=${encodedTitle()}&amp;source=${encodedUrl()}" target="_blank" rel="noopener" ${$unescaped(button.annotation)}`,
                                                                }}
                                                            >
                                                                <span className="aria-description--hidden absolute top-0 left-0 -ml-[10000px] size-px overflow-hidden">{$unescaped($capitalize(button.service))}</span>
                                                                <svg>
                                                                    <use href="#icon-linkedin" />
                                                                </svg>
                                                            </Icon>
                                                        ),
                                                    },
                                                    {
                                                        test: $pointer("service"),
                                                        operator: $string("==="),
                                                        rvalue: $string("pinterest"),
                                                        $then: () => (
                                                            <Icon tag="a"
                                                                className={`socialLinks__link icon--${button.service}`}
                                                                dangerouslyInlineAttributes={{
                                                                    attributes: `title="${$unescaped($capitalize(button.service))}" href="https://pinterest.com/pin/create/button/?url=${encodedUrl()}&amp;media=${$getImageSrcset($pointer<{data: string}>("../product.main_image"), {"1x": $pointer<SrcsetSize>("../theme_settings.zoom_size")}, $cdn($pointer<string>("../theme_settings.default_image_product")))}&amp;description=${encodedTitle()}" target="_blank" rel="noopener" ${$unescaped(button.annotation)}`,
                                                                }}
                                                            >
                                                                <span className="aria-description--hidden absolute top-0 left-0 -ml-[10000px] size-px overflow-hidden">{$unescaped($capitalize(button.service))}</span>
                                                                <svg>
                                                                    <use href="#icon-pinterest" />
                                                                </svg>
                                                            </Icon>
                                                        ),
                                                    },
                                                ]}
                                            />
                                        </li>
                                    )}
                                />
                            </ul>
                        </div>
                    </>
                )}
            />
            <$If
                test={$pointer("settings.facebook_like_button.enabled")}
                $then={() => (
                    <iframe
                        dangerouslyInlineAttributes={{
                            attributes: `class="facebook${$If({test: $pointer("settings.facebook_like_button.verb"), operator: $string("==="), rvalue: $string("recommend"), $then: () => "Recommend", $else: () => "Like"})}Btn" style="border:none; overflow:hidden; margin: 0; padding: 0; position:absolute" src="https://www.facebook.com/plugins/like.php?href=${$pointer("settings.facebook_like_button.href")}&amp;layout=button_count${$If({test: $pointer("settings.facebook_like_button.verb"), operator: $string("==="), rvalue: $string("recommend"), $then: () => $raw("&amp;action=recommend")})}&amp;colorscheme=light&amp;height=20" scrolling="no" frameborder="0" allowTransparency="true"`,
                        }}
                    ></iframe>
                )}
            />
        </>
    );
};
