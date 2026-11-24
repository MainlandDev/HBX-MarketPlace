"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

// The `${type}-…` class names are hooks and are produced at render time, so the type-specific colours are utilities on a layout-transparent wrapper
// (or on .starwrap) that target those class names: `sale` and `sold-out` use different merchant colour settings.
export default (_props: PartialProps) => {
    const type = $pointer<string>("badge-type");
    const label = $pointer<string>("badge_label");
    return (
        <$If
            test={$pointer("badge_view")}
            operator={$string("===")}
            rvalue={$string("sash")}
            $then={() => (
                <div className="[display:contents] [&>div]:absolute [&>div]:top-[25px] [&>div]:left-[-25px] [&>div]:z-10 [&>div]:h-[20px] [&>div]:w-[119px] [&>div]:pt-[calc(var(--sv-spacing-eighth)/2)] [&>div]:text-center [&>div]:text-[15px] [&>div]:leading-[16px] [&>div]:font-bold [&>div]:[transform:rotate(-45deg)] [&>div]:[transition:background-color_800ms_ease] [[class~=listItem-figure]_&>div]:top-[24px] small:[[class~=listItem-figure]_&>div]:left-[-20px] small:[[class~=listItem-figure]_&>div]:top-[19px] large:[[class~=listItem-figure]_&>div]:left-[-15px] large:[[class~=listItem-figure]_&>div]:top-[24px] [&>.sale-flag-sash]:bg-(--sv-setting-color_badge_product_sale_badges) [&>.sale-flag-sash]:text-(--sv-setting-color_text_product_sale_badges) [[class~=product]:hover_&>.sale-flag-sash]:bg-(--sv-setting-color_hover_product_sale_badges) [&>.sold-out-flag-sash]:bg-(--sv-setting-color_badge_product_sold_out_badges) [&>.sold-out-flag-sash]:text-(--sv-setting-color_text_product_sold_out_badges) [[class~=product]:hover_&>.sold-out-flag-sash]:bg-(--sv-setting-color_hover_product_sold_out_badges)">
                    <div className={`${type}-flag-sash`}>
                        <span className={`${type}-text`}>{$unescaped(label)}</span>
                    </div>
                </div>
            )}
            $elseThen={[
                {
                    test: $pointer("badge_view"),
                    operator: $string("==="),
                    rvalue: $string("topleft"),
                    $then: () => (
                        <div className="[display:contents] [&>div]:absolute [&>div]:z-10 [&>div]:h-[20px] [&>div]:rounded-[0_50px_50px_0] [&>div]:pt-[calc(var(--sv-spacing-eighth)/2)] [&>div]:pr-half [&>div]:pl-third [&>div]:text-[15px] [&>div]:leading-[16px] [&>div]:font-bold [&>div]:[transition:background-color_800ms_ease] [&>.sale-flag-side]:bg-(--sv-setting-color_badge_product_sale_badges) [&>.sale-flag-side]:text-(--sv-setting-color_text_product_sale_badges) [[class~=product]:hover_&>.sale-flag-side]:bg-(--sv-setting-color_hover_product_sale_badges) [&>.sold-out-flag-side]:bg-(--sv-setting-color_badge_product_sold_out_badges) [&>.sold-out-flag-side]:text-(--sv-setting-color_text_product_sold_out_badges) [[class~=product]:hover_&>.sold-out-flag-side]:bg-(--sv-setting-color_hover_product_sold_out_badges)">
                            <div className={`${type}-flag-side`}>
                                <span className={`${type}-text`}>{$unescaped(label)}</span>
                            </div>
                        </div>
                    ),
                },
                {
                    test: $pointer("badge_view"),
                    operator: $string("==="),
                    rvalue: $string("burst"),
                    $then: () => (
                        <div className="starwrap absolute top-[12px] left-[12px] h-[50px] w-[50px] [[class~=listItem-figure]_&]:[transform:scale(0.7)] small:[[class~=listItem-figure]_&]:top-0 small:[[class~=listItem-figure]_&]:[transform:scale(0.6)] large:[[class~=listItem-figure]_&]:top-[10px] large:[[class~=listItem-figure]_&]:[transform:scale(0.7)] [&>div:first-child]:absolute [&>div:first-child]:top-[20%] [&>div:first-child]:z-50 [&>div:first-child]:w-[50px] [&>div:first-child]:text-center [&>div:first-child]:leading-[15px] [&>div:first-child]:font-semibold [&>.sale-flag-star]:absolute [&>.sale-flag-star]:top-0 [&>.sale-flag-star]:left-0 [&>.sale-flag-star]:z-10 [&>.sale-flag-star]:h-[50px] [&>.sale-flag-star]:w-[50px] [&>.sale-flag-star]:overflow-visible [&>.sale-flag-star]:[transform-origin:50%_50%_0] [&>.sale-flag-star]:[transition:background-color_800ms_ease] [&>.sale-flag-star]:[display:block] [&>.sale-flag-star]:[transform:scaleX(1)_scaleY(1)_scaleZ(1)] [&>.sale-flag-star]:bg-(--sv-setting-color_badge_product_sale_badges) [[class~=product]:hover_&>.sale-flag-star]:bg-(--sv-setting-color_hover_product_sale_badges) [&>.sale-flag-star]:before:absolute [&>.sale-flag-star]:before:top-0 [&>.sale-flag-star]:before:left-0 [&>.sale-flag-star]:before:z-10 [&>.sale-flag-star]:before:h-[50px] [&>.sale-flag-star]:before:w-[50px] [&>.sale-flag-star]:before:overflow-visible [&>.sale-flag-star]:before:[transform-origin:50%_50%_0] [&>.sale-flag-star]:before:[transition:background-color_800ms_ease] [&>.sale-flag-star]:before:[display:block] [&>.sale-flag-star]:before:content-[''] [&>.sale-flag-star]:before:bg-(--sv-setting-color_badge_product_sale_badges) [&>.sale-flag-star]:before:[transform:rotateZ(30deg)_scaleX(1)_scaleY(1)_scaleZ(1)] [[class~=product]:hover_&>.sale-flag-star]:before:bg-(--sv-setting-color_hover_product_sale_badges) [&>.sale-flag-star]:after:absolute [&>.sale-flag-star]:after:top-0 [&>.sale-flag-star]:after:left-0 [&>.sale-flag-star]:after:z-10 [&>.sale-flag-star]:after:h-[50px] [&>.sale-flag-star]:after:w-[50px] [&>.sale-flag-star]:after:overflow-visible [&>.sale-flag-star]:after:[transform-origin:50%_50%_0] [&>.sale-flag-star]:after:[transition:background-color_800ms_ease] [&>.sale-flag-star]:after:[display:block] [&>.sale-flag-star]:after:content-[''] [&>.sale-flag-star]:after:bg-(--sv-setting-color_badge_product_sale_badges) [&>.sale-flag-star]:after:[transform:rotateZ(60deg)_scaleX(1)_scaleY(1)_scaleZ(1)] [[class~=product]:hover_&>.sale-flag-star]:after:bg-(--sv-setting-color_hover_product_sale_badges) [&>.sale-text-burst]:text-(--sv-setting-color_text_product_sale_badges) [&>.sold-out-flag-star]:absolute [&>.sold-out-flag-star]:top-0 [&>.sold-out-flag-star]:left-0 [&>.sold-out-flag-star]:z-10 [&>.sold-out-flag-star]:h-[50px] [&>.sold-out-flag-star]:w-[50px] [&>.sold-out-flag-star]:overflow-visible [&>.sold-out-flag-star]:[transform-origin:50%_50%_0] [&>.sold-out-flag-star]:[transition:background-color_800ms_ease] [&>.sold-out-flag-star]:[display:block] [&>.sold-out-flag-star]:[transform:scaleX(1)_scaleY(1)_scaleZ(1)] [&>.sold-out-flag-star]:bg-(--sv-setting-color_badge_product_sold_out_badges) [[class~=product]:hover_&>.sold-out-flag-star]:bg-(--sv-setting-color_hover_product_sold_out_badges) [&>.sold-out-flag-star]:before:absolute [&>.sold-out-flag-star]:before:top-0 [&>.sold-out-flag-star]:before:left-0 [&>.sold-out-flag-star]:before:z-10 [&>.sold-out-flag-star]:before:h-[50px] [&>.sold-out-flag-star]:before:w-[50px] [&>.sold-out-flag-star]:before:overflow-visible [&>.sold-out-flag-star]:before:[transform-origin:50%_50%_0] [&>.sold-out-flag-star]:before:[transition:background-color_800ms_ease] [&>.sold-out-flag-star]:before:[display:block] [&>.sold-out-flag-star]:before:content-[''] [&>.sold-out-flag-star]:before:bg-(--sv-setting-color_badge_product_sold_out_badges) [&>.sold-out-flag-star]:before:[transform:rotateZ(30deg)_scaleX(1)_scaleY(1)_scaleZ(1)] [[class~=product]:hover_&>.sold-out-flag-star]:before:bg-(--sv-setting-color_hover_product_sold_out_badges) [&>.sold-out-flag-star]:after:absolute [&>.sold-out-flag-star]:after:top-0 [&>.sold-out-flag-star]:after:left-0 [&>.sold-out-flag-star]:after:z-10 [&>.sold-out-flag-star]:after:h-[50px] [&>.sold-out-flag-star]:after:w-[50px] [&>.sold-out-flag-star]:after:overflow-visible [&>.sold-out-flag-star]:after:[transform-origin:50%_50%_0] [&>.sold-out-flag-star]:after:[transition:background-color_800ms_ease] [&>.sold-out-flag-star]:after:[display:block] [&>.sold-out-flag-star]:after:content-[''] [&>.sold-out-flag-star]:after:bg-(--sv-setting-color_badge_product_sold_out_badges) [&>.sold-out-flag-star]:after:[transform:rotateZ(60deg)_scaleX(1)_scaleY(1)_scaleZ(1)] [[class~=product]:hover_&>.sold-out-flag-star]:after:bg-(--sv-setting-color_hover_product_sold_out_badges) [&>.sold-out-text-burst]:text-(--sv-setting-color_text_product_sold_out_badges)">
                            <div className={`${type}-text-burst`}>{$unescaped(label)}</div>
                            <div className={`${type}-flag-star`}></div>
                        </div>
                    ),
                },
            ]}
        />
    );
};
