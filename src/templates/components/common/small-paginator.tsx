"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Each, $Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";
import {Icon} from "../../../server/formParts.tsx";

interface PageLink {
    link: string;
    number: string;
}

export default (_props: PartialProps) => (
    <div className="pagination" role="region" aria-label={$lang($string("common.pagination"))}>
        <ul className="pagination-list pagination-list--small relative flow-root text-[0px] mb-single text-center">
            <$If
                test={$pointer("previous")}
                $then={() => (
                    <li className="pagination-item pagination-item--previous absolute top-0 left-0 float-left inline-block border border-transparent leading-[1.5] text-(--sv-pagination-list--small-color) [cursor:inherit] [&>a]:text-(--sv-pagination-item-previousNext-color) [&>a:hover]:text-(--sv-pagination-item-previousNext-color-hover) [&>a:hover_.icon>svg]:fill-(--sv-pagination-item-previousNext-color-hover)">
                        <a className="pagination-link px-[0.35714rem] py-0 no-underline [transition:all_0.2s_ease] hover:text-(--sv-pagination-link-color-hover)" href={$pointer("previous")} data-faceted-search-facet={""}>
                            <Icon className="-mt-[2px] -ml-[12px] size-[20px]" aria-hidden="true">
                                <svg>
                                    <use href="#icon-chevron-left"></use>
                                </svg>
                            </Icon>
                            <$Lang keyName={$string("common.previous")} />
                        </a>
                    </li>
                )}
            />

            <$If
                test={$pointer("links.length")}
                $then={() => (
                    <$Each
                        list={$pointer<PageLink[]>("links")}
                        $then={(page) => (
                            <li className="pagination-item inline-block border border-transparent leading-[1.5] text-(--sv-pagination-list--small-color) [cursor:inherit]">
                                <a className="pagination-link px-[0.35714rem] py-0 no-underline [transition:all_0.2s_ease] hover:text-(--sv-pagination-link-color-hover)" href={page.link}>
                                    {page.number}
                                </a>
                            </li>
                        )}
                    />
                )}
            />

            <$If
                test={$pointer("next")}
                $then={() => (
                    <li className="pagination-item pagination-item--next absolute top-0 right-0 float-right inline-block border border-transparent leading-[1.5] text-(--sv-pagination-list--small-color) [cursor:inherit] [&>a]:text-(--sv-pagination-item-previousNext-color) [&>a:hover]:text-(--sv-pagination-item-previousNext-color-hover) [&>a:hover_.icon>svg]:fill-(--sv-pagination-item-previousNext-color-hover)">
                        <a className="pagination-link px-[0.35714rem] py-0 no-underline [transition:all_0.2s_ease] hover:text-(--sv-pagination-link-color-hover)" href={$pointer("next")} data-faceted-search-facet={""}>
                            <$Lang keyName={$string("common.next")} />
                            <Icon className="-mt-[2px] -mr-[12px] size-[20px]" aria-hidden="true">
                                <svg>
                                    <use href="#icon-chevron-right"></use>
                                </svg>
                            </Icon>
                        </a>
                    </li>
                )}
            />
        </ul>
    </div>
);
