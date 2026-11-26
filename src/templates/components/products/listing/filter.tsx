"use server";
import CategorySortBox from "../../category/sort-box.tsx";
import ProductsPerPage from "../../category/products-per-page.tsx";
import Paginator from "../../common/navigation/paginator.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

// The per-page select shows on category and search pages (brand pages keep a fixed page size in their JS); the top paginator is category-only.
// Live order: sort box, page numbers, per-page select pushed to the right.
export default (_props: PartialProps) => (
    <form className="actionBar [:where(&)]:my-[1.5rem] [:where(&)]:[display:flow-root] medium:[&.actionBar]:flex medium:[&.actionBar]:items-start medium:[&.actionBar]:gap-single" method="get" data-sort-by="product">
        <CategorySortBox sort={$pointer("sort")} />
        <div className="min-w-0 flex-1 [&_.pagination]:m-0 [&_.pagination-list]:m-0 [&_.pagination-list]:flex [&_.pagination-list]:h-[30px] [&_.pagination-list]:items-center empty:[display:none]">
            <$If
                test={$pointer("page_type")}
                operator={$string("===")}
                rvalue={$string("category")}
                $then={() => <Paginator $positionalHash={$pointer("pagination.category")} />}
            />
        </div>
        <$If
            test={$pointer("page_type")}
            operator={$string("!==")}
            rvalue={$string("brand")}
            $then={() => <ProductsPerPage />}
        />
    </form>
);
