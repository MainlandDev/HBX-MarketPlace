import AccountNavigation from "../../components/account/navigation.tsx";
import AccountWishlistList from "../../components/account/wishlist-list.tsx";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import {$If, $Lang, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <$If
                    test={$pointer("settings.show_wishlist")}
                    $then={() => (
                        <div className="account account--fixedLarge mb-single medium:mx-auto medium:mb-0 medium:w-3/4">
                            <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                            <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                                <$Lang keyName={$string("account.wishlists.heading")} />
                            </h1>
                            <AccountNavigation account_page={$string("wishlists")} />
                            <div className="rounded-card border-[0.8px] border-solid border-[#ddd] bg-white p-[12px] text-[#000] shadow-[0_3px_5px_#ddd]"><AccountWishlistList /></div>
                        </div>
                    )}
                />
            ),
        }}
        layout="layout/base"
    />
);
