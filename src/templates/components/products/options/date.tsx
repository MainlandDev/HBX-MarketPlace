"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import RequirenessMsg from "../../common/requireness-msg.tsx";
import {$concat, $For, $If, $Lang, $pointer, $raw, $string, $number} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => {
    const earliestYear = $pointer<number>("earliest_year");
    const latestYear = $pointer<number>("latest_year");
    return (
        <div className="form-field" data-product-attribute="date">
            <label
                className="form-label form-label--alternate form-label--inlineSmall mb-half text-smallest [font-family:'Montserrat',Arial,Helvetica,sans-serif] [&_small]:float-none [&_small]:mt-quarter [&_small]:ml-quarter [&_small]:text-text-secondary [&_small]:font-normal [&_small]:normal-case [&_small]:[font-size:inherit]"
                dangerouslyInlineAttributes={{attributes: `${$If({test: $pointer("style"), $then: () => `${$raw('style="')}${$pointer("style")}${$raw('" ')}`})}`}}
            >
                {$pointer("display_name")}:{" "}
                <RequirenessMsg />
            </label>
            <select
                className="form-select form-select--date h-[2.28571rem] max-w-[20rem] w-[initial] py-[0.57143rem] pr-[2rem] pl-[0.78571rem] text-[13px] leading-[1rem] [background-position:right_0.5rem_top_0.5rem] [background-size:1.28571rem]"
                dangerouslyInlineAttributes={{attributes: `name="attribute[${$pointer("id")}][year]" ${$If({test: $pointer("required"), $then: () => "required"})}`}}
            >
                <option value="">
                    <$Lang keyName={$string("common.year")} />
                </option>
                <$For
                    from={earliestYear}
                    to={latestYear}
                    $then={(ctx) => (
                        <option
                            dangerouslyInlineAttributes={{attributes: `value="${ctx.$index}" ${$If({test: $pointer("../selected_date.year"), operator: $string("=="), rvalue: $pointer("$index"), $then: () => $raw('selected="selected"')})}`}}
                        >
                            {ctx.$index}
                        </option>
                    )}
                />
                <$If
                    test={earliestYear}
                    operator={$string("==")}
                    rvalue={latestYear}
                    $then={() => <option dangerouslyInlineAttributes={{attributes: `value="${earliestYear}" selected="selected"`}}>{earliestYear}</option>}
                />
            </select>
            <select
                className="form-select form-select--date ml-quarter h-[2.28571rem] max-w-[20rem] w-[initial] py-[0.57143rem] pr-[2rem] pl-[0.78571rem] text-[13px] leading-[1rem] [background-position:right_0.5rem_top_0.5rem] [background-size:1.28571rem]"
                dangerouslyInlineAttributes={{attributes: `name="attribute[${$pointer("id")}][month]" ${$If({test: $pointer("required"), $then: () => "required"})}`}}
            >
                <option value="">
                    <$Lang keyName={$string("common.month")} />
                </option>
                <$For
                    from={$number(1)}
                    to={$number(12)}
                    $then={(ctx) => (
                        <option
                            dangerouslyInlineAttributes={{attributes: `value="${ctx.$index}" ${$If({test: $pointer("../selected_date.month"), operator: $string("=="), rvalue: $pointer("$index"), $then: () => $raw('selected="selected"')})}`}}
                        >
                            <$Lang keyName={$concat($string("common.short_months."), ctx.$index)} />
                        </option>
                    )}
                />
            </select>
            <select
                className="form-select form-select--date ml-quarter h-[2.28571rem] max-w-[20rem] w-[initial] py-[0.57143rem] pr-[2rem] pl-[0.78571rem] text-[13px] leading-[1rem] [background-position:right_0.5rem_top_0.5rem] [background-size:1.28571rem]"
                dangerouslyInlineAttributes={{attributes: `name="attribute[${$pointer("id")}][day]" ${$If({test: $pointer("required"), $then: () => "required"})}`}}
            >
                <option value="">
                    <$Lang keyName={$string("common.day")} />
                </option>
                <$For
                    from={$number(1)}
                    to={$number(31)}
                    $then={(ctx) => (
                        <option
                            dangerouslyInlineAttributes={{attributes: `value="${ctx.$index}" ${$If({test: $pointer("../selected_date.day"), operator: $string("=="), rvalue: $pointer("$index"), $then: () => $raw('selected="selected"')})}`}}
                        >
                            {ctx.$index}
                        </option>
                    )}
                />
            </select>
        </div>
    );
};
