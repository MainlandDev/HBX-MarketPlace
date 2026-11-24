"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

/** The label is printed twice in the original (visible text and the hidden copy), so it is written once and called twice. */
const shippingLabel = () => (
    <$If
        test={$pointer("cart.shipping_handling.shipping_cost")}
        $then={() => <$Lang keyName={$string("cart.gift_wrapping.change")} />}
        $else={() => (
            <$If
                test={$pointer("cart.multi_coupon_ui_enabled")}
                $then={() => <$Lang keyName={$string("cart.gift_wrapping.add")} />}
                $else={() => <$Lang keyName={$string("cart.shipping_estimator.add_info")} />}
            />
        )}
    />
);

export default (_props: PartialProps) => (
    <div className="[ul:not([data-enhanced])_&]:float-left [ul:not([data-enhanced])_&]:py-third [ul:not([data-enhanced])_&]:pr-0 [ul:not([data-enhanced])_&]:pl-single [ul:not([data-enhanced])_&]:text-left small:[ul:not([data-enhanced])_&]:text-right medium:[ul:not([data-enhanced])_&]:w-6/12 medium:[ul:not([data-enhanced])_&]:py-base medium:[ul:not([data-enhanced])_&]:pl-0">
        <button data-collapsible="add-shipping" className="shipping-estimate-show aria-expanded:italic p-0 text-text-secondary underline [transition:color_0.15s_ease] hover:text-(--sv-setting-color-textSecondary--hover) [[data-enhanced]_&]:text-(--sv-setting-optimizedCheckout-link-color) [[data-enhanced]_&]:no-underline [[data-enhanced]_&]:font-normal [[data-enhanced]_&]:not-italic [[data-enhanced]_&]:hover:underline" aria-labelledby="estimator-add">
            <span className="shipping-estimate-show__btn-name">{shippingLabel()}</span>
            <span id="estimator-add" className="[display:none]">
                {shippingLabel()}
            </span>
            <span id="estimator-close" className="[display:none]">
                <$Lang keyName={$string("cart.shipping_estimator.cancel")} />
            </span>
        </button>
    </div>
);
