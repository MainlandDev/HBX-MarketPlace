"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import ResponsiveImg from "../common/responsive-img.tsx";
import {$cdn, $Each, $If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface Order {
    id: string;
    status: string;
    return_url: string;
    details_url: string;
    total_quantity: number;
    total: {formatted: string};
    date: string;
    last_update_date: string;
    image: unknown;
}

export default (_props: PartialProps) => (
    <>
        <h3 className="account-heading m-0 border-b border-container-border pb-base">
            <$Lang keyName={$string("account.orders.heading")} />
        </h3>

        <ul className="account-list ml-0 list-none">
            <$Each
                list={$pointer<Order[]>("orders")}
                $then={(order) => (
                    <li className="account-listItem relative border-b border-container-border py-single [&_img]:w-full [&_.account-product-image]:relative [&_.account-product-image]:inset-0 [&_.account-product-image]:m-auto">
                        <div className="account-product flow-root">
                            <div className="account-product-figure relative float-left m-0 mr-single-third flex w-[70px] flex-col items-center [&>img]:block after:block after:h-0 after:w-full after:pb-[100%] after:content-['']">
                                <$If
                                    test={$pointer("items.0.type")}
                                    operator={$string("===")}
                                    rvalue={$string("giftcertificate")}
                                    $then={() => <img alt="GiftCertificate" title="GiftCertificate" src={$cdn($pointer("../theme_settings.default_image_gift_certificate"))} />}
                                    $else={() =>
                                        <ResponsiveImg image={order.image} class={$string("account-product-image")} fallback_size={$pointer("../theme_settings.productthumb_size")} lazyload={$pointer("../theme_settings.lazyload_mode")} default_image={$pointer("../theme_settings.default_image_product")} />
                                    }
                                />
                            </div>
                            <div className="account-product-body relative overflow-hidden pb-double-third small:pb-0 [&_.definitionList]:mb-0 [&_.definitionList]:text-smaller">
                                <div className="account-orderStatus absolute bottom-0 left-0 small:float-right small:text-right small:[position:inherit]">
                                    <h6 className="account-orderStatus-label m-0 mb-quarter inline-block bg-(--sv-setting-label-backgroundColor) px-third py-eighth text-tiny leading-(--sv-lineHeight-smallest) text-(--sv-setting-label-color)">{order.status}</h6>
                                    <$If
                                        test={$pointer("../settings.returns_enabled")}
                                        $then={() => (
                                            <$If
                                                test={order.return_url}
                                                $then={() => (
                                                    <a className="account-orderStatus-action ml-half inline-block align-top text-right text-tiny tracking-(--sv-letterSpacing-large) text-text-secondary italic underline hover:text-(--sv-setting-color-textSecondary--hover) small:ml-0 small:[display:block]" href={order.return_url}>
                                                        <$Lang keyName={$string("account.orders.return_items")} />
                                                    </a>
                                                )}
                                            />
                                        )}
                                    />
                                </div>

                                <h5 className="account-product-title m-0 mb-eighth [text-transform:inherit] [&>a]:no-underline [&+.definitionList]:mt-half">
                                    <a href={order.details_url}>
                                        <$Lang keyName={$string("account.orders.list.order_number")} number={order.id} />
                                    </a>
                                </h5>
                                <p className="account-product-description [&+.definitionList]:mx-0 [&+.definitionList]:-mt-[calc(var(--sv-spacing-base)+var(--sv-spacing-quarter))] [&+.definitionList]:mb-single">
                                    <$Lang
                                        keyName={$string("account.orders.list.product_details")}
                                        num_products={order.total_quantity}
                                        cost={order.total.formatted}
                                    />
                                </p>

                                <div className="account-product-details -mx-gutter-half flow-root w-auto max-w-none">
                                    <div className="account-product-detail float-left w-full px-gutter-half small:w-1/3 large:w-1/4 [.account-product-detail+&]:mt-base small:[.account-product-detail+&]:mt-0">
                                        <h6 className="account-product-detail-heading m-0 mb-quarter font-(family-name:--sv-fontFamily-sans) text-tiny text-text-secondary">
                                            <$Lang keyName={$string("account.orders.order_placed")} />
                                        </h6>
                                        <span>{order.date}</span>
                                    </div>
                                    <div className="account-product-detail float-left w-full px-gutter-half small:w-1/3 large:w-1/4 [.account-product-detail+&]:mt-base small:[.account-product-detail+&]:mt-0">
                                        <h6 className="account-product-detail-heading m-0 mb-quarter font-(family-name:--sv-fontFamily-sans) text-tiny text-text-secondary">
                                            <$Lang keyName={$string("account.orders.last_update")} />
                                        </h6>
                                        <span>{order.last_update_date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                )}
            />
        </ul>
    </>
);
