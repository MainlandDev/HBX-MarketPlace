"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <nav className="navBar navBar--sub mb-[calc(var(--sv-spacing-single)*3)] text-center">
        <ul className="navBar-section account-navigation float-none [&_.navBar-item]:float-none [&_.navBar-item]:mx-half [&_.navBar-item]:my-0 medium:[&_.navBar-item]:[display:inline-block] medium:[&_.navBar-item.is-active]:border-b medium:[&_.navBar-item.is-active]:border-b-(--sv-setting-color-textBase) medium:[&_.navBar-item.navBar-item--separate]:m-0 medium:[&_.navBar-item.navBar-item--separate]:border-l medium:[&_.navBar-item.navBar-item--separate]:border-l-(--sv-setting-color-textSecondary) medium:[&_.navBar-item.navBar-item--separate]:pl-half [&_.navBar-item.is-active>.navBar-action]:text-grey-dark">
            <$If
                test={$pointer("gift_page")}
                operator={$string("===")}
                rvalue={$string("purchase")}
                $then={() => (
                    <li className="navBar-item is-active">
                        <$Lang keyName={$string("gift_certificate.purchase.heading")} />
                    </li>
                )}
                $else={() => (
                    <li className="navBar-item">
                        <a className="navBar-action p-0 text-text-secondary text-(length:--sv-fontSize-base) no-underline hover:text-(--sv-setting-color-textSecondary--hover)" href={$pointer("urls.gift_certificate.purchase")}>
                            <$Lang keyName={$string("gift_certificate.purchase.heading")} />
                        </a>
                    </li>
                )}
            />
            <$If
                test={$pointer("gift_page")}
                operator={$string("===")}
                rvalue={$string("redeem")}
                $then={() => (
                    <li className="navBar-item is-active">
                        <$Lang keyName={$string("gift_certificate.redeem.heading")} />
                    </li>
                )}
                $else={() => (
                    <li className="navBar-item">
                        <a className="navBar-action p-0 text-text-secondary text-(length:--sv-fontSize-base) no-underline hover:text-(--sv-setting-color-textSecondary--hover)" href={$pointer("urls.gift_certificate.redeem")}>
                            <$Lang keyName={$string("gift_certificate.redeem.heading")} />
                        </a>
                    </li>
                )}
            />
            <$If
                test={$pointer("gift_page")}
                operator={$string("===")}
                rvalue={$string("balance")}
                $then={() => (
                    <li className="navBar-item is-active">
                        <$Lang keyName={$string("gift_certificate.balance.heading")} />
                    </li>
                )}
                $else={() => (
                    <li className="navBar-item">
                        <a className="navBar-action p-0 text-text-secondary text-(length:--sv-fontSize-base) no-underline hover:text-(--sv-setting-color-textSecondary--hover)" href={$pointer("urls.gift_certificate.balance")}>
                            <$Lang keyName={$string("gift_certificate.balance.heading")} />
                        </a>
                    </li>
                )}
            />
        </ul>
    </nav>
);
