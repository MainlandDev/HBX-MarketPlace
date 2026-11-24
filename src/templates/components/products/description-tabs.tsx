"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import ProductsCustomFields from "./custom-fields.tsx";
import ProductsReviews from "./reviews.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$All, $dashcase, $If, $Lang, $lowercase, $pointer, $sanitize, $string, $unescaped, $Unless} from "@mainlanddev/hbx-bigcommerce";
import {Tabs, TabsContents} from "../../../server/componentParts.tsx";

export default (_props: PartialProps) => {
    const theme = $pointer<ThemeSettingsObject>("theme_settings");
    const product = $pointer<{description: string; warranty: string; reviews: {total: number}}>("product");
    const customFieldsTab = $pointer<string>("theme_settings.pdp-custom-fields-tab-label");
    // `theme[...]` is typed string | number | boolean, which `$sanitize` refuses; the same setting as a string prints the same path.
    const customFieldsTabId = $dashcase($lowercase($sanitize($pointer<string>("theme_settings.pdp-custom-fields-tab-label"))));
    return (
        <>
            <Tabs data-tab={""}>
                <$If
                    test={product.description}
                    $then={() => (
                        <li className="tab is-active [border-top:var(--sv-tab-active-border)] float-none medium:border-t-(color:--sv-tab-title-border-color) medium:float-left is-active:border-l-(color:--sv-tab-title-border-color) is-active:border-r-(color:--sv-tab-title-border-color) small:is-active:mb-(--sv-tab-title-border-bottom-offset) medium:is-active:[border-width:1px] medium:is-active:[border-style:solid] medium:is-active:[border-color:var(--sv-tab-active-border-color)_var(--sv-tab-active-border-color)_var(--sv-tab-title-border-color)_var(--sv-tab-active-border-color)]">
                            <a className="tab-title py-[calc(var(--sv-spacing-half)+var(--sv-spacing-quarter))] px-0 text-center [text-decoration:var(--sv-tab-title-text-decoration)] small:text-left medium:px-single medium:py-half large:px-[18px] large:py-[11px]" href="#tab-description">
                                <$Lang keyName={$string("products.description")} />
                            </a>
                        </li>
                    )}
                />
                <$If
                    test={product.warranty}
                    $then={() => (
                        <li className={`tab [border-top:var(--sv-tab-active-border)] float-none medium:border-t-(color:--sv-tab-title-border-color) medium:float-left is-active:border-l-(color:--sv-tab-title-border-color) is-active:border-r-(color:--sv-tab-title-border-color) small:is-active:mb-(--sv-tab-title-border-bottom-offset) medium:is-active:[border-width:1px] medium:is-active:[border-style:solid] medium:is-active:[border-color:var(--sv-tab-active-border-color)_var(--sv-tab-active-border-color)_var(--sv-tab-title-border-color)_var(--sv-tab-active-border-color)] ${$Unless({test: product.description, $then: () => "is-active"})}`}>
                            <a className="tab-title py-[calc(var(--sv-spacing-half)+var(--sv-spacing-quarter))] px-0 text-center [text-decoration:var(--sv-tab-title-text-decoration)] small:text-left medium:px-single medium:py-half large:px-[18px] large:py-[11px]" href="#tab-warranty">
                                <$Lang keyName={$string("products.warranty")} />
                            </a>
                        </li>
                    )}
                />
                <$All
                    values={[$pointer("product.custom_fields"), theme.show_custom_fields_tabs]}
                    $then={() => (
                        <li className="tab [border-top:var(--sv-tab-active-border)] float-none medium:border-t-(color:--sv-tab-title-border-color) medium:float-left is-active:border-l-(color:--sv-tab-title-border-color) is-active:border-r-(color:--sv-tab-title-border-color) small:is-active:mb-(--sv-tab-title-border-bottom-offset) medium:is-active:[border-width:1px] medium:is-active:[border-style:solid] medium:is-active:[border-color:var(--sv-tab-active-border-color)_var(--sv-tab-active-border-color)_var(--sv-tab-title-border-color)_var(--sv-tab-active-border-color)]">
                            <a className="tab-title py-[calc(var(--sv-spacing-half)+var(--sv-spacing-quarter))] px-0 text-center [text-decoration:var(--sv-tab-title-text-decoration)] small:text-left medium:px-single medium:py-half large:px-[18px] large:py-[11px]" href={`#tab-${customFieldsTabId}`}>
                                {$sanitize(customFieldsTab)}
                            </a>
                        </li>
                    )}
                />
                <$All
                    values={[$pointer("settings.show_product_reviews"), theme.show_product_reviews, product.reviews.total]}
                    $then={() => (
                        <li className="tab [border-top:var(--sv-tab-active-border)] float-none medium:border-t-(color:--sv-tab-title-border-color) medium:float-left is-active:border-l-(color:--sv-tab-title-border-color) is-active:border-r-(color:--sv-tab-title-border-color) small:is-active:mb-(--sv-tab-title-border-bottom-offset) medium:is-active:[border-width:1px] medium:is-active:[border-style:solid] medium:is-active:[border-color:var(--sv-tab-active-border-color)_var(--sv-tab-active-border-color)_var(--sv-tab-title-border-color)_var(--sv-tab-active-border-color)]">
                            <a className="tab-title productView-reviewTabLink py-[calc(var(--sv-spacing-half)+var(--sv-spacing-quarter))] px-0 text-center [text-decoration:var(--sv-tab-title-text-decoration)] small:text-left medium:px-single medium:py-half large:px-[18px] large:py-[11px]" href="#tab-reviews">
                                <$Lang keyName={$string("products.reviews.header")} total={product.reviews.total} />
                            </a>
                        </li>
                    )}
                />
            </Tabs>
            <TabsContents>
                <$If
                    test={product.description}
                    $then={() => (
                        <div className="tab-content is-active" id="tab-description">
                            {$unescaped(product.description)}
                        </div>
                    )}
                />
                <$If
                    test={product.warranty}
                    $then={() => (
                        <div className={`tab-content ${$Unless({test: product.description, $then: () => "is-active"})}`} id="tab-warranty">
                            {$unescaped(product.warranty)}
                        </div>
                    )}
                />
                <$All
                    values={[$pointer("product.custom_fields"), theme.show_custom_fields_tabs]}
                    $then={() => (
                        <div className="tab-content" id={`tab-${customFieldsTabId}`}>
                            <dl className="productView-info"><ProductsCustomFields /></dl>
                        </div>
                    )}
                />
                <$All
                    values={[$pointer("settings.show_product_reviews"), theme.show_product_reviews]}
                    $then={() => (
                        <div className="tab-content" id="tab-reviews">
                            <ProductsReviews reviews={$pointer("product.reviews")} product={$pointer("product")} urls={$pointer("urls")} />
                        </div>
                    )}
                />
            </TabsContents>
        </>
    );
};
