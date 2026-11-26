"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$getImageSrcset1x2x, $If, $pointer, $string, $raw} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <a href={$pointer("urls.home")} className="header-logo__link relative z-(--sv-zIndex-low) mx-auto flex h-[inherit] w-[70%] items-center justify-center text-(--sv-storeName-color) no-underline hover:text-(--sv-color-textBase-hover) active:text-(--sv-color-textBase-active) medium:[display:inline-flex] medium:w-auto medium:border-b-0 medium:bg-none medium:p-0" data-header-logo-link={""}>
        <$If
            test={$pointer("settings.store_logo.image")}
            $then={() => (
                <$If
                    test={$pointer("theme_settings.logo_size")}
                    operator={$string("===")}
                    rvalue={$string("original")}
                    $then={() => (
                        <img
                            className="header-logo-image-unknown-size max-h-[calc(var(--sv-header-height)-var(--sv-header-logo-marginVertical)*2)] medium:max-h-none"
                            src={$raw("{{getImage settings.store_logo.image 'logo_size'}}")}
                            alt={$pointer("settings.store_logo.title")}
                            title={$pointer("settings.store_logo.title")}
                        />
                    )}
                    $else={() => (
                        <div className="header-logo-image-container relative w-full medium:min-h-[100px] after:content-[''] after:[display:block]">
                            <img
                                className="header-logo-image mx-auto [display:block] max-h-[calc(var(--sv-header-height)-var(--sv-header-logo-marginVertical)*2)] medium:max-h-none"
                                src={$raw("{{getImage settings.store_logo.image 'logo_size'}}")}
                                srcSet={$getImageSrcset1x2x($pointer<{data: string}>("settings.store_logo.image"), $pointer("theme_settings.logo_size"))}
                                alt={$pointer("settings.store_logo.title")}
                                title={$pointer("settings.store_logo.title")}
                            />
                        </div>
                    )}
                />
            )}
            $else={() => (
                <span className="header-logo-text [display:block] mx-auto overflow-hidden text-ellipsis whitespace-nowrap uppercase tracking-[2px] [font-family:var(--sv-fontFamily-hero)] text-[length:var(--sv-fontSize-logo-small)] font-normal small:text-[length:var(--sv-fontSize-logo-medium)] medium:[display:inline] medium:max-w-none medium:overflow-auto medium:whitespace-normal medium:px-[10px] medium:text-[length:var(--sv-fontSize-logo-large)]">{$pointer("settings.store_logo.title")}</span>
            )}
        />
    </a>
);
