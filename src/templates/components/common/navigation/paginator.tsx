"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $pointer, $raw, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";
import {Icon} from "../../../../server/formParts.tsx";
import {PaginationItem, PaginationList} from "../../../../server/componentParts.tsx";

interface PageLink {
    number: string;
    url: string;
}

export default (_props: PartialProps) => (
    <nav className="pagination" aria-label="pagination">
        <PaginationList className="flow-root text-[0px] mb-single text-center">
            <$If
                test={$pointer("previous")}
                $then={() => (
                    <PaginationItem className="pagination-item--previous float-left inline-block border border-transparent leading-none [&>a]:text-(--sv-pagination-item-previousNext-color) [&>a:hover]:text-(--sv-pagination-item-previousNext-color-hover) [&>a:hover_.icon>svg]:fill-(--sv-pagination-item-previousNext-color-hover)">
                        <a
                            className="pagination-link no-underline [transition:all_0.2s_ease] hover:text-(--sv-pagination-link-color-hover)"
                            href={$pointer("previous")}
                            dangerouslyInlineAttributes={{
                                attributes: `${$Unless({test: $pointer("reload"), $then: () => "data-faceted-search-facet"})} aria-label="${$lang($string("common.previous"))}"`,
                            }}
                        >
                            <Icon className="-mt-[2px] -ml-[12px] size-[20px]" aria-hidden="true">
                                <svg>
                                    <use href="#icon-chevron-left"></use>
                                </svg>
                            </Icon>
                            <$Lang keyName={$string("common.previous")} />
                        </a>
                    </PaginationItem>
                )}
            />
            <$Each
                list={$pointer<PageLink[]>("links")}
                $then={(link) => {
                    const anchor = (
                        <a
                            className="pagination-link no-underline [transition:all_0.2s_ease] hover:text-(--sv-pagination-link-color-hover)"
                            href={link.url}
                            dangerouslyInlineAttributes={{
                                attributes: `${$Unless({test: $pointer("reload"), $then: () => "data-faceted-search-facet"})} ${$If({test: $pointer("this.number"), operator: $string("=="), rvalue: $pointer("../current"), $then: () => $raw('aria-current="page" data-pagination-current-page-link')})} aria-label="${$lang($string("common.paginator.page_of"), {current: $pointer("this.number"), total: $pointer("../links.length")})}"`,
                            }}
                        >
                            {link.number}
                        </a>
                    );
                    return (
                        <$If
                            test={$pointer("this.number")}
                            operator={$string("==")}
                            rvalue={$pointer("../current")}
                            $then={() => <PaginationItem className="first:ml-0 inline-block border leading-none border-(--sv-pagination-link-current-borderColor) mr-[0.35714rem] ml-[0.78571rem] rounded-[4px]" current={true}>{anchor}</PaginationItem>}
                            $else={() => <PaginationItem className="inline-block border border-transparent leading-none">{anchor}</PaginationItem>}
                        />
                    );
                }}
            />
            <$If
                test={$pointer("next")}
                $then={() => (
                    <PaginationItem className="pagination-item--next float-right inline-block border border-transparent leading-none [&>a]:text-(--sv-pagination-item-previousNext-color) [&>a:hover]:text-(--sv-pagination-item-previousNext-color-hover) [&>a:hover_.icon>svg]:fill-(--sv-pagination-item-previousNext-color-hover)">
                        <a
                            className="pagination-link no-underline [transition:all_0.2s_ease] hover:text-(--sv-pagination-link-color-hover)"
                            href={$pointer("next")}
                            dangerouslyInlineAttributes={{
                                attributes: `${$Unless({test: $pointer("reload"), $then: () => "data-faceted-search-facet"})} aria-label="${$lang($string("common.next"))}"`,
                            }}
                        >
                            <$Lang keyName={$string("common.next")} />
                            <Icon className="-mt-[2px] -mr-[12px] size-[20px]" aria-hidden="true">
                                <svg>
                                    <use href="#icon-chevron-right"></use>
                                </svg>
                            </Icon>
                        </a>
                    </PaginationItem>
                )}
            />
        </PaginationList>
    </nav>
);
