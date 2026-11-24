"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import AlertAlertInfo from "../common/alert/alert-info.tsx";
import {$Each, $If, $Inject, $Lang, $lang, $pointer, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";

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
        <table className="table table--line mx-auto mt-[2rem] max-w-(--sv-layout-widthMax) border-x-0 border-t-0 border-b border-container-border">
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
            <tbody className="table-tbody">
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
                                <form method="post" action={wishlist.delete_url} className="form">
                                    <fieldset className="form-fieldset">
                                        <$If
                                            test={wishlist.is_public}
                                            $then={() => (
                                                <a href={wishlist.share_url} className="button button--primary button--small" role="button">
                                                    <$Lang keyName={$string("common.share")} />
                                                </a>
                                            )}
                                        />{" "}
                                        <a href={wishlist.edit_url} className="button button--small" data-wishlist={""}>
                                            <$Lang keyName={$string("common.edit")} />
                                        </a>{" "}
                                        <input type="submit" value={$lang($string("common.delete"))} className="button button--small" data-wishlist-delete={""} />
                                    </fieldset>
                                </form>
                            </td>
                        </tr>
                    )}
                />
            </tbody>
        </table>
        <form method="post" action={$pointer("urls.account.wishlists.delete")} className="form">
            <$Unless
                test={$pointer("customer.wishlists")}
                $then={() => (
                    <p className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-center [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half">
                        <AlertAlertInfo $positionalHash={$lang($string("account.wishlists.you_have_none"))} />
                    </p>
                )}
            />
            <div className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-center [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half">
                <a href={$pointer("urls.account.wishlists.add")} className="button button--primary" role="button" data-wishlist={""}>
                    <$Lang keyName={$string("account.wishlists.new")} />
                </a>{" "}
                <$Inject keyName={$string("wishlistDelete")} value={$lang($string("account.wishlists.delete_alert"))} />{" "}
                <$If
                    test={$pointer("customer.wishlists")}
                    $then={() => (
                        <>
                            <$Each
                                list={$pointer<Wishlist[]>("customer.wishlists")}
                                $then={(wishlist) => <input type="hidden" value={wishlist.id} name="deletewishlist[]" />}
                            />
                            <input type="submit" value={$lang($string("account.wishlists.delete_all"))} className="button" data-wishlist-delete={""} />
                        </>
                    )}
                />
            </div>
        </form>
    </>
);
