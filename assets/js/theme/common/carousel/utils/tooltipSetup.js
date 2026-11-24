import { CAROUSEL_TOOLTIP_CLASS } from '../../runtime-classes';

const TOOLTIP_DATA_SELECTOR = 'data-carousel-tooltip';

const TOOLTIP_NODE = `<span ${TOOLTIP_DATA_SELECTOR} class="${CAROUSEL_TOOLTIP_CLASS}"></span>`;

export default ($node) => {
    const $existedTooltip = $node.find(`[${TOOLTIP_DATA_SELECTOR}]`);
    if ($existedTooltip.length) {
        $existedTooltip.attr('aria-label', $node.attr('aria-label'));
    } else {
        const $tooltip = $(TOOLTIP_NODE).attr('aria-label', $node.attr('aria-label'));
        $node.append($tooltip);
    }
};
