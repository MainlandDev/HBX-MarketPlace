"use server";
import CarouselContent from "./carousel-content.tsx";
import CarouselContentAnnouncement from "./carousel-content-announcement.tsx";
import CarouselPlayPauseButton from "./carousel-play-pause-button.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import ResponsiveImg from "./common/responsive-img.tsx";
import {$add, $Each, $If, $Or, $lang, $number, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {SLICK_HOST} from "../../server/carouselParts.ts";

interface Slide {
    url: string;
    alt_text: string;
    button_text: string;
    heading: string;
    text: string;
    stencil_image: string;
}

export default (_props: PartialProps) => (
    <section
        className={"heroCarousel -mt-single mb-single-double w-[1px] min-w-full medium:-mt-[calc(var(--sv-spacing-single)+var(--sv-spacing-base))] small:[&.slick-initialized]:max-h-[400px] medium:[&.slick-initialized]:max-h-[600px] [&:not(.slick-initialized)_.heroCarousel-slide:not(.heroCarousel-slide--first)]:[display:none] [&_a]:no-underline [&_.slick-next]:top-1/2 [&_.slick-next]:right-[15px] [&_.slick-next]:m-0 [&_.slick-next]:[transform:translateY(-50%)] medium:[&_.slick-next]:right-[25px] [&_.slick-prev]:top-1/2 [&_.slick-prev]:left-[15px] [&_.slick-prev]:m-0 [&_.slick-prev]:[transform:translateY(-50%)] medium:[&_.slick-prev]:left-[25px] [&_.slick-dots]:bottom-third medium:[&_.slick-dots]:bottom-single [&_.slick-dots_li]:bg-(--sv-slick-dot-bgColor) [&_.slick-slide.is-square-image-type_.heroCarousel-image-wrapper]:h-[100vw] [&_.slick-slide.is-vertical-image-type_.heroCarousel-image-wrapper]:h-[110vw] small:[&_.slick-slide:is(.is-square-image-type,.is-vertical-image-type)_.heroCarousel-image-wrapper]:h-[56.25vw] [&_.slick-slide.is-image-error_.heroCarousel-image-wrapper]:bg-[url('../img/hero-carousel-image-load-error.svg')] [&_.slick-slide.is-image-error_.heroCarousel-image-wrapper]:bg-center [&_.slick-slide.is-image-error_.heroCarousel-image-wrapper]:bg-no-repeat [&_.slick-slide.is-image-error_.heroCarousel-image-wrapper]:bg-contain " + SLICK_HOST}
        dangerouslyInlineAttributes={{
            attributes: `data-slick='{ "arrows": ${$pointer("arrows")}, "mobileFirst": true, "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": ${$pointer("carousel.swap_frequency")}, "slide": "[data-hero-slide]" }'`,
        }}
    >
        <$Each
            list={$pointer<Slide[]>("carousel.slides")}
            $then={(slide, loop) => {
                // A slide with a button is a <div> around a linked image; one without is an <a> around the image. Each branch holds a whole
                // element, so the template is balanced HTML either way (an open tag in one branch and its close in a later `{{#if}}` is not).
                const image = (
                    <$If
                        test={loop["@first"]}
                        $then={() =>
                            <ResponsiveImg image={slide.stencil_image} class={$string("heroCarousel-image")} fallback_size={$string("1280w")} lazyload={$string("disabled")} />
                        }
                        $else={() =>
                            <ResponsiveImg image={slide.stencil_image} class={$string("heroCarousel-image")} fallback_size={$string("1280w")} lazyload={$string("lazyload")} />
                        }
                    />
                );
                const slideBody = (
                    <>
                        <$If
                            test={$pointer("button_text")}
                            $then={() => <a href={slide.url} className="heroCarousel-image-wrapper flex h-[56.25vw] max-h-[100vh] items-start justify-center [transition:height_0.3s_ease] small:max-h-[400px] medium:max-h-[600px]">{image}</a>}
                            $else={() => <div className="heroCarousel-image-wrapper flex h-[56.25vw] max-h-[100vh] items-start justify-center [transition:height_0.3s_ease] small:max-h-[400px] medium:max-h-[600px]">{image}</div>}
                        />
                        <$Or
                            values={[slide.heading, slide.text, slide.button_text]}
                            $then={() => <CarouselContent />}
                        />
                    </>
                );
                const body = (
                    <>
                        {/* class="stretch" and "heroCarousel-slide--first" are render-time conditions: one literal element per combination */}
                        <$If
                            test={$pointer("../theme_settings.homepage_stretch_carousel_images")}
                            $then={() => (
                                <$If
                                    test={loop["@first"]}
                                    $then={() => <div className="heroCarousel-slide stretch heroCarousel-slide--first relative [&_a]:no-underline [&_.heroCarousel-image]:h-full [&_.heroCarousel-image]:w-full [&_.heroCarousel-image]:object-cover [&_.heroCarousel-image]:[object-position:50%_50%] [&.compat-object-fit]:overflow-hidden">{slideBody}</div>}
                                    $else={() => <div className="heroCarousel-slide stretch relative [&_a]:no-underline [&_.heroCarousel-image]:h-full [&_.heroCarousel-image]:w-full [&_.heroCarousel-image]:object-cover [&_.heroCarousel-image]:[object-position:50%_50%] [&.compat-object-fit]:overflow-hidden">{slideBody}</div>}
                                />
                            )}
                            $else={() => (
                                <$If
                                    test={loop["@first"]}
                                    $then={() => <div className="heroCarousel-slide heroCarousel-slide--first relative [&_a]:no-underline [&_.heroCarousel-image]:h-full [&_.heroCarousel-image]:w-full [&_.heroCarousel-image]:object-contain [&_.heroCarousel-image]:[object-position:50%_0%] small:[&_.heroCarousel-image]:[object-position:50%_50%] [&.compat-object-fit]:overflow-hidden [&.compat-object-fit_.heroCarousel-image]:w-auto">{slideBody}</div>}
                                    $else={() => <div className="heroCarousel-slide relative [&_a]:no-underline [&_.heroCarousel-image]:h-full [&_.heroCarousel-image]:w-full [&_.heroCarousel-image]:object-contain [&_.heroCarousel-image]:[object-position:50%_0%] small:[&_.heroCarousel-image]:[object-position:50%_50%] [&.compat-object-fit]:overflow-hidden [&.compat-object-fit_.heroCarousel-image]:w-auto">{slideBody}</div>}
                                />
                            )}
                        />
                    </>
                );
                return (
                    <$If
                        test={$pointer("button_text")}
                        $then={() => <div data-hero-slide={loop["@index"]}>{body}</div>}
                        $else={() => (
                            <a
                                href={slide.url}
                                data-hero-slide={loop["@index"]}
                                aria-label={$If({
                                    test: $pointer("this.alt_text.length"),
                                    operator: $string("!="),
                                    rvalue: $number(0),
                                    $then: () => slide.alt_text,
                                    $else: () => $lang($string("carousel.slide_number"), {slide_number: $add(loop["@index"], $number(1))}),
                                })}
                            >
                                {body}
                            </a>
                        )}
                    />
                );
            }}
        />
        <$If
            test={$pointer("carousel.slides.length")}
            operator={$string(">")}
            rvalue={$number(1)}
            $then={() => (
                <>
                    <CarouselContentAnnouncement />
                    <$If test={$pointer("play_pause_button")} $then={() => <CarouselPlayPauseButton />} />
                </>
            )}
        />
    </section>
);
