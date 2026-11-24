"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import AlertAlertInfo from "../common/alert/alert-info.tsx";
import {$Each, $If, $Lang, $lang, $pointer, $string, $Unless, $raw} from "@mainlanddev/hbx-bigcommerce";
import {Button} from "../../../server/formParts.tsx";

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
                        <div className="panel panel--address relative text-(length:--sv-fontSize-base)">
                            <div className="panel-body min-h-[250px] p-single small:pb-single-double">
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
                                    <div className="form-actions -mb-half mt-single text-left small:absolute small:bottom-single small:w-auto mx-auto w-full max-w-(--sv-layout-widthMax) flow-root [display:block] [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half [:where(&)]:[background:none] [:where(&)]:[border:0] [:where(&)]:text-center xsmall:[:where(&)]:text-left [:where(&>*)]:[display:inline-block] [:where(&>*)]:mb-[1rem] [:where(&>*)]:w-full xsmall:[:where(&>*)]:align-baseline xsmall:[:where(&>*)]:w-auto">
                                        <Button tag="a" variant="primary" size="small" className="mb-half" href={address.edit_url}>
                                            <$Lang keyName={$string("common.edit")} />
                                        </Button>{" "}
                                        <Button type="submit" size="small" className="secondary mb-half ml-0 mt-0 small:ml-quarter">
                                            <$Lang keyName={$string("common.delete")} />
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </li>
                )}
            />
            <li className="inline-block w-full px-half align-top small:w-1/2 large:w-1/3">
                <a className="group panel panel--address panel--newAddress relative [display:block] text-center text-(length:--sv-fontSize-base) no-underline" href={$pointer("urls.account.add_address")}>
                    <span className="panel-body min-h-[250px] border border-container-border bg-transparent p-single [display:block] small:pb-single-double">
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
