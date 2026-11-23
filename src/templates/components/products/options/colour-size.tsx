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
    <div className="mb-3 flex items-center gap-3">
        <span className="flex h-12 w-12 flex-none self-start overflow-hidden rounded-card bg-white" aria-hidden="true" />
        <h3 className="m-0 flex-1 text-left text-[1.25rem] font-bold">Choose Colour</h3>
        <span className="rounded-full bg-white px-4 py-2 text-[0.8125rem] font-semibold whitespace-nowrap" data-variant-count={""}>
            {$pointer("values.length")} Colours
        </span>
    </div>
);

/**
 * The colour + size selector. One pass over `product.options` per group so colour comes first, then size, then any other option.
 * Works without JS; `VariantEnhancer` adds the search box and per-colour sizes. The chosen colour's swatch beside the title is CSS only (see swatch.tsx).
 */
export default (_props: PartialProps) => {
    const options = $pointer<unknown[]>("product.options");
    return (
        <div data-variant-selector={""}>
            {/* --vs-pad leaves room around the tiles for the chosen colour's halo, which the scroll area would clip. `relative` is the containing block of the chosen colour's copy. */}
            <div className="@container relative mb-4 rounded-card bg-[#f2f2f2] p-4 [--vs-gap:0.5rem] [--vs-pad:0.75rem]" data-variant-colours={""}>
                <$Each list={options} $then={() => WhenColour({$then: colourHeader})} />
                {/* Hidden until the enhancer is running: without JS the box would do nothing. */}
                <div className="mb-2 flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.15)] bg-white px-4 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-current" data-variant-search={""} hidden>
                    <svg className="flex-none" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
                        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path d="M20 20l-4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <input className="h-[44px] min-w-0 flex-1 border-0 bg-transparent p-0 text-[16px] shadow-none outline-0 focus:border-0 focus:shadow-none focus:outline-0" type="search" placeholder="Search Colour" aria-label="Search colour" autoComplete="off" />
                </div>
                <$Each list={options} $then={() => WhenColour({$then: option})} />
                <p className="mt-2 mb-0 text-center text-[0.875rem]" data-variant-empty={""} role="status" hidden>
                    No colours match your search.
                </p>
            </div>
            <div className="mb-4 rounded-card bg-[#f2f2f2] p-4 data-loading:opacity-60" data-variant-sizes={""}>
                <$Each list={options} $then={() => WhenSize({$then: option})} />
            </div>
            <$Each list={options} $then={() => WhenColour({$else: () => WhenSize({$else: option})})} />
            <VariantEnhancer productId={$pointer<number>("product.id")} token={$pointer<string>("settings.storefront_api.token")} />
        </div>
    );
};
