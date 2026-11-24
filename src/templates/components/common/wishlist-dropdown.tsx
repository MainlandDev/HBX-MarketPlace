"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface Wishlist {
    name: string;
    add_url: string;
    num_items: string;
}

export default (_props: PartialProps) => (
    <form action={$pointer("product.add_to_wishlist_url")} className="form form-wishlist form-action relative small:float-left small:px-[10px] small:py-0 small:w-1/2 medium:p-0 medium:w-auto large:[display:inline-block] large:mt-[1rem] [&_.button]:w-full medium:[&_.button]:w-auto large:[&_.button]:mr-half" data-wishlist-add={""} method="post">
        <a aria-controls="wishlist-dropdown" aria-expanded="false" className="button dropdown-menu-button w-full is-open:rounded-b-none focus:z-(--sv-zIndex-lower) [&_.icon]:float-right [&_.icon]:ml-[10px]" data-dropdown="wishlist-dropdown" href="#">
            <span>
                <$Lang keyName={$string("account.wishlists.add_item")} />
            </span>
            <i aria-hidden="true" className="icon">
                <svg>
                    <use href="#icon-chevron-down" />
                </svg>
            </i>
        </a>
        <ul aria-hidden="true" className="dropdown-menu z-(--sv-zIndex-lowest) is-open:[display:block] is-open:left-auto is-open:w-full is-open:max-w-none is-open:bg-transparent small:is-open:pr-[20px] medium:is-open:pr-0 large:is-open:pr-[11px] is-open:focus:outline-none [&_.button:focus]:z-(--sv-zIndex-lowest) [&.is-loading_.loadingOverlay]:[background:none] [&.is-loading_.loadingOverlay]:relative [&.is-loading_.loadingOverlay]:px-0 [&.is-loading_.loadingOverlay]:py-[calc(var(--sv-spacing-double)+var(--sv-spacing-single))] [&.is-open_[data-wishlist]]:[border-top:0] [&.is-open_[data-wishlist]]:mb-0 [&.is-open_[data-wishlist]]:w-full [&.is-open_.button]:w-full [&.is-open_.button]:rounded-t-none [&.is-open_.button]:bg-(--sv-setting-dropdown--wishList-backgroundColor) [&.is-open_.button--has-items]:font-bold [&.is-open_li:not(:last-child)_.button]:[border-top:0] [&.is-open_li:not(:last-child)_.button]:[border-bottom:0] [&.is-open_li:not(:last-child)_.button]:rounded-none [&.is-open_li:not(:last-child)_.button]:mb-0" data-dropdown-content={""} id="wishlist-dropdown">
            <$If
                test={$pointer("customer.wishlists")}
                $then={() => (
                    <$Each
                        list={$pointer<Wishlist[]>("customer.wishlists")}
                        $then={(wishlist) => (
                            <li>
                                <input
                                    className={`button ${$If({test: $pointer("this.num_items"), operator: $string("!=="), rvalue: $string("0"), $then: () => "button--has-items"})}`}
                                    dangerouslyInlineAttributes={{attributes: `formaction="${wishlist.add_url}&product_id=${$pointer("../product.id")}"`}}
                                    type="submit"
                                    value={wishlist.name}
                                />
                            </li>
                        )}
                    />
                )}
                $else={() => (
                    <li>
                        <input className="button" type="submit" value={$lang($string("account.wishlists.add_to_default"))} />
                    </li>
                )}
            />
            <li>
                <a
                    data-wishlist={""}
                    className="button"
                    dangerouslyInlineAttributes={{attributes: `href="/wishlist.php?action=addwishlist&product_id=${$pointer("product.id")}"`}}
                >
                    <$Lang keyName={$string("account.wishlists.create_new")} />
                </a>
            </li>
        </ul>
    </form>
);
