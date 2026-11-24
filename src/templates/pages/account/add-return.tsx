import AccountNavigation from "../../components/account/navigation.tsx";
import type {ReturnProduct} from "@mainlanddev/hbx-bigcommerce";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import {$Each, $For, $If, $Lang, $lang, $number, $Page, $pointer, $sanitize, $string, $this, $unescaped} from "@mainlanddev/hbx-bigcommerce";

// The library's context types have no `forms.return` key yet; these shapes type the pointers used here.
export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h1 className="page-heading">
                        <$Lang keyName={$string("account.returns.new_return")} />
                    </h1>
                    <AccountNavigation account_page={$string("returns")} />

                    <main className="account account--fixed mb-single medium:mx-auto medium:mb-0 medium:w-2/3 account--addReturn">
                        <div className="account-body -mx-gutter-half flow-root w-auto max-w-none">
                            <section className="account-content float-left w-full px-gutter-half">
                                <h3 className="account-heading m-0 border-b border-container-border pb-base">
                                    <$Lang keyName={$string("account.returns.from_order")} id={$pointer("forms.return.order_id")} />
                                </h3>

                                <$If
                                    test={$pointer("forms.return.order_products.length")}
                                    $then={() => (
                                        <form
                                            action={$pointer("urls.account.orders.save_new_return")}
                                            className="form"
                                            method="post"
                                            data-account-return-form-error={$lang($string("account.returns.error_no_qty"))}
                                            data-account-return-form={""}
                                        >
                                            <fieldset className="form-fieldset">
                                                <input type="hidden" name="order_id" value={$pointer("forms.return.order_id")} />
                                                <table className="table table--line [display:block] mb-double small:[display:table] small:mb-[calc(var(--sv-spacing-double)*2)]">
                                                    <thead className="table-thead [display:none] small:[display:table-header-group]">
                                                        <tr className="py-single small:p-0 [display:block] small:[display:table-row]">
                                                            <th className="return-itemName w-[60%] p-0 text-smaller font-bold [display:block] small:[display:table-cell] small:py-half small:font-normal">
                                                                <$Lang keyName={$string("account.orders.return.order_item")} />
                                                            </th>
                                                            <th className="return-itemPrice mb-quarter p-0 pl-0 text-smaller text-grey-light [display:block] small:[display:table-cell] small:mb-0 small:py-half small:pl-single small:text-center small:text-inherit">
                                                                <$Lang keyName={$string("account.orders.return.item_price")} />
                                                            </th>
                                                            <th className="return-itemQuantity p-0 pl-0 text-smaller [display:block] small:[display:table-cell] small:py-half small:pl-single small:text-right">
                                                                <$Lang keyName={$string("account.orders.return.quantity")} />
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="table-tbody [display:block] small:[display:table-row-group]">
                                                        <$Each
                                                            list={$pointer<ReturnProduct[]>("forms.return.order_products")}
                                                            $then={(product) => (
                                                                <tr className="py-single small:p-0 [display:block] small:[display:table-row]">
                                                                    <td className="return-itemName p-0 text-smaller font-bold [display:block] small:[display:table-cell] small:py-half small:text-base small:font-normal">
                                                                        <span className="return-itemTitle">{product.name}</span>
                                                                        <$If
                                                                            test={product.options}
                                                                            $then={() => (
                                                                                <dl className="definitionList mt-eighth">
                                                                                    <$Each
                                                                                        list={product.options}
                                                                                        $then={(option) => (
                                                                                            <>
                                                                                                <dt className="definitionList-label">{option.name}:</dt>
                                                                                                <dd className="definitionList-description">
                                                                                                    {$unescaped($sanitize(option.value))}
                                                                                                </dd>
                                                                                            </>
                                                                                        )}
                                                                                    />
                                                                                </dl>
                                                                            )}
                                                                        />
                                                                    </td>
                                                                    <td className="return-itemPrice mb-quarter p-0 pl-0 text-grey-light [display:block] small:[display:table-cell] small:mb-0 small:py-half small:pl-single small:text-center small:text-inherit">{product.price.formatted}</td>
                                                                    <td className="return-itemQuantity p-0 pl-0 [display:block] small:[display:table-cell] small:py-half small:pl-single small:text-right">
                                                                        <label className="form-label [display:inline] mr-quarter small:absolute small:size-px small:overflow-hidden small:border-0 small:p-0 small:[clip:rect(1px,1px,1px,1px)]">
                                                                            <$Lang keyName={$string("account.orders.return.quantity")} />:
                                                                        </label>
                                                                        <select
                                                                            className="form-select form-select--small form-select--short"
                                                                            name={`return_qty[${product.id}]`}
                                                                        >
                                                                            <$For
                                                                                from={$number(0)}
                                                                                to={product.quantity}
                                                                                $then={(ctx) => (
                                                                                    <option value={ctx.$index}>{ctx.$index}</option>
                                                                                )}
                                                                            />
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        />
                                                    </tbody>
                                                </table>
                                            </fieldset>
                                            <div className="account--addReturn-row -mx-base flow-root w-auto max-w-none">
                                                <fieldset className="form-fieldset account--addReturn-column float-left w-full px-base small:w-1/2">
                                                    <div className="form-field">
                                                        <label htmlFor="return_reason" className="form-label">
                                                            <$Lang keyName={$string("account.orders.return.reason")} />{" "}
                                                            <small>
                                                                <$Lang keyName={$string("common.required")} />
                                                            </small>
                                                        </label>
                                                        <select name="return_reason" id="return_reason" className="form-select">
                                                            <$Each
                                                                list={$pointer<string[]>("forms.return.reasons")}
                                                                $then={() => (
                                                                    <option value={$this<string>()}>{$this<string>()}</option>
                                                                )}
                                                            />
                                                        </select>
                                                    </div>
                                                    <div className="form-field">
                                                        <label htmlFor="return_action" className="form-label">
                                                            <$Lang keyName={$string("account.orders.return.action")} />
                                                        </label>
                                                        <select name="return_action" id="return_action" className="form-select">
                                                            <$Each
                                                                list={$pointer<string[]>("forms.return.actions")}
                                                                $then={() => (
                                                                    <option value={$this<string>()}>{$this<string>()}</option>
                                                                )}
                                                            />
                                                        </select>
                                                    </div>
                                                </fieldset>
                                                <fieldset className="form-fieldset account--addReturn-column float-left w-full px-base small:w-1/2">
                                                    <div className="form-field">
                                                        <label htmlFor="return_comments" className="form-label">
                                                            <$Lang keyName={$string("account.orders.return.comments")} />
                                                        </label>
                                                        <textarea className="form-input" rows={8} name="return_comments" id="return_comments" />
                                                    </div>
                                                </fieldset>
                                            </div>
                                            <div className="form-actions">
                                                <input
                                                    className="button button--primary"
                                                    type="submit"
                                                    value={$lang($string("account.returns.submit_request"))}
                                                />
                                            </div>
                                        </form>
                                    )}
                                    $else={() => (
                                        <>
                                            <p>
                                                <$Lang keyName={$string("account.orders.return.already_returned")} />
                                            </p>
                                            <a href={$pointer("urls.account.orders.all")} className="button">
                                                <$Lang keyName={$string("account.orders.return.back_button")} />
                                            </a>
                                        </>
                                    )}
                                />
                            </section>
                        </div>
                    </main>
                </>
            ),
        }}
        layout="layout/base"
    />
);
