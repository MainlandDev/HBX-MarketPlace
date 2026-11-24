"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$getImage, $If, $Each, $For, $Lang, $number, $pointer, $raw, $string, $this, $Unless} from "@mainlanddev/hbx-bigcommerce";
import {Button, FormCheck, FormField, FormInput, FormLabel, FormSelect} from "../../../../server/formParts.tsx";

interface GiftWrapping {
    id: string;
    name: string;
    selected: boolean;
    allow_message: boolean;
    preview_image: unknown;
    price: {formatted: string};
}

export default (_props: PartialProps) => (
    <>
        <div className="modal-header pl-(--sv-reveal-modal-paddingHorizontal) pr-[calc(32px+var(--sv-reveal-close-side))]">
            <h2 className="modal-header-title text-center text-large medium:text-larger">
                <$Lang keyName={$string("cart.gift_wrapping.title")} />
            </h2>
        </div>
        <div className="modal-body overflow-auto p-(--sv-reveal-modal-padding) [-webkit-overflow-scrolling:touch]">
            <$If
                test={$pointer("quantity")}
                operator={$string(">")}
                rvalue={$number(1)}
                $then={() => (
                    <>
                        <p>
                            <$Lang keyName={$string("cart.gift_wrapping.choose_how")} />
                        </p>
                    </>
                )}
            />

            <form className="form giftWrapping-form last:mb-0 [:where(&)]:[margin:var(--sv-form-margin)]" action={$pointer("urls.cart")} method="post">
                <input type="hidden" name="action" value="save_giftwrapping" />
                <input type="hidden" name="item_id" value={$pointer("item_id")} />
                <fieldset className="form-fieldset [:where(&)]:[border-width:var(--sv-fieldset-border-width)] [:where(&)]:[margin:var(--sv-fieldset-margin)]">
                    <FormField dangerouslyInlineAttributes={{attributes: `${$If({test: $pointer("quantity"), operator: $string("==="), rvalue: $number(1), $then: () => $raw('style="display:none"')})}`}}>
                        <FormCheck kind="radio" className="[&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                            type="radio"
                            dangerouslyInlineAttributes={{
                                attributes: `name="giftwraptype" id="girftWrapping-radio-same" checked="checked" value="same"`,
                            }}
                        />{" "}
                        <FormLabel check="radio" className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="girftWrapping-radio-same">
                            <$Lang keyName={$string("cart.gift_wrapping.option_same")} />
                        </FormLabel>

                        <FormCheck
                            type="radio"
                            kind="radio" className="[&+.form-label]:before:top-[0.21429rem] [&+.form-label]:after:top-[0.28571rem] [&+.form-label:last-child]:-mb-[0.28571rem] [&+.form-label:last-child]:[display:block]"
                            name="giftwraptype"
                            id="girftWrapping-radio-all"
                            value="different"
                        />{" "}
                        <FormLabel check="radio" className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="girftWrapping-radio-all">
                            <$Lang keyName={$string("cart.gift_wrapping.option_different")} />
                        </FormLabel>
                    </FormField>

                    <div className="giftWrapping-single">
                        <FormField>
                            <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="giftWrapping-select-same">
                                <$Lang keyName={$string("cart.gift_wrapping.item_single")} name={$pointer("product_name")} />
                                <$Each
                                    list={$pointer<GiftWrapping[]>("gift_wrappings")}
                                    $then={(wrapping) => (
                                        <$If
                                            test={wrapping.preview_image}
                                            $then={() => (
                                                <a
                                                    dangerouslyInlineAttributes={{
                                                        attributes: `id="giftWrapping-image-all-${wrapping.id}" class="giftWrapping-image-all" ${$Unless({test: wrapping.selected, $then: () => $raw('style="display:none"')})} target="_blank" href="${$getImage($pointer("preview_image"))}"`,
                                                    }}
                                                >
                                                    <$Lang keyName={$string("cart.gift_wrapping.preview")} />
                                                </a>
                                            )}
                                        />
                                    )}
                                />
                            </FormLabel>
                            <FormSelect className="giftWrapping-select" name="giftwrapping[all]" id="giftWrapping-select-same" data-index="all">
                                <option value="">
                                    <$Lang keyName={$string("cart.gift_wrapping.choose_type")} />
                                </option>
                                <$Each
                                    list={$pointer<GiftWrapping[]>("gift_wrappings")}
                                    $then={(wrapping) => (
                                        <option
                                            dangerouslyInlineAttributes={{
                                                attributes: `${$If({test: wrapping.selected, $then: () => "selected "})}value="${wrapping.id}" data-allow-message="${wrapping.allow_message}"`,
                                            }}
                                        >
                                            {wrapping.name} - ({wrapping.price.formatted})
                                        </option>
                                    )}
                                />
                            </FormSelect>
                        </FormField>

                        <FormField
                            dangerouslyInlineAttributes={{
                                attributes: `id="giftWrapping-message-all" ${$Unless({test: $pointer("selected_wrapping"), $then: () => $raw('style="display:none"')})}`,
                            }}
                        >
                            <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="giftMessage">
                                <$Lang keyName={$string("cart.gift_wrapping.gift_message")} />
                            </FormLabel>
                            <FormInput
                                tag="textarea"
                                name="giftmessage[all]"
                                id="giftMessage"
                                rows="3"
                                value={$pointer("selected_wrapping.message")}
                            />
                        </FormField>
                    </div>

                    <div className="giftWrapping-multiple">
                        <$For
                            to={$pointer<number>("quantity")}
                            context={$this<object>()}
                            $then={(ctx) => (
                                <>
                                    <FormField>
                                        <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor={`giftWrapping-select-${ctx.$index}`}>
                                            <$Lang
                                                keyName={$string("cart.gift_wrapping.item_multiple")}
                                                index={ctx.$index}
                                                name={$pointer("product_name")}
                                            />
                                            <$Each
                                                list={$pointer<GiftWrapping[]>("gift_wrappings")}
                                                $then={(wrapping) => (
                                                    <$If
                                                        test={wrapping.preview_image}
                                                        $then={() => (
                                                            <a
                                                                id={`giftWrapping-image-${$pointer<number>("../$index")}-${wrapping.id}`}
                                                                className={`giftWrapping-image-${$pointer<number>("../$index")}`}
                                                                style={{display: "none"}}
                                                                target="_blank"
                                                                href={$getImage($pointer("preview_image"))}
                                                            >
                                                                <$Lang keyName={$string("cart.gift_wrapping.preview")} />
                                                            </a>
                                                        )}
                                                    />
                                                )}
                                            />
                                        </FormLabel>
                                        <FormSelect
                                            className="giftWrapping-select"
                                            name={`giftwrapping[${ctx.$index}]`}
                                            id={`giftWrapping-select-${ctx.$index}`}
                                            data-index={ctx.$index}
                                        >
                                            <option value="">
                                                <$Lang keyName={$string("cart.gift_wrapping.choose_type")} />
                                            </option>
                                            <$Each
                                                list={$pointer<GiftWrapping[]>("gift_wrappings")}
                                                $then={(wrapping) => (
                                                    <option
                                                        dangerouslyInlineAttributes={{
                                                            attributes: `${$If({test: wrapping.selected, $then: () => "selected "})}value="${wrapping.id}" data-allow-message="${wrapping.allow_message}"`,
                                                        }}
                                                    >
                                                        {wrapping.name} - ({wrapping.price.formatted})
                                                    </option>
                                                )}
                                            />
                                        </FormSelect>
                                    </FormField>

                                    <FormField id={`giftWrapping-message-${ctx.$index}`} style={{display: "none"}}>
                                        <FormLabel className="[&_small]:float-right [&_small]:mt-quarter" htmlFor="giftMessage">
                                            <$Lang keyName={$string("cart.gift_wrapping.gift_message")} />
                                        </FormLabel>
                                        <FormInput
                                            tag="textarea"
                                            name={`giftmessage[${ctx.$index}]`}
                                            id="giftMessage"
                                            rows="3"
                                            value={$pointer("selected_wrapping.message")}
                                        />
                                    </FormField>
                                </>
                            )}
                        />
                    </div>
                </fieldset>
                <div className="form-actions mx-auto w-full max-w-(--sv-layout-widthMax) flow-root text-center [display:block] small:mt-single [&_:is(.button,input,a)]:w-full [&_:is(.button,input,a)]:align-top small:[&_:is(.button,input,a)]:mb-0 small:[&_:is(.button,input,a)]:w-auto [&_:is(.button,input,a)+:is(.button,input,a)]:mt-half small:[&_:is(.button,input,a)+:is(.button,input,a)]:m-0 small:[&_:is(.button,input,a)+:is(.button,input,a)]:ml-half [:where(&)]:[background:none] [:where(&)]:[border:0] [:where(&)]:text-center xsmall:[:where(&)]:text-left [:where(&>*)]:[display:inline-block] [:where(&>*)]:mb-[1rem] [:where(&>*)]:w-full xsmall:[:where(&>*)]:align-baseline xsmall:[:where(&>*)]:w-auto">
                    <Button variant="primary" type="submit">
                        <$Lang keyName={$string("common.form_submit")} />
                    </Button>
                </div>
            </form>
        </div>
    </>
);
