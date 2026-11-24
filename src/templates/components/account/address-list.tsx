"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import AlertAlertInfo from "../common/alert/alert-info.tsx";
import {$Each, $If, $Lang, $lang, $pointer, $string, $Unless, $raw} from "@mainlanddev/hbx-bigcommerce";

interface Address {
    first_name: string;
    last_name: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    delete_url: string;
    edit_url: string;
}

export default (_props: PartialProps) => (
    <>
        <$Unless
            test={$pointer("customer.addresses")}
            $then={() => <AlertAlertInfo $positionalHash={$lang($string("account.addresses.no_addresses"))} />}
        />
        <ul className="-mx-half list-none text-[0px]">
            <$Each
                list={$pointer<Address[]>("customer.addresses")}
                $then={(address) => (
                    <li className="inline-block w-full px-half align-top small:w-1/2 large:w-1/3">
                        <div className="panel panel--address">
                            <div className="panel-body">
                                <h5 className="m-0 mb-half [text-transform:none]">
                                    {address.first_name} {address.last_name}
                                </h5>
                                <ul className="m-0 mb-half list-none text-smaller">
                                    <li>{address.company}</li>
                                    <li>{address.address1}</li>
                                    <li>{address.address2}</li>
                                    <li>
                                        {address.city}
                                        <$If
                                            test={address.state}
                                            $then={() => (
                                                <>
                                                    {", "}
                                                    {address.state}
                                                </>
                                            )}
                                        />{" "}
                                        {address.zip}
                                    </li>
                                    <li>{address.country}</li>
                                </ul>
                                <$If
                                    test={address.phone}
                                    $then={() => (
                                        <dl className="m-0 mb-half list-none">
                                            <dt className="m-0 inline-block text-(length:--sv-fontSize-base) font-normal text-text-secondary">
                                                <$Lang keyName={$string("account.addresses.phone")} />
                                            </dt>
                                            <dd className="m-0 inline-block text-(length:--sv-fontSize-base)">{address.phone}</dd>
                                        </dl>
                                    )}
                                />
                                <form action={address.delete_url} method="post" data-delete-address={$lang($string("forms.address.confirm_delete"))}>
                                    <div className="form-actions">
                                        <a className="button button--primary button--small" href={address.edit_url}>
                                            <$Lang keyName={$string("common.edit")} />
                                        </a>{" "}
                                        <button type="submit" className="button secondary button--small">
                                            <$Lang keyName={$string("common.delete")} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </li>
                )}
            />
            <li className="inline-block w-full px-half align-top small:w-1/2 large:w-1/3">
                <a className="group panel panel--address panel--newAddress" href={$pointer("urls.account.add_address")}>
                    <span className="panel-body">
                        <span className="absolute top-1/2 left-1/2 [transform:translateX(-50%)_translateY(-55%)]">
                            <span className="text-hero leading-none">{$raw("&plus;")}</span>
                            <h5 className="m-0 [text-transform:none] [transition:all_0.15s_ease] group-hover:text-(--sv-color-textLink-hover)">
                                <$Lang keyName={$string("account.addresses.new_address")} />
                            </h5>
                        </span>
                    </span>
                </a>
            </li>
        </ul>
    </>
);
