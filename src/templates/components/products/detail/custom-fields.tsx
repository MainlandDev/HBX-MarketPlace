"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface CustomField {
    name: string;
    value: string;
}

const NAME_CLASS = "productView-info-name clear-both float-left mr-quarter mb-eighth small:float-none small:font-(family-name:--sv-fontFamily-headings) small:text-smallest small:font-normal";
const VALUE_CLASS = "productView-info-value float-left mb-quarter small:float-none small:mb-base";
/** Live shows "Features" as pill badges and the merchant "__note" as a text block; other fields are hidden only inside the info list (`.cf-hidden`), so the custom-fields tab still lists them. */
const BADGE_CLASS = "productView-info-value m-0 mr-half mb-half inline-block rounded-[6px] border border-ink-border bg-white px-half py-quarter text-[0.9rem] font-bold text-ink uppercase before:mr-quarter before:content-['✦']";
const NOTE_CLASS = "productView-info-value float-none mb-base ml-0 text-[1rem] text-ink [&_img]:mb-half [&_img]:max-w-[160px]";
const HIDDEN_CLASS = "cf-hidden";

export default (_props: PartialProps) => (
    <$Each
        list={$pointer<CustomField[]>("product.custom_fields")}
        $then={(field) => (
            <$If
                test={field.name}
                operator={$string("===")}
                rvalue={$string("Features")}
                $then={() => <dd className={BADGE_CLASS}>{$unescaped(field.value)}</dd>}
                $else={() => (
                    <$If
                        test={field.name}
                        operator={$string("===")}
                        rvalue={$string("__note")}
                        $then={() => <dd className={NOTE_CLASS}>{$unescaped(field.value)}</dd>}
                        $else={() => (
                            <>
                                <dt className={`${NAME_CLASS} ${HIDDEN_CLASS}`}>{field.name}:</dt>
                                <dd className={`${VALUE_CLASS} ${HIDDEN_CLASS}`}>{$unescaped(field.value)}</dd>
                            </>
                        )}
                    />
                )}
            />
        )}
    />
);
