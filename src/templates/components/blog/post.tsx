"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import ResponsiveImg from "../common/responsive-img.tsx";
import Share from "../common/share.tsx";
import {$Each, $If, $Lang, $lang, $pointer, $string, $unescaped, $raw} from "@mainlanddev/hbx-bigcommerce";

interface Tag {
    url: string;
    name: string;
}

export default (_props: PartialProps) => {
    const settings = $pointer<ThemeSettingsObject>("theme_settings");
    return (
        <article className="blog mb-single medium:m-auto medium:w-full [[class~=blog]+&]:mt-double [[class~=blog]+&]:border-t [[class~=blog]+&]:border-container-border [[class~=blog]+&]:pt-double [&_[class~=socialLinks]]:text-center [&_[class~=addthis_toolbox]]:mt-double">
            <div className="blog-post-figure m-auto text-center medium:w-8/12">
                <$If
                    test={$pointer("post.thumbnail")}
                    $then={() => (
                        <figure className="blog-thumbnail">
                            <a href={$pointer("post.url")}>
                                <ResponsiveImg image={$pointer("post.thumbnail")} fallback_size={settings.blog_size} lazyload={settings.lazyload_mode} />
                            </a>
                        </figure>
                    )}
                />
            </div>

            <div className="blog-post-body mx-auto my-0 w-full text-center small:w-10/12 medium:w-8/12 large:w-6/12">
                <header className="blog-header">
                    <$If
                        test={$pointer("is_blog_post")}
                        $then={() => (
                            <h1 className="blog-title mx-single mt-0 mb-quarter text-large">
                                <a className="no-underline" href={$pointer("post.url")}>{$pointer("post.title")}</a>
                            </h1>
                        )}
                        $else={() => (
                            <h2 className="blog-title mx-single mt-0 mb-quarter text-large">
                                <a className="no-underline" href={$pointer("post.url")}>{$pointer("post.title")}</a>
                            </h2>
                        )}
                    />
                    <p className="blog-date text-center text-text-secondary">
                        <$If
                            test={$pointer("post.author")}
                            $then={() => (
                                <>
                                    <$Lang keyName={$string("blog.posted_by")} name={$pointer("post.author")} />
                                    {" on "}
                                </>
                            )}
                        />
                        {$pointer("post.date_published")}
                    </p>
                </header>

                <div className="blog-post text-left text-smaller">
                    <$If
                        test={$pointer("post.body")}
                        $then={() => <>{$unescaped($pointer("post.body"))}</>}
                        $else={() => (
                            <>
                                {$unescaped($pointer("post.summary"))}
                                <$If
                                    test={$pointer("post.show_read_more")}
                                    $then={() => (
                                        <>
                                            {$raw(" &hellip; ")}
                                            <a
                                                href={$pointer("url")}
                                                aria-label={`${$pointer("post.title")} ${$lang($string("blog.read_more"))}`}
                                            >
                                                <$Lang keyName={$string("blog.read_more")} />
                                            </a>
                                        </>
                                    )}
                                />
                            </>
                        )}
                    />
                </div>

                <$If
                    test={$pointer("show_tags")}
                    $then={() => (
                        <$If
                            test={$pointer("post.tags")}
                            $then={() => (
                                <ul className="tags mt-double text-center text-[0px] [list-style-type:none]">
                                    <$Each
                                        list={$pointer<Tag[]>("post.tags")}
                                        $then={(tag) => (
                                            <li className="tag inline-block text-(length:--sv-tag-fontSize) [&_a]:inline-block [&_a]:p-(--sv-tag-padding) [&_a]:text-(--sv-tag-color) [&_a]:no-underline [&_a]:hover:text-(--sv-tag-color-hover)">
                                                <a href={tag.url}>#{tag.name}</a>
                                            </li>
                                        )}
                                    />
                                </ul>
                            )}
                        />
                    )}
                />

                <Share url={$pointer("post.url")} />
            </div>
        </article>
    );
};
