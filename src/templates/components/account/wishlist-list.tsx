"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import AlertAlertInfo from "../common/alert/alert-info.tsx";
import {$Each, $If, $Inject, $Lang, $lang, $pointer, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";
import {Button} from "../../../server/formParts.tsx";

interface Wishlist {
    id: string;
    name: string;
    num_items: number;
    is_public: boolean;
    view_url: string;
    delete_url: string;
    share_url: string;
    edit_url: string;
}

export default (_props: PartialProps) => (
    <>
        <table className="table table--line [:where(&)]:w-(--sv-table-width) [:where(&)]:mb-(--sv-table-margin-bottom) [:where(&)]:[table-layout:var(--sv-table-layout)] [:where(&_tr_th,&_tr_td)]:py-half [:where(&_tr_th,&_tr_td)]:px-single [:where(&_tr_th,&_tr_td)]:[text-align:left] [:where(&_thead_tr_th,&_thead_tr_td)]:text-(length:--sv-table-head-font-size) [:where(&_thead_tr_th)]:font-(weight:--sv-table-head-font-weight) [:where(&_tr_th,&_tr_td)]:[display:var(--sv-table-display)] [:where(&_th.table-header--numericData,&_td.table-cell--numericData)]:[text-align:var(--sv-table-numericData-textAlign)] mx-auto mt-[2rem] max-w-(--sv-layout-widthMax) border-x-0 border-t-0 border-b border-container-border">
            <thead className="table-thead border-x-0 border-t-0 border-b border-container-border bg-(--sv-setting-body-bg)">
                <tr>
                    <th className="px-0 small:text-center small:first:text-left small:last:text-right [th+&]:pl-single">
                        <$Lang keyName={$string("account.wishlists.name")} />
                    </th>
                    <th className="px-0 small:text-center small:first:text-left small:last:text-right [th+&]:pl-single">
                        <$Lang keyName={$string("account.wishlists.num_items")} />
                    </th>
                    <th className="px-0 small:text-center small:first:text-left small:last:text-right [th+&]:pl-single">
                        <$Lang keyName={$string("account.wishlists.shared")} />
                    </th>
                    <th className="px-0 small:text-center small:first:text-left small:last:text-right [th+&]:pl-single">
                        <$Lang keyName={$string("account.wishlists.action")} />
                    </th>
                </tr>
            </thead>
            <tbody className="table-tbody [:where(&>tr)]:[border-bottom:var(--sv-table-row-border)] [:where(&>tr:last-child)]:[border-bottom:0]">
                <$Each
                    list={$pointer<Wishlist[]>("customer.wishlists")}
                    $then={(wishlist) => (
                        <tr>
                            <td className="px-0 [display:block] small:text-center small:first:text-left small:last:text-right [td+&]:pl-single">
                                <a href={wishlist.view_url}>{wishlist.name}</a>
                            </td>
                            <td className="px-0 [display:block] small:text-center small:first:text-left small:last:text-right [td+&]:pl-single">{wishlist.num_items}</td>
                            <td className="px-0 [display:block] small:text-center small:first:text-left small:last:text-right [td+&]:pl-single">
                                <$If
                                    test={wishlist.is_public}
                                    $then={() => <$Lang keyName={$string("common.yes")} />}
                                    $else={() => <$Lang keyName={$string("common.no")} />}
                                />
                            </td>
                            <td className="table-actions m-single px-0 text-center [display:block] small:last:text-right [td+&]:pl-single [&_.form]:mb-0 [&_.button]:mx-0 [&_.button]:w-full [&_.button]:[display:block] small:[&_.button]:mb-0 small:[&_.button]:w-auto small:[&_.button]:[display:inline-block] small:[&_.button+.button]:ml-quarter">
                                <form method="post" action={wishlist.delete_url} className="form [:where(&)]:[margin:var(--sv-form-margin)]">
                                    <fieldset className="form-fieldset [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
                                        <$If
                                            test={wishlist.is_public}
                                            $then={() => (
                                                <Button href={wishlist.share_url} tag="a" variant="primary" size="small" role="button">
                                                    <$Lang keyName={$string("common.share")} />
                                                </Button>
                                            )}
                                        />{" "}
                                        <Button href={wishlist.edit_url} tag="a" size="small" data-wishlist={""}>
                                            <$Lang keyName={$string("common.edit")} />
                                        </Button>{" "}
                                        <Button type="submit" value={$lang($string("common.delete"))} tag="input" size="small" data-wishlist-delete={""} />
                                    </fieldset>
                                </form>
                            </td>
                        </tr>
                    )}
                />
            </tbody>
        </table>
        <form method="post" action={$pointer("urls.account.wishlists.delete")} className="form [:where(&)]:[margin:var(--sv-form-margin)]">
            <$Unless
                test={$pointer("customer.wishlists")}
                $then={() => (
                    <p className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-center [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half [:where(&)]:[background:none] [:where(&)]:[border:0] [:where(&)]:text-center xsmall:[:where(&)]:text-left [:where(&>*)]:[display:inline-block] [:where(&>*)]:mb-[1rem] [:where(&>*)]:w-full xsmall:[:where(&>*)]:align-baseline xsmall:[:where(&>*)]:w-auto">
                        <AlertAlertInfo $positionalHash={$lang($string("account.wishlists.you_have_none"))} />
                    </p>
                )}
            />
            <div className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-center [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half [:where(&)]:[background:none] [:where(&)]:[border:0] [:where(&)]:text-center xsmall:[:where(&)]:text-left [:where(&>*)]:[display:inline-block] [:where(&>*)]:mb-[1rem] [:where(&>*)]:w-full xsmall:[:where(&>*)]:align-baseline xsmall:[:where(&>*)]:w-auto">
                <Button href={$pointer("urls.account.wishlists.add")} tag="a" variant="primary" role="button" data-wishlist={""}>
                    <$Lang keyName={$string("account.wishlists.new")} />
                </Button>{" "}
                <$Inject keyName={$string("wishlistDelete")} value={$lang($string("account.wishlists.delete_alert"))} />{" "}
                <$If
                    test={$pointer("customer.wishlists")}
                    $then={() => (
                        <>
                            <$Each
                                list={$pointer<Wishlist[]>("customer.wishlists")}
                                $then={(wishlist) => <input type="hidden" value={wishlist.id} name="deletewishlist[]" />}
                            />
                            <Button type="submit" value={$lang($string("account.wishlists.delete_all"))} tag="input" data-wishlist-delete={""} />
                        </>
                    )}
                />
            </div>
        </form>
    </>
);
