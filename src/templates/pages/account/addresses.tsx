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
                    <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                        <$Lang keyName={$string("account.addresses.heading")} />
                    </h1>
                    <AccountNavigation account_page={$string("addresses")} />

                    <div className="account account--fixedLarge mb-single medium:mx-auto medium:mb-0 medium:w-3/4 rounded-card border-[0.8px] border-solid border-[#ddd] bg-white p-[12px] text-[#000] shadow-[0_3px_5px_#ddd]">
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
