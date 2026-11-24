"use server";
import Navigation from "./navigation.tsx";
import StoreLogo from "./store-logo.tsx";
import NavigationMenu from "./navigation-menu.tsx";
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
            <header className="header [position:fixed] top-0 z-(--sv-zIndex-higher) h-(--sv-header-height) w-full border-b border-container-border bg-(--sv-header-bg) is-open:h-full medium:relative medium:flex medium:h-auto medium:flex-col medium:overflow-visible medium:is-open:h-auto [&_.header-logo]:my-0 [&_.header-logo]:mx-[55px] [&_.header-logo]:h-(--sv-header-height) [&_.header-logo]:text-[0px] [&_.header-logo]:text-center small:[&_.header-logo]:mx-[82.5px] medium:[&_.header-logo]:h-auto medium:[&_.header-logo]:mx-auto medium:[&_.header-logo]:mt-[calc(var(--sv-spacing-double)+var(--sv-spacing-base))] medium:[&_.header-logo]:mb-[calc(var(--sv-spacing-double)+var(--sv-spacing-single))] medium:[&_.header-logo]:p-0 medium:[&.fixed_.header-logo]:absolute medium:[&.fixed_.header-logo]:top-0 medium:[&.fixed_.header-logo]:m-0 medium:[&.fixed_.header-logo]:w-full medium:[&.fixed_.header-logo]:bg-grey-lightest medium:[&.fixed_.header-logo]:py-quarter medium:[&.fixed_.header-logo-text]:text-larger [&_.header-logo.header-logo--left]:text-left medium:[&_.header-logo.header-logo--left]:ml-[40px] [&_.header-logo--left_.header-logo-image]:right-[unset] [&_.header-logo.header-logo--right]:text-right medium:[&_.header-logo.header-logo--right]:mr-[40px] [&_.header-logo--right_.header-logo-image]:left-[unset]" role="banner">
                <a href="#" className="mobileMenu-toggle absolute left-0 z-(--sv-zIndex-high) inline-block size-[55px] overflow-hidden px-[18px] text-[0px] medium:[display:none]" data-mobile-menu-toggle="menu">
                    <span className="mobileMenu-toggleIcon absolute top-[27px] [display:block] h-[2px] w-[20px] bg-(--sv-header-font-color) [transform:rotate(0deg)] [transition:background-color_10ms_ease-in_100ms] [.mobileMenu-toggle.is-open_&]:bg-transparent [.mobileMenu-toggle.is-open_&]:[transition-delay:100ms] before:[display:block] before:content-[''] before:absolute before:h-[2px] before:w-[20px] before:bg-(--sv-header-font-color) before:[transform:rotate(0deg)] before:[transition:transform_100ms_ease-in,top_100ms_ease-in_150ms,bottom_100ms_ease-in_150ms] before:top-[-0.5rem] after:[display:block] after:content-[''] after:absolute after:h-[2px] after:w-[20px] after:bg-(--sv-header-font-color) after:[transform:rotate(0deg)] after:[transition:transform_100ms_ease-in,top_100ms_ease-in_150ms,bottom_100ms_ease-in_150ms] after:bottom-[-0.5rem] [.mobileMenu-toggle.is-open_&]:before:top-0 [.mobileMenu-toggle.is-open_&]:before:bottom-auto [.mobileMenu-toggle.is-open_&]:before:[transform:rotate(45deg)] [.mobileMenu-toggle.is-open_&]:before:[transition:transform_100ms_ease-in_150ms,top_100ms_ease-in,bottom_100ms_ease-in] [.mobileMenu-toggle.is-open_&]:after:bottom-0 [.mobileMenu-toggle.is-open_&]:after:top-auto [.mobileMenu-toggle.is-open_&]:after:[transform:rotate(-45deg)] [.mobileMenu-toggle.is-open_&]:after:[transition:transform_100ms_ease-in_150ms,top_100ms_ease-in,bottom_100ms_ease-in]">Toggle menu</span>
                </a>
                <Navigation />

                <$If
                    test={$pointer("page_type")}
                    operator={$string("===")}
                    rvalue={$string("default")}
                    $then={() => (
                        <h1 className={`header-logo header-logo--${$pointer("theme_settings.logo-position")}`}>
                            <StoreLogo />
                        </h1>
                    )}
                    $else={() => (
                        <div className={`header-logo header-logo--${$pointer("theme_settings.logo-position")}`}>
                            <StoreLogo />
                        </div>
                    )}
                />
                <div className="navPages-container absolute inset-x-0 bottom-0 z-(--sv-zIndex-lower) h-full [display:none] [-webkit-overflow-scrolling:touch] is-open:[display:block] is-open:pt-(--sv-header-height) medium:relative medium:[display:block] medium:h-auto medium:[background:transparent] medium:p-0" id="menu" data-menu={""}>
                    <NavigationMenu />
                </div>
                {region("header_navigation_bottom--global")}
            </header>
            {region("header_bottom--global")}
            {" "}
            {region("header_bottom")}
        </>
    );
};
