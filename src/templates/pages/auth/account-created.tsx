import {$lang, $Lang, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {Button} from "../../../server/formParts.tsx";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <main className="page -mx-gutter-half w-auto max-w-none flow-root">
                    <section className="page-content page-content--textCenter float-left w-full px-gutter-half text-center">
                        <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                            <$Lang keyName={$string("create_account.created.heading")} />
                        </h1>
                        <p>
                            {$lang($string("create_account.created.intro"), {
                                store_name: $pointer("settings.store_name"),
                                email: $pointer("customer.email"),
                            })}
                        </p>
                        <Button tag="a" variant="primary" href={$pointer("create_account.continue_url")}>
                            <$Lang keyName={$string("create_account.created.continue")} />
                        </Button>
                    </section>
                </main>
            ),
        }}
        layout="layout/base"
    />
);
