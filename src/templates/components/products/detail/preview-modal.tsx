"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import ModalModalCloseBtn from "../../common/modal/modal-close-btn.tsx";
import {Modal} from "../../../../server/componentParts.tsx";
import {LoadingOverlay} from "../../../../server/runtimeParts.tsx";

export default (_props: PartialProps) => {
    return (
        <>
            <Modal id="previewModal" className="modal--large left-1/2 top-1/2 m-0 max-h-[90%] min-h-[240px] max-w-[95%] overflow-hidden p-0 outline-none [transform:translate(-50%,-50%)] [&_.form-field]:relative large:w-(--sv-modal-width--large)" data-reveal={""}>
                <ModalModalCloseBtn />
                <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-header-title"></div>
                <LoadingOverlay />
            </Modal>
        </>
    );
};
