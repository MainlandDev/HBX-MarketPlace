import AccountNavigation from "../../../components/account/navigation.tsx";
import AccountOrdersList from "../../../components/account/orders-list.tsx";
import Breadcrumbs from "../../../components/common/navigation/breadcrumbs.tsx";
import SmallPaginator from "../../../components/common/navigation/small-paginator.tsx";
import AlertAlertInfo from "../../../components/common/alert/alert-info.tsx";
import {$frontmatter, $If, $Lang, $lang, $number, $Page, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {AlertBox} from "../../../../server/componentParts.tsx";

export const frontmatter = $frontmatter.other({customer: {orders: {limit: 10}}});

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                        <$Lang keyName={$string("account.orders.heading")} />
                    </h1>
                    <AccountNavigation account_page={$string("orders")} />

                    <main className="account account--fixed mb-single medium:mx-auto medium:mb-0 medium:w-2/3 rounded-card border-[0.8px] border-solid border-ink-border bg-white p-[12px] text-ink shadow-[0_3px_5px_var(--color-ink-border)] [&_.pagination]:mt-double [&_.pagination]:text-center [&_.pagination]:text-grey-light">
                        <div className="account-head mb-double text-center empty:hidden [&_.alertBox]:px-double [&_.alertBox]:text-left">
                            <$If
                                test={$pointer("customer.store_credit.value")}
                                operator={$string(">")}
                                rvalue={$number(0)}
                                $then={() => (
                                    <>
                                        <AlertBox className="alertBox--storeCredit rounded-[4px] text-(--sv-setting-alert-color)">
                                            {$unescaped(
                                                $lang($string("common.store_credit"), {store_credit: $pointer("customer.store_credit.formatted")}),
                                            )}
                                        </AlertBox>
                                    </>
                                )}
                            />
                        </div>
                        <div className="account-body -mx-gutter-half flow-root w-auto max-w-none">
                            <section className="account-content float-left w-full px-gutter-half">
                                <$If
                                    test={$pointer("customer.orders.length")}
                                    $then={() => (
                                        <>
                                            <AccountOrdersList orders={$pointer("customer.orders")} />
                                            <SmallPaginator $positionalHash={$pointer("pagination.orders")} />
                                        </>
                                    )}
                                    $else={() => <AlertAlertInfo $positionalHash={$lang($string("account.orders.none"))} />}
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
