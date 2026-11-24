"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$cdn, $Each, $If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface Video {
    id: string;
    title_long: string;
    description_short: string;
}

export default (_props: PartialProps) => (
    <section className="toggle videoGallery mb-single-half border-t border-container-border last-of-type:mb-[calc(calc(var(--sv-spacing-single)+var(--sv-spacing-half))*2)]" data-video-gallery={""}>
        <h4 className="toggle-title mb-single-half">
            <$Lang keyName={$string("products.videos.header")} />
            <a href="#videoGallery-content" className="toggleLink is-open float-right leading-[24px] text-(--sv-setting-color-textSecondary) hover:text-(--sv-setting-color-textSecondary--hover)" data-collapsible={""}>
                <span className="toggleLink-text toggleLink-text--on text-smallest font-normal [display:none] [[class~=toggleLink][class~=is-open]_&]:[display:inline-block]">
                    <$Lang keyName={$string("products.videos.hide")} />
                </span>
                <span className="toggleLink-text toggleLink-text--off text-smallest font-normal [display:inline-block] [[class~=toggleLink][class~=is-open]_&]:[display:none]">
                    <$Lang keyName={$string("products.videos.show")} />
                </span>
            </a>
        </h4>

        <div className="toggle-content is-open [:where(&:not(.is-open))]:[display:none] [:where(&.is-open)]:[display:block]" id="videoGallery-content">
            <div className="videoGallery-main widescreen relative mb-single-quarter h-0 overflow-hidden pt-0 pb-[56.34%] [&_iframe]:absolute [&_iframe]:top-0 [&_iframe]:left-0 [&_iframe]:size-full">
                <iframe
                    id="player"
                    className="lazyload"
                    type="text/html"
                    width="640"
                    height="390"
                    frameBorder="0"
                    dangerouslyInlineAttributes={{attributes: "webkitAllowFullScreen mozallowfullscreen allowFullScreen"}}
                    data-src={`//www.youtube.com/embed/${$pointer("this.featured.id")}?rel=0`}
                    data-video-player={""}
                ></iframe>
            </div>
            <ul className="videoGallery-list -mx-gutter-half w-auto max-w-none flow-root text-[0px] [list-style-type:none]">
                <$Each
                    list={$pointer<Video[]>("this.list")}
                    $then={(video, loop) => (
                        <li className="videoGallery-item inline-block w-full px-gutter-half align-top medium:w-6/12 [&_.video]:mb-single-quarter [&_.video]:flow-root [&_.video]:opacity-40 [&_.video]:no-underline [&_.video]:[display:block] [&_.video]:[transition:opacity_100ms_ease-out] [&_.video:hover]:text-grey-darker [&_.video:hover]:opacity-100 [&_.video.is-active]:text-grey-darker [&_.video.is-active]:opacity-100 [&_.video-figure]:float-left [&_.video-figure]:mr-single-quarter [&_.video-figure>img]:[display:block] [&_.video-body]:flow-root [&_.video-title]:my-0 [&_.video-title]:normal-case [&_.video-description]:mb-0 [&_.video-description]:text-(length:--sv-fontSize-base)">
                            <a href="#" className={`video ${$If({test: loop["@first"], $then: () => "is-active"})}`} data-video-item={""} data-video-id={video.id}>
                                <div className="video-figure">
                                    <img
                                        className="lazyload"
                                        data-sizes="auto"
                                        src={$cdn($string("img/loading.svg"))}
                                        data-src={`//i.ytimg.com/vi/${video.id}/default.jpg`}
                                    />
                                </div>
                                <div className="video-body">
                                    <h5 className="video-title">{video.title_long}</h5>
                                    <p className="video-description">{video.description_short}</p>
                                </div>
                            </a>
                        </li>
                    )}
                />
            </ul>
        </div>
    </section>
);
