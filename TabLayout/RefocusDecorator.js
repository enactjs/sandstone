import Spotlight from '@enact/spotlight';
import {useId} from '@enact/ui/internal/IdProvider';
import PropTypes from 'prop-types';
import React from 'react';

import css from './TabGroup.module.less';

function getTabsSpotlightId (spotlightId, collapsed) {
	return `${spotlightId}-tabs-${collapsed ? 'collapsed' : 'expanded'}`;
}

function getContainerNode (containerId) {
	return document.querySelector(`[data-spotlight-id='${containerId}']`);
}

const RefocusDecorator = Wrapped => {
	// eslint-disable-next-line no-shadow
	function RefocusDecorator ({collapsed, index, onTabAnimationEnd, orientation, spotlightId, ...rest}) {
		const {generateId} = useId({prefix: 'sand-tablayout-'});

		// generate an id for the component (and a derived id for the tabs) so we can refocus them
		// generating a different ID by orientation so swapping orientations doesn't clear container
		// config before the new one is mounted
		spotlightId = spotlightId || generateId(orientation || 'vertical');

		React.useLayoutEffect(() => {
			if (!Spotlight.getPointerMode() && !Spotlight.isPaused()) {
				const current = Spotlight.getCurrent(),
					tabsSpotlightId = getTabsSpotlightId(spotlightId, collapsed),
					containerNode = getContainerNode(tabsSpotlightId);

				if (!current || containerNode.querySelector(`.${css.selected}`) !== current) {
					Spotlight.focus(spotlightId);
				}
			}
		}, [index]);	// eslint-disable-line react-hooks/exhaustive-deps

		const handleTabAnimationEnd = React.useCallback((ev) => {
			if (onTabAnimationEnd) {
				onTabAnimationEnd(ev);
			}

			if (!collapsed && !Spotlight.getPointerMode() && !Spotlight.isPaused()) {
				const tabsSpotlightId = getTabsSpotlightId(spotlightId, collapsed);

				if (!document.querySelector(`[data-spotlight-id='${tabsSpotlightId}']`).contains(Spotlight.getCurrent())) {
					Spotlight.focus(tabsSpotlightId);
				}
			}

		}, [collapsed, onTabAnimationEnd, spotlightId]);

		return (
			<Wrapped
				{...rest}
				collapsed={collapsed}
				index={index}
				onTabAnimationEnd={handleTabAnimationEnd}
				orientation={orientation}
				spotlightId={spotlightId}
			/>
		);
	}

	RefocusDecorator.propTypes = {
		collapsed: PropTypes.bool,
		index: PropTypes.number,
		onTabAnimationEnd: PropTypes.func,
		orientation: PropTypes.string,
		spotlightId: PropTypes.string
	};

	return RefocusDecorator;
};

export default RefocusDecorator;
export {
	getTabsSpotlightId,
	RefocusDecorator
};
