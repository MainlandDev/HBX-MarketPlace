"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import ModalModalCloseBtn from "../../common/modal/modal-close-btn.tsx";
import ResponsiveImg from "../../common/responsive-img.tsx";
import FormsText from "../../common/forms/text.tsx";
import FormsMultiline from "../../common/forms/multiline.tsx";
import {$concat, $For, $If, $Inject, $Lang, $lang, $number, $pointer, $raw, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div id="modal-review-form" className="modal left-1/2 top-1/2 m-0 max-h-[90%] min-h-[240px] max-w-[95%] overflow-hidden p-0 outline-none [transform:translate(-50%,-50%)] [&_.form-field]:relative" data-reveal={""}>
        <$Inject keyName={$string("reviewRating")} value={$lang($string("forms.validate.reviews.rating"))} />{" "}
        <$Inject keyName={$string("reviewSubject")} value={$lang($string("forms.validate.reviews.title"))} />{" "}
        <$Inject keyName={$string("reviewName")} value={$lang($string("forms.validate.reviews.name"))} />{" "}
        <$Inject keyName={$string("reviewComment")} value={$lang($string("forms.validate.reviews.comment"))} />{" "}
        <$Inject keyName={$string("reviewEmail")} value={$lang($string("forms.validate.common.email_address"))} />
        <div className="modal-header pl-(--sv-reveal-modal-paddingHorizontal) pr-[calc(32px+var(--sv-reveal-close-side))]">
            <h2 className="modal-header-title text-center text-large medium:text-larger">
                <$Lang keyName={$string("products.reviews.write_a_review")} />
            </h2>
            <ModalModalCloseBtn />
        </div>
        <div className="modal-body overflow-auto p-(--sv-reveal-modal-padding) [-webkit-overflow-scrolling:touch]">
            <div className="writeReview-productDetails medium:float-left medium:w-6/12 medium:px-gutter-half">
                <div className="writeReview-productImage-container relative after:block after:h-0 after:w-full after:pb-[131.8%] after:content-[''] [&_img]:absolute [&_img]:inset-0 [&_img]:m-auto [&_img]:h-full [&_img]:object-contain [&_img]:[font-family:'object-fit:_contain;']">
                    <ResponsiveImg image={$pointer("product.main_image")} fallback_size={$pointer("theme_settings.product_size")} lazyload={$pointer("theme_settings.lazyload_mode")} default_image={$pointer("theme_settings.default_image_product")} />
                </div>
                <h6 className="product-brand m-0 text-grey-light">{$pointer("product.brand.name")}</h6>
                <h5 className="product-title mt-0">{$pointer("product.title")}</h5>
            </div>
            <form className="form writeReview-form medium:float-left medium:w-6/12 medium:px-gutter-half" action={$pointer("urls.product.post_review")} method="post">
                <fieldset className="form-fieldset">
                    <div className="form-field">
                        <label className="form-label [&_small]:float-right [&_small]:mt-quarter" htmlFor="rating-rate">
                            <$Lang keyName={$string("products.reviews.rating_label")} />{" "}
                            <small>
                                <$Lang keyName={$string("common.required")} />
                            </small>
                        </label>
                        {$raw("<!-- Stars -->")}
                        {$raw("<!-- TODO: Review Stars need to be componentised, both for display and input -->")}
                        <select id="rating-rate" className="form-select" name="revrating" data-input={""} aria-required="true">
                            <option value="">
                                <$Lang keyName={$string("products.reviews.select_rating")} />
                            </option>
                            <$For
                                from={$number(1)}
                                to={$number(5)}
                                $then={(ctx) => (
                                    <>
                                        <$If
                                            test={$pointer("../product.reviews.selected_rating")}
                                            operator={$string("===")}
                                            rvalue={$pointer("$index")}
                                            $then={() => (
                                                <option dangerouslyInlineAttributes={{attributes: `selected value="${ctx.$index}"`}}>
                                                    <$Lang keyName={$concat($string("products.reviews.rating."), ctx.$index)} />
                                                </option>
                                            )}
                                            $else={() => (
                                                <option value={ctx.$index}>
                                                    <$Lang keyName={$concat($string("products.reviews.rating."), ctx.$index)} />
                                                </option>
                                            )}
                                        />
                                    </>
                                )}
                            />
                        </select>
                    </div>

                    {$raw("<!-- Name -->")}
                    <$If
                        test={$pointer("product.reviews.author")}
                        $then={() =>
                            <FormsText id={$string("revfromname")} name={$string("revfromname")} required={$string("true")} label={$lang($string("products.reviews.form_write.name"))} value={$pointer("product.reviews.author")} />
                        }
                        $else={() =>
                            <FormsText id={$string("revfromname")} name={$string("revfromname")} required={$string("true")} label={$lang($string("products.reviews.form_write.name"))} value={$pointer("customer.name")} />
                        }
                    />

                    <$If
                        test={$pointer("product.reviews.show_review_email")}
                        $then={() => (
                            <>
                                {$raw("<!-- Email -->")}
                                <$If
                                    test={$pointer("product.reviews.email")}
                                    $then={() =>
                                        <FormsText id={$string("email")} name={$string("email")} required={$string("true")} label={$lang($string("products.reviews.form_write.email"))} value={$pointer("product.reviews.email")} />
                                    }
                                    $else={() =>
                                        <FormsText id={$string("email")} name={$string("email")} required={$string("true")} label={$lang($string("products.reviews.form_write.email"))} value={$pointer("customer.email")} />
                                    }
                                />
                            </>
                        )}
                    />

                    {$raw("<!-- Review Subject -->")}
                    <FormsText id={$string("revtitle")} name={$string("revtitle")} required={$string("true")} label={$lang($string("products.reviews.form_write.subject"))} value={$pointer("product.reviews.title")} />

                    {$raw("<!-- Comments -->")}
                    <FormsMultiline id={$string("revtext")} name={$string("revtext")} required={$string("true")} label={$lang($string("products.reviews.form_write.comments"))} value={$pointer("product.reviews.text")} />

                    {$unescaped($pointer("product.reviews.recaptcha.markup"))}

                    <div className="form-field">
                        <input type="submit" className="button button--primary" value={$lang($string("products.reviews.form_write.submit_value"))} />
                    </div>
                    <input type="hidden" name="product_id" value={$pointer("product.id")} />
                    <input type="hidden" name="action" value="post_review" />
                    <$If
                        test={$pointer("product.reviews.throttleToken")}
                        $then={() => <input type="hidden" name="throttleToken" value={$pointer("product.reviews.throttleToken")} />}
                    />
                </fieldset>
            </form>
        </div>
    </div>
);
