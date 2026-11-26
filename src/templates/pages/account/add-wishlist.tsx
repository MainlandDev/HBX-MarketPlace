import AccountNavigation from "../../components/account/navigation.tsx";
import AccountAddWishlist from "../../components/account/add-wishlist.tsx";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import {$If, $Lang, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <div className="account mb-single">
                    <$If
                        test={$pointer("settings.show_wishlist")}
                        $then={() => (
                            <>
                                <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                                <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                                    <$If
                                        test={$pointer("forms.wishlist.id")}
                                        $then={() => <$Lang keyName={$string("account.wishlists.edit")} />}
                                        $else={() => (
                                            <$If
                                                test={$pointer("forms.wishlist.action")}
                                                $then={() => <$Lang keyName={$string("account.wishlists.new")} />}
                                                $else={() => <$Lang keyName={$string("account.wishlists.heading")} />}
                                            />
                                        )}
                                    />
                                </h1>
                                <AccountNavigation account_page={$string("wishlists")} />
                                <div className="rounded-card border-[0.8px] border-solid border-[#ddd] bg-white p-[12px] text-[#000] shadow-[0_3px_5px_#ddd]"><AccountAddWishlist /></div>
                            </>
                        )}
                    />
                </div>
            ),
        }}
        layout="layout/base"
    />
);
