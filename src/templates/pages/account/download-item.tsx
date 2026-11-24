import AccountNavigation from "../../components/account/navigation.tsx";
import type {DownloadImage, DownloadItem} from "@mainlanddev/hbx-bigcommerce";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import {$Page, $pointer, $string, $getImage, $If, $Each, $Lang, $this} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                        <$Lang keyName={$string("account.orders.downloads.heading")} number={$pointer("downloads.order_id")} />
                    </h1>
                    <AccountNavigation account_page={$string("orders")} />

                    <div className="account account--fixedLarge mb-single medium:mx-auto medium:mb-0 medium:w-3/4">
                        <div className="account-body -mx-gutter-half flow-root w-auto max-w-none">
                            <figure className="account-sidebar float-left w-full px-gutter-half medium:w-1/3 medium:[.account-content--fixedSmall+&]:float-right">
                                <$Each
                                    list={$pointer<unknown[]>("downloads.images")}
                                    $then={() => (
                                        <>
                                            <img
                                                src={$getImage($this<DownloadImage>())}
                                                alt={$pointer<string>("../downloads.product_name")}
                                                title={$pointer<string>("../downloads.product_name")}
                                            />
                                            <figcaption>{$pointer<string>("../downloads.product_name")}</figcaption>
                                        </>
                                    )}
                                />
                            </figure>

                            <section className="account-content account-content--fixed float-left w-full px-gutter-half medium:w-2/3">
                                <p className="account-downloads-summary border-b border-container-border pb-single text-smaller">
                                    <$Lang keyName={$string("account.orders.downloads.download_files_below")} />{" "}
                                    <strong>{$pointer("downloads.product_name")}</strong>
                                </p>

                                <ul className="account-downloadsList ml-0 list-none [&_ul]:mb-0 [&_ul]:list-none [&_ol]:mb-0 [&_ol]:list-none">
                                    <$Each
                                        list={$pointer<DownloadItem[]>("downloads.items")}
                                        $then={(item) => (
                                            <li className="account-downloadsItem mb-single [&>:first-child]:mt-0 [&>:last-child]:mb-0">
                                                <$If
                                                    test={item.expired}
                                                    $then={() => (
                                                        <>
                                                            <h5 className="account-downloadsItem-title mb-eighth text-smaller text-text-secondary [text-transform:inherit]">
                                                                {item.name} <span className="account-downloadsItem-accent">({item.size})</span>
                                                            </h5>
                                                            <p className="account-downloadsItem-availability text-text-secondary">
                                                                <$Lang keyName={$string("account.orders.downloads.expired_content")} />
                                                            </p>
                                                        </>
                                                    )}
                                                    $else={() => (
                                                        <>
                                                            <h5 className="account-downloadsItem-title mb-eighth text-smaller text-text-secondary [text-transform:inherit]">
                                                                <a href={item.url}>{item.name}</a> ({item.size})
                                                            </h5>

                                                            <$If
                                                                test={item.description}
                                                                $then={() => <p className="account-downloadsItem-description mb-0">{item.description}</p>}
                                                            />

                                                            <$If
                                                                test={item.days_remaining}
                                                                $then={() => (
                                                                    <p className="account-downloadsItem-availability text-text-secondary">
                                                                        <$Lang keyName={$string("account.orders.downloads.days_remaining")} number={item.days_remaining} />{" "}
                                                                        <$If
                                                                            test={item.downloads_remaining}
                                                                            $then={() => (
                                                                                <$Lang
                                                                                    keyName={$string("account.orders.downloads.days_or_downloads")}
                                                                                    number={item.downloads_remaining}
                                                                                />
                                                                            )}
                                                                        />{" "}
                                                                        <$Lang keyName={$string("account.orders.downloads.remaining")} />
                                                                    </p>
                                                                )}
                                                                $else={() => (
                                                                    <$If
                                                                        test={item.downloads_remaining}
                                                                        $then={() => (
                                                                            <p className="account-downloadsItem-availability text-text-secondary">
                                                                                <$Lang
                                                                                    keyName={$string("account.orders.downloads.downloads_remaining")}
                                                                                    number={item.downloads_remaining}
                                                                                />
                                                                            </p>
                                                                        )}
                                                                    />
                                                                )}
                                                            />
                                                        </>
                                                    )}
                                                />
                                            </li>
                                        )}
                                    />
                                </ul>
                            </section>
                        </div>
                    </div>
                </>
            ),
        }}
        layout="layout/base"
    />
);
