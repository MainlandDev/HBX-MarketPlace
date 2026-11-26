import AccountNavigation from "../../components/account/navigation.tsx";
import ProductsGrid from "../../components/products/listing/grid.tsx";
import Breadcrumbs from "../../components/common/navigation/breadcrumbs.tsx";
import AlertAlertInfo from "../../components/common/alert/alert-info.tsx";
import {$lang, $Lang, $Page, $pointer, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <div className="account mb-single">
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                        <$Lang keyName={$string("account.recent_items.heading")} />
                    </h1>
                    <AccountNavigation account_page={$string("recent_items")} />

                    <$Unless
                        test={$pointer("customer.recently_viewed_products.items")}
                        $then={() => <AlertAlertInfo $positionalHash={$lang($string("account.recent_items.no_items"))} />}
                    />

                    <div className="rounded-card border-[0.8px] border-solid border-ink-border bg-white p-[12px] text-ink shadow-[0_3px_5px_var(--color-ink-border)]">
                        <ProductsGrid products={$pointer("customer.recently_viewed_products.items")} show_compare={$pointer("customer.recently_viewed_products.show_compare")} />
                    </div>
                </div>
            ),
        }}
        layout="layout/base"
    />
);
