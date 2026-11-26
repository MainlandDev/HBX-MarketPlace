import AccountNavigation from "../../components/account/navigation.tsx";
import AccountEditAccount from "../../components/account/edit-account.tsx";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import AlertAlertSuccess from "../../components/common/alert/alert-success.tsx";
import {$If, $Inject, $Lang, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$Inject keyName={$string("passwordRequirements")} value={$pointer("settings.password_requirements")} />
        <$Page
            blocks={{
                page: () => (
                    <div className="account account--fixed mb-single medium:mx-auto medium:mb-0 medium:w-2/3">
                        <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                        <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                            <$Lang keyName={$string("account.settings.heading")} />
                        </h1>
                        <AccountNavigation account_page={$string("settings")} />
                        <$If
                            test={$pointer("forms.edit_account.error")}
                            $then={() => <AlertAlertError $positionalHash={$pointer("forms.edit_account.error")} />}
                        />
                        <$If
                            test={$pointer("forms.edit_account.success")}
                            $then={() => <AlertAlertSuccess $positionalHash={$pointer("forms.edit_account.success")} />}
                        />
                        <div className="rounded-card border-[0.8px] border-solid border-[#ddd] bg-white p-[12px] text-[#000] shadow-[0_3px_5px_#ddd]"><AccountEditAccount /></div>
                    </div>
                ),
            }}
            layout="layout/base"
        />
    </>
);
