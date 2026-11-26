"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import ProductsDetailRuntimeConfig from "./runtime-config.tsx";
import ProductsDetailGallery from "./gallery.tsx";
import ProductsDetailSummary from "./summary.tsx";
import ProductsDetailInfoList from "./info-list.tsx";
import ProductsDetailPurchaseForm from "./purchase-form.tsx";
import ProductsDescriptionTabs from "./description-tabs.tsx";
import ProductsDescription from "./description.tsx";
import ProductsDetailPreviewModal from "./preview-modal.tsx";
import AlertAlertError from "../../common/alert/alert-error.tsx";
import AlertAlertSuccess from "../../common/alert/alert-success.tsx";
import {$Each, $If, $lang, $pointer, $string, $unlessExpression, $Or} from "@mainlanddev/hbx-bigcommerce";
import type {Message, Product} from "../../../../server/productViewTypes.ts";

export default (_props: PartialProps) => {
    const theme = $pointer<ThemeSettingsObject>("theme_settings");
    const product = $pointer<Product>("product");
    return (
        <>
            <ProductsDetailRuntimeConfig />

            <div
                className="productView flex w-auto max-w-none flex-col justify-start mx-0 pt-base pb-base bg-white font-(family-name:--font-stack) text-ink rounded-[12px] shadow-[0_3px_5px_#ddd] medium:flow-root [[class~=modal]_&]:py-0"
                data-event-type="product"
                data-entity-id={product.id}
                data-name={product.title}
                dangerouslyInlineAttributes={{
                    attributes: `data-product-category="${$Each({list: $pointer<string[]>("product.category"), $then: (item, loop) => ` ${$If({test: loop["@last"], $then: () => `${item}`, $else: () => `${item}, `})} `})}" data-product-brand="${product.brand.name}" data-product-price="${$Or({values: [$pointer("customer"), $unlessExpression($pointer("settings.hide_price_from_guests"))], $then: () => ` ${$If({test: $pointer("product.price.with_tax"), $then: () => ` ${$pointer("product.price.with_tax.value")} `, $else: () => ` ${$pointer("product.price.without_tax.value")} `})} `, $else: () => ` ${$lang($string("common.login_for_pricing"))} `})}" data-product-variant="single-product-option"`,
                }}
            >
                <$Each
                    list={$pointer<Message[]>("product.reviews.messages")}
                    $then={(message) => (
                        <>
                            <$If test={message.error} $then={() => <AlertAlertError $positionalHash={message.error} />} />
                            <$If test={message.success} $then={() => <AlertAlertSuccess $positionalHash={message.success} />} />
                        </>
                    )}
                />

                <ProductsDetailGallery />

                <section className="productView-details product-data float-left w-full px-base pb-single-third order-[-1] medium:clear-right medium:float-right medium:w-6/12 [[class~=productView--quickView]_&]:relative">
                    <div className="productView-product flex flex-col medium:border-b medium:border-container-border medium:pb-[calc(var(--sv-spacing-single)+var(--sv-spacing-third))] [&>:last-child]:mb-0">
                        <ProductsDetailSummary />
                        <ProductsDetailInfoList />
                    </div>
                </section>

                <ProductsDetailPurchaseForm />

                <article className="productView-description relative z-[1] float-left w-full px-base">
                    <$If
                        test={theme.show_product_details_tabs}
                        $then={() => <ProductsDescriptionTabs />}
                        $else={() => <ProductsDescription />}
                    />
                </article>
            </div>

            <ProductsDetailPreviewModal />
        </>
    );
};
