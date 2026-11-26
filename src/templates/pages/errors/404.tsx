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
                        <section className="page-content float-none w-full px-gutter-half text-[16px] [&_form]:m-0 [&_fieldset]:m-0 [&_fieldset]:p-0 [&_fieldset]:border-0 [&_.form-field]:m-0 [&_.form-prefixPostfix]:flex-nowrap [&_.form-prefixPostfix]:gap-[12px] [&_.form-input]:!h-[50px] [&_.form-input]:!w-auto [&_.form-input]:flex-1 [&_.form-input]:rounded-full [&_.form-input]:border-brand-dark [&_.form-input]:px-[30px] [&_.button]:!w-auto [&_.button]:!h-[50px] [&_.button]:!m-0 [&_.button]:rounded-full [&_.button]:px-[30px] [&_.button]:font-bold [&_.button]:uppercase">
                            <h1 className="page-heading mx-0 mt-0 mb-[12px] text-center text-[25px] font-normal text-black">
                                <$Lang keyName={$string("page_not_found.page_heading")} />
                            </h1>
                            <p className="mb-[24px] text-center">
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
