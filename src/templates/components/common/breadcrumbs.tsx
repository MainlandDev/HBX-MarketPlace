"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$add, $Each, $number, $pointer, $raw, $Unless, $If} from "@mainlanddev/hbx-bigcommerce";

interface Breadcrumb {
    url: string;
    name: string;
}

export default (_props: PartialProps) => {
    const theme = $pointer<ThemeSettingsObject>("theme_settings");
    return (
        <>
            <nav aria-label="Breadcrumb">
                <ol className="breadcrumbs [:where(&)]:list-none [:where(&)]:ml-0 [display:none] small:[display:block] overflow-visible text-center text-[0px]">
                    <$Unless
                        test={theme.hide_breadcrumbs}
                        $then={() => (
                            <$Each
                                list={$pointer<Breadcrumb[]>("breadcrumbs")}
                                $then={(crumb, loop) => (
                                    <$If
                                        test={loop["@last"]}
                                        $then={() => (
                                            <li className="breadcrumb [:where(&)]:text-(--sv-crumb-font-color) [:where(&)]:text-(length:--sv-crumb-font-size) [:where(&)]:[line-height:var(--sv-crumb-lineHeight)] [:where(&)]:m-0 [:where(&)]:before:text-(--sv-crumb-slash-color) [:where(&)]:before:relative [:where(&)]:before:top-px first:before:content-['_'] first:before:m-0 float-none mr-[0.25rem] inline-block not-first:before:mx-[0.25rem] not-first:before:inline-block not-first:before:h-[0.8em] not-first:before:border-r-[0.1em] not-first:before:border-r-(--sv-primary-color) not-first:before:[transform:rotate(15deg)] not-first:before:content-[''] is-active">
                                                <a
                                                className="breadcrumb-label cursor-pointer font-bold [:where(&)]:text-(--sv-crumb-font-color-current) [:where(&:hover)]:text-(--sv-crumb-font-color-current) [:where(&:hover)]:no-underline"
                                                href={crumb.url}
                                                dangerouslyInlineAttributes={{attributes: `${$raw('{{#if @last}}aria-current="page"{{/if}}')}`}}
                                            >
                                                <span>{crumb.name}</span>
                                            </a>
                                            </li>
                                        )}
                                        $else={() => (
                                            <li className="breadcrumb [:where(&)]:text-(--sv-crumb-font-color) [:where(&)]:text-(length:--sv-crumb-font-size) [:where(&)]:[line-height:var(--sv-crumb-lineHeight)] [:where(&)]:m-0 [:where(&)]:before:text-(--sv-crumb-slash-color) [:where(&)]:before:relative [:where(&)]:before:top-px first:before:content-['_'] first:before:m-0 float-none mr-[0.25rem] inline-block not-first:before:mx-[0.25rem] not-first:before:inline-block not-first:before:h-[0.8em] not-first:before:border-r-[0.1em] not-first:before:border-r-(--sv-primary-color) not-first:before:[transform:rotate(15deg)] not-first:before:content-['']">
                                                <a
                                                className="breadcrumb-label [:where(&)]:text-(--sv-crumb-font-color) [:where(&)]:cursor-pointer [:where(&:hover)]:text-(--sv-crumb-hover-color) [:where(&:hover)]:no-underline"
                                                href={crumb.url}
                                                dangerouslyInlineAttributes={{attributes: `${$raw('{{#if @last}}aria-current="page"{{/if}}')}`}}
                                            >
                                                <span>{crumb.name}</span>
                                            </a>
                                            </li>
                                        )}
                                    />
                                )}
                            />
                        )}
                    />
                </ol>
            </nav>

            <script
                type="application/ld+json"
                nonce={$pointer("nonce")}
                dangerouslySetInnerHTML={{
                    __html: `
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement":
    [
        ${$Each({
            list: $pointer<Breadcrumb[]>("breadcrumbs"),
            $then: (_crumb, loop) =>
                `${$raw('\n        {\n            "@type": "ListItem",\n            "position": ')}${$add(loop["@index"], $number(1))}${$raw(',\n            "item": {\n                "@id": ')}${$raw("{{{JSONstringify url}}}")}${$raw(',\n                "name": ')}${$raw("{{{JSONstringify name}}}")}${$raw("\n            }\n        }")}${$Unless({test: loop["@last"], $then: () => ","})}${$raw("\n        ")}`,
        })}
    ]
}
`,
                }}
            />
        </>
    );
};
