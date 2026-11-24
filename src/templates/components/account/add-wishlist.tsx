"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import AlertAlertError from "../common/alert/alert-error.tsx";
import {$If, $Inject, $lang, $Lang, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormCheck, FormField, FormInput, FormLabel} from "../../../server/formParts.tsx";

export default (_props: PartialProps) => (
    <>
        <$Inject keyName={$string("enterWishlistNameError")} value={$lang($string("account.wishlists.enter_wishlist_name_error"))} />
        <div className="wishlist-add">
            <header className="wishlist-header text-center [display:none] [[class~=modal]_&]:[display:block]">
                <$If
                    test={$pointer("forms.wishlist.id")}
                    $then={() => (
                        <h1>
                            <$Lang keyName={$string("account.wishlists.edit")} />
                        </h1>
                    )}
                    $else={() => (
                        <>
                            <h1>
                                <$Lang keyName={$string("account.wishlists.new")} />
                            </h1>
                            <p>
                                <$Lang keyName={$string("account.wishlists.tag_line")} />
                            </p>
                        </>
                    )}
                />
                <$If
                    test={$pointer("forms.wishlist.errors")}
                    $then={() => <AlertAlertError $positionalHash={$pointer("forms.wishlist.errors")} />}
                />
            </header>
            <form
                className="form wishlist-form mx-auto flow-root w-full max-w-[550px] [&_.form-field]:float-left [&_.form-field]:w-full [&_.form-field]:px-gutter-half [:where(&)]:[margin:var(--sv-form-margin)]"
                method="post"
                dangerouslyInlineAttributes={{
                    attributes: `action="${$If({
                        test: $pointer("forms.wishlist.id"),
                        $then: () => $pointer("urls.account.wishlists.edit"),
                        $else: () => `${$pointer("urls.account.wishlists.add")}${$raw("&product_id=")}${$pointer("forms.wishlist.product_id")}`,
                    })}"`,
                }}
            >
                <input type="hidden" name="submit" />

                <FormField>
                    <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="wishlistname">
                        <$Lang keyName={$string("forms.wishlist.name")} />{" "}
                        <small>
                            <$Lang keyName={$string("common.required")} />
                        </small>
                    </FormLabel>
                    <FormInput name="wishlistname" id="wishlistname" value={$pointer("forms.wishlist.name")} />
                </FormField>
                <FormField>
                    <FormCheck kind="checkbox" className="[&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                        type="checkbox"
                        dangerouslyInlineAttributes={{
                            attributes: `name="publicwishlist" id="publicwishlist" ${$If({test: $pointer("forms.wishlist.is_public"), $then: () => "checked"})}`,
                        }}
                    />{" "}
                    <FormLabel check="checkbox" className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="publicwishlist">
                        <$Lang keyName={$string("forms.wishlist.public")} />
                    </FormLabel>
                </FormField>
                <div className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-center [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half [:where(&)]:[background:none] [:where(&)]:[border:0] [:where(&)]:text-center xsmall:[:where(&)]:text-left [:where(&>*)]:[display:inline-block] [:where(&>*)]:mb-[1rem] [:where(&>*)]:w-full xsmall:[:where(&>*)]:align-baseline xsmall:[:where(&>*)]:w-auto">
                    <$If
                        test={$pointer("forms.wishlist.id")}
                        $then={() => (
                            <>
                                <Button type="submit" tag="input" variant="primary" value={$lang($string("account.wishlists.save"))} />{" "}
                                <input type="hidden" name="wishlistid" value={$pointer("forms.wishlist.id")} />
                            </>
                        )}
                        $else={() => (
                            <Button type="submit" tag="input" variant="primary" value={$lang($string("account.wishlists.create"))} />
                        )}
                    />
                </div>
            </form>
        </div>
    </>
);
