// Lives outside src/templates: the HBX plugin builds every export of a file under there as a template of its own.
// The store targets page-builder widgets by customer group through region name prefixes (PUBLIC_header_bottom, UNREGISTERED_home_below_menu ...).
// The group ids and preview toggles are the ones the legacy theme used; without these regions the sitewide promo strip and banners never render.
import {Fragment, type ReactNode} from "react";
import {$raw, $region, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

// HBX values are not typed as React nodes outside a template file, hence the casts (same as navParts.tsx).
const node = (value: unknown) => value as ReactNode;
const region = (name: string) => node($unescaped($region({name: $string(name)})));

const isGroup = (id: number) => `(if customer_group_id '===' ${id})`;
const isPreview = (setting: string) => `(if theme_settings.${setting} '===' true)`;

/** Region name prefix and the Handlebars `or` conditions that show it. */
const groups: ReadonlyArray<readonly [prefix: string, conditions: string]> = [
    ["INTERNAL_JDS_TEST", `${isGroup(54)} ${isPreview("54_internal_testing_preview_regions")}`],
    ["PUBLIC", `${[54, 47, 53, 1, 56].map(isGroup).join(" ")} ${isPreview("public_preview_regions")}`],
    ["UNREGISTERED", `${isGroup(53)} ${isPreview("53_unregistered_preview_regions")}`],
    ["RETAIL", `${isGroup(1)} ${isPreview("1_retail_preview_regions")}`],
    ["VIP", `${isGroup(56)} ${isPreview("56_vip_preview_regions")}`],
];

/** One `{{{region name="<GROUP>_<name>"}}}` per customer group, each inside its `{{#or …}}` block. Render before the plain region. */
export const customerRegions = (name: string) =>
    groups.map(([prefix, conditions]) => (
        <Fragment key={prefix}>
            {node($raw(`{{#or ${conditions}}}`))}
            {region(`${prefix}_${name}`)}
            {node($raw("{{/or}}"))}
        </Fragment>
    ));

/** `{{{region name="<prefix>1"}}}` to `<prefix><count>`: numbered page-builder sections. */
export const numberedRegions = (prefix: string, count: number) =>
    Array.from({length: count}, (_, i) => <Fragment key={i}>{region(`${prefix}${i + 1}`)}</Fragment>);
