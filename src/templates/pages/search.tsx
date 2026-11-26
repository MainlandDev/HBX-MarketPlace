import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import SearchHeading from "../components/search/heading.tsx";
import SearchProductCount from "../components/search/product-count.tsx";
import SearchContentCount from "../components/search/content-count.tsx";
import SearchAdvancedSearch from "../components/search/advanced-search.tsx";
import FacetedSearchIndex from "../components/faceted-search/index.tsx";
import SearchContentListing from "../components/search/content-listing.tsx";
import SearchProductListing from "../components/search/product-listing.tsx";
import Breadcrumbs from "../components/common/navigation/breadcrumbs.tsx";
import {Panel, PanelBody} from "../../server/componentParts.tsx";
import {
    $Each,
    $frontmatter,
    $If,
    $Inject,
    $Lang,
    $lang,
    $number,
    $Page,
    $pointer,
    $raw,
    $region,
    $sanitize,
    $string,
    $stylesheet,
    $this,
    $unescaped,
    $Unless,
} from "@mainlanddev/hbx-bigcommerce";

const {setting} = $frontmatter;

export const frontmatter = $frontmatter.search({product_results: {limit: setting("searchpage_products_per_page")}});

interface Crumb {
    url: string;
    name: string;
}

interface Brand {
    url: string;
    name: string;
}

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default () => {
    const settings = $pointer<ThemeSettingsObject>("theme_settings");
    return (
        <>
            <$Inject keyName={$string("categoryTree")} value={$pointer("forms.search.category_options")} />
            {" "}
            <$Inject keyName={$string("searchProductsPerPage")} value={settings.searchpage_products_per_page} />
            {" "}
            <$Inject
                keyName={$string("searchResultsCount")}
                value={$lang($string("search.results.count"), {
                    count: $pointer<number>("result_count"),
                    search_query: $sanitize($pointer<string>("forms.search.query")),
                })}
            />
            <$Page
                blocks={{
                    head: () => (
                        <>
                            <$If
                                test={$pointer("pagination.product_results.previous")}
                                $then={() => <link rel="prev" href={$pointer("pagination.product_results.previous")} />}
                            />
                            <$If
                                test={$pointer("pagination.product_results.next")}
                                $then={() => <link rel="next" href={$pointer("pagination.product_results.next")} />}
                            />
                        </>
                    ),
                    page: () => (
                        <>
                            {$unescaped($stylesheet($string("/assets/scss/vendor/jstree/style.css")))}
                            <section className="page -mx-gutter-half w-auto max-w-none flow-root">
                                <$If
                                    test={$pointer("product_results.faceted_search_enabled")}
                                    $then={() => (
                                        <$If
                                            test={$pointer("forms.search.section")}
                                            operator={$string("!=")}
                                            rvalue={$string("product")}
                                            $then={() => (
                                        <aside className="page-sidebar sr-only relative float-left w-full px-gutter-half medium:w-1/5" id="faceted-search-container">
                                            <div className="rounded-card bg-white p-single text-ink"><FacetedSearchIndex $positionalHash={$pointer("product_results")} /></div>
                                        </aside>
                                            )}
                                            $else={() => (
                                        <aside className="page-sidebar relative float-left w-full px-gutter-half medium:w-1/5" id="faceted-search-container">
                                            <div className="rounded-card bg-white p-single text-ink"><FacetedSearchIndex $positionalHash={$pointer("product_results")} /></div>
                                        </aside>
                                            )}
                                        />
                                    )}
                                />
                                <main className="page-content float-left w-full px-gutter-half medium:[.page-sidebar+&]:w-4/5">
                            <div className="[&_.breadcrumbs]:text-left"><Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} /></div>
                            <div className="nav text-left [&_.navBar-section]:text-left [&_.navBar-item]:float-left">
                                <$If
                                    test={$pointer("forms.search.query")}
                                    $then={() => (
                                        <div id="search-results-heading"><SearchHeading /></div>
                                    )}
                                />
                                <nav className="navBar navBar--sub [:where(&)]:[display:flow-root] search-nav relative mb-[calc(var(--sv-spacing-single)*3)] text-center">
                                    <span id="search-tabs-widget-description" className="aria-description--hidden absolute top-0 left-0 -ml-[10000px] size-px overflow-hidden">
                                        <$Lang keyName={$string("search.tabs_accesibility_hint")} />
                                    </span>
                                    <ul role="tablist" className="navBar-section [&_[aria-selected=true]]:font-bold [&_[aria-selected=true]]:text-ink-brand [&_[aria-selected=true]]:underline [:where(&)]:list-none [:where(&)]:m-0 [:where(&)]:p-0 [:where(&)]:[display:flow-root] [:where(&>li)]:m-0 [:where(&>li)]:p-0 [:where(&_.navBar-item)]:[display:block] [:where(&_.navBar-action)]:[display:block] [:where([class~=navBar-section]+&)]:ml-(--sv-navBar-section-margin) account-navigation float-none [&_.navBar-item]:float-none [&_.navBar-item]:mx-half [&_.navBar-item]:my-0 medium:[&_.navBar-item]:[display:inline-block] medium:[&_.navBar-item.is-active]:border-b medium:[&_.navBar-item.is-active]:border-b-(--sv-setting-color-textBase) medium:[&_.navBar-item.navBar-item--separate]:m-0 medium:[&_.navBar-item.navBar-item--separate]:border-l medium:[&_.navBar-item.navBar-item--separate]:border-l-(--sv-setting-color-textSecondary) medium:[&_.navBar-item.navBar-item--separate]:pl-half [&_.navBar-item.is-active>.navBar-action]:text-grey-dark" data-search-page-tabs={""}>
                                        <li role="presentation" className="navBar-item">
                                            <a
                                                aria-describedby="search-tabs-widget-description"
                                                role="tab"
                                                aria-controls="product-listing-container"
                                                id="search-results-product-count"
                                                className="navBar-action p-0 text-text-secondary text-(length:--sv-fontSize-base) no-underline hover:text-(--sv-setting-color-textSecondary--hover)"
                                                href={$pointer("forms.search.product_url")}
                                                data-product-results-toggle={""}
                                            >
                                                {" "}<SearchProductCount />{" "}
                                            </a>
                                        </li>
                                        <li role="presentation" className="navBar-item">
                                            <a
                                                aria-describedby="search-tabs-widget-description"
                                                role="tab"
                                                aria-controls="search-results-content"
                                                id="search-results-content-count"
                                                className="navBar-action p-0 text-text-secondary text-(length:--sv-fontSize-base) no-underline hover:text-(--sv-setting-color-textSecondary--hover)"
                                                href={$pointer("forms.search.content_url")}
                                                data-content-results-toggle={""}
                                            >
                                                {" "}<SearchContentCount />{" "}
                                            </a>
                                        </li>
                                        <$Unless
                                            test={$pointer("product_results.faceted_search_enabled")}
                                            $then={() => (
                                                <li className="navBar-item navBar-item--separate">
                                                    <a
                                                        className="navBar-action toggleLink p-0 text-(length:--sv-fontSize-base) no-underline text-(--sv-setting-color-textSecondary) hover:text-(--sv-setting-color-textSecondary--hover)"
                                                        data-collapsible="advanced-search-content"
                                                        href="#"
                                                        aria-controls="advanced-search-content"
                                                        aria-expanded="false"
                                                    >
                                                        <span className="toggleLink-text toggleLink-text--on text-smallest font-normal [display:none] [[class~=toggleLink][class~=is-open]_&]:[display:inline-block]">
                                                            <$Lang keyName={$string("forms.search.hide")} />
                                                        </span>
                                                        <span className="toggleLink-text toggleLink-text--off text-smallest font-normal [display:inline-block] [[class~=toggleLink][class~=is-open]_&]:[display:none]">
                                                            <$Lang keyName={$string("forms.search.show")} />
                                                        </span>
                                                    </a>
                                                </li>
                                            )}
                                        />
                                    </ul>
                                </nav>
                                <$Unless
                                    test={$pointer("product_results.faceted_search_enabled")}
                                    $then={() => <SearchAdvancedSearch />}
                                />
                            </div>
                                    <$If
                                        test={$pointer("forms.search.has_suggestions")}
                                        $then={() => (
                                            <Panel className="panel--large">
                                                <PanelBody className="mb-single-third bg-transparent p-0 [&_a]:text-ink-brand">
                                                    <$If
                                                        test={$pointer("forms.search.suggested_query")}
                                                        $then={() => (
                                                            <>
                                                                <div className="search-suggestion mb-single-third last:mb-0 [&>:last-child]:mb-0">
                                                                    <$Lang keyName={$string("forms.search.did_you_mean")} />{" "}
                                                                    <strong>{$pointer("forms.search.suggested_query.query")}</strong>{" "}
                                                                    <a href={$pointer("forms.search.suggested_query.url")} className="search-refine ml-single">
                                                                        <$Lang keyName={$string("forms.search.refine")} />
                                                                    </a>
                                                                </div>
                                                                <$If
                                                                    test={$pointer("result_count")}
                                                                    operator={$string("===")}
                                                                    rvalue={$number(0)}
                                                                    $then={() => (
                                                                        <div className="search-suggestion mb-single-third last:mb-0 [&>:last-child]:mb-0">
                                                                            <p>
                                                                                <$Lang keyName={$string("forms.search.your_search_for")} />{" "}
                                                                                {$raw('"')}
                                                                                <strong>{$unescaped($sanitize($pointer<string>("forms.search.query")))}</strong>
                                                                                {$raw('"')}{" "}
                                                                                <$Lang keyName={$string("forms.search.no_match")} />
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                />
                                                            </>
                                                        )}
                                                    />
                                                    <$If
                                                        test={$pointer("category_results.length")}
                                                        $then={() => (
                                                            <div className="search-suggestion [display:none] mb-single-third last:mb-0 [&>:last-child]:mb-0">
                                                                <h5 className="suggestion-title mt-0 [text-transform:inherit]">
                                                                    <$Lang keyName={$string("forms.search.categories")} />
                                                                </h5>
                                                                <ul className="category-suggestion-list -mx-gutter-half w-auto max-w-none flow-root list-none">
                                                                    <$Each
                                                                        list={$pointer<Crumb[][]>("category_results")}
                                                                        $then={() => (
                                                                            <li className="category-suggestion float-left w-1/3 px-gutter-half text-smaller">
                                                                                <$Each
                                                                                    list={$this<Crumb[]>()}
                                                                                    $then={(crumb, loop) => (
                                                                                        <>
                                                                                            <a href={crumb.url}>{crumb.name}</a>
                                                                                            <$Unless
                                                                                                test={loop["@last"]}
                                                                                                $then={() => $raw(" > ")}
                                                                                            />
                                                                                        </>
                                                                                    )}
                                                                                />
                                                                            </li>
                                                                        )}
                                                                    />
                                                                </ul>
                                                            </div>
                                                        )}
                                                    />
                                                    <$If
                                                        test={$pointer("brand_results.length")}
                                                        $then={() => (
                                                            <div className="search-suggestion mb-single-third last:mb-0 [&>:last-child]:mb-0">
                                                                <h5 className="suggestion-title mt-0 [text-transform:inherit]">
                                                                    <$Lang keyName={$string("forms.search.brand")} />
                                                                </h5>
                                                                <$Each
                                                                    list={$pointer<Brand[]>("brand_results")}
                                                                    $then={(brand, loop) => (
                                                                        <>
                                                                            <a href={brand.url}>{brand.name}</a>
                                                                            {" "}
                                                                            <$Unless test={loop["@last"]} $then={() => ", "} />
                                                                        </>
                                                                    )}
                                                                />
                                                            </div>
                                                        )}
                                                    />
                                                    <$If
                                                        test={$pointer("result_count")}
                                                        operator={$string("===")}
                                                        rvalue={$number(0)}
                                                        $then={() => (
                                                            <div className="search-suggestion mb-single-third last:mb-0 [&>:last-child]:mb-0">
                                                                <h5 className="suggestion-title mt-0 [text-transform:inherit]">
                                                                    <$Lang keyName={$string("forms.search.suggestions.title")} />
                                                                </h5>
                                                                <ul>
                                                                    <li>
                                                                        <$Lang keyName={$string("forms.search.suggestions.line1")} />
                                                                    </li>
                                                                    <li>
                                                                        <$Lang keyName={$string("forms.search.suggestions.line2")} />
                                                                    </li>
                                                                    <li>
                                                                        <$Lang keyName={$string("forms.search.suggestions.line3")} />
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        )}
                                                    />
                                                </PanelBody>
                                            </Panel>
                                        )}
                                    />
                                    <div
                                        role="tabpanel"
                                        id="search-results-content"
                                        aria-labelledby="search-results-content-count"
                                        dangerouslyInlineAttributes={{
                                            attributes: `${$If({test: $pointer("forms.search.section"), operator: $string("!="), rvalue: $string("content"), $then: () => $raw('class="[display:none]"')})}`,
                                        }}
                                    >
                                        <SearchContentListing />
                                    </div>
                                    <div
                                        role="tabpanel"
                                        id="product-listing-container"
                                        aria-labelledby="search-results-product-count"
                                        dangerouslyInlineAttributes={{
                                            attributes: `${$If({test: $pointer("forms.search.section"), operator: $string("!="), rvalue: $string("product"), $then: () => $raw('class="[display:none]"')})}`,
                                        }}
                                    >
                                        <SearchProductListing />
                                    </div>
                                    {region("search_below_content")}
                                </main>
                            </section>
                        </>
                    ),
                }}
                layout="layout/base"
            />
        </>
    );
};
