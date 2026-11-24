"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $lang, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {FormField, FormInput} from "../../../server/formParts.tsx";
import {ModalBody, NavList} from "../../../server/componentParts.tsx";

interface FacetOption {
    id: string;
    url: string;
    title: string;
    count: number;
    selected: boolean;
}

interface Facet {
    items: FacetOption[];
}

export default (_props: PartialProps) => (
    <ModalBody className="overflow-auto p-(--sv-reveal-modal-padding) [-webkit-overflow-scrolling:touch]">
        <h1 className="facet-quick-heading capitalize">
            <$If
                test={$pointer("facet_title")}
                $then={() => <>{$pointer("facet_title")}</>}
                $else={() => <>{$pointer("all_facets")}</>}
            />
        </h1>
        <FormField id="facetedSearch-filterItems">
            <FormInput type="search" placeholder={$lang($string("forms.search.search"))} />
        </FormField>
        <NavList className="ml-0 facetedSearch-optionColumns [column-count:3] [column-gap:20px]">
            <$Each
                list={$pointer<Facet[]>("facets")}
                $then={() => (
                    <>
                        <$If
                            test={$pointer("facet")}
                            operator={$string("===")}
                            rvalue={$pointer("../all_facets")}
                            $then={() => (
                                <>
                                    <$Each
                                        list={$pointer<FacetOption[]>("items")}
                                        $then={(item) => (
                                            <li className="navList-item [&_.navList-action]:no-underline [&_.navList-action.is-active]:font-bold">
                                                <a
                                                    href={item.url}
                                                    className={`navList-action${$If({test: item.selected, $then: () => " is-active"})}`}
                                                    rel="nofollow"
                                                    data-id={item.id}
                                                    data-faceted-search-facet={""}
                                                >
                                                    {$unescaped(item.title)}{" "}
                                                    <$If
                                                        test={$pointer("../show_product_counts")}
                                                        $then={() => <$If test={item.count} $then={() => <span>({item.count})</span>} />}
                                                    />
                                                </a>
                                            </li>
                                        )}
                                    />
                                </>
                            )}
                        />
                    </>
                )}
            />
        </NavList>
    </ModalBody>
);
