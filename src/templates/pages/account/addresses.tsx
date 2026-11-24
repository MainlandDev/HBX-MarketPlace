import AccountNavigation from "../../components/account/navigation.tsx";
import AccountAddressList from "../../components/account/address-list.tsx";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import AlertAlertSuccess from "../../components/common/alert/alert-success.tsx";
import {$If, $Lang, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h2 className="page-heading">
                        <$Lang keyName={$string("account.addresses.heading")} />
                    </h2>
                    <AccountNavigation account_page={$string("addresses")} />

                    <div className="account account--fixedLarge mb-single medium:mx-auto medium:mb-0 medium:w-3/4">
                        <div className="account-body -mx-gutter-half flow-root w-auto max-w-none">
                            <$If
                                test={$pointer("customer.error")}
                                $then={() => <AlertAlertError $positionalHash={$pointer("customer.error")} />}
                            />
                            <$If
                                test={$pointer("customer.success")}
                                $then={() => <AlertAlertSuccess $positionalHash={$pointer("customer.success")} />}
                            />
                            <section className="account-content float-left w-full px-gutter-half"><AccountAddressList /></section>
                        </div>
                    </div>
                </>
            ),
        }}
        layout="layout/base"
    />
);
