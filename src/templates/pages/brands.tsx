import Breadcrumbs from "../components/common/breadcrumbs.tsx";
import ResponsiveImg from "../components/common/responsive-img.tsx";
import Paginator from "../components/common/paginator.tsx";
import {$Each, $frontmatter, $If, $Lang, $Page, $pointer, $region, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";
import {Card, CardBody, CardFigure} from "../../server/componentParts.tsx";

export const frontmatter = $frontmatter.brands({brands: null});

interface Brand {
    name: string;
    url: string;
    image: unknown;
    alternate: boolean;
}

/** `{{{region name="…"}}}` */
const region = (name: string) => $unescaped($region({name: $string(name)}));

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <div className="[&_.breadcrumbs]:text-left"><Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} /></div>
                    <main className="page -mx-gutter-half w-auto max-w-none flow-root">
                        <h1 className="page-heading mx-0 mt-0 mb-single text-left text-[1.8rem] font-medium">
                            <$Lang keyName={$string("brand.label")} />
                        </h1>
                        {region("brands_below_header")}
                        <ul className="brandGrid mt-0 mb-single w-auto max-w-none flow-root list-none rounded-card bg-white p-single text-[0px] text-ink [&_.card]:border-0 [&_.card]:bg-transparent [&_.card]:shadow-none [&_.card-body]:bg-transparent [&_.card-title>a]:text-ink">
                            <$Each
                                list={$pointer<Brand[]>("brands")}
                                $then={(brand) => (
                                    <li className="brand w-1/2 px-gutter-half align-top text-(length:--sv-fontSize-base) [display:inline-block] float-none small:w-1/3 medium:w-1/4">
                                        <$If
                                            test={brand.alternate}
                                            $then={() => (
                                                <Card className="group/card card--alternate border-[3px] border-solid border-(--sv-setting-card--alternate-borderColor) [transition:all_0.15s_ease] hover:border-(--sv-setting-color-primary) [&_.card-body]:bg-(--sv-setting-card--alternate-backgroundColor) [&_.card-body]:p-half small:[&_.card-body]:p-single [&_.card-body]:[transition:all_0.15s_ease] hover:[&_.card-body]:bg-(--sv-setting-color-primary) hover:[&_.card-body_.card-text]:text-(--sv-setting-card--alternate-color--hover) hover:[&_.card-title>a]:text-(--sv-setting-card--alternate-color--hover)">
                                                <CardFigure className="group/fig relative mt-0 overflow-hidden p-[3px]">
                                                    <a className="card-figure__link relative [display:block]" aria-label={brand.name} href={brand.url}>
                                                        <div className="card-img-container max-w-none after:block after:h-0 after:w-full after:pb-[40%] after:content-[''] [&_.card-image]:absolute [&_.card-image]:inset-0 [&_.card-image]:m-auto [&_.card-image]:max-h-full [&_.card-image]:w-full [&_.card-image]:border-0 [&_.card-image]:object-contain [&_.card-image]:[font-family:'object-fit:_contain;']">
                                                            <ResponsiveImg image={brand.image} class={$string("card-image")} fallback_size={$pointer("../theme_settings.brand_size")} lazyload={$pointer("../theme_settings.lazyload_mode")} default_image={$pointer("../theme_settings.default_image_brand")} />
                                                        </div>
                                                    </a>
                                                </CardFigure>
                                                <CardBody className="text-center small:text-left">
                                                    <h3 className="card-title [&>a]:text-(--sv-setting-card-title-color) [&>a]:no-underline [&>a]:[display:block] [&>a:hover]:text-(--sv-setting-card-title-color-hover) m-0 text-smaller text-center">
                                                        <a href={brand.url}>{brand.name}</a>
                                                    </h3>
                                                </CardBody>
                                                </Card>
                                            )}
                                            $else={() => (
                                                <Card className="group/card">
                                                <CardFigure className="group/fig relative mt-0 overflow-hidden p-[3px]">
                                                    <a className="card-figure__link relative [display:block]" aria-label={brand.name} href={brand.url}>
                                                        <div className="card-img-container max-w-none after:block after:h-0 after:w-full after:pb-[40%] after:content-[''] [&_.card-image]:absolute [&_.card-image]:inset-0 [&_.card-image]:m-auto [&_.card-image]:max-h-full [&_.card-image]:w-full [&_.card-image]:border-0 [&_.card-image]:object-contain [&_.card-image]:[font-family:'object-fit:_contain;']">
                                                            <ResponsiveImg image={brand.image} class={$string("card-image")} fallback_size={$pointer("../theme_settings.brand_size")} lazyload={$pointer("../theme_settings.lazyload_mode")} default_image={$pointer("../theme_settings.default_image_brand")} />
                                                        </div>
                                                    </a>
                                                </CardFigure>
                                                <CardBody className="text-center small:text-left">
                                                    <h3 className="card-title [&>a]:text-(--sv-setting-card-title-color) [&>a]:no-underline [&>a]:[display:block] [&>a:hover]:text-(--sv-setting-card-title-color-hover) m-0 text-smaller text-center">
                                                        <a href={brand.url}>{brand.name}</a>
                                                    </h3>
                                                </CardBody>
                                                </Card>
                                            )}
                                        />
                                    </li>
                                )}
                            />
                        </ul>
                        <Paginator $positionalHash={$pointer("pagination.brands")} />
                        {region("brands_below_content")}
                    </main>
                </>
            ),
        }}
        layout="layout/base"
    />
);
