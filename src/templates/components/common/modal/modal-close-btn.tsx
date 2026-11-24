"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <button
        className="modal-close absolute [:where(&)]:top-(--sv-reveal-close-top) [:where(&)]:right-(--sv-reveal-close-side) [:where(&)]:cursor-pointer [:where(&)]:font-(weight:--sv-reveal-close-weight) z-(--sv-zIndex-high) size-[32px] p-0 text-center text-[26px] leading-[32px] text-(--sv-setting-icon-color) no-underline hover:text-(--sv-setting-icon-color-hover) medium:text-[32px] before:absolute before:top-1/2 before:right-1/2 before:content-['_'] before:[border-style:solid] before:[border-width:10px] before:[border-color:transparent_transparent_var(--sv-focusTooltip-backgroundColor)] before:[transform:translateX(50%)] after:absolute after:top-full after:right-1/2 after:content-[attr(title)] after:cursor-default after:whitespace-nowrap after:rounded-[8px] after:bg-(--sv-focusTooltip-backgroundColor) after:px-[6px] after:py-[4px] after:text-[1rem] after:text-(--sv-focusTooltip-textColor) after:[transform:translateX(10px)] [&:focus]:before:[display:block] [&:focus]:after:[display:block] before:[display:none] after:[display:none]"
        type="button"
        title={$lang($string("common.close"))}
        dangerouslyInlineAttributes={{attributes: `${$pointer("additional_attr")}`}}
    >
        <span className="aria-description--hidden">
            <$Lang keyName={$string("common.close")} />
        </span>
        <span aria-hidden="true" dangerouslySetInnerHTML={{__html: "&#215;"}} />
    </button>
);
