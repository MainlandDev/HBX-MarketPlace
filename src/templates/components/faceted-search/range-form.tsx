"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $lang, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormField, FormInput} from "../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <form id="facet-range-form" className="form [:where(&)]:[margin:var(--sv-form-margin)]" method="get" data-faceted-search-range={""} noValidate={true}>
        <input type="hidden" name="search_query" value={$pointer("search_query")} />
        <$If
            test={$pointer("this.sort")}
            $then={() => <input type="hidden" name="sort" value={$pointer("this.sort")} />}
        />
        <fieldset className="form-fieldset [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
            <div className="form-minMaxRow flow-root -mx-[0.375rem] [&_.form-field]:float-left [&_.form-field]:mb-0 [&_.form-field]:w-4/12 [&_.form-field]:px-[0.375rem] [&_.button]:mb-0 [&_.button]:w-full [&_.button]:px-0">
                <FormField>
                    <FormInput
                        name={`${$If({test: $pointer("shop_by_price"), $then: () => "price_min", $else: () => "min_price"})}`}
                        placeholder={$lang($string("search.faceted.range.min-placeholder"))}
                        min="0"
                        className="form-input--small h-[2.28571rem] px-[0.78571rem] py-[0.57143rem] text-[13px] leading-[1rem]"
                        required={true}
                        type="number"
                        value={$pointer("min_price")}
                        aria-label={$lang($string("search.faceted.range.min-placeholder"))}
                        aria-describedby="min_price_description"
                    />{" "}
                    <span id="min_price_description" className="aria-description--hidden absolute top-0 left-0 -ml-[10000px] size-px overflow-hidden">
                        <$Lang keyName={$string("search.faceted.range.min-description")} />
                    </span>
                </FormField>

                <FormField>
                    <FormInput
                        name={`${$If({test: $pointer("shop_by_price"), $then: () => "price_max", $else: () => "max_price"})}`}
                        placeholder={$lang($string("search.faceted.range.max-placeholder"))}
                        min="0"
                        className="form-input--small h-[2.28571rem] px-[0.78571rem] py-[0.57143rem] text-[13px] leading-[1rem]"
                        required={true}
                        type="number"
                        value={$pointer("max_price")}
                        aria-label={$lang($string("search.faceted.range.max-placeholder"))}
                        aria-describedby="max_price_description"
                    />{" "}
                    <span id="max_price_description" className="aria-description--hidden absolute top-0 left-0 -ml-[10000px] size-px overflow-hidden">
                        <$Lang keyName={$string("search.faceted.range.max-description")} />
                    </span>
                </FormField>

                <FormField>
                    <Button size="small" type="submit">
                        <$Lang keyName={$string("search.faceted.range.update")} />
                    </Button>
                </FormField>
            </div>

            <div className="form-inlineMessage" aria-live="polite" role="alert"></div>
        </fieldset>
    </form>
);
