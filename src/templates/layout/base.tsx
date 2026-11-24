import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import {IslandsNoScriptStyle} from "@mainlanddev/hbx-bigcommerce/islands";
import {NOSCRIPT_CSS} from "@vitejs/plugin-islands/runtime/server";
import PolyfillScript from "../components/common/polyfill-script.tsx";
import Header from "../components/common/header.tsx";
import Body from "../components/common/body.tsx";
import Footer from "../components/common/footer.tsx";
import {
    $cdn,
    $getFontsCollection,
    $jsContext,
    $langJson,
    $lang,
    $nonce,
    $pointer,
    $raw,
    $resourceHints,
    $StencilBlock,
    $string,
    $stylesheet,
    $unescaped,
    $inject,
    $wrapper,
} from "@mainlanddev/hbx-bigcommerce";

export default () => {
    const settings = $pointer<ThemeSettingsObject>("theme_settings");
    return (
        <>
            {$raw("<!DOCTYPE html>")}
            <html className="no-js" lang={$pointer("locale_name")}>
                <head>
                    <title>{$pointer("head.title")}</title>
                    {$unescaped($resourceHints())}
                    {" "}
                    {$unescaped($pointer("head.meta_tags"))}
                    {" "}
                    {$unescaped($pointer("head.config"))}
                    <$StencilBlock name={$string("head")} $then={() => " "} />

                    <link href={$unescaped($pointer("head.favicon"))} rel="shortcut icon" />
                    {$raw('<meta name="viewport" content="width=device-width, initial-scale=1">')}
                    {$raw('{{!-- Change document class from no-js to js so we can detect this in css --}}')}

                    <script
                        nonce={$nonce()}
                        dangerouslySetInnerHTML={{
                            __html: `document.documentElement.className = document.documentElement.className.replace('no-js', 'js');`,
                        }}
                    />

                    <PolyfillScript />
                    <script
                        nonce={$nonce()}
                        dangerouslySetInnerHTML={{
                            __html: `window.consentManagerTranslations = \`${$unescaped($langJson($string("consent_manager")))}\`;`,
                        }}
                    />
                    {/* Load Lazysizes script ASAP so images will appear */}

                    {/* Only load visible elements until the onload event fires, after which preload nearby elements. */}
                    <script
                        nonce={$nonce()}
                        dangerouslySetInnerHTML={{
                            __html: `
            window.lazySizesConfig = window.lazySizesConfig || {};
            window.lazySizesConfig.loadMode = 1;`,
                        }}
                    />
                    <script type="module" nonce={$nonce()} async src={$cdn($string("assets/dist/theme-bundle.head_async.js"), {resourceHint: $string("preload"), as: $string("script")})} />

                    {$getFontsCollection({"font-display": $string("block")})}

                    <script type="module" nonce={$nonce()} async src={$cdn($string("assets/dist/theme-bundle.font.js"), {resourceHint: $string("preload"), as: $string("script")})} />

                    {$unescaped($stylesheet($string("/assets/css/theme.css")))}
                    {" "}
                    {$unescaped($pointer("head.scripts"))}

                    {$wrapper($inject($string("zoomSize"), settings.zoom_size), "{{~", "}}")}
                    {$wrapper($inject($string("productSize"), settings.product_size), "{{~", "}}")}
                    {$wrapper($inject($string("genericError"), $lang($string("common.generic_error"))), "{{~", "}}")}
                    {$wrapper($inject($string("urls"), $pointer("urls")), "{{~", "}}")}
                    {$wrapper($inject($string("secureBaseUrl"), $pointer("settings.secure_base_url")), "{{~", "}}")}
                    {$wrapper($inject($string("cartId"), $pointer("cart_id")), "{{~", "}}")}
                    {$wrapper($inject($string("template"), $pointer("template")), "{{~", "}}")}
                    {$wrapper($inject($string("validationDictionaryJSON"), $langJson($string("validation_messages"))), "{{~", "}}")}
                    {$wrapper($inject($string("validationFallbackDictionaryJSON"), $langJson($string("validation_fallback_messages"))), "{{~", "}}")}
                    {$wrapper($inject($string("validationDefaultDictionaryJSON"), $langJson($string("validation_default_messages"))), "{{~", "}}")}
                    {$wrapper($inject($string("carouselArrowAndDotAriaLabel"), $lang($string("carousel.arrow_and_dot_aria_label"))), "{{~", "}}")}
                    {$wrapper($inject($string("carouselActiveDotAriaLabel"), $lang($string("carousel.active_dot_aria_label"))), "{{~", "}}")}
                    {$wrapper($inject($string("carouselContentAnnounceMessage"), $lang($string("carousel.content_announce_message"))), "{{~", "}}")}
                    {$wrapper($inject($string("giftWrappingRemoveMessage"), $lang($string("cart.gift_wrapping.remove_confirm"))), "{{~", "}}")}
                    {/* Scripts off: hide the placeholders of islands that have no-JS content. Last in the head, so it comes after the theme's own CSS. */}
                    <IslandsNoScriptStyle css={NOSCRIPT_CSS} />
                </head>
                <body className="[&.has-activeModal]:overflow-hidden [:where(&:not(.has-activeModal)_.modal-background:not([style*=display]))]:[display:none] [:where(&.has-activeModal_.modal-background:not([style*=display]))]:[display:block] [:where(&_.modal-background)]:fixed [:where(&_.modal-background)]:inset-0 [:where(&_.modal-background)]:z-[1004] [:where(&_.modal-background)]:[background:var(--sv-reveal-overlay-bg)] [:where(&_.form-inlineMessage)]:[display:block] [:where(&_.form-inlineMessage)]:leading-[24px] [:where(&_.form-inlineMessage)]:[margin:var(--sv-form-inlineMessage-margin)] [:where(&_.form-inlineMessage)]:w-full [:where(&_.cart-total_.form-inlineMessage)]:text-left [&.has-activeNavPages]:[overflow:hidden] [&.has-activeNavPages]:[-webkit-overflow-scrolling:auto]">
                    <svg data-src={$cdn($string("img/icon-sprite.svg"))} className="icons-svg-sprite [display:none]"></svg>

                    <Header />
                    <Body />
                    <Footer />

                    <script
                        nonce={$nonce()}
                        dangerouslySetInnerHTML={{
                            __html: `window.__webpack_public_path__ = "${$cdn($string("assets/dist/"))}";`,
                        }}
                    />
                    {/* Exported in app.js */}
                    <script
                        nonce={$nonce()}
                        dangerouslySetInnerHTML={{
                            __html: `
            function onThemeBundleMain() {
                window.stencilBootstrap("${$pointer("page_type")}", ${$jsContext()}).load();

                function browserSupportsFormData() {
                    return typeof FormData !== 'undefined'
                        && !!FormData.prototype.keys;
                }
                function loadFormDataPolyfillScript(src) {
                    var formDataPolyfillScript = document.createElement('script');
                    formDataPolyfillScript.src = src;
                    formDataPolyfillScript.onerror = function () {
                        console.error('Failed to load formData polyfill script ' + src);
                    };
                    document.body.appendChild(formDataPolyfillScript);
                }

                if (!browserSupportsFormData()) {
                    loadFormDataPolyfillScript('${$cdn($string("assets/dist/theme-bundle.polyfill_form_data.js"))}');
                }
            }`,
                        }}
                    />
                    <script
                        id="theme-bundle-main"
                        type="module"
                        nonce={$nonce()}
                        async
                        defer
                        src={$cdn($string("assets/dist/theme-bundle.main.js"), {resourceHint: $string("preload"), as: $string("script")})}
                    />
                    <script type="module" nonce={$nonce()} src={$cdn($string("assets/dist/theme-bundle.islands.js"))} />
                    <script
                        nonce={$nonce()}
                        dangerouslySetInnerHTML={{
                            __html: `const scriptElement = document.getElementById('theme-bundle-main');

            if (scriptElement) {
                if (typeof window.stencilBootstrap === 'function') {
                    onThemeBundleMain();
                } else {
                    scriptElement.addEventListener('load', onThemeBundleMain, { once: true });
                }
            } else {
                console.error('Could not find script element with id "theme-bundle-main"');
            }`,
                        }}
                    />

                    {$unescaped($pointer("footer.scripts"))}
                </body>
            </html>
        </>
    );
};
