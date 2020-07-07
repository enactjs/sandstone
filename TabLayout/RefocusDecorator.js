import Spotlight from '@enact/spotlight';
import {useId} from '@enact/ui/internal/IdProvider';
import PropTypes from 'prop-types';
import React from 'react';

function getTabsSpotlightId (spotlightId, collapsed) {
	return `${spotlightId}-tabs-${collapsed ? 'collapsed' : 'expanded'}`;
}

const RefocusDecorator = Wrapped => {
	// eslint-disable-next-line no-shadow
	function RefocusDecorator ({collapsed, onTabAnimationEnd, spotlightId, ...rest}) {
		const {generateId} = useId({prefix: 'sand-'});

		// generate an id for the component (and a derived id for the tabs) so we can refocus them
		spotlightId = spotlightId || generateId('tablayout-');

		const handleTabAnimationEnd = React.useCallback((ev) => {
			if (onTabAnimationEnd) {
				onTabAnimationEnd(ev);
			}

			if (!collapsed) {
				Spotlight.focus(getTabsSpotlightId(spotlightId, collapsed));
			}

		}, [collapsed, onTabAnimationEnd, spotlightId]);

		return (
			<Wrapped
				{...rest}
				collapsed={collapsed}
				onTabAnimationEnd={handleTabAnimationEnd}
				spotlightId={spotlightId}
			/>
		);
	}

	RefocusDecorator.propTypes = {
		collapsed: PropTypes.bool,
		onTabAnimationEnd: PropTypes.func,
		spotlightId: PropTypes.string
	};

	return RefocusDecorator;
};

export default RefocusDecorator;
export {
	getTabsSpotlightId,
	RefocusDecorator
};
