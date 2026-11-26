"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <nav className="navBar navBar--sub [:where(&)]:[display:flow-root] navBar--account mb-[1rem] text-center [display:none] medium:[display:block]">
        <ul className="navBar-section [:where(&)]:list-none [:where(&)]:m-0 [:where(&)]:p-0 [:where(&)]:[display:flow-root] [:where(&>li)]:m-0 [:where(&>li)]:p-0 [:where(&_.navBar-item)]:[display:block] [:where([class~=navBar-section]+&)]:ml-(--sv-navBar-section-margin) float-none [&_.navBar-item]:float-none [&_.navBar-item]:mx-half [&_.navBar-item]:my-0 medium:[&_.navBar-item]:[display:inline-block] [&_.navBar-item]:rounded-full [&_.navBar-item]:bg-white [&_.navBar-item]:px-[1rem] [&_.navBar-item]:py-[0.5rem] [&_.navBar-item]:shadow-[0_3px_5px_#ddd] [&_.navBar-item.is-active]:bg-brand [&_li.navBar-item.is-active>a.navBar-action.navBar-action]:text-white [&_li.navBar-item.is-active>a.navBar-action.navBar-action]:font-bold [&_li.navBar-item.navBar-item--messages.navBar-item]:[display:none] medium:[&_.navBar-item.is-active]:border-0 medium:[&_.navBar-item.is-active]:border-b medium:[&_.navBar-item.is-active]:border-b-(--sv-setting-color-textBase) medium:[&_.navBar-item.navBar-item--separate]:m-0 medium:[&_.navBar-item.navBar-item--separate]:border-l medium:[&_.navBar-item.navBar-item--separate]:border-l-(--sv-setting-color-textSecondary) medium:[&_.navBar-item.navBar-item--separate]:pl-half [&_.navBar-item.is-active>.navBar-action]:text-grey-dark">
            <li className={`navBar-item ${$If({test: $pointer("account_page"), operator: $string("==="), rvalue: $string("orders"), $then: () => "is-active"})}`}>
                <a className="navBar-action [:where(&)]:[display:block] p-0 text-text-secondary text-(length:--sv-fontSize-base) no-underline hover:text-(--sv-setting-color-textSecondary--hover)" href={$pointer("urls.account.orders.all")}>
                    <$Lang keyName={$string("account.nav.orders")} />
                </a>
            </li>
            <$If
                test={$pointer("settings.returns_enabled")}
                $then={() => (
                    <li className={`navBar-item ${$If({test: $pointer("account_page"), operator: $string("==="), rvalue: $string("returns"), $then: () => "is-active"})}`}>
                        <a className="navBar-action [:where(&)]:[display:block] p-0 text-text-secondary text-(length:--sv-fontSize-base) no-underline hover:text-(--sv-setting-color-textSecondary--hover)" href={$pointer("urls.account.returns")}>
                            <$Lang keyName={$string("account.nav.returns")} />
                        </a>
                    </li>
                )}
            />
            <li className={`navBar-item navBar-item--messages ${$If({test: $pointer("account_page"), operator: $string("==="), rvalue: $string("messages"), $then: () => "is-active"})}`}>
                <a className="navBar-action p-0 text-text-secondary text-(length:--sv-fontSize-base) no-underline hover:text-(--sv-setting-color-textSecondary--hover)" href={$pointer("urls.account.inbox")}>
                    <$Lang keyName={$string("account.nav.messages")} num_new_messages={$pointer("customer.num_new_messages")} />
                </a>
            </li>
            <li className={`navBar-item ${$If({test: $pointer("account_page"), operator: $string("==="), rvalue: $string("addresses"), $then: () => "is-active"})}`}>
                <a className="navBar-action [:where(&)]:[display:block] p-0 text-text-secondary text-(length:--sv-fontSize-base) no-underline hover:text-(--sv-setting-color-textSecondary--hover)" href={$pointer("urls.account.addresses")}>
                    <$Lang keyName={$string("account.nav.addresses")} />
                </a>
            </li>
            <$If
                test={$pointer("settings.show_payment_methods")}
                $then={() => (
                    <li className={`navBar-item ${$If({test: $pointer("account_page"), operator: $string("==="), rvalue: $string("payment_methods"), $then: () => "is-active"})}`}>
                        <a className="navBar-action [:where(&)]:[display:block] p-0 text-text-secondary text-(length:--sv-fontSize-base) no-underline hover:text-(--sv-setting-color-textSecondary--hover)" href={$pointer("urls.account.payment_methods.all")}>
                            <$Lang keyName={$string("account.nav.payment_methods")} />
                        </a>
                    </li>
                )}
            />
            <$If
                test={$pointer("settings.show_wishlist")}
                $then={() => (
                    <li className={`navBar-item ${$If({test: $pointer("account_page"), operator: $string("==="), rvalue: $string("wishlists"), $then: () => "is-active"})}`}>
                        <a className="navBar-action [:where(&)]:[display:block] p-0 text-text-secondary text-(length:--sv-fontSize-base) no-underline hover:text-(--sv-setting-color-textSecondary--hover)" href={$pointer("urls.account.wishlists.all")}>
                            <$Lang keyName={$string("account.nav.wishlists")} />
                        </a>
                    </li>
                )}
            />
            <li className={`navBar-item ${$If({test: $pointer("account_page"), operator: $string("==="), rvalue: $string("recent_items"), $then: () => "is-active"})}`}>
                <a className="navBar-action [:where(&)]:[display:block] p-0 text-text-secondary text-(length:--sv-fontSize-base) no-underline hover:text-(--sv-setting-color-textSecondary--hover)" href={$pointer("urls.account.recent_items")}>
                    <$Lang keyName={$string("account.nav.recently_viewed")} />
                </a>
            </li>
            <li className={`navBar-item ${$If({test: $pointer("account_page"), operator: $string("==="), rvalue: $string("settings"), $then: () => "is-active"})}`}>
                <a className="navBar-action [:where(&)]:[display:block] p-0 text-text-secondary text-(length:--sv-fontSize-base) no-underline hover:text-(--sv-setting-color-textSecondary--hover)" href={$pointer("urls.account.details")}>
                    <$Lang keyName={$string("account.nav.settings")} />
                </a>
            </li>
        </ul>
    </nav>
);
