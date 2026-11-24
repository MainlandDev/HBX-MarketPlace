"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Inject, $lang, $Lang, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <>
        <$Inject keyName={$string("carouselPlayPauseButtonPlay")} value={$lang($string("carousel.play_pause_button_play"))} />{" "}
        <$Inject keyName={$string("carouselPlayPauseButtonPause")} value={$lang($string("carousel.play_pause_button_pause"))} />{" "}
        <$Inject keyName={$string("carouselPlayPauseButtonAriaPlay")} value={$lang($string("carousel.play_pause_button_aria_play"))} />{" "}
        <$Inject keyName={$string("carouselPlayPauseButtonAriaPause")} value={$lang($string("carousel.play_pause_button_aria_pause"))} />
        <button data-play-pause-button={""} type="button" className="carousel-play-pause-button absolute bottom-third left-[15px] z-(--sv-zIndex-lowest) min-w-[60px] max-w-[60px] overflow-hidden text-ellipsis whitespace-nowrap border border-(--sv-slick-play-pause-button-borderColor) bg-(--sv-slick-play-pause-button-bgColor) text-(--sv-slick-play-pause-button-color) text-[14px] leading-[1.25] font-bold h-[32px] [transition:color_100ms_ease-out] hover:text-(--sv-slick-play-pause-button-color-hover) [:where(&:not([style*=display]))]:[display:none] [@media(min-width:375px)]:min-w-[80px] [@media(min-width:375px)]:max-w-[90px] small:text-[18px] medium:bottom-single medium:left-[25px]" aria-label={$lang($string("carousel.play_pause_button_aria_pause"))}>
            <$Lang keyName={$string("carousel.play_pause_button_pause")} />
        </button>
    </>
);
