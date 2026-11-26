import AccountNavigation from "../../../components/account/navigation.tsx";
import AccountOrdersList from "../../../components/account/orders-list.tsx";
import Breadcrumbs from "../../../components/common/navigation/breadcrumbs.tsx";
import SmallPaginator from "../../../components/common/navigation/small-paginator.tsx";
import {$frontmatter, $Page, $pointer, $string, $Lang} from "@mainlanddev/hbx-bigcommerce";

export const frontmatter = $frontmatter.other({customer: {orders: {limit: 3}}});

export default () => (
    <$Page
        blocks={{
            page: () => (
                <div className="account mb-single [&_.pagination]:mt-double [&_.pagination]:text-center [&_.pagination]:text-grey-light">
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h2 className="account-heading m-0 border-b border-container-border pb-base title">
                        <$Lang keyName={$string("account.orders.heading")} />
                    </h2>
                    <AccountNavigation account_page={$string("orders")} />
                    <div className="account-row orders-row">
                        <section className="orders rounded-card border-[0.8px] border-solid border-ink-border bg-white p-[12px] text-ink shadow-[0_3px_5px_var(--color-ink-border)]">
                            <AccountOrdersList orders={$pointer("customer.orders")} />
                            <SmallPaginator $positionalHash={$pointer("pagination.orders")} />
                        </section>
                    </div>
                </div>
            ),
        }}
        layout="layout/base"
    />
);
