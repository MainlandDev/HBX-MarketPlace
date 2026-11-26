"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface CustomField {
    name: string;
    value: string;
}

/** The merchant "Features" custom fields as pill badges directly under the heading, as on live. The info list no longer repeats them. */
export default (_props: PartialProps) => (
    <ul className="productView-featurePills m-0 mb-half flex list-none flex-wrap gap-[6px] p-0 empty:[display:none]">
        <$Each
            list={$pointer<CustomField[]>("product.custom_fields")}
            $then={(field) => (
                <$If
                    test={field.name}
                    operator={$string("===")}
                    rvalue={$string("Features")}
                    $then={() => (
                        <li className="m-0 rounded-[6px] border border-ink-border bg-white px-half py-quarter text-[0.9rem] font-bold text-ink uppercase">
                            <span aria-hidden="true" className="mr-quarter">✦</span>
                            {$unescaped(field.value)}
                        </li>
                    )}
                />
            )}
        />
    </ul>
);
