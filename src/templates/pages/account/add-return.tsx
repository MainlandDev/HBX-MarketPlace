import AccountNavigation from "../../components/account/navigation.tsx";
import type {ReturnProduct} from "@mainlanddev/hbx-bigcommerce";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import {$Each, $For, $If, $Lang, $lang, $number, $Page, $pointer, $sanitize, $string, $this, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormField, FormInput, FormLabel, FormSelect} from "../../../server/formParts.tsx";

// The library's context types have no `forms.return` key yet; these shapes type the pointers used here.
export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                        <$Lang keyName={$string("account.returns.new_return")} />
                    </h1>
                    <AccountNavigation account_page={$string("returns")} />

                    <main className="account account--fixed mb-single medium:mx-auto medium:mb-0 medium:w-2/3 account--addReturn rounded-card border-[0.8px] border-solid border-[#ddd] bg-white p-[12px] text-[#000] shadow-[0_3px_5px_#ddd]">
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
                                            className="form [:where(&)]:[margin:var(--sv-form-margin)]"
                                            method="post"
                                            data-account-return-form-error={$lang($string("account.returns.error_no_qty"))}
                                            data-account-return-form={""}
                                        >
                                            <fieldset className="form-fieldset [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
                                                <input type="hidden" name="order_id" value={$pointer("forms.return.order_id")} />
                                                <table className="table table--line [:where(&)]:w-(--sv-table-width) [:where(&)]:mb-(--sv-table-margin-bottom) [:where(&)]:[table-layout:var(--sv-table-layout)] [:where(&_tr_th,&_tr_td)]:py-half [:where(&_tr_th,&_tr_td)]:px-single [:where(&_tr_th,&_tr_td)]:[text-align:left] [:where(&_thead_tr_th,&_thead_tr_td)]:text-(length:--sv-table-head-font-size) [:where(&_thead_tr_th)]:font-(weight:--sv-table-head-font-weight) [:where(&_tr_th,&_tr_td)]:[display:var(--sv-table-display)] [:where(&_th.table-header--numericData,&_td.table-cell--numericData)]:[text-align:var(--sv-table-numericData-textAlign)] mt-[2rem] border-x-0 border-t-0 border-b border-container-border [display:block] mb-double small:[display:table] small:mb-[calc(var(--sv-spacing-double)*2)]">
                                                    <thead className="table-thead border-x-0 border-t-0 border-b border-container-border bg-(--sv-setting-body-bg) [display:none] small:[display:table-header-group]">
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
                                                    <tbody className="table-tbody [:where(&>tr)]:[border-bottom:var(--sv-table-row-border)] [:where(&>tr:last-child)]:[border-bottom:0] [display:block] small:[display:table-row-group]">
                                                        <$Each
                                                            list={$pointer<ReturnProduct[]>("forms.return.order_products")}
                                                            $then={(product) => (
                                                                <tr className="py-single small:p-0 [display:block] small:[display:table-row]">
                                                                    <td className="return-itemName p-0 text-smaller font-bold [display:block] small:[display:table-cell] small:py-half small:text-base small:font-normal">
                                                                        <span className="return-itemTitle">{product.name}</span>
                                                                        <$If
                                                                            test={product.options}
                                                                            $then={() => (
                                                                                <dl className="definitionList flow-root mt-eighth">
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
                                                                        <FormLabel className="[display:inline] mr-quarter small:absolute small:size-px small:overflow-hidden small:border-0 small:p-0 small:[clip:rect(1px,1px,1px,1px)]">
                                                                            <$Lang keyName={$string("account.orders.return.quantity")} />:
                                                                        </FormLabel>
                                                                        <FormSelect
                                                                            className="form-select--small form-select--short h-[2.28571rem] max-w-[6rem] w-[4.5rem] py-[0.57143rem] pr-[2rem] pl-[0.78571rem] text-[13px] leading-[1rem] [background-position:right_0.5rem_top_0.5rem] [background-size:1.28571rem]"
                                                                            name={`return_qty[${product.id}]`}
                                                                        >
                                                                            <$For
                                                                                from={$number(0)}
                                                                                to={product.quantity}
                                                                                $then={(ctx) => (
                                                                                    <option value={ctx.$index}>{ctx.$index}</option>
                                                                                )}
                                                                            />
                                                                        </FormSelect>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        />
                                                    </tbody>
                                                </table>
                                            </fieldset>
                                            <div className="account--addReturn-row -mx-base flow-root w-auto max-w-none">
                                                <fieldset className="form-fieldset account--addReturn-column float-left w-full px-base small:w-1/2 [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
                                                    <FormField>
                                                        <FormLabel htmlFor="return_reason" className="[&_small]:float-right [&_small]:mt-quarter">
                                                            <$Lang keyName={$string("account.orders.return.reason")} />{" "}
                                                            <small>
                                                                <$Lang keyName={$string("common.required")} />
                                                            </small>
                                                        </FormLabel>
                                                        <FormSelect name="return_reason" id="return_reason">
                                                            <$Each
                                                                list={$pointer<string[]>("forms.return.reasons")}
                                                                $then={() => (
                                                                    <option value={$this<string>()}>{$this<string>()}</option>
                                                                )}
                                                            />
                                                        </FormSelect>
                                                    </FormField>
                                                    <FormField>
                                                        <FormLabel htmlFor="return_action" className="[&_small]:float-right [&_small]:mt-quarter">
                                                            <$Lang keyName={$string("account.orders.return.action")} />
                                                        </FormLabel>
                                                        <FormSelect name="return_action" id="return_action">
                                                            <$Each
                                                                list={$pointer<string[]>("forms.return.actions")}
                                                                $then={() => (
                                                                    <option value={$this<string>()}>{$this<string>()}</option>
                                                                )}
                                                            />
                                                        </FormSelect>
                                                    </FormField>
                                                </fieldset>
                                                <fieldset className="form-fieldset account--addReturn-column float-left w-full px-base small:w-1/2 [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
                                                    <FormField>
                                                        <FormLabel htmlFor="return_comments" className="[&_small]:float-right [&_small]:mt-quarter">
                                                            <$Lang keyName={$string("account.orders.return.comments")} />
                                                        </FormLabel>
                                                        <FormInput tag="textarea" rows={8} name="return_comments" id="return_comments" />
                                                    </FormField>
                                                </fieldset>
                                            </div>
                                            <div className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-center [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half [:where(&)]:[background:none] [:where(&)]:[border:0] [:where(&)]:text-center xsmall:[:where(&)]:text-left [:where(&>*)]:[display:inline-block] [:where(&>*)]:mb-[1rem] [:where(&>*)]:w-full xsmall:[:where(&>*)]:align-baseline xsmall:[:where(&>*)]:w-auto">
                                                <Button
                                                    tag="input" variant="primary"
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
                                            <Button href={$pointer("urls.account.orders.all")} tag="a">
                                                <$Lang keyName={$string("account.orders.return.back_button")} />
                                            </Button>
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
