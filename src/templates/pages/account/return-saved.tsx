import AccountNavigation from "../../components/account/navigation.tsx";
import Breadcrumbs from "../../components/common/navigation/breadcrumbs.tsx";
import {$If, $Lang, $Nl2br, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

// LIBRARY GAP: `return` is not in the library context types, so `return.instructions` (return-saved.html) is read with a
// plain `$pointer<string>` and no local shape.
export default () => (
    <$Page
        blocks={{
            page: () => (
                <div className="account mb-single">
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                        <$Lang keyName={$string("account.returns.heading")} />
                    </h1>
                    <AccountNavigation account_page={$string("returns")} />
                    <div className="account-row rounded-card border-[0.8px] border-solid border-ink-border bg-white p-[12px] text-ink shadow-[0_3px_5px_var(--color-ink-border)]">
                        <p>
                            <$Lang keyName={$string("account.returns.successful")} />
                        </p>
                        <$If
                            test={$pointer("return.instructions")}
                            $then={() => (
                                <>
                                    <h3>
                                        <$Lang keyName={$string("account.returns.instructions")} />
                                    </h3>
                                    <p>
                                        <$Nl2br text={$pointer<string>("return.instructions")} />
                                    </p>
                                </>
                            )}
                        />
                    </div>
                </div>
            ),
        }}
        layout="layout/base"
    />
);
