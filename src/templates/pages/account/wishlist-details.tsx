import AccountNavigation from "../../components/account/navigation.tsx";
import AccountWishlistItemList from "../../components/account/wishlist-item-list.tsx";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertInfo from "../../components/common/alert/alert-info.tsx";
import {$If, $Lang, $lang, $number, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {FormInput} from "../../../server/formParts.tsx";
import {Panel, PanelBody} from "../../../server/componentParts.tsx";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <div className="account mb-single [&_.pagination]:mt-double [&_.pagination]:text-center [&_.pagination]:text-grey-light" data-pagination-wishlist={""}>
                    <$If
                        test={$pointer("wishlist.is_editable")}
                        $then={() => <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />}
                    />
                    <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                        <$Lang keyName={$string("account.wishlists.view_heading")} name={$pointer("wishlist.name")} />
                    </h1>
                    <$If
                        test={$pointer("wishlist.is_editable")}
                        $then={() => <AccountNavigation account_page={$string("wishlists")} />}
                    />

                    <$If
                        test={$pointer("wishlist.is_editable")}
                        $then={() => (
                            <>
                                <$If
                                    test={$pointer("wishlist.is_public")}
                                    operator={$string(">")}
                                    rvalue={$number(0)}
                                    $then={() => (
                                        <>
                                            <Panel className="share-wishlist mx-auto max-w-[650px] text-center">
                                                <PanelBody>
                                                    <h5>
                                                        <$Lang keyName={$string("account.wishlists.share_intro")} />
                                                    </h5>
                                                    <FormInput value={`${$pointer("settings.base_url")}${$pointer("wishlist.share_url")}`} readOnly={true} />
                                                </PanelBody>
                                            </Panel>
                                        </>
                                    )}
                                />
                            </>
                        )}
                    />

                    <$If
                        test={$pointer("wishlist.items")}
                        $then={() => (
                            <div className="rounded-card border-[0.8px] border-solid border-[#ddd] bg-white p-[12px] text-[#000] shadow-[0_3px_5px_#ddd]">
                                <AccountWishlistItemList show_remove={$pointer("wishlist.is_editable")} />
                            </div>
                        )}
                        $else={() => <AlertAlertInfo $positionalHash={$lang($string("account.wishlists.empty_wishlist"))} />}
                    />
                </div>
            ),
        }}
        layout="layout/base"
    />
);
