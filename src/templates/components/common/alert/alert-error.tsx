"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$this, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {Icon} from "../../../../server/formParts.tsx";
import {AlertBox, AlertColumn} from "../../../../server/componentParts.tsx";

export default (_props: PartialProps) => (
    <AlertBox className="rounded-[4px] text-(--sv-setting-alert-color)" variant="error">
        <AlertColumn className="[&_.icon]:size-[25px] [&_svg]:fill-(--sv-alert-error-iconColor)" part="icon">
            <Icon glyph="ic-error" tag="icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                </svg>
            </Icon>
        </AlertColumn>
        <AlertColumn tag="p" part="message">
            <span id="alertBox-message-text">{$unescaped($this<string>())}</span>
        </AlertColumn>
    </AlertBox>
);
