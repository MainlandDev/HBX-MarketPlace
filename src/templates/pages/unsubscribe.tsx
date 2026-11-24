import AlertAlertSuccess from "../components/common/alert/alert-success.tsx";
import {$lang, $Page, $pointer, $Lang, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <section className="page -mx-gutter-half w-auto max-w-none flow-root">
                    <div className="page-content page-content--centered float-left w-full px-gutter-half medium:float-none medium:mx-auto medium:w-8/12">
                        <h1 className="page-heading mx-0 mt-0 mb-double text-center">
                            <$Lang keyName={$string("newsletter.unsubscribed_heading")} />
                        </h1>
                        <AlertAlertSuccess $positionalHash={$lang($string("newsletter.unsubscribed_message"), {store_name: $pointer<string>("settings.store_name")})} />
                    </div>
                </section>
            ),
        }}
        layout="layout/base"
    />
);
