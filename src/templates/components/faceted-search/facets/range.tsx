"use server";
import FacetedSearchFacetedSearchNavigation from "../faceted-search-navigation.tsx";
import FacetedSearchRangeForm from "../range-form.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$dashcase, $pointer, $Unless} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div className="accordion-block medium:mt-(--sv-accordion-navList-spacing) first:mt-0 first:[&_.accordion-navigation]:[border-radius:4px_4px_0_0] last:[&_.accordion-navigation]:[border-radius:0_0_4px_4px] last:[&_.accordion-content]:[border-radius:0_0_4px_4px] last:[&_.accordion-navigation]:border-b-0 last:[&_.accordion-navigation.is-open]:border-b-[1px] medium:last:[&_.accordion-navigation.is-open]:border-b-0 last:[&_.accordion-navigation.is-open]:rounded-none">
        <FacetedSearchFacetedSearchNavigation />

        <div
            id={`facetedSearch-content--${$dashcase($pointer("facet"))}`}
            className={`accordion-content${$Unless({test: $pointer("start_collapsed"), $then: () => " is-open"})}`}
        >
            <FacetedSearchRangeForm />
        </div>
    </div>
);
