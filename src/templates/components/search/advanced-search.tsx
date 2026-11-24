"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormCheck, FormField, FormInput, FormLabel, FormSelect} from "../../../server/formParts.tsx";

interface Brand {
    id: string;
    name: string;
}

export default (_props: PartialProps) => (
    <div className="page -mx-gutter-half w-auto max-w-none flow-root">
        <div className="page-content page-content--centered float-left w-full px-gutter-half medium:float-none medium:mx-auto medium:w-8/12">
            <form
                className="advancedSearch-form toggle-content mb-double [:where(&:not(.is-open))]:[display:none] [:where(&.is-open)]:[display:block]"
                action={$pointer("forms.search.action")}
                data-advanced-search-form={""}
                id="advanced-search-content"
                aria-hidden="true"
            >
                <input type="hidden" name="mode" value="1" />
                <h5 className="advancedSearch-title m-0 mb-single [text-transform:inherit]">
                    <$Lang keyName={$string("forms.search.title")} />
                </h5>
                <div className="form-row -mb-single [:where(&)]:-mx-[0.75rem] [:where(&)]:max-w-none [:where(&)]:w-auto [:where(&)]:[display:flow-root] [:where(&_.form-field)]:float-left [:where(&_.form-field)]:w-full [:where(&_.form-field)]:max-w-none [:where(&_.form-field)]:px-[0.75rem]">
                    <fieldset className="form-fieldset form-column float-left w-full px-[0.75rem] small:w-6/12 [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
                        <FormField>
                            <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="search_query_adv">
                                <$Lang keyName={$string("forms.search.query")} />{" "}
                                <small>
                                    <$Lang keyName={$string("common.required")} />
                                </small>
                            </FormLabel>
                            <FormInput
                                type="text"
                                name="search_query_adv"
                                data-error-message={$lang($string("search.error.empty_field"))}
                                id="search_query_adv"
                                value={$pointer("forms.search.query")}
                            />
                        </FormField>

                        <FormField>
                            <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="search-form-brand">
                                <$Lang keyName={$string("forms.search.brand")} />
                            </FormLabel>
                            <FormSelect name="brand" id="search-form-brand">
                                <option value="">
                                    <$Lang keyName={$string("common.no_preference")} />
                                </option>
                                <$Each
                                    list={$pointer<Brand[]>("forms.search.brands_list")}
                                    $then={(brand) => (
                                        <option
                                            value={brand.id}
                                            dangerouslyInlineAttributes={{
                                                attributes: `${$If({test: $pointer("../forms.search.values.brand"), operator: $string("=="), rvalue: $pointer("id"), $then: () => "selected"})}`,
                                            }}
                                        >
                                            {brand.name}
                                        </option>
                                    )}
                                />
                            </FormSelect>
                        </FormField>
                    </fieldset>
                    <fieldset className="form-fieldset form-column float-left w-full px-[0.75rem] small:w-6/12 [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
                        <FormField>
                            <FormLabel className="[&_small]:float-right [&_small]:mt-quarter">
                                <$Lang keyName={$string("forms.search.categories")} />
                            </FormLabel>
                            <div className="form-field-group rounded-[4px] border border-(--sv-setting-input-border-color) p-single" data-search-category-tree={""}></div>
                        </FormField>
                        <FormField>
                            <FormCheck
                                type="checkbox"
                                kind="checkbox" className="[&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                                name="searchsubs"
                                value="ON"
                                id="search-form-searchsubs"
                                checked={true}
                            />{" "}
                            <FormLabel check="checkbox" className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="search-form-searchsubs">
                                <$Lang keyName={$string("forms.search.searchsubs")} />
                            </FormLabel>
                        </FormField>
                    </fieldset>
                </div>
                <hr />
                <div className="form-row -mb-single [:where(&)]:-mx-[0.75rem] [:where(&)]:max-w-none [:where(&)]:w-auto [:where(&)]:[display:flow-root] [:where(&_.form-field)]:float-left [:where(&_.form-field)]:w-full [:where(&_.form-field)]:max-w-none [:where(&_.form-field)]:px-[0.75rem]">
                    <FormField className="search-price-range [&_label]:[display:inline] [&_label_input]:[display:block] [&_label_input]:pl-single small:[&_label_input]:[display:inline] small:[&_label_input]:w-[6rem] small:[&_label_span]:[display:inline] small:[&_label_span]:px-single">
                        <h5 className="advancedSearch-title m-0 mb-single [text-transform:inherit]">
                            <$Lang keyName={$string("forms.search.by_price")} />
                        </h5>
                        <FormLabel tag="p" className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="search-form-price_from">
                            <$Lang keyName={$string("forms.search.price_range")} />
                        </FormLabel>
                        <label>
                            <span className="absolute h-px w-px overflow-hidden [border:0] p-0 [clip:rect(1px,1px,1px,1px)]">
                                <$Lang keyName={$string("forms.search.price_range")} />
                            </span>{" "}
                            <span>
                                <$Lang keyName={$string("common.from")} />
                            </span>
                            <FormInput
                                type="number"
                                step="any"
                                name="price_from"
                                id="search-form-price_from"
                                value={$pointer("forms.search.values.price_from")}
                            />
                        </label>
                        <label>
                            <span className="absolute h-px w-px overflow-hidden [border:0] p-0 [clip:rect(1px,1px,1px,1px)]">
                                <$Lang keyName={$string("forms.search.price_range")} />
                            </span>{" "}
                            <span>
                                <$Lang keyName={$string("common.to")} />
                            </span>
                            <FormInput
                                type="number"
                                step="any"
                                name="price_to"
                                id="search-form-price_to"
                                value={$pointer("forms.search.values.price_to")}
                            />
                        </label>
                    </FormField>
                </div>
                <hr />
                <h5 className="advancedSearch-title m-0 mb-single [text-transform:inherit]">
                    <$Lang keyName={$string("forms.search.by_setting")} />
                </h5>
                <div className="form-row form-row--half -mb-single small:[&>.form-field:nth-child(odd)]:clear-left [:where(&)]:-mx-[0.75rem] [:where(&)]:max-w-none [:where(&)]:w-auto [:where(&)]:[display:flow-root] [:where(&_.form-field)]:float-left [:where(&_.form-field)]:w-full [:where(&_.form-field)]:max-w-none [:where(&_.form-field)]:px-[0.75rem] small:[:where(&_.form-field)]:w-1/2">
                    <FormField>
                        <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="search-form-featured">
                            <$Lang keyName={$string("forms.search.featured_products.title")} />
                        </FormLabel>
                        <FormSelect name="featured" id="search-form-featured">
                            <option value="">
                                <$Lang keyName={$string("common.no_preference")} />
                            </option>
                            <option
                                value="1"
                                dangerouslyInlineAttributes={{
                                    attributes: `${$If({test: $pointer("forms.search.values.featured_products"), operator: $string("==="), rvalue: $string("1"), $then: () => "selected"})}`,
                                }}
                            >
                                <$Lang keyName={$string("forms.search.featured_products.enabled")} />
                            </option>
                            <option
                                value="2"
                                dangerouslyInlineAttributes={{
                                    attributes: `${$If({test: $pointer("forms.search.values.featured_products"), operator: $string("==="), rvalue: $string("2"), $then: () => "selected"})}`,
                                }}
                            >
                                <$Lang keyName={$string("forms.search.featured_products.disabled")} />
                            </option>
                        </FormSelect>
                    </FormField>
                    <FormField>
                        <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="search-form-shipping">
                            <$Lang keyName={$string("forms.search.free_shipping.title")} />
                        </FormLabel>
                        <FormSelect name="shipping" id="search-form-shipping">
                            <option value="">
                                <$Lang keyName={$string("common.no_preference")} />
                            </option>
                            <option
                                value="1"
                                dangerouslyInlineAttributes={{
                                    attributes: `${$If({test: $pointer("forms.search.values.free_shipping"), operator: $string("==="), rvalue: $string("1"), $then: () => "selected"})}`,
                                }}
                            >
                                <$Lang keyName={$string("forms.search.free_shipping.free")} />
                            </option>
                            <option
                                value="2"
                                dangerouslyInlineAttributes={{
                                    attributes: `${$If({test: $pointer("forms.search.values.free_shipping"), operator: $string("==="), rvalue: $string("2"), $then: () => "selected"})}`,
                                }}
                            >
                                <$Lang keyName={$string("forms.search.free_shipping.paid")} />
                            </option>
                        </FormSelect>
                    </FormField>
                </div>
                <div className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-center [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half [:where(&)]:[background:none] [:where(&)]:[border:0] [:where(&)]:text-center xsmall:[:where(&)]:text-left [:where(&>*)]:[display:inline-block] [:where(&>*)]:mb-[1rem] [:where(&>*)]:w-full xsmall:[:where(&>*)]:align-baseline xsmall:[:where(&>*)]:w-auto">
                    <Button
                        id="advanced-search-submit"
                        tag="input" variant="primary"
                        type="submit"
                        value={$lang($string("forms.search.search"))}
                    />
                </div>
            </form>
        </div>
    </div>
);
