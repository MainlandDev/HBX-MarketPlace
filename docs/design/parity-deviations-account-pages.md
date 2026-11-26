# Parity deviations: account pages (behind login)

| Section | Live behaviour | Ours | Bible rule |
| --- | --- | --- | --- |
| Account content (orders, addresses, wishlists, wishlist details, inbox, returns, payment methods, recent items, account details, add/edit address, add/edit payment method, add wishlist, order details, return pages) | Live account area not reachable signed-out; login cards used as reference | Content area is a white card (10px radius, 0.8px #ddd border, 0 3px 5px #ddd shadow, 12px padding, fixed `#000` text so dark mode does not break it); nav tabs and heading stay outside the card | Structure and markup kept |
| Page heading | n/a | Pages that used `h2.page-heading` now use `h1` (one h1 per page) | Bible a11y: one h1 |
| Orders: empty alert row | n/a | `.account-head` hidden when empty (`empty:hidden`) to avoid a blank gap in the card | None |
| Address book tiles | n/a | Existing grey address tiles kept inside the white card | None |
| Unverified (no data to render) | n/a | add-return, download-item, return-saved, add/edit payment method forms, order details: card wrapper applied by consistency only | None |
| Buttons/inputs | Red bold pill buttons, 50px pill inputs | Inherit shared Button/FormInput (lead is changing formParts); account Buttons not forced uppercase | Shared file not editable here |
| Invoice (orders/invoice.tsx) | Print page | Untouched | None |
