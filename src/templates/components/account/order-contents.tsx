"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import ResponsiveImg from "../common/responsive-img.tsx";
import ProductOptions from "../common/product-options.tsx";
import {$Each, $If, $Lang, $pointer, $string, $unescaped, $Unless, $cdn, $raw} from "@mainlanddev/hbx-bigcommerce";

interface ShippingRow {
    is_shipping: boolean;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface OrderOption {
    name: string;
    linked_bundled_item: {
        quantity_ready_to_ship: number;
        quantity_backordered: number;
        backorder_message: string;
    };
}

interface OrderItem {
    shipping_rows: ShippingRow[];
    show_reorder: boolean;
    order_product_id: string;
    type: string;
    image: unknown;
    refunded: boolean;
    refunded_qty: number;
    download_url: string;
    price: {formatted: string};
    quantity: number;
    name: string;
    brand: {name: string};
    quantity_ready_to_ship: number;
    quantity_backordered: number;
    backorder_message: string;
    options: OrderOption[];
    gift_wrapping_name: string;
    event_date: {name: string; date: string};
    reorder_message: string;
}

export default (_props: PartialProps) => (
    <>
        <h3 className="account-heading m-0 border-b border-container-border pb-base">
            <$Lang keyName={$string("account.orders.details.order_contents")} />
        </h3>

        <ul className="account-list ml-0 list-none">
            <$Each
                list={$pointer<OrderItem[]>("order.items")}
                $then={(item) => (
                    <>
                        <$Each
                            list={item.shipping_rows}
                            $then={(row) => (
                                <$If
                                    test={row.is_shipping}
                                    $then={() => (
                                        <li className="border-b border-container-border py-[calc(var(--sv-spacing-single)+var(--sv-spacing-third))] font-bold">
                                            <h5 className="m-0 [text-transform:inherit]">
                                                <$Lang
                                                    keyName={$string("account.orders.details.ship_to_multi")}
                                                    street={row.address}
                                                    city={row.city}
                                                    state={row.state}
                                                    zip={row.zip}
                                                    country={row.country}
                                                />
                                            </h5>
                                        </li>
                                    )}
                                />
                            )}
                        />
                        <li className="account-listItem relative border-b border-container-border py-single [&_img]:w-full [&_.account-product-image]:relative [&_.account-product-image]:inset-0 [&_.account-product-image]:m-auto">
                            <div className="account-product account-product--alignMiddle w-full [display:table]">
                                <div className="account-product-checkItem relative w-[2rem] align-top large:-left-[2.5rem] [&_.form-label]:m-0 [&_.form-label]:size-single [&_.form-label]:p-0">
                                    <$If
                                        test={item.show_reorder}
                                        $then={() => (
                                            <>
                                                <input
                                                    className="form-checkbox [&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                                                    type="checkbox"
                                                    id={`account-product-id-${item.order_product_id}`}
                                                    value={item.order_product_id}
                                                />{" "}
                                                <label htmlFor={`account-product-id-${item.order_product_id}`} className="form-label [&_small]:float-right [&_small]:mt-quarter">
                                                    <span className="absolute h-px w-px overflow-hidden [border:0] p-0 [clip:rect(1px,1px,1px,1px)]">Checkbox {item.order_product_id} label</span>
                                                </label>
                                            </>
                                        )}
                                    />
                                </div>
                                <figure className="account-product-figure relative float-none m-0 w-[70px] flex-col items-center [display:table-cell] align-top [&>img]:block after:block after:h-0 after:w-full after:pb-[100%] after:content-['']">
                                    <$If
                                        test={$pointer("type")}
                                        operator={$string("===")}
                                        rvalue={$string("giftcertificate")}
                                        $then={() => (
                                            <img
                                                src={$cdn($pointer("../theme_settings.default_image_gift_certificate"))}
                                                alt="Gift Certificate"
                                                title="Gift Certificate"
                                            />
                                        )}
                                        $else={() =>
                                            <ResponsiveImg image={item.image} class={$string("account-product-image")} fallback_size={$pointer("../theme_settings.productthumb_size")} lazyload={$pointer("../theme_settings.lazyload_mode")} default_image={$pointer("../theme_settings.default_image_product")} />
                                        }
                                    />{" "}
                                    <$Unless
                                        test={item.refunded}
                                        $then={() => (
                                            <$If
                                                test={item.download_url}
                                                $then={() => (
                                                    <a href={item.download_url} className="account-product-download button button--primary absolute -top-half -right-half z-[1] size-[33px] rounded-[50%] p-0 [&_.icon]:mt-quarter [&_.icon]:size-single [&_svg]:fill-(--sv-color-white)">
                                                        <span className="absolute h-px w-px overflow-hidden [border:0] p-0 [clip:rect(1px,1px,1px,1px)]">
                                                            <$Lang keyName={$string("account.orders.details.download_items")} />
                                                        </span>
                                                        <span className="icon">
                                                            <svg>
                                                                <use href="#icon-arrow-down"></use>
                                                            </svg>
                                                        </span>
                                                    </a>
                                                )}
                                            />
                                        )}
                                    />
                                </figure>
                                <div className="account-product-body relative overflow-hidden pb-double-third pl-[2rem] [display:table-cell] align-top small:pb-0 large:pl-0 [&_.definitionList]:mb-0 [&_.definitionList]:text-smaller">
                                    <span className="float-right text-smaller">{item.price.formatted}</span>
                                    <h5 className="account-product-title m-0 mb-eighth [text-transform:inherit] [&>a]:no-underline [&+.definitionList]:mt-half">
                                        {item.quantity} {$raw("&#215;")} {item.name}
                                    </h5>
                                    <$If
                                        test={item.brand}
                                        $then={() => (
                                            <h6>{item.brand.name}</h6>
                                        )}
                                    />
                                    <$If
                                        test={item.quantity_ready_to_ship}
                                        $then={() => (
                                            <p className="account-product-backorder-prompts mb-0 text-smallest text-backorder [&+.definitionList]:mt-half [&+dt]:mt-half [&+dt+dd]:mt-half">
                                                <$Lang keyName={$string("products.quantity_on_hand")} quantity={item.quantity_ready_to_ship} />
                                            </p>
                                        )}
                                    />
                                    <$If
                                        test={item.quantity_backordered}
                                        $then={() => (
                                            <p className="account-product-backorder-prompts mb-0 text-smallest text-backorder [&+.definitionList]:mt-half [&+dt]:mt-half [&+dt+dd]:mt-half">
                                                <$Lang keyName={$string("products.quantity_backordered")} quantity={item.quantity_backordered} />
                                            </p>
                                        )}
                                    />
                                    <$If
                                        test={item.backorder_message}
                                        $then={() => <p className="account-product-backorder-prompts mb-0 text-smallest text-backorder [&+.definitionList]:mt-half [&+dt]:mt-half [&+dt+dd]:mt-half">{item.backorder_message}</p>}
                                    />
                                    <$If
                                        test={item.options}
                                        $then={() => (
                                            <dl className="definitionList flow-root">
                                                <$Each
                                                    list={item.options}
                                                    $then={(option) => (
                                                        <>
                                                            <dt className="definitionList-key float-left m-0 mr-quarter font-normal text-text-secondary">{option.name}:</dt>
                                                            <dd className="definitionList-value m-0"><ProductOptions /></dd>
                                                            <$If
                                                                test={option.linked_bundled_item.quantity_ready_to_ship}
                                                                $then={() => (
                                                                    <dd className="definitionList-value m-0 account-product-backorder-prompts mb-0 text-smallest text-backorder [&+.definitionList]:mt-half [&+dt]:mt-half [&+dt+dd]:mt-half">
                                                                        <$Lang
                                                                            keyName={$string("products.quantity_on_hand")}
                                                                            quantity={option.linked_bundled_item.quantity_ready_to_ship}
                                                                        />
                                                                    </dd>
                                                                )}
                                                            />
                                                            <$If
                                                                test={option.linked_bundled_item.quantity_backordered}
                                                                $then={() => (
                                                                    <dd className="definitionList-value m-0 account-product-backorder-prompts mb-0 text-smallest text-backorder [&+.definitionList]:mt-half [&+dt]:mt-half [&+dt+dd]:mt-half">
                                                                        <$Lang
                                                                            keyName={$string("products.quantity_backordered")}
                                                                            quantity={option.linked_bundled_item.quantity_backordered}
                                                                        />
                                                                    </dd>
                                                                )}
                                                            />
                                                            <$If
                                                                test={option.linked_bundled_item.backorder_message}
                                                                $then={() => (
                                                                    <dd className="definitionList-value m-0 account-product-backorder-prompts mb-0 text-smallest text-backorder [&+.definitionList]:mt-half [&+dt]:mt-half [&+dt+dd]:mt-half">
                                                                        {option.linked_bundled_item.backorder_message}
                                                                    </dd>
                                                                )}
                                                            />
                                                        </>
                                                    )}
                                                />
                                            </dl>
                                        )}
                                    />
                                    <$If
                                        test={item.gift_wrapping_name}
                                        $then={() => (
                                            <dl className="definitionList flow-root">
                                                <dt className="definitionList-key float-left m-0 mr-quarter font-normal text-text-secondary">
                                                    <$Lang keyName={$string("account.orders.gift_wrapping")} />
                                                </dt>
                                                <dd className="definitionList-value m-0">{item.gift_wrapping_name}</dd>
                                            </dl>
                                        )}
                                    />
                                    <$If
                                        test={item.event_date}
                                        $then={() => (
                                            <dl className="definitionList flow-root">
                                                <dt className="definitionList-key float-left m-0 mr-quarter font-normal text-text-secondary">{item.event_date.name}:</dt>

                                                <dd className="definitionList-value m-0">{item.event_date.date}</dd>
                                            </dl>
                                        )}
                                    />
                                    <$If
                                        test={item.refunded}
                                        $then={() => (
                                            <p className="mb-0 text-grey-light">
                                                <$Lang keyName={$string("account.orders.refunded_quantity")} qty={item.refunded_qty} />
                                            </p>
                                        )}
                                        $else={() => (
                                            <$If
                                                test={item.refunded_qty}
                                                $then={() => (
                                                    <p className="mb-0 text-grey-light">
                                                        <$Lang keyName={$string("account.orders.refunded_quantity")} qty={item.refunded_qty} />
                                                    </p>
                                                )}
                                            />
                                        )}
                                    />
                                    <$If
                                        test={item.reorder_message}
                                        $then={() => (
                                            <p>{$unescaped(item.reorder_message)}</p>
                                        )}
                                    />
                                </div>
                            </div>
                        </li>
                    </>
                )}
            />
        </ul>
    </>
);
