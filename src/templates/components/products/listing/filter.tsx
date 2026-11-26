"use server";
import CategorySortBox from "../../category/sort-box.tsx";
import ProductsPerPage from "../../category/products-per-page.tsx";
import Paginator from "../../common/paginator.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <form className="actionBar [:where(&)]:my-[1.5rem] [:where(&)]:[display:flow-root]" method="get" data-sort-by="product">
        <CategorySortBox sort={$pointer("sort")} />
        <ProductsPerPage />
        <$If
            test={$pointer("page_type")}
            operator={$string("===")}
            rvalue={$string("category")}
            $then={() => <Paginator $positionalHash={$pointer("pagination.category")} />}
        />
    </form>
);
