import AccountNavigation from "../../../components/account/navigation.tsx";
import AccountOrderContents from "../../../components/account/order-contents.tsx";
import Breadcrumbs from "../../../components/common/breadcrumbs.tsx";
import AlertAlertInfo from "../../../components/common/alert/alert-info.tsx";
import {$Each, $If, $Inject, $Lang, $lang, $nl2br, $Page, $pointer, $raw, $sanitize, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {Button} from "../../../../server/formParts.tsx";

// Local shapes: the library's `Order` lacks these keys and types `shipments` as Record<string, unknown>.
// Fields are read from details.html, not from the API docs.
interface StatusMessage {
    message: string;
}

interface ShippingDiscount {
    label: string;
}

interface TotalRow {
    label: string;
    value: {value: number; formatted: string};
    shipping_discounts: ShippingDiscount[];
}

interface Address {
    full_name: string;
    company: string;
    address_lines: string[];
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface PickupAddress {
    pickup_method_display_name: string;
    location_name: string;
    location_line_1: string;
    location_line_2: string;
    location_city: string;
    location_state: string;
    location_zip: string;
    location_country_name: string;
    location_phone: string;
    location_email: string;
    collection_time_description: string;
}

interface ReorderItem {
    show_reorder: boolean;
    order_product_id: string;
}

interface Order {
    id: number;
    status_messages: StatusMessage[];
    total_rows: TotalRow[];
    status_text: string;
    date: string;
    total: {formatted: string};
    payment_method: string;
    card_number_last_four: string;
    order_instructions: string;
    invoice_url: string;
    shipping_address: Address;
    backorder_shipping_expectation_message: string;
    pickup_addresses: PickupAddress[];
    has_multiple_shipping_addresses: boolean;
    billing_address: Address;
    comments: string;
    reorder_url: string;
    items: ReorderItem[];
    is_complete: boolean;
    return_url: string;
}

interface Shipment {
    date_shipped: string;
    shipping_provider: string;
    shipping_track: {url: string; number: string};
    show_shipping_method: boolean;
    shipping_method: string;
}

export default () => {
    const order = $pointer<Order>("order");
    const shipments = $pointer<Shipment[]>("shipments");
    const addressLines = (address: typeof order.shipping_address) => (
        <>
            <li>{$unescaped($sanitize(address.full_name))}</li>
            <li>{$unescaped($sanitize(address.company))}</li>
            <li>{$unescaped($sanitize(address.address_lines[0]))}</li>
            <li>{$unescaped($sanitize(address.address_lines[1]))}</li>
            <li>
                {$unescaped($sanitize(address.city))}, {$unescaped($sanitize(address.state))} {$unescaped($sanitize(address.zip))}
            </li>
            <li>{$unescaped($sanitize(address.country))}</li>
        </>
    );
    return (
        <$Page
            blocks={{
                page: () => (
                    <>
                        <$Inject keyName={$string("selectItem")} value={$lang($string("forms.validate.account.reorder.select_item"))} />
                        <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                        <h1 className="page-heading mx-0 mt-0 mb-double text-center title">
                            <$Lang keyName={$string("account.orders.details.heading")} number={order.id} />
                        </h1>
                        <AccountNavigation account_page={$string("orders")} />

                        <div className="account mb-single rounded-card border-[0.8px] border-solid border-[#ddd] bg-white p-[12px] text-[#000] shadow-[0_3px_5px_#ddd]">
                            <div className="account-body -mx-gutter-half flow-root w-auto max-w-none">
                                <$Each
                                    list={order.status_messages}
                                    $then={(status) => <AlertAlertInfo $positionalHash={status.message} />}
                                />
                                <div className="account-content account-content--fixedSmall float-left w-full px-gutter-half medium:w-1/2">
                                    <AccountOrderContents order={order} />

                                    <dl className="float-right -mt-single w-2/3 text-smaller">
                                        <$Each
                                            list={order.total_rows}
                                            $then={(row) => (
                                                <$If
                                                    test={row.value.value}
                                                    $then={() => (
                                                        <>
                                                            <dt className="float-left m-0 py-single font-normal text-text-secondary last-of-type:relative last-of-type:top-fifth">{row.label}:</dt>
                                                            <dd className="m-0 border-b border-container-border py-single text-right last:border-b-0 last:text-small">{row.value.formatted}</dd>
                                                            <$If
                                                                test={row.shipping_discounts}
                                                                $then={() => (
                                                                    <dl>
                                                                        <$Each
                                                                            list={row.shipping_discounts}
                                                                            $then={(discount) => <dt className="account-orderTotal-discount m-0 border-b-0 py-half text-right font-normal last-of-type:border-b last-of-type:border-container-border last-of-type:pt-0">{discount.label}</dt>}
                                                                        />
                                                                    </dl>
                                                                )}
                                                            />
                                                        </>
                                                    )}
                                                />
                                            )}
                                        />
                                    </dl>
                                </div>

                                <aside className="account-sidebar float-left w-full px-gutter-half medium:w-1/3 medium:[.account-content--fixedSmall+&]:float-right">
                                    <section className="account-sidebar-block text-smaller [&+&]:mt-double">
                                        <h3 className="account-heading m-0 mb-single border-b border-container-border pb-base">
                                            <$Lang keyName={$string("account.orders.details.order_details")} />
                                        </h3>
                                        <dl className="definitionList flow-root">
                                            <dt className="definitionList-key float-left m-0 mr-quarter font-normal text-text-secondary">
                                                <$Lang keyName={$string("account.orders.details.order_status")} />
                                            </dt>
                                            <dd className="definitionList-value m-0">{order.status_text}</dd>
                                            <dt className="definitionList-key float-left m-0 mr-quarter font-normal text-text-secondary">
                                                <$Lang keyName={$string("account.orders.details.payment_date")} />
                                            </dt>
                                            <dd className="definitionList-value m-0">{order.date}</dd>
                                            <dt className="definitionList-key float-left m-0 mr-quarter font-normal text-text-secondary">
                                                <$Lang keyName={$string("account.orders.details.order_total")} />
                                            </dt>
                                            <dd className="definitionList-value m-0">{order.total.formatted}</dd>
                                            <$If
                                                test={order.payment_method}
                                                $then={() => (
                                                    <>
                                                        <dt className="definitionList-key float-left m-0 mr-quarter font-normal text-text-secondary">
                                                            <$Lang keyName={$string("account.orders.details.payment_method")} />
                                                        </dt>
                                                        <dd className="definitionList-value m-0">
                                                            {order.payment_method}{" "}
                                                            <$If
                                                                test={order.card_number_last_four}
                                                                $then={() => <$Lang keyName={$string("account.orders.details.card_ending")} card={order.card_number_last_four} />}
                                                            />
                                                        </dd>
                                                    </>
                                                )}
                                            />
                                            <$If
                                                test={order.order_instructions}
                                                $then={() => (
                                                    <>
                                                        <dt className="order-payments-description mt-single font-normal text-(--sv-setting-color-primary)">
                                                            <$Lang keyName={$string("account.orders.details.how_to_pay")} />
                                                        </dt>
                                                        <dd className="order-payments-value order-payments-value--long">{$nl2br(order.order_instructions)}</dd>
                                                    </>
                                                )}
                                            />
                                        </dl>

                                        <Button data-print-invoice={order.invoice_url}>
                                            <$Lang keyName={$string("account.orders.details.print_invoice")} />
                                        </Button>
                                    </section>

                                    <$If
                                        test={order.shipping_address}
                                        $then={() => (
                                            <section className="account-sidebar-block text-smaller [&+&]:mt-double">
                                                <h3 className="account-heading m-0 mb-single border-b border-container-border pb-base">
                                                    <$Lang keyName={$string("account.orders.details.ship_to")} />
                                                </h3>
                                                <ul className="account-order-address ml-0 list-none [&_ul]:mb-0 [&_ul]:list-none [&_ol]:mb-0 [&_ol]:list-none">{addressLines(order.shipping_address)}</ul>
                                                <$If
                                                    test={order.backorder_shipping_expectation_message}
                                                    $then={() => <p className="account-order-backorder-expectation mt-base mb-0 text-smaller text-backorder">{order.backorder_shipping_expectation_message}</p>}
                                                />
                                            </section>
                                        )}
                                    />
                                    <$If
                                        test={order.pickup_addresses}
                                        $then={() => (
                                            <section className="account-sidebar-block text-smaller [&+&]:mt-double">
                                                <h3 className="account-heading m-0 mb-single border-b border-container-border pb-base">
                                                    <$Lang keyName={$string("account.orders.details.pickup")} />
                                                </h3>
                                                <$Each
                                                    list={order.pickup_addresses}
                                                    $then={(pickup) => (
                                                        <>
                                                            <dl className="definitionList flow-root">
                                                                <dt className="definitionList-key float-left m-0 mr-quarter font-normal text-text-secondary">
                                                                    <$Lang keyName={$string("account.orders.details.pickup_method")} />
                                                                </dt>
                                                                <dd className="definitionList-value m-0">{$sanitize(pickup.pickup_method_display_name)}</dd>
                                                            </dl>

                                                            <ul className="account-order-address ml-0 list-none [&_ul]:mb-0 [&_ul]:list-none [&_ol]:mb-0 [&_ol]:list-none">
                                                                <li>
                                                                    <b>{$unescaped($sanitize(pickup.location_name))}</b>
                                                                </li>
                                                                <li>{$unescaped($sanitize(pickup.location_line_1))}</li>
                                                                <li>{$unescaped($sanitize(pickup.location_line_2))}</li>
                                                                <li>
                                                                    {$unescaped($sanitize(pickup.location_city))}, {$unescaped($sanitize(pickup.location_state))},{" "}
                                                                    {$unescaped($sanitize(pickup.location_zip))}
                                                                </li>
                                                                <li>{$unescaped($sanitize(pickup.location_country_name))}</li>
                                                            </ul>

                                                            <dl className="definitionList flow-root">
                                                                <$If
                                                                    test={pickup.location_phone}
                                                                    $then={() => (
                                                                        <>
                                                                            <dt className="definitionList-key float-left m-0 mr-quarter font-normal text-text-secondary">
                                                                                <$Lang keyName={$string("account.orders.details.phone")} />
                                                                            </dt>
                                                                            <dd className="definitionList-value m-0">{$unescaped($sanitize(pickup.location_phone))}</dd>
                                                                        </>
                                                                    )}
                                                                />
                                                                <$If
                                                                    test={pickup.location_email}
                                                                    $then={() => (
                                                                        <>
                                                                            <dt className="definitionList-key float-left m-0 mr-quarter font-normal text-text-secondary">
                                                                                <$Lang keyName={$string("account.orders.details.email")} />
                                                                            </dt>
                                                                            <dd className="definitionList-value m-0">{$unescaped($sanitize(pickup.location_email))}</dd>
                                                                        </>
                                                                    )}
                                                                />
                                                            </dl>

                                                            <ul className="account-order-address ml-0 list-none [&_ul]:mb-0 [&_ul]:list-none [&_ol]:mb-0 [&_ol]:list-none">
                                                                <li>
                                                                    <b>{$unescaped($lang($string("account.orders.details.opening_hours")))}</b>
                                                                </li>
                                                                <li>{$unescaped($sanitize(pickup.collection_time_description))}</li>
                                                            </ul>
                                                        </>
                                                    )}
                                                />
                                            </section>
                                        )}
                                        $else={() => (
                                            <$If
                                                test={order.has_multiple_shipping_addresses}
                                                $then={() => (
                                                    <section className="account-sidebar-block text-smaller [&+&]:mt-double">
                                                        <h3 className="account-heading m-0 mb-single border-b border-container-border pb-base">
                                                            <$Lang keyName={$string("account.orders.details.ship_to")} />
                                                        </h3>
                                                        <div className="account-order-address ml-0 list-none [&_ul]:mb-0 [&_ul]:list-none [&_ol]:mb-0 [&_ol]:list-none">
                                                            <$Lang keyName={$string("account.orders.details.ship_to_multi_text")} />
                                                        </div>
                                                        <$If
                                                            test={order.backorder_shipping_expectation_message}
                                                            $then={() => <p className="account-order-backorder-expectation mt-base mb-0 text-smaller text-backorder">{order.backorder_shipping_expectation_message}</p>}
                                                        />
                                                    </section>
                                                )}
                                            />
                                        )}
                                    />

                                    <section className="account-sidebar-block text-smaller [&+&]:mt-double">
                                        <h3 className="account-heading m-0 mb-single border-b border-container-border pb-base">
                                            <$Lang keyName={$string("account.orders.details.bill_to")} />
                                        </h3>
                                        <ul className="account-order-address ml-0 list-none [&_ul]:mb-0 [&_ul]:list-none [&_ol]:mb-0 [&_ol]:list-none">{addressLines(order.billing_address)}</ul>
                                    </section>

                                    <$If
                                        test={shipments}
                                        $then={() => (
                                            <section className="account-sidebar-block text-smaller [&+&]:mt-double">
                                                <h3 className="account-heading m-0 mb-single border-b border-container-border pb-base">
                                                    <$Lang keyName={$string("account.orders.details.shipments.header")} />
                                                </h3>
                                                <$Each
                                                    list={shipments}
                                                    $then={(shipment) => (
                                                        <dl className="definitionList flow-root">
                                                            <dt className="definitionList-key float-left m-0 mr-quarter font-normal text-text-secondary">
                                                                <$Lang keyName={$string("account.orders.details.shipments.date")} />:
                                                            </dt>
                                                            <dd className="definitionList-value m-0">{shipment.date_shipped}</dd>
                                                            <dt className="definitionList-key float-left m-0 mr-quarter font-normal text-text-secondary">
                                                                <$Lang keyName={$string("account.orders.details.shipments.method")} />:
                                                            </dt>
                                                            <dd className="definitionList-value m-0">{shipment.shipping_provider}</dd>
                                                            <dt className="definitionList-key float-left m-0 mr-quarter font-normal text-text-secondary">
                                                                <$Lang keyName={$string("account.orders.details.shipments.link")} />:
                                                            </dt>
                                                            <dd className="definitionList-value m-0">
                                                                <$If
                                                                    test={shipment.shipping_track.url}
                                                                    $then={() => (
                                                                        <>
                                                                            {$raw('<a href="')}
                                                                            {shipment.shipping_track.url}
                                                                            {$raw('">')}
                                                                        </>
                                                                    )}
                                                                />
                                                                <$If
                                                                    test={shipment.show_shipping_method}
                                                                    $then={() => (
                                                                        <>
                                                                            {shipment.shipping_track.number} {$raw("&mdash;")} {shipment.shipping_method}
                                                                        </>
                                                                    )}
                                                                    $else={() => <>{shipment.shipping_track.number}</>}
                                                                />
                                                                <$If test={shipment.shipping_track.url} $then={() => $raw("</a>")} />
                                                            </dd>
                                                        </dl>
                                                    )}
                                                />
                                            </section>
                                        )}
                                    />

                                    <$If
                                        test={order.comments}
                                        $then={() => (
                                            <section className="account-sidebar-block text-smaller [&+&]:mt-double">
                                                <h3 className="account-heading m-0 mb-single border-b border-container-border pb-base">
                                                    <$Lang keyName={$string("account.orders.details.comments")} />
                                                </h3>
                                                <p>{order.comments}</p>
                                            </section>
                                        )}
                                    />

                                    <section className="account-sidebar-block text-smaller [&+&]:mt-double">
                                        <h3 className="account-heading m-0 mb-single border-b border-container-border pb-base">
                                            <$Lang keyName={$string("account.orders.details.actions")} />
                                        </h3>
                                        <div className="order-details-info">
                                            <form className="inline-block" action={order.reorder_url} method="post" data-account-reorder-form={""}>
                                                <input type="hidden" name="orderid" value={order.id} />
                                                <$Each
                                                    list={order.items}
                                                    $then={(item) => (
                                                        <$If
                                                            test={item.show_reorder}
                                                            $then={() => <input type="hidden" name={`reorderitem[${item.order_product_id}]`} />}
                                                        />
                                                    )}
                                                />
                                                <Button type="submit" tag="input" value={$lang($string("account.orders.details.reorder"))} />
                                            </form>
                                            <$If
                                                test={$pointer("settings.returns_enabled")}
                                                $then={() => (
                                                    <$If
                                                        test={order.is_complete}
                                                        $then={() => (
                                                            <Button href={order.return_url} tag="a">
                                                                <$Lang keyName={$string("account.orders.details.return")} />
                                                            </Button>
                                                        )}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </section>
                                </aside>
                            </div>
                        </div>
                    </>
                ),
            }}
            layout="layout/base"
        />
    );
};
