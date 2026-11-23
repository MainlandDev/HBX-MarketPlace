"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$dynamicComponent, $Each, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {island} from "@mainlanddev/hbx-bigcommerce/islands";
import {VariantEnhancer as VariantEnhancerImpl} from "@/client/variantSelector/VariantEnhancer.tsx";
import {WhenColour, WhenSize} from "../../../../server/variantSelector.tsx";

// Types the client component for a template: props take real values or HBX values.
const VariantEnhancer = island(VariantEnhancerImpl);

/** Renders the option in context through the same per-type partial the plain list uses, so its native inputs are unchanged. */
const option = () => $unescaped($dynamicComponent($string("components/products/options")));

/**
 * Title row of the colour card, rendered inside the colour option's loop so `values.length` is that option's colour count.
 * TODO: "Choose Colour", "Colours", "Search Colour" and "No colours match your search." are hardcoded; move them to language keys.
 */
const colourHeader = () => (
    <div className="variant-selector__header">
        <span className="variant-selector__active" aria-hidden="true" />
        <h3 className="variant-selector__title">Choose Colour</h3>
        <span className="variant-selector__count">{$pointer("values.length")} Colours</span>
    </div>
);

/**
 * The colour + size selector. One pass over `product.options` per group so colour comes first, then size, then any other option.
 * Works without JS; `VariantEnhancer` adds the search box and per-colour sizes. The chosen colour's swatch beside the title is CSS only (see swatch.tsx).
 */
export default (_props: PartialProps) => {
    const options = $pointer<unknown[]>("product.options");
    return (
        <div className="variant-selector" data-variant-selector={""}>
            <div className="variant-selector__colours" data-variant-colours={""}>
                <$Each list={options} $then={() => WhenColour({$then: colourHeader})} />
                {/* Hidden until the enhancer is running: without JS the box would do nothing. */}
                <div className="variant-selector__search" data-variant-search={""} hidden>
                    <svg className="variant-selector__search-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
                        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path d="M20 20l-4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <input className="variant-selector__search-input" type="search" placeholder="Search Colour" aria-label="Search colour" autoComplete="off" />
                </div>
                <$Each list={options} $then={() => WhenColour({$then: option})} />
                <p className="variant-selector__empty" data-variant-empty={""} role="status" hidden>
                    No colours match your search.
                </p>
            </div>
            <div className="variant-selector__sizes" data-variant-sizes={""}>
                <$Each list={options} $then={() => WhenSize({$then: option})} />
            </div>
            <$Each list={options} $then={() => WhenColour({$else: () => WhenSize({$else: option})})} />
            <VariantEnhancer productId={$pointer<number>("product.id")} token={$pointer<string>("settings.storefront_api.token")} />
        </div>
    );
};
