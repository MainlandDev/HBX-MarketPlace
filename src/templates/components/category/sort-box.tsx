"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <fieldset className="form-fieldset actionBar-section [&_.form-field]:rounded-[4px] [&_.form-field]:bg-white [&_.form-field]:[border:var(--sv-actionBar-form-field-border)] [&_.form-field:hover]:border-(--sv-setting-input-border-color-active) [&_.form-label]:mb-0 [&_.form-label]:inline-block [&_.form-label]:pl-[0.78571rem] [&_.form-label]:text-[13px] [&_.form-label]:leading-[2.14286rem] [&_.form-label]:text-(--sv-actionBar-form-label-color) [&_.form-select]:inline-block [&_.form-select]:h-[2.14286rem] [&_.form-select]:w-auto [&_.form-select]:border-0 [&_.form-select]:pl-[0.21429rem] [&_.form-select]:text-(--sv-setting-color-textLink)">
        <div className="form-field">
            <label className="form-label [&_small]:float-right [&_small]:mt-quarter" htmlFor="sort">
                <$Lang keyName={$string("common.sorter.sort_by")} />
            </label>
            <select className="form-select form-select--small h-[2.28571rem] max-w-[20rem] py-[0.57143rem] pr-[2rem] pl-[0.78571rem] text-[13px] leading-[1rem] [background-position:right_0.5rem_top_0.5rem] [background-size:1.28571rem]" name="sort" id="sort" role="listbox">
                <option dangerouslyInlineAttributes={{attributes: `value="featured" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("featured"), $then: () => "selected"})}`}}>
                    <$Lang keyName={$string("common.sorter.featured")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="newest" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("newest"), $then: () => "selected"})}`}}>
                    <$Lang keyName={$string("common.sorter.newest")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="bestselling" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("bestselling"), $then: () => "selected"})}`}}>
                    <$Lang keyName={$string("common.sorter.top_sellers")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="alphaasc" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("alphaasc"), $then: () => "selected"})}`}}>
                    <$Lang keyName={$string("common.sorter.alpha_asc")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="alphadesc" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("alphadesc"), $then: () => "selected"})}`}}>
                    <$Lang keyName={$string("common.sorter.alpha_desc")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="avgcustomerreview" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("avgcustomerreview"), $then: () => "selected"})}`}}>
                    <$Lang keyName={$string("common.sorter.reviews")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="priceasc" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("priceasc"), $then: () => "selected"})}`}}>
                    <$Lang keyName={$string("common.sorter.price_asc")} />
                </option>
                <option dangerouslyInlineAttributes={{attributes: `value="pricedesc" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("pricedesc"), $then: () => "selected"})}`}}>
                    <$Lang keyName={$string("common.sorter.price_desc")} />
                </option>
                <$If
                    test={$pointer("result_count")}
                    $then={() => (
                        <option dangerouslyInlineAttributes={{attributes: `value="relevance" ${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("relevance"), $then: () => "selected"})}`}}>
                            <$Lang keyName={$string("common.sorter.relevance")} />
                        </option>
                    )}
                />
            </select>
        </div>
    </fieldset>
);
