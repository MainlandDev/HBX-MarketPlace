"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import AlertAlertInfo from "../../common/alert/alert-info.tsx";
import {$dynamicComponent, $Each, $Lang, $lang, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {Button} from "../../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <>
        <div className="modal-header pl-(--sv-reveal-modal-paddingHorizontal) pr-[calc(32px+var(--sv-reveal-close-side))]">
            <h2 className="modal-header-title text-center text-large medium:text-larger" data-product-variant={""} data-name={$pointer("product_name")}>
                <$Lang keyName={$string("cart.reconfigure_product")} name={$pointer("product_name")} />
            </h2>
        </div>
        <div className="modal-body overflow-auto p-(--sv-reveal-modal-padding) [-webkit-overflow-scrolling:touch]" data-product-option-change={""}>
            <div className="alertMessageBox" hidden={true}>
                <AlertAlertInfo />
            </div>

            <form id="CartEditProductFieldsForm" method="post" action="cart.php" encType="multipart/form-data">
                <input type="hidden" name="action" value="EditProductFieldsInCart" />
                <input type="hidden" name="item_id" value={$pointer("quote_item_id")} />
                <div data-product-attributes-wrapper={""}>
                    <$Each
                        list={$pointer<unknown[]>("options")}
                        $then={() => $unescaped($dynamicComponent($string("components/products/options")))}
                    />
                </div>
                <div className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-center [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half [:where(&)]:[background:none] [:where(&)]:[border:0] [:where(&)]:text-center xsmall:[:where(&)]:text-left [:where(&>*)]:[display:inline-block] [:where(&>*)]:mb-[1rem] [:where(&>*)]:w-full xsmall:[:where(&>*)]:align-baseline xsmall:[:where(&>*)]:w-auto">
                    <Button tag="input" variant="primary" type="submit" value={$lang($string("common.save"))} />
                </div>
            </form>
        </div>
    </>
);
