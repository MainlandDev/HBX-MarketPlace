"use server";
import CategorySortBox from "../category/sort-box.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$pointer} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <form className="actionBar [:where(&)]:my-[1.5rem] [:where(&)]:[display:flow-root]" method="get" data-sort-by="product">
        <CategorySortBox sort={$pointer("sort")} />
    </form>
);
