import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * An item for the TabLayout.
 *
 * Configures the tab title and VirtualGridList settings.
 *
 * @class Tab
 * @memberof sandstone/TabLayout
 * @ui
 * @public
 */
const Tab = kind({
	name: 'Tab',

	propTypes: /** @lends sandstone/TabLayout.Tab.prototype */ {
		/**
		 * Title of the tab.
		 *
		 * @type {String}
		 * @required
		 * @public
		 */
		title: PropTypes.string.isRequired,

		/**
		 * The contents to show when the tab is selected.
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * The icon content of the tab.
		 *
		 * @see {@link ui/Icon.Icon.children}
		 * @type {String|Object}
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object])

	},

	render: () => <div>Tab is only to be used in TabLayout!</div>
});

export default Tab;
