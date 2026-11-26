"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Inject, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => {
    return (
        <>
            <$Inject keyName={$string("outOfStockDefaultMessage")} value={$lang($string("products.out_of_stock_default_message"))} />{" "}
            <$Inject keyName={$string("availableOnHand")} value={$pointer("product.available_on_hand")} />{" "}
            <$Inject keyName={$string("availableForBackorder")} value={$pointer("product.available_for_backorder")} />{" "}
            <$Inject keyName={$string("availableToSell")} value={$pointer("product.available_to_sell")} />{" "}
            <$Inject keyName={$string("unlimitedBackorder")} value={$pointer("product.unlimited_backorder")} />{" "}
            <$Inject keyName={$string("showQuantityOnBackorder")} value={$pointer("product.show_quantity_on_backorder")} />{" "}
            <$Inject keyName={$string("showBackorderAvailabilityPrompt")} value={$pointer("product.show_backorder_availability_prompt")} />{" "}
            <$Inject keyName={$string("backorderAvailabilityPrompt")} value={$pointer("product.backorder_availability_prompt")} />{" "}
            <$Inject keyName={$string("quantityBackorderedMessage")} value={$lang($string("products.quantity_backordered"), {quantity: $string("__QTY__")})} />{" "}
            <$Inject keyName={$string("quantityMaxMessage")} value={$lang($string("products.quantity_max"), {quantity: $string("__QTY__")})} />{" "}
            <$Inject
                keyName={$string("quantityMaxPicklistMessage")}
                value={$lang($string("products.quantity_max_picklist"), {name: $string("__NAME__"), quantity: $string("__QTY__")})}
            />{" "}
            <$Inject keyName={$string("backorderMessages")} value={$pointer("backorder_messages")} />{" "}
            <$Inject keyName={$string("showBackorderMessage")} value={$pointer("product.show_backorder_message")} />
        </>
    );
};
