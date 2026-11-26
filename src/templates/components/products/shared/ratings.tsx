"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$For, $If, $lang, $number, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";
import {Icon} from "../../../../server/formParts.tsx";

const star = () => (
    <svg>
        <use href="#icon-star" />
    </svg>
);

export default (_props: PartialProps) => (
    <span
        role="img"
        dangerouslyInlineAttributes={{
            attributes: `${$If({
                test: $pointer("rating_target"),
                $then: () =>
                    `${$raw("aria-label=\"")}${$lang($string("products.reviews.rating_aria_label"), {
                        rating_target: $pointer("rating_target"),
                        current_rating: $pointer("rating"),
                        max_rating: $number(5),
                    })}${$raw("\"")}`,
                $else: () =>
                    `${$raw("aria-label=\"")}${$lang($string("products.reviews.rating_aria_label"), {
                        rating_target: $string("Product"),
                        current_rating: $pointer("rating"),
                        max_rating: $number(5),
                    })}${$raw("\"")}`,
            })}`,
        }}
    >
        <$For
            from={$number(1)}
            to={$number(5)}
            $then={() => (
                <>
                    <$If
                        test={$pointer("../this.rating")}
                        operator={$string(">=")}
                        rvalue={$pointer("$index")}
                        $then={() => <Icon tag="span" className="icon--ratingFull [&_svg]:fill-(--sv-setting-icon-ratingFull)">{star()}</Icon>}
                        $else={() => <Icon tag="span" className="icon--ratingEmpty [&_svg]:fill-(--sv-setting-icon-ratingEmpty)">{star()}</Icon>}
                    />
                </>
            )}
        />
    </span>
);
