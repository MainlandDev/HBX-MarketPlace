"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import FacetedSearchRangeForm from "../faceted-search/range-form.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => {
    const settings = $pointer<ThemeSettingsObject>("theme_settings");
    return (
        <$If
            test={settings.shop_by_price_visibility}
            $then={() => (
                <div className="sidebarBlock [[class~=sidebarBlock]+&]:mt-single-third [[class~=sidebarBlock]+&]:border-t [[class~=sidebarBlock]+&]:border-(--sv-container-border-global-color-base) [[class~=sidebarBlock]+&]:pt-single-third">
                    <h2 className="sidebarBlock-heading heading-price mt-0 text-[15px] [text-transform:inherit] medium:-mt-[12px]" data-shop-by-price={""}>
                        <$Lang keyName={$string("category.shop_by_price")} />
                    </h2>

                    <FacetedSearchRangeForm shop_by_price={settings.shop_by_price_visibility} />

                    <div className="reset-filters [&:not([style*=block])]:[display:none]">
                        <a href={$pointer("category.url")} className="navList-action reset-btn no-underline [:where(&)]:text-(--sv-navList-action-color) [:where(&)]:text-(length:--sv-navList-action-fontSize) [:where(&)]:py-eighth [:where(&)]:px-0 [:where(&)]:[display:block] [:where(&:is(:hover,:focus))]:text-(--sv-anchor-font-color-hover)">
                            <$Lang keyName={$string("category.reset")} />
                        </a>{" "}
                        <span className="reset-message aria-description--hidden">
                            <$Lang keyName={$string("category.filter_reset_announcement")} />
                        </span>
                    </div>
                </div>
            )}
        />
    );
};
