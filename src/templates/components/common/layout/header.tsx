"use server";
import Navigation from "../navigation/navigation.tsx";
import {customerRegions} from "../../../../server/regionParts.tsx";
import StoreLogo from "./store-logo.tsx";
import NavigationMenu from "../navigation/navigation-menu.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $limit, $number, $pointer, $region, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface Banner {
    id: string;
    location: string;
    content: string;
    "banner-name": string;
}

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default (_props: PartialProps) => {
    return (
        <>
            <a href="#main-content" className="skip-to-main-link absolute left-1/2 z-(--sv-zIndex-highest) bg-(--sv-header-bg) p-[4px] font-bold text-(--sv-color-textBase) [transform:translate(-50%,calc(-100%-var(--sv-header-height)))] [transition:transform_0.3s] focus:[transform:translate(-50%,0%)]">
                <$Lang keyName={$string("header.skip_to_main")} />
            </a>
            <$If
                test={$pointer("banners.top")}
                $then={() => (
                    <div className="banners bg-(--sv-setting-color-primary) py-half text-center text-(--sv-setting-color-white) [&_a]:text-(--sv-color-white) [&_p:last-child]:mb-0" data-banner-location="top">
                        <$Each
                            list={$limit($pointer<Banner[]>("banners.top_metadata"), $number(1))}
                            $then={(banner) => (
                                <div
                                    className="banner mx-auto w-full max-w-(--sv-layout-widthMax) flow-root [.banner+&]:mt-single"
                                    data-event-type="promotion"
                                    data-entity-id={banner.id}
                                    data-name={banner["banner-name"]}
                                    data-position={banner.location}
                                    data-banner-id={banner["banner-name"]}
                                >
                                    <div data-event-type="promotion-click">{$unescaped(banner.content)}</div>
                                </div>
                            )}
                        />
                    </div>
                )}
            />
            <header className="header [position:fixed] top-0 z-(--sv-zIndex-higher) h-(--sv-header-height) w-full bg-brand text-on-brand [--sv-setting-navUser-color:var(--color-white)] [--sv-setting-navUser-color-hover:var(--color-white)] [--sv-setting-navPages-color:var(--color-white)] [--sv-setting-icon-color:var(--color-white)] [--sv-setting-icon-color-hover:var(--color-white)] is-open:h-full medium:sticky medium:top-0 medium:grid medium:h-auto medium:grid-cols-[200px_minmax(0,1fr)_auto] medium:items-center medium:gap-x-[35px] medium:overflow-visible medium:px-[max(var(--sv-spacing-double),calc((100%-1170px)/2))] medium:py-[9px] medium:[&_.navPages>.navPages-list:not(.navPages-list--user)]:p-0 medium:[&_.navPages>.navPages-list:not(.navPages-list--user)]:h-[41px] medium:[&_.navPages>.navPages-list:not(.navPages-list--user)]:flex medium:[&_.navPages-item-page>.navPages-action]:translate-y-[3px] medium:[&_.navPages>.navPages-list:not(.navPages-list--user)]:items-center medium:[&_.navPages>.navPages-list:not(.navPages-list--user)]:gap-half medium:is-open:h-auto [&_.header-logo]:my-0 [&_.header-logo]:mx-[55px] [&_.header-logo]:h-(--sv-header-height) [&_.header-logo]:text-[0px] [&_.header-logo]:text-center small:[&_.header-logo]:mx-[82.5px] medium:[&_.header-logo]:h-auto medium:[&_.header-logo]:m-0 medium:[&_.header-logo]:col-start-1 medium:[&_.header-logo]:row-start-1 medium:[&_.header-logo__link]:w-full medium:[&_.header-logo__link]:justify-start medium:[&_.header-logo-image]:mx-0 medium:[&_.header-logo-image-container]:min-h-0 medium:[&_.header-logo-image]:max-h-[63px] medium:[&_.header-logo-image]:w-auto medium:[&_.header-logo]:p-0 medium:[&.fixed_.header-logo]:absolute medium:[&.fixed_.header-logo]:top-0 medium:[&.fixed_.header-logo]:m-0 medium:[&.fixed_.header-logo]:w-full medium:[&.fixed_.header-logo]:bg-grey-lightest medium:[&.fixed_.header-logo]:py-quarter medium:[&.fixed_.header-logo-text]:text-larger [&_.header-logo.header-logo--left]:text-left medium:[&_.header-logo.header-logo--left]:ml-0 [&_.header-logo--left_.header-logo-image]:right-[unset] [&_.header-logo.header-logo--right]:text-right medium:[&_.header-logo.header-logo--right]:mr-[40px] [&_.header-logo--right_.header-logo-image]:left-[unset]" role="banner">
                <a href="#" className="mobileMenu-toggle absolute left-0 z-(--sv-zIndex-high) inline-block size-[55px] overflow-hidden px-[18px] text-[0px] medium:[display:none]" data-mobile-menu-toggle="menu">
                    <span className="mobileMenu-toggleIcon absolute top-[27px] [display:block] h-[2px] w-[20px] bg-(--sv-header-font-color) [transform:rotate(0deg)] [transition:background-color_10ms_ease-in_100ms] [.mobileMenu-toggle.is-open_&]:bg-transparent [.mobileMenu-toggle.is-open_&]:[transition-delay:100ms] before:[display:block] before:content-[''] before:absolute before:h-[2px] before:w-[20px] before:bg-(--sv-header-font-color) before:[transform:rotate(0deg)] before:[transition:transform_100ms_ease-in,top_100ms_ease-in_150ms,bottom_100ms_ease-in_150ms] before:top-[-0.5rem] after:[display:block] after:content-[''] after:absolute after:h-[2px] after:w-[20px] after:bg-(--sv-header-font-color) after:[transform:rotate(0deg)] after:[transition:transform_100ms_ease-in,top_100ms_ease-in_150ms,bottom_100ms_ease-in_150ms] after:bottom-[-0.5rem] [.mobileMenu-toggle.is-open_&]:before:top-0 [.mobileMenu-toggle.is-open_&]:before:bottom-auto [.mobileMenu-toggle.is-open_&]:before:[transform:rotate(45deg)] [.mobileMenu-toggle.is-open_&]:before:[transition:transform_100ms_ease-in_150ms,top_100ms_ease-in,bottom_100ms_ease-in] [.mobileMenu-toggle.is-open_&]:after:bottom-0 [.mobileMenu-toggle.is-open_&]:after:top-auto [.mobileMenu-toggle.is-open_&]:after:[transform:rotate(-45deg)] [.mobileMenu-toggle.is-open_&]:after:[transition:transform_100ms_ease-in_150ms,top_100ms_ease-in,bottom_100ms_ease-in]">Toggle menu</span>
                </a>
                <Navigation />

                <$If
                    test={$pointer("page_type")}
                    operator={$string("===")}
                    rvalue={$string("default")}
                    $then={() => (
                        <div className={`header-logo header-logo--${$pointer("theme_settings.logo-position")}`}>
                            <StoreLogo />
                        </div>
                    )}
                    $else={() => (
                        <div className={`header-logo header-logo--${$pointer("theme_settings.logo-position")}`}>
                            <StoreLogo />
                        </div>
                    )}
                />
                <div className="navPages-container absolute inset-x-0 bottom-0 z-(--sv-zIndex-lower) h-full [display:none] [-webkit-overflow-scrolling:touch] is-open:[display:block] is-open:pt-(--sv-header-height) medium:relative medium:col-span-3 medium:row-start-2 medium:[display:block] medium:h-auto medium:[&_.navPages]:mx-0 medium:[&_.navPages]:text-left medium:[&_.navPages]:max-w-none medium:[&_.navPages]:p-0 medium:[background:transparent] medium:p-0" id="menu" data-menu={""}>
                    <NavigationMenu />
                </div>
                {region("header_navigation_bottom--global")}
            </header>
            {customerRegions("header_bottom--global")}
            {region("header_bottom--global")}
            {" "}
            {customerRegions("header_bottom")}
            {region("header_bottom")}
        </>
    );
};
