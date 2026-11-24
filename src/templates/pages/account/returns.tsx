import AccountNavigation from "../../components/account/navigation.tsx";
import AccountReturnsList from "../../components/account/returns-list.tsx";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertInfo from "../../components/common/alert/alert-info.tsx";
import {$If, $Lang, $lang, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                        <$Lang keyName={$string("account.returns.heading")} />
                    </h1>
                    <AccountNavigation account_page={$string("returns")} />

                    <main className="account account--fixed mb-single medium:mx-auto medium:mb-0 medium:w-2/3">
                        <div className="account-body -mx-gutter-half flow-root w-auto max-w-none">
                            <section className="account-content float-left w-full px-gutter-half">
                                <$If
                                    test={$pointer("customer.returns")}
                                    $then={() => <AccountReturnsList returns={$pointer("customer.returns")} />}
                                    $else={() => <AlertAlertInfo $positionalHash={$lang($string("account.returns.none"))} />}
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
