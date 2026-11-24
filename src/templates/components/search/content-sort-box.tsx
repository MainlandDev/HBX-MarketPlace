"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {FormField, FormLabel, FormSelect} from "../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <form className="actionBar" method="get" data-sort-by="content">
        <fieldset className="form-fieldset actionBar-section [&_.form-field]:rounded-[4px] [&_.form-field]:bg-white [&_.form-field]:[border:var(--sv-actionBar-form-field-border)] [&_.form-field:hover]:border-(--sv-setting-input-border-color-active) [&_.form-label]:mb-0 [&_.form-label]:inline-block [&_.form-label]:pl-[0.78571rem] [&_.form-label]:text-[13px] [&_.form-label]:leading-[2.14286rem] [&_.form-label]:text-(--sv-actionBar-form-label-color) [&_.form-select]:inline-block [&_.form-select]:h-[2.14286rem] [&_.form-select]:w-auto [&_.form-select]:border-0 [&_.form-select]:pl-[0.21429rem] [&_.form-select]:text-(--sv-setting-color-textLink) [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
            <FormField>
                <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="sort">
                    <$Lang keyName={$string("common.sorter.sort_by")} />
                </FormLabel>
                <FormSelect className="form-select--small h-[2.28571rem] max-w-[20rem] py-[0.57143rem] pr-[2rem] pl-[0.78571rem] text-[13px] leading-[1rem] [background-position:right_0.5rem_top_0.5rem] [background-size:1.28571rem]" name="sort" id="sort">
                    <option value="relevance" dangerouslyInlineAttributes={{attributes: `${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("relevance"), $then: () => "selected"})}`}}>
                        <$Lang keyName={$string("common.sorter.relevance")} />
                    </option>
                    <option value="alphaasc" dangerouslyInlineAttributes={{attributes: `${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("alphaasc"), $then: () => "selected"})}`}}>
                        <$Lang keyName={$string("common.sorter.alpha_asc")} />
                    </option>
                    <option value="alphadesc" dangerouslyInlineAttributes={{attributes: `${$If({test: $pointer("sort"), operator: $string("=="), rvalue: $string("alphadesc"), $then: () => "selected"})}`}}>
                        <$Lang keyName={$string("common.sorter.alpha_desc")} />
                    </option>
                </FormSelect>
            </FormField>
        </fieldset>
    </form>
);
