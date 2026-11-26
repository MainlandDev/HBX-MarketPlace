# Parity deviations: cart

| Section | Live behaviour | Ours | Bible rule |
|---|---|---|---|
| Item list and totals | Populated cart not observable (live session was a guest, empty cart). Cards assumed to follow the site card language. | Item table and totals each in a white card (10px radius, 0.8px #ddd border, 0 3px 5px #ddd shadow), fixed light tokens. | Bible 73 structure kept. |
| Heading | Left-aligned "Your Cart (N items)" | Left-aligned, same text | Single h1 kept. |
| Empty cart | Bold centred "Your cart is empty" plus returns-policy paragraph and trust cards | Bold centred message only; the policy paragraph and trust cards are not part of this template (merchant content or a region would be needed) | n/a |
| Coupon / gift certificate | Link-style toggles | Existing JS-toggled buttons kept (hooks `coupon-code-add`); not usable without JS | Bible asks for no-JS; not done because the legacy JS hooks rely on the buttons. |
| Checkout button | Red pill | Already red pill via shared Button | - |
| Cart preview dropdown | Not compared (opening it was not safe) | Unchanged | - |
| Not done | Shipping estimator, checkout.tsx, order-confirmation.tsx not reviewed | - | - |
