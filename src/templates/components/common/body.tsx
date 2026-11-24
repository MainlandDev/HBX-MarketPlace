"use server";
import ModalModal from "./modal/modal.tsx";
import AlertAlertModal from "./alert/alert-modal.tsx";
import {Container} from "../../../server/componentParts.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$pointer, $string, $StencilBlock} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div className="body mt-single mb-[calc(var(--sv-spacing-double)*2)] medium:mt-[calc(var(--sv-spacing-single)+var(--sv-spacing-base))]" id="main-content" data-currency-code={$pointer("currency_selector.active_currency_code")}>
        <$StencilBlock name={$string("hero")} $then={() => " "} />
        <Container>
            <$StencilBlock name={$string("page")} $then={() => " "} />
        </Container>
        <ModalModal />
        <AlertAlertModal />
    </div>
);
