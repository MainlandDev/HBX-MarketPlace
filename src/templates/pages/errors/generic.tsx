import {$Lang, $Page, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <main className="page -mx-gutter-half w-auto max-w-none flow-root">
                    <section className="page-content page-content--centered float-left w-full px-gutter-half medium:float-none medium:mx-auto medium:w-8/12">
                        <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                            <$Lang keyName={$string("server_error.page_heading")} />
                        </h1>
                        <p className="text-center">
                            <$Lang keyName={$string("server_error.message")} />
                        </p>
                    </section>
                </main>
            ),
        }}
        layout="layout/base"
    />
);
