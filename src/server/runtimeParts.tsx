// Markup that assets/js also creates at runtime: the string bundles live in assets/js/theme/common/runtime-classes.js (one definition for both).
import {LOADING_OVERLAY_CLASS} from "../../assets/js/theme/common/runtime-classes.js";

/** The `loadingOverlay` box that modal.js, cart-preview.js and product-details.js toggle with jQuery. */
export const LoadingOverlay = () => <div className={LOADING_OVERLAY_CLASS}></div>;
