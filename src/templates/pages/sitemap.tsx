import SitemapLinks from "../components/sitemap/links.tsx";
import {$Each, $If, $Lang, $Page, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface SitemapSection {
    label: string;
}

interface SitemapLink {
    url: string;
    label: string;
}

export default () => (
    <$Page
        blocks={{
            page: () => (
                <main className="page -mx-gutter-half w-auto max-w-none flow-root px-gutter-half">
                    <h1 className="page-heading mx-0 mt-0 mb-[12px] text-center text-[25px] font-normal text-black">
                        <$Lang keyName={$string("sitemap.page_title")} />
                    </h1>
                    <ul className="m-0 list-none rounded-[10px] border-[0.8px] border-ink-border bg-white p-[18px] text-[16px] text-ink [&_a]:text-brand [&_a]:underline [&_ul]:list-[circle] [&_ul]:pl-[19px] [&_ul_ul]:list-[square] [&_li]:my-[2px]">
                        <$Each
                            list={$pointer<SitemapSection[]>("sitemap")}
                            $then={(section) => (
                                <li>
                                    <h2 className="mt-[24px] mb-[12px] text-[22px] font-bold text-ink">{section.label}</h2>
                                    <ul>
                                        <$Each
                                            list={$pointer<SitemapLink[]>("body")}
                                            $then={(link) => (
                                                <li>
                                                    <a href={link.url}>{link.label}</a>
                                                    <$If
                                                        test={$pointer("children")}
                                                        $then={() => (
                                                            <ul>
                                                                <$Each
                                                                    list={$pointer<unknown[]>("children")}
                                                                    $then={() => <SitemapLinks />}
                                                                />
                                                            </ul>
                                                        )}
                                                    />
                                                </li>
                                            )}
                                        />
                                        <$If
                                            test={$pointer("show_all_link")}
                                            $then={() => (
                                                <li>
                                                    <a href={$pointer("subsection_url")}>
                                                        <$Lang keyName={$string("sitemap.show_all_link")} />
                                                    </a>
                                                </li>
                                            )}
                                        />
                                    </ul>
                                </li>
                            )}
                        />
                    </ul>
                </main>
            ),
        }}
        layout="layout/base"
    />
);
