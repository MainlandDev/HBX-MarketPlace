import AccountNavigation from "../../components/account/navigation.tsx";
import AccountMessagesList from "../../components/account/messages-list.tsx";
import AccountMessagesForm from "../../components/account/messages-form.tsx";
import Breadcrumbs from "../../components/common/navigation/breadcrumbs.tsx";
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
                        <$Lang keyName={$string("account.messages.heading")} />
                    </h1>
                    <AccountNavigation account_page={$string("messages")} />

                    <main className="account account--fixed mb-single medium:mx-auto medium:mb-0 medium:w-2/3 rounded-card border-[0.8px] border-solid border-ink-border bg-white p-[12px] text-ink shadow-[0_3px_5px_var(--color-ink-border)]">
                        <div className="account-body -mx-gutter-half flow-root w-auto max-w-none">
                            <section className="account-content float-left w-full px-gutter-half">
                                <$If
                                    test={$pointer("forms.inbox.error")}
                                    $then={() => <AlertAlertError $positionalHash={$pointer("forms.inbox.error")} />}
                                />
                                <$If
                                    test={$pointer("forms.inbox.success")}
                                    $then={() => <AlertAlertSuccess $positionalHash={$pointer("forms.inbox.success")} />}
                                />
                                <AccountMessagesList messages={$pointer("customer.inbox.messages")} />
                                <AccountMessagesForm />
                            </section>
                        </div>
                    </main>
                </>
            ),
        }}
        layout="layout/base"
    />
);
