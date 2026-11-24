"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$capitalize, $Each, $If, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface SocialMedia {
    display_name: string;
    url: string;
}

export default (_props: PartialProps) => (
    <$If
        test={$pointer("social_media")}
        $then={() => (
            <ul className="socialLinks socialLinks--alt m-0 p-0 flow-root leading-[37px] [list-style-type:none] [&_.socialLinks-item]:mr-half [&_.socialLinks-item]:mb-quarter [&_.socialLinks-item]:p-0 [&_.socialLinks-item]:text-[0px] [&_.socialLinks-item]:[display:inline-block] [&_.socialLinks-item:last-child]:mr-0 [&_.icon]:m-0 [&_.icon]:size-[21px] [&_.icon]:no-underline [&_.icon_svg]:fill-(--sv-setting-icon-color) [&_.icon_svg]:[transition:all_0.15s_ease] [&_.icon:hover_svg]:fill-(--sv-setting-icon-color-hover)">
                <$Each
                    list={$pointer<SocialMedia[]>("social_media")}
                    $then={(social) => (
                        <$If
                            test={$pointer("display_name")}
                            operator={$string("===")}
                            rvalue={$string("twitter")}
                            $then={() => (
                                <li className="socialLinks-item">
                                    <a className="icon icon--x" href={social.url} target="_blank" rel="noopener" title="X">
                                        <span className="aria-description--hidden">X</span>
                                        <svg>
                                            <use href="#icon-x" />
                                        </svg>
                                    </a>
                                </li>
                            )}
                            $else={() => (
                                <li className="socialLinks-item">
                                    <a
                                        className={`icon icon--${social.display_name}`}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener"
                                        title={$unescaped($capitalize(social.display_name))}
                                    >
                                        <span className="aria-description--hidden">{$unescaped($capitalize(social.display_name))}</span>
                                        <svg>
                                            <use href={`#icon-${social.display_name}`} />
                                        </svg>
                                    </a>
                                </li>
                            )}
                        />
                    )}
                />
            </ul>
        )}
    />
);
