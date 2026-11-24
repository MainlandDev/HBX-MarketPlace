"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Lang, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div id="alert-modal" className="modal modal--alert modal--small left-1/2 top-1/2 m-0 max-h-[90%] min-h-[240px] max-w-[95%] overflow-hidden p-0 outline-none [transform:translate(-50%,-50%)] [&_.form-field]:relative rounded-(--sv-alert-modal-borderRadius) bg-(--sv-alert-modal-bgColor) px-[20px] pt-[40px] pb-[20px] text-center [font-family:var(--sv-alert-font-body)]" data-reveal={""} data-prevent-quick-search-close={""}>
        <div className="alert-icon relative mx-auto mt-[1.25em] mb-[1.875em] box-content h-[5em] w-[5em] cursor-default select-none justify-center rounded-[50%] border-[0.25em] border-solid [font-family:inherit] leading-[5em] [&:not([style*=none])]:flex error-icon border-[#f27474] text-[#f27474] [animation:animate-icon_0.5s]">
            <span className="icon-content relative grow [animation:animate-icon-content_0.5s]">
                <span className="line line-left absolute top-[2.3125em] left-[1.0625em] [display:block] h-[0.3125em] w-[2.9375em] rounded-[0.125em] bg-[#f27474] [transform:rotate(45deg)]"></span>
                <span className="line line-right absolute top-[2.3125em] right-[1em] [display:block] h-[0.3125em] w-[2.9375em] rounded-[0.125em] bg-[#f27474] [transform:rotate(-45deg)]"></span>
            </span>
        </div>

        <div className="alert-icon relative mx-auto mt-[1.25em] mb-[1.875em] box-content h-[5em] w-[5em] cursor-default select-none justify-center rounded-[50%] border-[0.25em] border-solid [font-family:inherit] leading-[5em] [&:not([style*=none])]:flex warning-icon border-[#facea8] text-[#f8bb86] [animation:animate-icon_0.5s]">
            <div className="icon-content flex items-center text-[3.75em] [animation:animate-icon-content_0.5s]">!</div>
        </div>

        <div className="modal-content text-(--sv-alert-font-bodyColor) text-[length:var(--sv-alert-font-bodySize)]"></div>

        <div className="button-container mt-[25px] [&_.confirm]:border-(--sv-alert-button-borderColor) [&_.confirm]:bg-(--sv-alert-button-bgColor) [&_.confirm]:text-(--sv-alert-button-color) [&_.confirm:focus]:border-(--sv-alert-button-borderColorHover) [&_.confirm:focus]:bg-(--sv-alert-button-bgColorHover) [&_.confirm:focus]:text-(--sv-alert-button-colorHover) [&_.confirm:hover]:border-(--sv-alert-button-borderColorHover) [&_.confirm:hover]:bg-(--sv-alert-button-bgColorHover) [&_.confirm:hover]:text-(--sv-alert-button-colorHover) [&_.confirm:active]:border-(--sv-alert-button-borderColorActive) [&_.confirm:active]:bg-(--sv-alert-button-bgColorActive) [&_.confirm:active]:text-(--sv-alert-button-colorActive)">
            <button type="button" className="confirm button" data-reveal-close={""}>
                <$Lang keyName={$string("common.ok")} />
            </button>
            <button type="button" className="cancel button" data-reveal-close={""}>
                <$Lang keyName={$string("common.cancel")} />
            </button>
        </div>
    </div>
);
