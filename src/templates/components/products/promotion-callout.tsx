"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $lang, $number, $pointer, $string, $subtract} from "@mainlanddev/hbx-bigcommerce";

interface Promotion {
    text: string;
}

export default (_props: PartialProps) => (
    <$If
        test={$pointer("promotions.length")}
        $then={() => (
            <$If
                test={$pointer("mode")}
                operator={$string("===")}
                rvalue={$string("compact")}
                $then={() => (
                    <div className="promotionCallout promotionCallout--compact mt-quarter">
                        <div className="promotionCallout-item flex flex-wrap items-center gap-quarter rounded-[4px] border border-[rgba(0,0,0,0.08)] bg-(--sv-setting-color_bg_featured_promotions) px-half py-quarter">
                            <span className="promotionCallout-text text-smaller leading-[15px] font-semibold text-(--sv-setting-color_text_featured_promotions)">{$pointer("promotions.[0].text")}</span>
                            <$If
                                test={$pointer("promotions.[1]")}
                                $then={() => (
                                    <span className="promotionCallout-more basis-full text-smallest opacity-70 text-(--sv-setting-color_text_featured_promotions)">
                                        +{$subtract($pointer("promotions.length"), $number(1))}{" "}
                                        {$lang($string("products.featured_promotions.more_offers"), {count: $subtract($pointer("promotions.length"), $number(1))})}
                                    </span>
                                )}
                            />
                        </div>
                    </div>
                )}
                $else={() => (
                    <ul className="promotionCallout promotionCallout--full m-0 mb-half p-0 [list-style:none] [&_.promotionCallout-item+.promotionCallout-item]:mt-quarter">
                        <$Each
                            list={$pointer<Promotion[]>("promotions")}
                            $then={(promotion) => (
                                <li className="promotionCallout-item flex flex-wrap items-center gap-quarter rounded-[4px] border border-[rgba(0,0,0,0.08)] bg-(--sv-setting-color_bg_featured_promotions) px-half py-quarter">
                                    <span className="promotionCallout-text text-smaller leading-[15px] font-semibold text-(--sv-setting-color_text_featured_promotions)">{promotion.text}</span>
                                </li>
                            )}
                        />
                    </ul>
                )}
            />
        )}
    />
);
