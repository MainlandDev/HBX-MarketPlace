"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $pointer, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";

interface Message {
    date: string;
    subject: string;
    unread: boolean;
    is_reply: boolean;
    message: string;
}

export default (_props: PartialProps) => (
    <>
        <h3 className="account-heading m-0 border-b border-container-border pb-base">
            <$Lang keyName={$string("account.messages.heading")} />
        </h3>

        <ul className="account-list ml-0 list-none">
            <$Each
                list={$pointer<Message[]>("messages")}
                $then={(message) => (
                    <li className="account-listItem relative border-b border-container-border py-single">
                        <div className="account-message [&_.is-read]:text-grey-light">
                            <div className="account-orderStatus absolute bottom-0 left-0 small:float-right small:text-right small:[position:inherit]">
                                <span>{message.date}</span>
                            </div>

                            <h5 className={`account-product-title m-0 mb-eighth [text-transform:inherit] [&>a]:no-underline [&+.definitionList]:mt-half ${$Unless({test: message.unread, $then: () => "is-read"})}`}>{message.subject}</h5>
                            <p className={`${$Unless({test: message.unread, $then: () => "is-read"})}`}>
                                <$If
                                    test={message.is_reply}
                                    $then={() => <$Lang keyName={$string("account.messages.merchant_said")} store_name={$pointer("../settings.store_name")} />}
                                    $else={() => <$Lang keyName={$string("account.messages.customer_said")} />}
                                />{" "}
                                {message.message}
                            </p>
                        </div>
                    </li>
                )}
            />
        </ul>
    </>
);
