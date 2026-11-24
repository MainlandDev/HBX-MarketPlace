import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import PageContactUsForm from "../components/page/contact-us-form.tsx";
import Breadcrumbs from "../components/common/breadcrumbs.tsx";
import {$Each, $If, $lang, $Page, $pointer, $string, $unescaped, $Unless} from "@mainlanddev/hbx-bigcommerce";

interface SubPage {
    url: string;
    title: string;
}

export default () => {
    const settings = $pointer<ThemeSettingsObject>("theme_settings");
    return (
        <$Page
            blocks={{
                page: () => (
                    <>
                        <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />

                        <main className="page -mx-gutter-half w-auto max-w-none flow-root">
                            <$Unless
                                test={settings.hide_contact_us_page_heading}
                                $then={() => <h1 className="page-heading mx-0 mt-0 mb-double text-center">{$pointer("page.title")}</h1>}
                            />
                            <$If
                                test={$pointer("page.sub_pages")}
                                $then={() => (
                                    <nav className="navBar navBar--sub [:where(&)]:[display:flow-root] mb-[calc(var(--sv-spacing-single)*3)] text-center">
                                        <ul className="navBar-section [:where(&)]:list-none [:where(&)]:m-0 [:where(&)]:p-0 [:where(&)]:[display:flow-root] [:where(&>li)]:m-0 [:where(&>li)]:p-0 [:where(&_.navBar-item)]:[display:block] [:where(&_.navBar-action)]:[display:block] [:where([class~=navBar-section]+&)]:ml-(--sv-navBar-section-margin) account-navigation float-none [&_.navBar-item]:float-none [&_.navBar-item]:mx-half [&_.navBar-item]:my-0 medium:[&_.navBar-item]:[display:inline-block] medium:[&_.navBar-item.is-active]:border-b medium:[&_.navBar-item.is-active]:border-b-(--sv-setting-color-textBase) medium:[&_.navBar-item.navBar-item--separate]:m-0 medium:[&_.navBar-item.navBar-item--separate]:border-l medium:[&_.navBar-item.navBar-item--separate]:border-l-(--sv-setting-color-textSecondary) medium:[&_.navBar-item.navBar-item--separate]:pl-half [&_.navBar-item.is-active>.navBar-action]:text-grey-dark">
                                            <$Each
                                                list={$pointer<SubPage[]>("page.sub_pages")}
                                                $then={(sub) => (
                                                    <li className="navBar-item">
                                                        <a className="navBar-action p-0 text-text-secondary text-(length:--sv-fontSize-base) no-underline hover:text-(--sv-setting-color-textSecondary--hover)" href={sub.url}>
                                                            {sub.title}
                                                        </a>
                                                    </li>
                                                )}
                                            />
                                        </ul>
                                    </nav>
                                )}
                            />
                            <div id="contact-us-page" className="page-content page-content--centered float-left w-full px-gutter-half medium:float-none medium:mx-auto medium:w-8/12">
                                <$If
                                    test={$pointer("forms.contact.success")}
                                    $then={() => (
                                        <div id="contact-us-success">
                                            {$unescaped($lang($string("forms.contact_us.successful"), {shopPath: $pointer<string>("urls.home")}))}
                                        </div>
                                    )}
                                    $else={() => (
                                        <>
                                            <p>{$unescaped($pointer("page.content"))}</p>
                                            <PageContactUsForm />
                                        </>
                                    )}
                                />
                            </div>
                        </main>
                    </>
                ),
            }}
            layout="layout/base"
        />
    );
};
