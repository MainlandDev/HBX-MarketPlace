"use server";
import ProductsCarousel from "../listing/carousel.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $number, $pointer, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";
import {Tabs, TabsContents} from "../../../../server/componentParts.tsx";

export default (_props: PartialProps) => {
    const relatedProducts = $pointer("product.related_products");
    const similarByViews = $pointer("product.similar_by_views");
    return (
        <>
            <Tabs data-tab={""} role="tablist" className="mt-base mb-0 [border-bottom:0]">
                <$If
                    test={relatedProducts}
                    $then={() => (
                        <li className="tab is-active float-none mr-base medium:float-left" role="presentation">
                            <a className="tab-title [display:block] px-0 py-[6px] text-left text-[25px] font-normal text-ink [text-decoration:none] [li.is-active_&]:[box-shadow:inset_0_-2px_0_currentColor]" href="#tab-related" role="tab" tabIndex={0} aria-selected="true" dangerouslyInlineAttributes={{attributes: `controls="tab-related"`}}>
                                <$Lang keyName={$string("products.related_products")} />
                            </a>
                        </li>
                    )}
                />
                <$If
                    test={similarByViews}
                    $then={() => (
                        <li className={`tab float-none mr-base medium:float-left${$Unless({test: relatedProducts, $then: () => " is-active"})}`} role="presentation">
                            <a
                                className="tab-title [display:block] px-0 py-[6px] text-left text-[25px] font-normal text-ink [text-decoration:none] [li.is-active_&]:[box-shadow:inset_0_-2px_0_currentColor]"
                                href="#tab-similar"
                                role="tab"
                                tabIndex={0}
                                dangerouslyInlineAttributes={{
                                    attributes: `aria-selected="${$If({test: relatedProducts, $then: () => "false", $else: () => "true"})}" controls="tab-similar"`,
                                }}
                            >
                                <$Lang keyName={$string("products.similar_by_views")} />
                            </a>
                        </li>
                    )}
                />
            </Tabs>

            <TabsContents>
                <$If
                    test={relatedProducts}
                    $then={() => (
                        <div role="tabpanel" aria-hidden="false" className="tab-content has-jsContent is-active [display:block] h-0 overflow-hidden p-0 [visibility:hidden] is-active:h-auto is-active:overflow-visible is-active:[padding:var(--sv-tabs-content-padding)] is-active:[visibility:visible]" id="tab-related">
                            <ProductsCarousel products={$pointer("product.related_products")} columns={$number(6)} list={$string("Related Products")} />
                        </div>
                    )}
                />

                <$If
                    test={similarByViews}
                    $then={() => (
                        <div
                            role="tabpanel"
                            className={`tab-content has-jsContent [display:block] h-0 overflow-hidden p-0 [visibility:hidden] is-active:h-auto is-active:overflow-visible is-active:[padding:var(--sv-tabs-content-padding)] is-active:[visibility:visible]${$Unless({test: relatedProducts, $then: () => " is-active"})}`}
                            id="tab-similar"
                            aria-hidden={$If({test: relatedProducts, $then: () => "true", $else: () => "false"})}
                        >
                            <ProductsCarousel products={$pointer("product.similar_by_views")} columns={$number(6)} list={$string("Customers Also Viewed")} />
                        </div>
                    )}
                />
            </TabsContents>
        </>
    );
};
