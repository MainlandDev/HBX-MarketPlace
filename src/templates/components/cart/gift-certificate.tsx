"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div className="[ul:not([data-enhanced])_&]:float-left [ul:not([data-enhanced])_&]:py-third [ul:not([data-enhanced])_&]:pr-0 [ul:not([data-enhanced])_&]:pl-single [ul:not([data-enhanced])_&]:text-left small:[ul:not([data-enhanced])_&]:text-right medium:[ul:not([data-enhanced])_&]:w-6/12 medium:[ul:not([data-enhanced])_&]:py-base medium:[ul:not([data-enhanced])_&]:pl-0">
        <button
            className="gift-certificate-add p-0 text-text-secondary underline [transition:color_0.15s_ease] hover:text-(--sv-setting-color-textSecondary--hover) [[data-enhanced]_&]:text-(--sv-setting-optimizedCheckout-link-color) [[data-enhanced]_&]:no-underline [[data-enhanced]_&]:font-normal [[data-enhanced]_&]:hover:underline [[data-enhanced]_&]:hover:text-(--sv-setting-optimizedCheckout-link-color) [[data-enhanced]_&]:items-center [[data-enhanced]_&]:[&:not([style*=none])]:inline-flex"
            aria-label={$lang($string("cart.gift_certificates.add_cert_code"))}
            aria-controls="add-certificate"
            aria-expanded="false"
        >
            <$If
                test={$pointer("cart.multi_coupon_ui_enabled")}
                $then={() => <$Lang keyName={$string("cart.gift_wrapping.add")} />}
                $else={() => <$Lang keyName={$string("cart.gift_certificates.gift_certificate")} />}
            />
        </button>
        <button
            className="gift-certificate-cancel p-0 text-text-secondary underline [transition:color_0.15s_ease] hover:text-(--sv-setting-color-textSecondary--hover) [[data-enhanced]_&]:text-(--sv-setting-optimizedCheckout-link-color) [[data-enhanced]_&]:no-underline [[data-enhanced]_&]:font-normal [[data-enhanced]_&]:hover:underline [[data-enhanced]_&]:hover:text-(--sv-setting-optimizedCheckout-link-color) [[data-enhanced]_&]:items-center [[data-enhanced]_&]:[&:not([style*=none])]:inline-flex"
            style={{display: "none"}}
            aria-label={$lang($string("cart.gift_certificates.add_cert_code"))}
            aria-controls="add-certificate"
            aria-expanded="true"
        >
            <$Lang keyName={$string("cart.coupons.cancel")} />
        </button>
    </div>
);
