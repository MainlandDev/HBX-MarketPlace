"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import CarouselContentAnnouncement from "../../carousel-content-announcement.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import ResponsiveImg from "../../common/responsive-img.tsx";
import {$boolean, $cdn, $Each, $getImageSrcset, $Gt, $If, $number, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";
import {SLICK_HOST} from "../../../../server/carouselParts.ts";
import type {Image, Product, SrcsetSize} from "../../../../server/productViewTypes.ts";

export default (_props: PartialProps) => {
    const theme = $pointer<ThemeSettingsObject>("theme_settings");
    const product = $pointer<Product>("product");
    const zoomSizes = {"1x": $pointer<SrcsetSize>("theme_settings.zoom_size")};
    return (
        <>
            <section className="productView-images float-left mb-double w-full px-base medium:w-6/12" data-image-gallery={""}>
                {/*
        Note that these image sizes are coupled to image sizes used in /assets/js/theme/common/product-details.js
        for variant/rule image replacement
    */}
                <$If test={$pointer("product.images.length")} operator={$string(">")} rvalue={$number(1)} $then={() => <CarouselContentAnnouncement />} />
                <figure
                    className="productView-image relative m-auto flex items-center justify-center min-[320px]:max-[801px]:pointer-events-none medium:min-h-[366px] medium:[min-width:inherit] [&_.easyzoom-flyout]:absolute [&_.easyzoom-flyout]:top-0 [&_.easyzoom-flyout]:left-0 [&_.easyzoom-flyout]:size-full [&_.easyzoom-flyout]:overflow-hidden [&_.easyzoom-flyout_img]:max-w-none [&_.easyzoom-flyout_img]:w-auto"
                    data-image-gallery-main={""}
                    dangerouslyInlineAttributes={{
                        attributes: `${$If({test: product.main_image, $then: () => `${$raw('data-zoom-image="')}${$getImageSrcset(product.main_image, zoomSizes, $cdn(theme.default_image_product))}${$raw('"')}`})}`,
                    }}
                >
                    <div className="productView-img-container relative m-auto w-full max-w-[500px] after:block after:h-0 after:w-full after:pb-[131.8%] after:content-[''] [&_img]:absolute [&_img]:inset-0 [&_img]:m-auto [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_img]:[font-family:'object-fit:_contain;']">
                        {/* Remove the surrounding a-element if there is no main image. */}
                        <$If
                            test={product.main_image}
                            $then={() => (
                                <>
                                    {$raw('<a href="')}
                                    {$getImageSrcset(product.main_image, zoomSizes, $cdn(theme.default_image_product))}
                                    {$raw('" target="_blank">')}
                                </>
                            )}
                        />
                        <ResponsiveImg image={product.main_image} class={$string("productView-image--default")} fallback_size={theme.product_size} lazyload={theme.lazyload_mode} default_image={theme.default_image_product} otherAttributes={$string("data-main-image")} />
                        {/* Remove the surrounding a-element if there is no main image. */}
                        <$If test={product.main_image} $then={() => $raw("</a>")} />
                    </div>
                </figure>
                <ul
                    className={"productView-thumbnails -mx-quarter my-0 w-auto max-w-none flow-root [list-style-type:none] [.productView-image+&]:mt-half [&[data-slick]]:opacity-0 [&[data-slick].slick-initialized]:opacity-100 [&_.slick-list]:mx-[40px] [&_.slick-next]:right-0 [&_.slick-prev]:left-0 [&_img]:relative [&_img]:inset-0 [&_img]:m-0 [&_img]:w-[50px] [&_img]:object-contain [&_img]:[font-family:'object-fit:_contain;'] " + SLICK_HOST}
                    dangerouslyInlineAttributes={{
                        attributes: `${$Gt({
                            a: $pointer<number>("product.images.length"),
                            b: $number(5),
                            $then: () => $raw(` data-slick='{ "infinite": false, "mobileFirst": true, "dots": false, "accessibility": false, "slidesToShow": 5, "slidesToScroll": 5 }'`),
                        })}`,
                    }}
                >
                    <$Each
                        list={$pointer<Image[]>("product.images")}
                        $then={(image) => {
                            const defaultImage = $cdn($pointer<string>("../theme_settings.default_image_product"));
                            const zoom = {"1x": $pointer<SrcsetSize>("../theme_settings.zoom_size")};
                            const size = {"1x": $pointer<SrcsetSize>("../theme_settings.product_size")};
                            return (
                                <li className="productView-thumbnail float-left p-quarter text-center [&:not([style*=width])]:w-3/12 large:[&:not([style*=width])]:w-[20%]">
                                    <a
                                        className="productView-thumbnail-link relative box-content flex h-[67px] w-full max-w-[75px] justify-center border border-container-border p-[2px] hover:border-grey-darker is-active:border-grey-darker"
                                        href={`${$getImageSrcset(image, zoom, defaultImage)}`}
                                        data-image-gallery-item={""}
                                        data-image-gallery-new-image-url={`${$getImageSrcset(image, size, defaultImage)}`}
                                        data-image-gallery-new-image-srcset={`${$getImageSrcset(image, {use_default_sizes: $boolean(true)})}`}
                                        data-image-gallery-zoom-image-url={`${$getImageSrcset(image, zoom, defaultImage)}`}
                                    >
                                        <ResponsiveImg image={image} fallback_size={$pointer("../theme_settings.productview_thumb_size")} lazyload={$pointer("../theme_settings.lazyload_mode")} />
                                    </a>
                                </li>
                            );
                        }}
                    />
                </ul>
            </section>
        </>
    );
};
