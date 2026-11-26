import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import CategorySidebar from "../components/category/sidebar.tsx";
import CategoryProductListing from "../components/category/product-listing.tsx";
import Breadcrumbs from "../components/common/breadcrumbs.tsx";
import ResponsiveImg from "../components/common/responsive-img.tsx";
import {FormField, FormInput, FormLabel} from "../../server/formParts.tsx";
import {
    $frontmatter,
    $Each,
    $If,
    $Inject,
    $Lang,
    $lang,
    $Page,
    $pointer,
    $region,
    $string,
    $unescaped,
    $Unless,
} from "@mainlanddev/hbx-bigcommerce";

const {setting} = $frontmatter;

export const frontmatter = $frontmatter.category({category: {products: {limit: setting("categorypage_products_per_page")}}});

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default () => {
    const settings = $pointer<ThemeSettingsObject>("theme_settings");
    const sidebar = () => (
        <aside className="page-sidebar relative float-left w-full px-gutter-half medium:w-1/5" id="faceted-search-container">
            <CategorySidebar />
        </aside>
    );
    return (
        <>
            <$Inject keyName={$string("categoryProductsPerPage")} value={settings.categorypage_products_per_page} />
            <$Page
                blocks={{
                    head: () => (
                        <>
                            <$If
                                test={$pointer("pagination.category.previous")}
                                $then={() => (
                                    <link rel="prev" href={$unescaped($pointer<string>("pagination.category.previous"))} />
                                )}
                            />
                            <$If
                                test={$pointer("pagination.category.next")}
                                $then={() => (
                                    <link rel="next" href={$unescaped($pointer<string>("pagination.category.next"))} />
                                )}
                            />
                        </>
                    ),
                    page: () => (
                        <>
                            <$If
                                test={$pointer("category.image")}
                                $then={() =>
                                    <ResponsiveImg image={$pointer("category.image")} fallback_size={settings.zoom_size} lazyload={settings.lazyload_mode} class={$string("category-header-image w-full")} />
                                }
                            />
                            <div className="page -mx-gutter-half w-auto max-w-none flow-root">
                                <$If
                                    test={$pointer("category.faceted_search_enabled")}
                                    $then={sidebar}
                                    $elseThen={[
                                        {test: settings.shop_by_price_visibility, $then: sidebar},
                                    ]}
                                />
                                <main className="page-content float-left w-full px-gutter-half medium:[.page-sidebar+&]:w-4/5">
                                    <div className="[&_.breadcrumbs]:text-left [&_.breadcrumbs]:mb-half">
                                        <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                                    </div>
                                    <$Unless
                                        test={settings.hide_category_page_heading}
                                        $then={() => (
                                            <>
                                                <h1 className="page-heading mx-0 mt-0 mb-single text-left text-[1.8rem] font-medium">{$pointer("category.name")}</h1>
                                                {region("category_below_header")}
                                            </>
                                        )}
                                    />
                                    {$unescaped($pointer("category.description"))}
                                    <$If
                                        test={$pointer("category.subcategories")}
                                        $then={() => (
                                            <nav aria-label="Subcategories" className="mb-single">
                                                <ul className="m-0 flex list-none gap-half overflow-x-auto px-0 pb-half pt-half">
                                                    <$Each
                                                        list={$pointer<{url: string; name: string}[]>("category.subcategories")}
                                                        $then={(subcategory) => (
                                                            <li className="m-0 shrink-0">
                                                                <a className="[display:block] rounded-card bg-white px-double py-single text-center text-[13px] font-bold text-ink no-underline shadow-[0_3px_5px_var(--color-ink-border)] hover:text-brand" href={subcategory.url}>
                                                                    {subcategory.name}
                                                                </a>
                                                            </li>
                                                        )}
                                                    />
                                                </ul>
                                            </nav>
                                        )}
                                    />
                                    <form className="categoryPage-searchInCategory-form mb-single" method="get" role="search" action={$pointer("urls.search")}>
                                        <fieldset className="form-fieldset m-0 border-0 p-0">
                                            <input type="hidden" name="category[]" value={$pointer("category.id")} />
                                            <input type="hidden" name="searchsubs" value="ON" />
                                            <FormField>
                                                <FormLabel className="sr-only" htmlFor="category-filter-q">
                                                    <$Lang keyName={$string("search.actionbar.input_label")} />
                                                </FormLabel>
                                                <FormInput
                                                    id="category-filter-q"
                                                    name="search_query_adv"
                                                    type="text"
                                                    placeholder={$lang($string("search.actionbar.input_placeholder"))}
                                                    data-search-in-category=""
                                                    className="w-full"
                                                />
                                            </FormField>
                                        </fieldset>
                                    </form>
                                    <div id="product-listing-container">
                                        <CategoryProductListing />
                                    </div>
                                </main>
                                <div className="page-region float-right w-full px-gutter-half medium:w-4/5">{region("category_below_content")}</div>
                            </div>
                        </>
                    ),
                }}
                layout="layout/base"
            />
        </>
    );
};
