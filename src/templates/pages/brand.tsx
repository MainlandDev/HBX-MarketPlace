import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import BrandSidebar from "../components/brand/sidebar.tsx";
import BrandProductListing from "../components/brand/product-listing.tsx";
import Breadcrumbs from "../components/common/breadcrumbs.tsx";
import ResponsiveImg from "../components/common/responsive-img.tsx";
import {
    $frontmatter,
    $If,
    $Inject,
    $Lang,
    $Page,
    $pointer,
    $region,
    $string,
    $unescaped,
} from "@mainlanddev/hbx-bigcommerce";

const {setting} = $frontmatter;

export const frontmatter = $frontmatter.brand({brand: {products: {limit: setting("brandpage_products_per_page")}}});

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default () => {
    const settings = $pointer<ThemeSettingsObject>("theme_settings");
    return (
        <>
            <$Inject keyName={$string("brandProductsPerPage")} value={settings.brandpage_products_per_page} />
            <$Page
                blocks={{
                    head: () => (
                        <>
                            <$If
                                test={$pointer("pagination.brand.previous")}
                                $then={() => (
                                    <link rel="prev" href={$unescaped($pointer<string>("pagination.brand.previous"))} />
                                )}
                            />
                            <$If
                                test={$pointer("pagination.brand.next")}
                                $then={() => (
                                    <link rel="next" href={$unescaped($pointer<string>("pagination.brand.next"))} />
                                )}
                            />
                        </>
                    ),
                    page: () => (
                        <>
                            <div className="page -mx-gutter-half w-auto max-w-none flow-root">
                                <aside className="page-sidebar relative float-left w-full px-gutter-half medium:w-1/5" id="faceted-search-container">
                                    <BrandSidebar />
                                </aside>
                                <main className="page-content float-left w-full px-gutter-half medium:[.page-sidebar+&]:w-4/5">
                                    <div className="[&_.breadcrumbs]:text-left [&_.breadcrumbs]:mb-half">
                                        <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                                    </div>
                                    <$If
                                        test={$pointer("brand.image")}
                                        $then={() => (
                                            <div className="brand-image-container mb-single max-w-[200px] [&_img]:block [&_img]:h-auto [&_img]:w-full">
                                                <ResponsiveImg image={$pointer("brand.image")} fallback_size={settings.thumb_size} lazyload={$string("disabled")} />
                                            </div>
                                        )}
                                    />
                                    <h1 className="page-heading mx-0 mt-0 mb-single text-left text-[1.8rem] font-medium">{$pointer("brand.name")}</h1>
                                    {region("brand_below_header")}
                                    <div id="product-listing-container">
                                    <$If
                                        test={$pointer("brand.search_error")}
                                        $then={() => (
                                            <p>
                                                <$Lang keyName={$string("search.errorMessage")} />
                                            </p>
                                        )}
                                        $else={() => (
                                            <>
                                                <$If
                                                    test={$pointer("brand.products")}
                                                    $then={() => <BrandProductListing />}
                                                    $else={() => (
                                                        <p>
                                                            <$Lang keyName={$string("brands.no_products")} />
                                                        </p>
                                                    )}
                                                />
                                                {region("brand_below_content")}
                                            </>
                                        )}
                                    />
                                    </div>
                                </main>
                            </div>
                        </>
                    ),
                }}
                layout="layout/base"
            />
        </>
    );
};
