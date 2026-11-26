"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => {
    const description = $pointer<string>("product.description");
    const warranty = $pointer<string>("product.warranty");
    return (
        <>
            <$If
                test={description}
                $then={() => (
                    <>
                        <p className="productView-title -mt-half mr-0 mb-base ml-0 border-b border-container-border px-base text-small medium:mt-single large:text-largest">
                            <$Lang keyName={$string("products.description")} />
                        </p>
                        <div className="productView-description relative z-[1] float-left w-full px-base medium:clear-both medium:float-none" data-event-type="product">
                            {$unescaped(description)}
                        </div>
                    </>
                )}
            />
            <$If
                test={warranty}
                $then={() => (
                    <>
                        <p className="productView-title -mt-half mr-0 mb-base ml-0 border-b border-container-border px-base text-small medium:mt-single large:text-largest">
                            <$Lang keyName={$string("products.warranty")} />
                        </p>
                        <div className="productView-description relative z-[1] float-left w-full px-base medium:clear-both medium:float-none">{$unescaped(warranty)}</div>
                    </>
                )}
            />
        </>
    );
};
