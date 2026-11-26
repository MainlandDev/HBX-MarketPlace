"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {FormField, FormLabel, FormSelect} from "../../../server/formParts.tsx";

/** Same boxed look as the sort box. The `limit` query parameter is read by the store, so the select works as a plain GET control. */
const option = (count: number) => (
    <option dangerouslyInlineAttributes={{attributes: `value="${count}" ${$If({test: $pointer("theme_settings.categorypage_products_per_page"), operator: $string("=="), rvalue: $string(String(count)), $then: () => "selected"})}`}}>{count}</option>
);

export default (_props: PartialProps) => (
    <fieldset className="form-fieldset actionBar-section actionBar-section--productsPerPage [:where(&)]:[display:flow-root] small:[:where(&)]:float-left small:[:where(&)]:ml-[0.78571rem] small:[&_.form-label]:mr-[0.35714rem] [&_.form-field]:rounded-[4px] [&_.form-field]:bg-white [&_.form-field]:[border:var(--sv-actionBar-form-field-border)] [&_.form-field:hover]:border-(--sv-setting-input-border-color-active) [&_.form-label]:mb-0 [&_.form-label]:inline-block [&_.form-label]:pl-[0.78571rem] [&_.form-label]:text-[13px] [&_.form-label]:leading-[2.14286rem] [&_.form-label]:text-(--sv-actionBar-form-label-color) [&_.form-select]:inline-block [&_.form-select]:h-[2.14286rem] [&_.form-select]:w-auto [&_.form-select]:border-0 [&_.form-select]:pl-[0.21429rem] [&_.form-select]:text-(--sv-setting-color-textLink) [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
        <FormField>
            <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="limit">
                <$Lang keyName={$string("common.sorter.products_per_page")} />:
            </FormLabel>
            <FormSelect name="limit" id="limit" className="form-select--small h-[2.28571rem] max-w-[20rem] py-[0.57143rem] pr-[2rem] pl-[0.78571rem] text-[13px] leading-[1rem]">
                {option(8)}
                {option(12)}
                {option(16)}
                {option(20)}
                {option(40)}
                {option(100)}
            </FormSelect>
        </FormField>
    </fieldset>
);
