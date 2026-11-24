"use server";
import ModalModalCloseBtn from "./modal-close-btn.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {} from "@mainlanddev/hbx-bigcommerce";
import {Modal} from "../../../../server/componentParts.tsx";
import {LoadingOverlay} from "../../../../server/runtimeParts.tsx";

export default (_props: PartialProps) => (
    <Modal id="modal" className="left-1/2 top-1/2 m-0 max-h-[90%] min-h-[240px] max-w-[95%] overflow-hidden p-0 outline-none [transform:translate(-50%,-50%)] [&_.form-field]:relative" data-reveal={""} data-prevent-quick-search-close={""}>
        <ModalModalCloseBtn />
        <div id="modal-content" className="modal-content"></div>
        <LoadingOverlay />
    </Modal>
);
