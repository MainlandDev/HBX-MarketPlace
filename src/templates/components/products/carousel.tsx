"use server";
import ProductsCard from "./card.tsx";
import CarouselContentAnnouncement from "../carousel-content-announcement.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$add, $Each, $If, $number, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <section
        className="productCarousel relative -mx-gutter-half w-px max-w-none min-w-full flow-root"
        data-list-name={$pointer("list")}
        dangerouslyInlineAttributes={{
            attributes: `data-slick='{ "infinite": false, "mobileFirst": true, "slidesToShow": 2, "slidesToScroll": 2, "slide": "[data-product-slide]", "responsive": [ { "breakpoint": 800, "settings": { "slidesToShow": ${$pointer("columns")}, "slidesToScroll": ${$pointer("columns")} } }, { "breakpoint": 550, "settings": { "slidesToShow": 3, "slidesToScroll": 3 } } ] }'`,
        }}
    >
        <$Each
            list={$pointer<unknown[]>("products")}
            $then={() => (
                <div data-product-slide={""} className="productCarousel-slide float-left px-gutter-half [&:not([style*=width])]:w-6/12 small:[&:not([style*=width])]:w-4/12 medium:[&:not([style*=width])]:w-3/12 large:[&:not([style*=width])]:w-2/12 [&_.card]:mb-0 [&_.card-title]:[overflow-wrap:break-word]">
                    <ProductsCard settings={$pointer("../settings")} theme_settings={$pointer("../theme_settings")} customer={$pointer("../customer")} event={$string("list")} position={$add($pointer<number>("@index"), $number(1))} />
                </div>
            )}
        />
        <$If
            test={$pointer("products.length")}
            operator={$string(">")}
            rvalue={$number(1)}
            $then={() => <CarouselContentAnnouncement />}
        />
    </section>
);
