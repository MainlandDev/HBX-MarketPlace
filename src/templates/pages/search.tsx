import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import SearchHeading from "../components/search/heading.tsx";
import SearchProductCount from "../components/search/product-count.tsx";
import SearchContentCount from "../components/search/content-count.tsx";
import SearchAdvancedSearch from "../components/search/advanced-search.tsx";
import FacetedSearchIndex from "../components/faceted-search/index.tsx";
import SearchContentListing from "../components/search/content-listing.tsx";
import SearchProductListing from "../components/search/product-listing.tsx";
import Breadcrumbs from "../components/common/breadcrumbs.tsx";
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
                            <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                            <section className="nav">
                                <$If
                                    test={$pointer("forms.search.query")}
                                    $then={() => (
                                        <div id="search-results-heading"><SearchHeading /></div>
                                    )}
                                />
                                <nav className="navBar navBar--sub search-nav relative">
                                    <span id="search-tabs-widget-description" className="aria-description--hidden">
                                        <$Lang keyName={$string("search.tabs_accesibility_hint")} />
                                    </span>
                                    <ul role="tablist" className="navBar-section account-navigation" data-search-page-tabs={""}>
                                        <li role="presentation" className="navBar-item">
                                            <a
                                                aria-describedby="search-tabs-widget-description"
                                                role="tab"
                                                aria-controls="product-listing-container"
                                                id="search-results-product-count"
                                                className="navBar-action"
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
                                                className="navBar-action"
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
                                                        className="navBar-action toggleLink text-(--sv-setting-color-textSecondary) hover:text-(--sv-setting-color-textSecondary--hover)"
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
                            </section>
                            <section className="page -mx-gutter-half w-auto max-w-none flow-root">
                                <$If
                                    test={$pointer("product_results.faceted_search_enabled")}
                                    $then={() => (
                                        <$If
                                            test={$pointer("forms.search.section")}
                                            operator={$string("!=")}
                                            rvalue={$string("product")}
                                            $then={() => (
                                        <aside className="page-sidebar u-hiddenVisually relative float-left w-full px-gutter-half medium:w-1/4" id="faceted-search-container">
                                            <FacetedSearchIndex $positionalHash={$pointer("product_results")} />
                                        </aside>
                                            )}
                                            $else={() => (
                                        <aside className="page-sidebar relative float-left w-full px-gutter-half medium:w-1/4" id="faceted-search-container">
                                            <FacetedSearchIndex $positionalHash={$pointer("product_results")} />
                                        </aside>
                                            )}
                                        />
                                    )}
                                />
                                <main className="page-content float-left w-full px-gutter-half medium:[.page-sidebar+&]:w-3/4">
                                    <$If
                                        test={$pointer("forms.search.has_suggestions")}
                                        $then={() => (
                                            <div className="panel panel--large">
                                                <div className="panel-body">
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
                                                            <div className="search-suggestion mb-single-third last:mb-0 [&>:last-child]:mb-0">
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
                                                </div>
                                            </div>
                                        )}
                                    />
                                    <div
                                        role="tabpanel"
                                        id="search-results-content"
                                        aria-labelledby="search-results-content-count"
                                        dangerouslyInlineAttributes={{
                                            attributes: `${$If({test: $pointer("forms.search.section"), operator: $string("!="), rvalue: $string("content"), $then: () => $raw('class="u-hidden"')})}`,
                                        }}
                                    >
                                        <SearchContentListing />
                                    </div>
                                    <div
                                        role="tabpanel"
                                        id="product-listing-container"
                                        aria-labelledby="search-results-product-count"
                                        dangerouslyInlineAttributes={{
                                            attributes: `${$If({test: $pointer("forms.search.section"), operator: $string("!="), rvalue: $string("product"), $then: () => $raw('class="u-hidden"')})}`,
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
