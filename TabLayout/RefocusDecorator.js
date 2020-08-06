import Spotlight from '@enact/spotlight';
import {useId} from '@enact/ui/internal/IdProvider';
import PropTypes from 'prop-types';
import React from 'react';

function getTabsSpotlightId (spotlightId, collapsed) {
	return `${spotlightId}-tabs-${collapsed ? 'collapsed' : 'expanded'}`;
}

const getContainerNode = (spotlightId) => document.querySelector(`[data-spotlight-id='${spotlightId}']`);

const RefocusDecorator = Wrapped => {
	// eslint-disable-next-line no-shadow
	function RefocusDecorator ({collapsed, onTabAnimationEnd, orientation, spotlightId, ...rest}) {
		const {generateId} = useId({prefix: 'sand-tablayout-'});

		// generate an id for the component (and a derived id for the tabs) so we can refocus them
		// generating a different ID by orientation so swapping orientations doesn't clear container
		// config before the new one is mounted
		spotlightId = spotlightId || generateId(orientation || 'vertical');

		const handleTabAnimationEnd = React.useCallback((ev) => {
			if (onTabAnimationEnd) {
				onTabAnimationEnd(ev);
			}

			if (!collapsed && !Spotlight.getPointerMode() && !Spotlight.isPaused()) {
				const expandedTabsSpotlightId = getTabsSpotlightId(spotlightId, collapsed);
				const collapsedTabContainer = getContainerNode(getTabsSpotlightId(spotlightId, !collapsed));
				const current = Spotlight.getCurrent();

				if (
					(collapsedTabContainer && collapsedTabContainer.contains(current)) ||
					(!collapsedTabContainer && !getContainerNode(expandedTabsSpotlightId).contains(current))
				) {
					Spotlight.focus(expandedTabsSpotlightId);
				}
			}

		}, [collapsed, onTabAnimationEnd, spotlightId]);

		return (
			<Wrapped
				{...rest}
				collapsed={collapsed}
				onTabAnimationEnd={handleTabAnimationEnd}
				orientation={orientation}
				spotlightId={spotlightId}
			/>
		);
	}

	RefocusDecorator.propTypes = {
		collapsed: PropTypes.bool,
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
