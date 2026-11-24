import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import SearchBox from "../../components/common/search-box.tsx";
import {$Lang, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />

                    <main className="page -mx-gutter-half w-auto max-w-none flow-root">
                        <section className="page-content page-content--centered float-left w-full px-gutter-half medium:float-none medium:mx-auto medium:w-8/12">
                            <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                                <$Lang keyName={$string("forbidden.page_heading")} />
                            </h1>
                            <p className="u-textAlignCenter">
                                <$Lang keyName={$string("forbidden.if_you_were_signed_in")} />{" "}
                                <a href={$pointer("urls.auth.login")}>
                                    <$Lang keyName={$string("forbidden.sign_in")} />
                                </a>{" "}
                                <$Lang keyName={$string("forbidden.to_continue")} />
                            </p>
                            <SearchBox />
                        </section>
                    </main>
                </>
            ),
        }}
        layout="layout/base"
    />
);
