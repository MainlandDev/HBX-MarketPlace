"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import ResponsiveImg from "../common/responsive-img.tsx";
import ProductOptions from "../common/commerce/product-options.tsx";
import {$Each, $If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface ReturnOption {
    name: string;
}

interface Return {
    id: string;
    status: string;
    quantity: number;
    date_requested: string;
    action: string;
    reason: string;
    comments: string;
    product: {
        image: unknown;
        url: string;
        name: string;
        options: ReturnOption[];
    };
}

export default (_props: PartialProps) => (
    <>
        <h3 className="account-heading m-0 border-b border-container-border pb-base">
            <$Lang keyName={$string("account.returns.heading")} />
        </h3>

        <ul className="account-list ml-0 list-none">
            <$Each
                list={$pointer<Return[]>("returns")}
                $then={(ret) => (
                    <li className="account-listItem relative border-b border-container-border py-single [&_img]:w-full [&_.account-product-image]:relative [&_.account-product-image]:inset-0 [&_.account-product-image]:m-auto">
                        <div className="account-product flow-root">
                            <div className="account-product-figure relative float-left m-0 mr-single-third flex w-[70px] flex-col items-center [&>img]:block after:block after:h-0 after:w-full after:pb-[100%] after:content-['']">
                                <ResponsiveImg image={ret.product.image} fallback_size={$pointer("../theme_settings.productthumb_size")} lazyload={$pointer("../theme_settings.lazyload_mode")} />
                            </div>
                            <div className="account-product-body relative overflow-hidden pb-double-third small:pb-0 [&_.definitionList]:mb-0 [&_.definitionList]:text-smaller">
                                <div className="account-orderStatus absolute bottom-0 left-0 small:float-right small:text-right small:[position:inherit]">
                                    <$If
                                        test={$pointer("status")}
                                        operator={$string("===")}
                                        rvalue={$string("ReturnStatusPending")}
                                        $then={() => (
                                            <h6 className="account-orderStatus-label m-0 mb-quarter inline-block bg-(--sv-setting-label-backgroundColor) px-third py-eighth text-tiny leading-(--sv-lineHeight-smallest) text-(--sv-setting-label-color)">
                                                <$Lang keyName={$string("account.returns.status.pending")} />
                                            </h6>
                                        )}
                                        $elseThen={[
                                            {
                                                test: $pointer("status"),
                                                operator: $string("==="),
                                                rvalue: $string("ReturnStatusReceived"),
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label m-0 mb-quarter inline-block bg-(--sv-setting-label-backgroundColor) px-third py-eighth text-tiny leading-(--sv-lineHeight-smallest) text-(--sv-setting-label-color)">
                                                        <$Lang keyName={$string("account.returns.status.received")} />
                                                    </h6>
                                                ),
                                            },
                                            {
                                                test: $pointer("status"),
                                                operator: $string("==="),
                                                rvalue: $string("ReturnStatusAuthorized"),
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label m-0 mb-quarter inline-block bg-(--sv-setting-label-backgroundColor) px-third py-eighth text-tiny leading-(--sv-lineHeight-smallest) text-(--sv-setting-label-color)">
                                                        <$Lang keyName={$string("account.returns.status.authorized")} />
                                                    </h6>
                                                ),
                                            },
                                            {
                                                test: $pointer("status"),
                                                operator: $string("==="),
                                                rvalue: $string("ReturnStatusRepaired"),
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label m-0 mb-quarter inline-block bg-(--sv-setting-label-backgroundColor) px-third py-eighth text-tiny leading-(--sv-lineHeight-smallest) text-(--sv-setting-label-color)">
                                                        <$Lang keyName={$string("account.returns.status.repaired")} />
                                                    </h6>
                                                ),
                                            },
                                            {
                                                test: $pointer("status"),
                                                operator: $string("==="),
                                                rvalue: $string("ReturnStatusRefunded"),
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label m-0 mb-quarter inline-block bg-(--sv-setting-label-backgroundColor) px-third py-eighth text-tiny leading-(--sv-lineHeight-smallest) text-(--sv-setting-label-color)">
                                                        <$Lang keyName={$string("account.returns.status.refunded")} />
                                                    </h6>
                                                ),
                                            },
                                            {
                                                test: $pointer("status"),
                                                operator: $string("==="),
                                                rvalue: $string("ReturnStatusRejected"),
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label m-0 mb-quarter inline-block bg-(--sv-setting-label-backgroundColor) px-third py-eighth text-tiny leading-(--sv-lineHeight-smallest) text-(--sv-setting-label-color)">
                                                        <$Lang keyName={$string("account.returns.status.rejected")} />
                                                    </h6>
                                                ),
                                            },
                                            {
                                                test: $pointer("status"),
                                                operator: $string("==="),
                                                rvalue: $string("ReturnStatusCancelled"),
                                                $then: () => (
                                                    <h6 className="account-orderStatus-label m-0 mb-quarter inline-block bg-(--sv-setting-label-backgroundColor) px-third py-eighth text-tiny leading-(--sv-lineHeight-smallest) text-(--sv-setting-label-color)">
                                                        <$Lang keyName={$string("account.returns.status.cancelled")} />
                                                    </h6>
                                                ),
                                            },
                                        ]}
                                    />
                                </div>

                                <h5 className="account-product-title m-0 mb-eighth [text-transform:inherit] [&>a]:no-underline [&+.definitionList]:mt-half">
                                    <$Lang keyName={$string("account.returns.list.return_number")} id={ret.id} />
                                </h5>
                                <p className="account-product-description [&+.definitionList]:mx-0 [&+.definitionList]:-mt-[calc(var(--sv-spacing-base)+var(--sv-spacing-quarter))] [&+.definitionList]:mb-single">
                                    <$Lang keyName={$string("account.returns.list.product_details")} num_products={ret.quantity} />{" "}
                                    <a href={ret.product.url}>{ret.product.name}</a>
                                </p>

                                <$If
                                    test={ret.product.options}
                                    $then={() => (
                                        <dl className="definitionList flow-root">
                                            <$Each
                                                list={ret.product.options}
                                                $then={(option) => (
                                                    <>
                                                        <dt className="definitionList-key float-left m-0 mr-quarter font-normal text-text-secondary">{option.name}:</dt>
                                                        <dd className="definitionList-value m-0"><ProductOptions /></dd>
                                                    </>
                                                )}
                                            />
                                        </dl>
                                    )}
                                />

                                <div className="account-product-details -mx-gutter-half flow-root w-auto max-w-none">
                                    <div className="account-product-detail float-left w-full px-gutter-half small:w-1/3 large:w-1/4 [.account-product-detail+&]:mt-base small:[.account-product-detail+&]:mt-0">
                                        <h6 className="account-product-detail-heading m-0 mb-quarter font-(family-name:--sv-fontFamily-sans) text-tiny text-text-secondary">
                                            <$Lang keyName={$string("account.returns.date_requested")} />
                                        </h6>
                                        <span>{ret.date_requested}</span>
                                    </div>
                                    <div className="account-product-detail float-left w-full px-gutter-half small:w-1/3 large:w-1/4 [.account-product-detail+&]:mt-base small:[.account-product-detail+&]:mt-0">
                                        <h6 className="account-product-detail-heading m-0 mb-quarter font-(family-name:--sv-fontFamily-sans) text-tiny text-text-secondary">
                                            <$Lang keyName={$string("account.returns.action")} />
                                        </h6>
                                        <span>{ret.action}</span>
                                    </div>
                                    <div className="account-product-detail account-product-detail--large float-left w-full px-gutter-half small:w-1/3 large:w-1/2 [.account-product-detail+&]:mt-base small:[.account-product-detail+&]:mt-0">
                                        <h6 className="account-product-detail-heading m-0 mb-quarter font-(family-name:--sv-fontFamily-sans) text-tiny text-text-secondary">
                                            <$Lang keyName={$string("account.returns.reason")} />
                                        </h6>
                                        <span>{ret.reason}</span>
                                    </div>
                                    <$If
                                        test={ret.comments}
                                        $then={() => (
                                            <div className="account-product-detail account-product-detail--full float-left w-full px-gutter-half [.account-product-detail+&]:mt-base small:[.account-product-detail+&]:mt-single">
                                                <h6 className="account-product-detail-heading m-0 mb-quarter font-(family-name:--sv-fontFamily-sans) text-tiny text-text-secondary">
                                                    <$Lang keyName={$string("account.returns.comments")} />
                                                </h6>
                                                <span>{ret.comments}</span>
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </li>
                )}
            />
        </ul>
    </>
);
