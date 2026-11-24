"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$add, $And, $boolean, $If, $ifExpression, $lang, $number, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

// "heroCarousel-content--empty" is a render-time condition: the content is built once and placed in an empty or a regular literal element.
const content = (
    <>
        <$If
            test={$pointer("heading")}
            $then={() => <p className="heroCarousel-title m-0 text-small text-(--sv-carousel-title-color) medium:text-hero">{$unescaped($pointer("heading"))}</p>}
        />
        <$If
            test={$pointer("text")}
            $then={() => <p className="heroCarousel-description m-0 text-tiny text-(--sv-carousel-description-color) small:text-smallest medium:text-smaller">{$unescaped($pointer("text"))}</p>}
        />
        <$If
            test={$pointer("button_text")}
            $then={() => (
                <a
                    href={$pointer("url")}
                    aria-label={`${$If({
                        test: $pointer("this.alt_text.length"),
                        operator: $string("!="),
                        rvalue: $number(0),
                        $then: () => `${$pointer("alt_text")}`,
                        $else: () => `${$lang($string("carousel.slide_number"), {slide_number: $add($pointer<number>("@index"), $number(1))})}`,
                    })}, ${$pointer("button_text")}`}
                    className="heroCarousel-action button button--primary button--large mt-single mr-0 mb-0 ml-0"
                >
                    {$unescaped($pointer("button_text"))}
                </a>
            )}
        />
    </>
);

export default (_props: PartialProps) => (
    <$And
        a={$ifExpression($pointer("heading"), $string("=="), $boolean(false))}
        b={$ifExpression($pointer("text"), $string("=="), $boolean(false))}
        $then={() => <div className="heroCarousel-content bg-(--sv-carousel-bgColor) px-single pt-half pb-double text-center heroCarousel-content--empty small:absolute small:top-1/2 small:right-auto small:left-1/2 small:m-0 small:w-auto small:max-h-[80%] small:overflow-visible small:bg-transparent small:p-0 small:[transform:translateX(-50%)_translateY(-50%)]">{content}</div>}
        $else={() => <div className="heroCarousel-content bg-(--sv-carousel-bgColor) px-single pt-half pb-double text-center small:absolute small:top-1/2 small:right-0 small:left-0 small:mx-auto small:my-0 small:w-[70%] small:max-h-[80%] small:overflow-auto small:bg-(--sv-carousel-bgColor)/90 small:p-single small:[transform:translateY(-50%)]">{content}</div>}
    />
);
