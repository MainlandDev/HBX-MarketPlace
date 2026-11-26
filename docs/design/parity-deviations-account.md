# Parity deviations: account and auth pages

| Section | Live behaviour | Ours | Bible rule |
| --- | --- | --- | --- |
| Login | Sign-in form and "New Customer?" are two white cards (10px radius, 0.8px #ddd border, 0 3px 5px #ddd shadow, 12px padding), 45px gap | Same, via utilities on `.login-form` and `.new-customer`; no floats (flex from medium) | Structure/no-JS kept |
| Login/Create account/Reset buttons | Red pill, bold uppercase | `font-bold uppercase` on the primary buttons | Pill shape comes from shared Button |
| Create account | Form inside a card | `.account` is the card | Same field markup |
| Reset password | Heading was an `h2` | `h1` (one h1 per page) | Bible a11y: one h1 |
| Account nav | Pill tabs, active tab red | White pills with shadow, active red with white bold text (`text-white`, as `text-on-brand` is black in tokens) | Link markup unchanged |
| Account nav "Messages" | Hidden by store CSS (`display:none`) | Item hidden with `navBar-item--messages` rule | Inbox still reachable by URL |
| Account area (orders, addresses, wishlists, returns, inbox, payment methods) | Live account area not reachable | Not restyled beyond the nav; inherits shared form/table styling | Matched to the login visual language only |
| Input radius | 4px, #c7c7c7 border, 50px tall | Shared FormInput (4px, #777 border, 42px) left as is: shared part | Shared file not editable here |
