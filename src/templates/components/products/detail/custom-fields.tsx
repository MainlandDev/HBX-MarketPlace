"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $pointer, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface CustomField {
    name: string;
    value: string;
}

export default (_props: PartialProps) => (
    <$Each
        list={$pointer<CustomField[]>("product.custom_fields")}
        $then={(field) => (
            <>
                <dt className="productView-info-name clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal">{field.name}:</dt>
                <dd className="productView-info-value float-left mb-quarter small:float-none small:mb-base">{$unescaped(field.value)}</dd>
            </>
        )}
    />
);
