import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * An item for the TabLayout.
 *
 * Configures the tab title and icon.
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
		icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * Key for the tab.
		 *
		 * Note: `TabLayout` automatically generates a key based on the title and icon combination.
		 * If this combination is not unique for all items, `tabKey` must be specified to make each
		 * tab have a unique (and persistent) key.
		 *
		 * @type {String|Number}
		 * @required
		 * @public
		 */
		tabKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	},

	render: () => <div>Tab is only to be used in TabLayout!</div>
});

export default Tab;
