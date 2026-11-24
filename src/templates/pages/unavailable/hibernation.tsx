import AlertAlertError from "../../components/common/alert/alert-error.tsx";
import {$lang, $Lang, $Page, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <section className="page -mx-gutter-half w-auto max-w-none flow-root">
                    <div className="page-content page-content--centered float-left w-full px-gutter-half medium:float-none medium:mx-auto medium:w-8/12">
                        <h1 className="page-heading">
                            <$Lang keyName={$string("unavailable.hibernation_title")} />
                        </h1>
                        <AlertAlertError $positionalHash={$lang($string("unavailable.hibernation_message"))} />
                    </div>
                </section>
            ),
        }}
        layout="layout/base"
    />
);
