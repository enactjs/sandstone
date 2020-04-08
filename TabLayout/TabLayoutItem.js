import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * An item for the TabGridList.
 *
 * Configures the tab title and VirtualGridList settings.
 *
 * @class TabLayoutItem
 * @memberof sandstone/TabLayout
 * @ui
 * @public
 */
const TabLayoutItem = kind({
	name: 'TabLayoutItem',

	propTypes: /** @lends sandstone/TabLayout.TabLayoutItem.prototype */ {
		/**
		 * The icon content.
		 *
		 * @see {@link ui/Icon.Icon.children}
		 * @type {String|Object}
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * Title of the tab.
		 *
		 * @type {String}
		 * @public
		 */
		title: PropTypes.string
	},

	render: () => <div>TabLayoutItem is only to be used in TabLayout!</div>
});

export default TabLayoutItem;
