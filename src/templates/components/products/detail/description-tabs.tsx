"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import ProductsCustomFields from "./custom-fields.tsx";
import ProductsReviews from "./reviews.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$All, $dashcase, $If, $Lang, $lowercase, $pointer, $sanitize, $string, $unescaped, $Unless} from "@mainlanddev/hbx-bigcommerce";
import {Tabs, TabsContents} from "../../../../server/componentParts.tsx";

export default (_props: PartialProps) => {
    const theme = $pointer<ThemeSettingsObject>("theme_settings");
    const product = $pointer<{description: string; warranty: string; reviews: {total: number}}>("product");
    const customFieldsTab = $pointer<string>("theme_settings.pdp-custom-fields-tab-label");
    // `theme[...]` is typed string | number | boolean, which `$sanitize` refuses; the same setting as a string prints the same path.
    const customFieldsTabId = $dashcase($lowercase($sanitize($pointer<string>("theme_settings.pdp-custom-fields-tab-label"))));
    return (
        <>
            <Tabs data-tab={""} className="mb-base [border-bottom:0.8px_solid_#e5e5e5]">
                <$If
                    test={product.description}
                    $then={() => (
                        <li className="tab is-active float-none medium:float-left">
                            <a className="tab-title [display:block] px-[24px] py-[12px] text-center text-[15px] font-bold uppercase text-ink [text-decoration:none] [li.is-active_&]:text-brand [li.is-active_&]:[box-shadow:inset_0_-2px_0_currentColor]" href="#tab-description">
                                <$Lang keyName={$string("products.description")} />
                            </a>
                        </li>
                    )}
                />
                <$If
                    test={product.warranty}
                    $then={() => (
                        <li className={`tab float-none medium:float-left ${$Unless({test: product.description, $then: () => "is-active"})}`}>
                            <a className="tab-title [display:block] px-[24px] py-[12px] text-center text-[15px] font-bold uppercase text-ink [text-decoration:none] [li.is-active_&]:text-brand [li.is-active_&]:[box-shadow:inset_0_-2px_0_currentColor]" href="#tab-warranty">
                                <$Lang keyName={$string("products.warranty")} />
                            </a>
                        </li>
                    )}
                />
                <$All
                    values={[$pointer("product.custom_fields"), theme.show_custom_fields_tabs]}
                    $then={() => (
                        <li className="tab float-none medium:float-left">
                            <a className="tab-title [display:block] px-[24px] py-[12px] text-center text-[15px] font-bold uppercase text-ink [text-decoration:none] [li.is-active_&]:text-brand [li.is-active_&]:[box-shadow:inset_0_-2px_0_currentColor]" href={`#tab-${customFieldsTabId}`}>
                                {$sanitize(customFieldsTab)}
                            </a>
                        </li>
                    )}
                />
                <$All
                    values={[$pointer("settings.show_product_reviews"), theme.show_product_reviews, product.reviews.total]}
                    $then={() => (
                        <li className="tab float-none medium:float-left">
                            <a className="tab-title productView-reviewTabLink [display:block] px-[24px] py-[12px] text-center text-[15px] font-bold uppercase text-ink [text-decoration:none] [li.is-active_&]:text-brand [li.is-active_&]:[box-shadow:inset_0_-2px_0_currentColor]" href="#tab-reviews">
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
                        <div className="tab-content is-active font-normal [&_h2]:font-normal [&_h3]:font-normal [&_h3]:text-[22px] [&_h3]:text-[#444]" id="tab-description">
                            {$unescaped(product.description)}
                        </div>
                    )}
                />
                <$If
                    test={product.warranty}
                    $then={() => (
                        <div className={`tab-content font-normal ${$Unless({test: product.description, $then: () => "is-active"})}`} id="tab-warranty">
                            {$unescaped(product.warranty)}
                        </div>
                    )}
                />
                <$All
                    values={[$pointer("product.custom_fields"), theme.show_custom_fields_tabs]}
                    $then={() => (
                        <div className="tab-content font-normal" id={`tab-${customFieldsTabId}`}>
                            <dl className="productView-info"><ProductsCustomFields /></dl>
                        </div>
                    )}
                />
                <$All
                    values={[$pointer("settings.show_product_reviews"), theme.show_product_reviews]}
                    $then={() => (
                        <div className="tab-content font-normal" id="tab-reviews">
                            <ProductsReviews reviews={$pointer("product.reviews")} product={$pointer("product")} urls={$pointer("urls")} />
                        </div>
                    )}
                />
            </TabsContents>
        </>
    );
};
