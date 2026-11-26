"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import SocialLinks from "./social-links.tsx";
import SubscriptionForm from "./subscription-form.tsx";
import PaymentIcons from "./payment-icons.tsx";
import {Container} from "../../../server/componentParts.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {
    $And,
    $Each,
    $If,
    $Lang,
    $limit,
    $Nl2br,
    $number,
    $pointer,
    $region,
    $string,
    $unescaped,
    $moment,
    $raw,
} from "@mainlanddev/hbx-bigcommerce";

interface Banner {
    id: string;
    location: string;
    content: string;
    "banner-name": string;
}

interface Link {
    url: string;
    name: string;
}

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default (_props: PartialProps) => {
    const theme = $pointer<ThemeSettingsObject>("theme_settings");
    return (
        <>
            <$If
                test={$pointer("banners.bottom")}
                $then={() => (
                    <div className="banners bg-(--sv-setting-color-primary) py-half text-center text-(--sv-setting-color-white) [&_a]:text-(--sv-color-white) [&_p:last-child]:mb-0" data-banner-location="bottom">
                        <$Each
                            list={$limit($pointer<Banner[]>("banners.bottom_metadata"), $number(1))}
                            $then={(banner) => (
                                <div
                                    className="banner mx-auto w-full max-w-(--sv-layout-widthMax) flow-root [.banner+&]:mt-single"
                                    dangerouslyInlineAttributes={{
                                        attributes: `data-event-type="promotion" data-entity-id="${banner.id}" data-name="${banner["banner-name"]}" data-position="${banner.location}" data-name="${banner["banner-name"]}"`,
                                    }}
                                >
                                    <div data-event-type="promotion-click">{$unescaped(banner.content)}</div>
                                </div>
                            )}
                        />
                    </div>
                )}
            />
            <footer className="footer relative bg-bg pb-double [&_.footer-info-col]:text-[16px] [&_.footer-info-list_a]:text-text [&_.footer-info-list_a]:text-[16px] [transform:translateZ(0)]" role="contentinfo">
                <h2 className="footer-title-sr-only absolute top-auto -left-[10000px] size-px overflow-hidden">
                    <$Lang keyName={$string("footer.title")} />
                </h2>
                <$If
                    test={$pointer("settings.show_newsletter_box")}
                    $then={() => (
                        <div className="footer-newsletter mb-double bg-border py-[22px]">
                            <Container>
                                <SubscriptionForm />
                            </Container>
                        </div>
                    )}
                />
                <Container>
                    <$If
                        test={$pointer("theme_settings.social_icon_placement_bottom")}
                        operator={$string("!==")}
                        rvalue={$string("bottom_none")}
                        $then={() => (
                            <$If
                                test={$pointer("theme_settings.social_icon_placement_bottom")}
                                operator={$string("===")}
                                rvalue={$string("bottom_left")}
                                $then={() => (
                                    <article
                                        className="footer-info-col footer-info-col--social w-full px-gutter-half [&>:first-child]:mt-0 [&>:last-child]:mb-0 inline-block float-none align-top break-words text-text-secondary text-(length:--sv-fontSize-base) text-center small:text-left footer-info-col--left small:p-0"
                                        data-section-type="footer-webPages"
                                    >
                                        <h3 className="footer-info-heading text-(length:--sv-fontSize-base) font-bold text-text [text-transform:inherit]">
                                            <$Lang keyName={$string("social.connect")} />
                                        </h3>
                                        <SocialLinks />
                                    </article>
                                )}
                                $else={() => (
                                    <article
                                        className="footer-info-col footer-info-col--social w-full px-gutter-half [&>:first-child]:mt-0 [&>:last-child]:mb-0 inline-block float-none align-top break-words text-text-secondary text-(length:--sv-fontSize-base) text-center small:text-left footer-info-col--right small:left-1/2 small:[position:inherit] small:w-1/2 medium:left-0 medium:p-0 medium:text-right medium:w-full"
                                        data-section-type="footer-webPages"
                                    >
                                        <h3 className="footer-info-heading text-(length:--sv-fontSize-base) font-bold text-text [text-transform:inherit]">
                                            <$Lang keyName={$string("social.connect")} />
                                        </h3>
                                        <SocialLinks />
                                    </article>
                                )}
                            />
                        )}
                    />

                    <section className="footer-info -mx-gutter-half w-auto max-w-none flow-root text-[0px]">
                        <article className="footer-info-col footer-info-col--small w-full px-gutter-half [&>:first-child]:mt-0 [&>:last-child]:mb-0 inline-block float-none align-top break-words text-text-secondary text-(length:--sv-fontSize-base) text-center small:text-left small:w-1/2 medium:w-1/6" data-section-type="footer-webPages">
                            <h3 className="footer-info-heading text-(length:--sv-fontSize-base) font-bold text-text [text-transform:inherit]">
                                <$Lang keyName={$string("footer.navigate")} />
                            </h3>
                            <ul className="footer-info-list list-none ml-0 [&_a]:inline-block [&_a]:py-sixth [&_a]:text-text-secondary [&_a]:no-underline [&_a:hover]:text-(--sv-color-textSecondary-hover)">
                                <$Each
                                    list={$pointer<Link[]>("pages")}
                                    $then={(page) => (
                                        <li>
                                            <a href={page.url}>{page.name}</a>
                                        </li>
                                    )}
                                />
                                <li>
                                    <a href={$pointer("urls.sitemap")}>
                                        <$Lang keyName={$string("sitemap.page_title")} />
                                    </a>
                                </li>
                            </ul>
                        </article>

                        <article className="footer-info-col footer-info-col--small w-full px-gutter-half [&>:first-child]:mt-0 [&>:last-child]:mb-0 inline-block float-none align-top break-words text-text-secondary text-(length:--sv-fontSize-base) text-center small:text-left small:w-1/2 medium:w-1/6" data-section-type="footer-categories">
                            <h3 className="footer-info-heading text-(length:--sv-fontSize-base) font-bold text-text [text-transform:inherit]">
                                <$Lang keyName={$string("footer.categories")} />
                            </h3>
                            <ul className="footer-info-list list-none ml-0 [&_a]:inline-block [&_a]:py-sixth [&_a]:text-text-secondary [&_a]:no-underline [&_a:hover]:text-(--sv-color-textSecondary-hover)">
                                <$Each
                                    list={$limit($pointer<Link[]>("categories"), $number(7))}
                                    $then={(category) => (
                                        <li>
                                            <a href={category.url}>{category.name}</a>
                                        </li>
                                    )}
                                />
                            </ul>
                        </article>

                        <$And
                            a={theme.shop_by_brand_show_footer}
                            b={$pointer("shop_by_brand.length")}
                            $then={() => (
                                <article className="footer-info-col footer-info-col--small w-full px-gutter-half [&>:first-child]:mt-0 [&>:last-child]:mb-0 inline-block float-none align-top break-words text-text-secondary text-(length:--sv-fontSize-base) text-center small:text-left small:w-1/2 medium:w-1/6" data-section-type="footer-brands">
                                    <h3 className="footer-info-heading text-(length:--sv-fontSize-base) font-bold text-text [text-transform:inherit]">
                                        <$Lang keyName={$string("footer.brands")} />
                                    </h3>
                                    <ul className="footer-info-list list-none ml-0 [&_a]:inline-block [&_a]:py-sixth [&_a]:text-text-secondary [&_a]:no-underline [&_a:hover]:text-(--sv-color-textSecondary-hover)">
                                        <$Each
                                            list={$limit($pointer<Link[]>("shop_by_brand"), $number(9))}
                                            $then={(brand) => (
                                                <li>
                                                    <a href={brand.url}>{brand.name}</a>
                                                </li>
                                            )}
                                        />
                                        <li>
                                            <a href={$pointer("urls.brands")}>
                                                <$Lang keyName={$string("common.view_all")} />
                                            </a>
                                        </li>
                                    </ul>
                                </article>
                            )}
                        />

                        <$If
                            test={$pointer("settings.address")}
                            $then={() => (
                                <article className="footer-info-col footer-info-col--small w-full px-gutter-half [&>:first-child]:mt-0 [&>:last-child]:mb-0 inline-block float-none align-top break-words text-text-secondary text-(length:--sv-fontSize-base) text-center small:text-left small:w-1/2 medium:w-1/6" data-section-type="storeInfo">
                                    <h3 className="footer-info-heading text-(length:--sv-fontSize-base) font-bold text-text [text-transform:inherit]">
                                        <$Lang keyName={$string("footer.info")} />
                                    </h3>
                                    <address>
                                        <$Nl2br text={$pointer("settings.address")} />
                                    </address>
                                    <$If
                                        test={$pointer("settings.phone_number")}
                                        $then={() => (
                                            <strong>
                                                <$Lang keyName={$string("footer.call_us")} phone_number={$pointer("settings.phone_number")} />
                                            </strong>
                                        )}
                                    />
                                </article>
                            )}
                        />
                    </section>
                    <div className="footer-payment medium:float-right">
                        <PaymentIcons />
                    </div>
                    <$If
                        test={theme.show_powered_by}
                        $then={() => (
                            <div className="footer-copyright text-center small:text-left [&_a]:text-text-secondary [&_a]:no-underline [&_a:hover]:text-(--sv-color-textSecondary-hover)">
                                <p className="powered-by m-0 text-text-secondary text-tiny">
                                    <$Lang keyName={$string("footer.powered_by")} />{" "}
                                    <a href="https://www.bigcommerce.com?utm_source=merchant&amp;utm_medium=poweredbyBC" rel="nofollow">
                                        BigCommerce
                                    </a>
                                </p>
                            </div>
                        )}
                    />
                    <$If
                        test={theme.show_copyright_footer}
                        $then={() => (
                            <div className="footer-copyright text-center small:text-left [&_a]:text-text-secondary [&_a]:no-underline [&_a:hover]:text-(--sv-color-textSecondary-hover)">
                                <p className="powered-by m-0 text-text-secondary text-tiny">
                                    {$raw("&copy; ")}
                                    {$moment({format: $string("YYYY")})} {$pointer("settings.store_name")}{" "}
                                </p>
                            </div>
                        )}
                    />
                </Container>
                {region("ssl_site_seal--global")}
            </footer>
        </>
    );
};
