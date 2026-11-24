"use server";
import CartItemGiftwrap from "./item-giftwrap.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import ResponsiveImg from "../common/responsive-img.tsx";
import ProductOptions from "../common/product-options.tsx";
import LoginForPricing from "../common/login-for-pricing.tsx";
import {
    $All,
    $AssignVar,
    $cdn,
    $Each,
    $getVar,
    $If,
    $Lang,
    $lang,
    $number,
    $Or,
    $pointer,
    $string,
    $Unless, $unlessExpression, $ifExpression,
} from "@mainlanddev/hbx-bigcommerce";

interface StockPosition {
    quantity_on_hand: number;
    quantity_backordered: number;
    backorder_message: string;
}

interface Option {
    name: string;
    is_file: boolean;
    linked_bundled_item: {stock_position: StockPosition};
}

interface Item {
    id: string;
    product_id: number;
    type: string;
    name: string;
    url: string;
    edit_url: string;
    brand: {name: string};
    release_date: string;
    options: Option[];
    can_modify: boolean;
    event_date: {name: string; date: string};
    price: {formatted: string};
    price_discounted: {formatted: string};
    total: {formatted: string};
    total_discounted: {formatted: string};
    quantity: number;
    min_purchase_quantity: number;
    max_purchase_quantity: number;
    stock_position: StockPosition;
}

/** `{{assignVar "key" 1}}` / `{{assignVar "key" 0}}` as the two branches of an `all`. */
const assignBranch = (key: string, test: Parameters<typeof $All>[0]["values"]) => (
    <$All
        values={test}
        $then={() => <$AssignVar keyName={$string(key)} value={$number(1)} />}
        $else={() => <$AssignVar keyName={$string(key)} value={$number(0)} />}
    />
);

export default (_props: PartialProps) => (
    <table className="cart mb-single w-full [display:block] medium:[display:table]" data-cart-quantity={$pointer("cart.quantity")}>
        <thead className="cart-header [display:none] medium:text-left medium:[display:table-header-group]">
            <tr>
                <th className="cart-header-item pb-base medium:p-single last:text-right" colSpan={2}>
                    <$Lang keyName={$string("cart.checkout.item")} />
                </th>
                <th className="cart-header-item pb-base medium:p-single last:text-right">
                    <$Lang keyName={$string("cart.checkout.price")} />
                </th>
                <th className="cart-header-item cart-header-quantity pb-base medium:w-4/12 medium:p-single medium:text-left">
                    <$Lang keyName={$string("cart.checkout.quantity")} />
                </th>
                <th className="cart-header-item pb-base medium:p-single last:text-right">
                    <$Lang keyName={$string("cart.checkout.total")} />
                </th>
            </tr>
        </thead>
        <tbody className="cart-list border-t border-container-border [display:block] medium:[display:table-row-group]">
            <$Each
                list={$pointer<Item[]>("cart.items")}
                $then={(item) => (
                    <tr className="cart-item clear-both border-b border-container-border py-single [display:block] small:flow-root small:pl-[25%] medium:pl-0 medium:[display:table-row]" data-item-row={""}>
                        <td className="cart-item-block cart-item-figure relative float-left mb-single w-4/12 text-center [display:block] after:absolute after:top-0 after:left-0 after:h-full after:w-full after:content-[''] after:[display:block] small:mb-0 small:-ml-[33.3333%] [&_.cart-item-image]:max-h-[14rem] [&_.cart-item-image]:max-w-[100px] medium:float-none medium:w-1/12 medium:p-single medium:align-top medium:[display:table-cell] medium:[&_.cart-item-image]:ml-0">
                            <$If
                                test={$pointer("type")}
                                operator={$string("==")}
                                rvalue={$string("GiftCertificate")}
                                $then={() => (
                                    <>
                                        <img
                                            className="cart-item-fixed-image w-full"
                                            src={$cdn($pointer("../theme_settings.default_image_gift_certificate"))}
                                            alt={$lang($string("cart.gift_certificates.gift_certificate"))}
                                            title={$lang($string("cart.gift_certificates.gift_certificate"))}
                                        />
                                    </>
                                )}
                                $else={() => (
                                    <>
                                        <ResponsiveImg image={$pointer("image")} class={$string("cart-item-image")} fallback_size={$pointer("../theme_settings.productthumb_size")} lazyload={$string("lazyload")} default_image={$pointer("../theme_settings.default_image_product")} />
                                    </>
                                )}
                            />
                        </td>
                        <td className="cart-item-block cart-item-title h-[100px] pl-single [display:table-cell] small:mb-single small:h-auto small:overflow-hidden small:[display:block] medium:p-single medium:align-top medium:[display:table-cell]">
                            <$If test={item.brand.name} $then={() => <p className="mb-eighth text-text-secondary">{item.brand.name}</p>} />
                            <h2 className="cart-item-name inline-block m-0 text-smaller [&+.definitionList]:mt-quarter">
                                <a className="inline-block" href={item.url}>
                                    {item.name}
                                </a>
                            </h2>
                            <$If test={item.release_date} $then={() => <p>({item.release_date})</p>} />

                            <$If
                                test={item.options}
                                $then={() => (
                                    <>
                                        <dl className="definitionList mb-quarter">
                                            <$Each
                                                list={item.options}
                                                $then={(option) => (
                                                    <>
                                                        <dt className="definitionList-key">{option.name}:</dt>
                                                        <dd className="definitionList-value">
                                                            <$If
                                                                test={option.is_file}
                                                                $then={() => (
                                                                    <a
                                                                        dangerouslyInlineAttributes={{attributes: `href="/viewfile.php?attributeId=${$pointer("id")}&cartitem=${$pointer("../id")}"`}}
                                                                    >
                                                                        {$pointer("value")}
                                                                    </a>
                                                                )}
                                                                $else={() => <ProductOptions />}
                                                            />
                                                        </dd>
                                                    </>
                                                )}
                                            />
                                        </dl>

                                        <$If
                                            test={item.can_modify}
                                            $then={() => (
                                                <a
                                                    href="#"
                                                    data-item-edit={item.id}
                                                    data-product-id={item.product_id}
                                                    aria-label={$lang($string("products.change_product_options"), {name: item.name})}
                                                >
                                                    <$Lang keyName={$string("common.change")} />
                                                </a>
                                            )}
                                        />
                                    </>
                                )}
                            />

                            <$If
                                test={$pointer("type")}
                                operator={$string("==")}
                                rvalue={$string("GiftCertificate")}
                                $then={() => (
                                    <>
                                        <a href={item.edit_url} aria-label={$lang($string("cart.gift_certificates.change_gift_certificate"), {certificate_name: item.name})}>
                                            <$Lang keyName={$string("common.change")} />
                                        </a>
                                    </>
                                )}
                            />
                            <CartItemGiftwrap $positionalHash={item} />
                            <$If
                                test={item.event_date}
                                $then={() => (
                                    <dl className="cart-item-options">
                                        <dt className="cart-item-option-title">{item.event_date.name}</dt>

                                        <dd className="cart-item-option-description">{item.event_date.date}</dd>
                                    </dl>
                                )}
                            />
                        </td>
                        <td className="cart-item-block cart-item-info clear-both w-full small:float-left small:clear-none small:w-4/12 small:overflow-hidden small:[.cart-item-info+&]:mt-0 [display:block] medium:float-none medium:p-single medium:align-top medium:[display:table-cell] medium:w-1/12 medium:last:w-2/12 medium:last:text-right">
                            <span className="cart-item-label float-left mb-quarter w-4/12 text-right text-text-base small:block small:w-full small:pl-single small:text-left medium:hidden">
                                <$Lang keyName={$string("cart.checkout.price")} />
                            </span>
                            <$Or values={[$pointer("../customer"), $unlessExpression($pointer("../settings.hide_price_from_guests")), $ifExpression($pointer("type"), $string("=="), $string("GiftCertificate"))]} $then={() => (<><span className={`cart-item-value pl-single medium:pl-0 ${$If({test: item.price_discounted, $then: () => "price--discounted"})}`}>{item.price.formatted}</span>
                            <$If test={item.price_discounted} $then={() => <span className="cart-item-value pl-single medium:pl-0">{item.price_discounted.formatted}</span>} /></>)} $else={() => (<><LoginForPricing /></>)} />
                        </td>

                        <td className="cart-item-block cart-item-info cart-item-quantity clear-both w-full small:float-left small:clear-none small:w-4/12 small:overflow-hidden small:[.cart-item-info+&]:mt-0 [display:block] medium:float-none medium:p-single medium:align-top medium:[display:table-cell] medium:w-4/12 medium:text-left">
                            <label className="form-label cart-item-label float-left mb-quarter w-4/12 text-right text-text-base small:block small:w-full small:pl-single small:text-left medium:hidden" htmlFor={`qty-${item.id}`}>
                                <$Lang keyName={$string("products.quantity")} />
                            </label>
                            <div className="form-increment mr-eighth mb-[1px] ml-single inline-block align-middle medium:ml-0">
                                <$If
                                    test={item.can_modify}
                                    $then={() => (
                                        <button className="button button--icon" data-cart-update={""} data-cart-itemid={item.id} data-action="dec">
                                            <span className="is-srOnly">
                                                <$Lang keyName={$string("products.quantity_decrease")} name={item.name} />
                                            </span>
                                            <i className="icon" aria-hidden="true">
                                                <svg>
                                                    <use href="#icon-keyboard-arrow-down" />
                                                </svg>
                                            </i>
                                        </button>
                                    )}
                                />
                                <input
                                    className="form-input form-input--incrementTotal cart-item-qty-input"
                                    id={`qty-${item.id}`}
                                    type="tel"
                                    data-quantity-min={item.min_purchase_quantity}
                                    data-quantity-max={item.max_purchase_quantity}
                                    data-quantity-min-error={$lang($string("products.quantity_min"), {quantity: item.min_purchase_quantity})}
                                    data-quantity-max-error={$lang($string("products.quantity_max"), {quantity: item.max_purchase_quantity})}
                                    min="1"
                                    pattern="[0-9]*"
                                    data-cart-itemid={item.id}
                                    data-action="manualQtyChange"
                                    aria-label={item.name}
                                    aria-live="polite"
                                    dangerouslyInlineAttributes={{attributes: `name="qty-${item.id}" value="${item.quantity}"${$Unless({test: item.can_modify, $then: () => " disabled"})}`}}
                                />
                                <$If
                                    test={item.can_modify}
                                    $then={() => (
                                        <button className="button button--icon" data-cart-update={""} data-cart-itemid={item.id} data-action="inc">
                                            <span className="is-srOnly">
                                                <$Lang keyName={$string("products.quantity_increase")} name={item.name} />
                                            </span>
                                            <i className="icon" aria-hidden="true">
                                                <svg>
                                                    <use href="#icon-keyboard-arrow-up" />
                                                </svg>
                                            </i>
                                        </button>
                                    )}
                                />
                            </div>
                            <$If
                                test={item.stock_position}
                                $then={() => (
                                    <>
                                        <$If
                                            test={$pointer<boolean>("../cart.inventory_settings.show_quantity_on_hand")}
                                            $then={() => (
                                                <$All
                                                    values={[item.stock_position.quantity_on_hand, item.stock_position.quantity_backordered]}
                                                    $then={() => (
                                                        <p className="cart-item-backorder-message mb-0 ml-[calc(33.3333%+var(--spacing-single))] text-left small:ml-single medium:ml-0">
                                                            <$Lang keyName={$string("products.quantity_on_hand")} quantity={item.stock_position.quantity_on_hand} />
                                                        </p>
                                                    )}
                                                />
                                            )}
                                        />
                                        <$If
                                            test={$pointer<boolean>("../cart.inventory_settings.show_quantity_on_backorder")}
                                            $then={() => (
                                                <$If
                                                    test={item.stock_position.quantity_backordered}
                                                    $then={() => (
                                                        <p className="cart-item-backorder-message mb-0 ml-[calc(33.3333%+var(--spacing-single))] text-left small:ml-single medium:ml-0">
                                                            <$Lang keyName={$string("products.quantity_backordered")} quantity={item.stock_position.quantity_backordered} />
                                                        </p>
                                                    )}
                                                />
                                            )}
                                        />
                                        <$If
                                            test={$pointer<boolean>("../cart.inventory_settings.show_backorder_message")}
                                            $then={() => (
                                                <$If
                                                    test={item.stock_position.backorder_message}
                                                    $then={() => <p className="cart-item-backorder-message mb-0 ml-[calc(33.3333%+var(--spacing-single))] text-left small:ml-single medium:ml-0">{item.stock_position.backorder_message}</p>}
                                                />
                                            )}
                                        />
                                        <$Each
                                            list={item.options}
                                            $then={(option) => (
                                                <$If
                                                    test={option.linked_bundled_item}
                                                    $then={() => {
                                                        const stock = option.linked_bundled_item.stock_position;
                                                        return (
                                                            <>
                                                                {assignBranch("showOnHandQty", [
                                                                    $pointer<boolean>("../../cart.inventory_settings.show_quantity_on_hand"),
                                                                    stock.quantity_on_hand,
                                                                    stock.quantity_backordered,
                                                                ])}
                                                                {" "}
                                                                {assignBranch("showBackorderedQty", [
                                                                    $pointer<boolean>("../../cart.inventory_settings.show_quantity_on_backorder"),
                                                                    stock.quantity_backordered,
                                                                ])}
                                                                {" "}
                                                                {assignBranch("showBackorderMessage", [
                                                                    $pointer<boolean>("../../cart.inventory_settings.show_backorder_message"),
                                                                    stock.backorder_message,
                                                                ])}
                                                                <$Or
                                                                    values={[$getVar($string("showOnHandQty")), $getVar($string("showBackorderedQty")), $getVar($string("showBackorderMessage"))]}
                                                                    $then={() => (
                                                                        <div className="cart-item-option-stock mt-half ml-[calc(33.3333%+var(--spacing-single))] text-left small:ml-single medium:ml-0">
                                                                            <p className="cart-item-backorder-message mb-0 ml-0 text-left">
                                                                                <strong>{option.name}:</strong>
                                                                            </p>
                                                                            <$If
                                                                                test={$getVar($string("showOnHandQty"))}
                                                                                $then={() => (
                                                                                    <p className="cart-item-backorder-message mb-0 ml-0 text-left">
                                                                                        <$Lang keyName={$string("products.quantity_on_hand")} quantity={stock.quantity_on_hand} />
                                                                                    </p>
                                                                                )}
                                                                            />
                                                                            <$If
                                                                                test={$getVar($string("showBackorderedQty"))}
                                                                                $then={() => (
                                                                                    <p className="cart-item-backorder-message mb-0 ml-0 text-left">
                                                                                        <$Lang keyName={$string("products.quantity_backordered")} quantity={stock.quantity_backordered} />
                                                                                    </p>
                                                                                )}
                                                                            />
                                                                            <$If
                                                                                test={$getVar($string("showBackorderMessage"))}
                                                                                $then={() => <p className="cart-item-backorder-message mb-0 ml-0 text-left">{stock.backorder_message}</p>}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                />
                                                            </>
                                                        );
                                                    }}
                                                />
                                            )}
                                        />
                                    </>
                                )}
                            />
                        </td>

                        <td className="cart-item-block cart-item-info clear-both w-full small:float-left small:clear-none small:w-4/12 small:overflow-hidden small:[.cart-item-info+&]:mt-0 [display:block] medium:float-none medium:p-single medium:align-top medium:[display:table-cell] medium:w-1/12 medium:last:w-2/12 medium:last:text-right">
                            <span className="cart-item-label float-left mb-quarter w-4/12 text-right text-text-base small:block small:w-full small:pl-single small:text-left medium:hidden">
                                <$Lang keyName={$string("cart.checkout.total")} />
                            </span>
                            <$Or values={[$pointer("../customer"), $unlessExpression($pointer("../settings.hide_price_from_guests")), $ifExpression($pointer("type"), $string("=="), $string("GiftCertificate"))]} $then={() => (<><strong className={`cart-item-value pl-single medium:pl-0 ${$If({test: item.total_discounted, $then: () => "price--discounted"})}`}>{item.total.formatted}</strong>
                            <$If test={item.total_discounted} $then={() => <strong className="cart-item-value pl-single medium:pl-0">{item.total_discounted.formatted}</strong>} /></>)} $else={() => (<>--</>)} />
                            <$Or values={[$pointer("can_modify"), $ifExpression($pointer("type"), $string("=="), $string("GiftCertificate"))]} $then={() => (<><button
                                className="cart-remove float-right mt-[2px] size-[18px] cursor-pointer rounded-[50%] bg-fill-dark p-eighth transition-[background-color] duration-150 ease-[ease] small:ml-base [&>svg]:fill-icon icon"
                                data-cart-itemid={item.id}
                                data-confirm-delete={$lang($string("cart.confirm_delete"))}
                                aria-label={$lang($string("cart.remove_item"), {name: item.name})}
                            >
                                <svg aria-hidden="true">
                                    <use href="#icon-close"></use>
                                </svg>
                            </button></>)} />
                        </td>
                    </tr>
                )}
            />
        </tbody>
    </table>
);
