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
                            <h1 className="page-heading">
                                <$Lang keyName={$string("page_not_found.page_heading")} />
                            </h1>
                            <p className="u-textAlignCenter">
                                <$Lang keyName={$string("page_not_found.message")} />
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
