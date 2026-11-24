import AccountNavigation from "../../components/account/navigation.tsx";
import AccountPaymentMethodsList from "../../components/account/payment-methods-list.tsx";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import {$Lang, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h2 className="page-heading mx-0 mt-0 mb-double text-center">
                        <$Lang keyName={$string("account.payment_methods.heading")} />
                    </h2>
                    <AccountNavigation account_page={$string("payment_methods")} />

                    <div className="account account--fixedLarge mb-single medium:mx-auto medium:mb-0 medium:w-3/4">
                        <div className="account-body -mx-gutter-half flow-root w-auto max-w-none"><AccountPaymentMethodsList /></div>
                    </div>
                </>
            ),
        }}
        layout="layout/base"
    />
);
