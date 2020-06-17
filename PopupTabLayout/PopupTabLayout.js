/**
 * Provides a floating component suitable for grouping collections of managed views.
 *
 * @module sandstone/PopupTabLayout
 * @exports PopupTabLayout
 * @exports Tab
 * @exports TabPanels
 * @exports TabPanel
 */

import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable';
import Panels, {Panel} from '../Panels';
import TabLayout, {Tab} from '../TabLayout';
import Popup from '../Popup';

import css from './PopupTabLayout.module.less';

// List all of the props from PopupTabLayout that we want to move from this component's root onto PopupTabLayout.
const popupPropList = ['noAutoDismiss', 'onHide', 'onKeyDown', 'onShow', 'open',
	'position', 'scrimType', 'spotlightId', 'spotlightRestrict', 'id', 'className',
	'style', 'noAnimation', 'onClose'];

/**
 * Tabbed Layout component in a floating Popup.
 *
 * @class PopupTabLayoutBase
 * @memberof sandstone/PopupTabLayout
 * @extends sandstone/Popup.Popup
 * @extends sandstone/TabLayout.TabLayout
 * @ui
 * @public
 */
const PopupTabLayoutBase = kind({
	name: 'PopupTabLayout',

	propTypes: /** @lends sandstone/PopupTabLayout.PopupTabLayoutBase.prototype */ {
		/**
		 * Collection of [Tabs]{@link sandstone/PopupTabLayout.Tab} to render.
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Collapses the vertical tab list into icons only.
		 *
		 * Only applies to `orientation="vertical"`.  If the tabs do not include icons, a single
		 * collapsed icon will be shown.
		 *
		 * @type {Boolean}
		 * @public
		 */
		collapsed: PropTypes.bool,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * @type {Object}
		 * @private
		 */
		css: PropTypes.object,

		/**
		 * Specify dimensions for the layout areas.
		 *
		 * All 4 combinations must me supplied: each of the elements, tabs and content in both
		 * collapsed and expanded state.
		 *
		 * @type {{tabs: {collapsed: Number, normal: Number}, content: {expanded: number, normal: number}}}
		 * @default {
		 * 	tabs: {
		 * 		collapsed: 236,
		 * 		normal: 660
		 * 	},
		 * 	content: {
		 * 		expanded: 1320,
		 * 		normal: 1320
		 * 	}
		 * }
		 * @private
		 */
		dimensions: PropTypes.shape({
			content: PropTypes.shape({
				expanded: PropTypes.number.isRequired,
				normal: PropTypes.number.isRequired
			}).isRequired,
			tabs: PropTypes.shape({
				collapsed: PropTypes.number.isRequired,
				normal: PropTypes.number.isRequired
			}).isRequired
		}),

		/**
		 * The currently selected tab.
		 *
		 * @type {Number}
		 * @public
		 */
		index: PropTypes.number,

		/**
		 * Disables transition animation.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Called when the tabs are collapsed.
		 *
		 * @type {Function}
		 * @public
		 */
		onCollapse: PropTypes.func,

		/**
		 * Called when the tabs are expanded.
		 *
		 * @type {Function}
		 * @public
		 */
		onExpand: PropTypes.func,

		/**
		 * Called after the popup's "hide" transition finishes.
		 *
		 * @type {Function}
		 * @public
		 */
		onHide: PropTypes.func,

		/**
		 * Called when a tab is selected
		 *
		 * @type {Function}
		 * @public
		*/
		onSelect: PropTypes.func,

		/**
		 * Called after the popup's "show" transition finishes.
		 *
		 * @type {Function}
		 * @public
		 */
		onShow: PropTypes.func,

		/**
		 * Called when the tab collapse or expand animation completes.
		 *
		 * Event payload includes:
		 * * `type` - Always set to "onTabAnimationEnd"
		 * * `collapsed` - `true` when the tabs are collapsed
		 *
		 * @type {Function}
		 * @public
		 */
		onTabAnimationEnd: PropTypes.func,

		/**
		 * Controls the visibility of the Popup.
		 *
		 * By default, the Popup and its contents are not rendered until `open`.
		 *
		 * @type {Boolean}
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Orientation of the tabs.
		 *
		 * @type {('vertical')}
		 * @private
		 */
		orientation: PropTypes.oneOf(['vertical']),

		/**
		 * Position of the Popup on the screen.
		 *
		 * @type {'left'}
		 * @default 'left'
		 * @private
		 */
		position: PropTypes.oneOf(['left']),

		/**
		 * The container id for {@link spotlight/Spotlight}.
		 *
		 * @type {String}
		 * @public
		 */
		spotlightId: PropTypes.string,

		/**
		 * Restricts or prioritizes navigation when focus attempts to leave the popup.
		 *
		 * It can be either `'none'`, `'self-first'`, or `'self-only'`.
		 *
		 * Note: The ready-to-use [Popup]{@link sandstone/Popup.Popup} component only supports
		 * `'self-first'` and `'self-only'`.
		 *
		 * @type {('none'|'self-first'|'self-only')}
		 * @public
		 */
		spotlightRestrict: PropTypes.oneOf(['none', 'self-first', 'self-only'])
	},

	defaultProps: {
		dimensions: {
			tabs: {
				collapsed: 236,
				normal: 660
			},
			content: {
				expanded: 1320,
				normal: 1320
			}
		},
		position: 'left'
	},

	styles: {
		css,
		className: 'popupTabLayout'
	},

	render: ({children, ...rest}) => {
		// Extract all relevant popup props
		const popupProps = {};
		for (const prop in rest) {
			if (popupPropList.indexOf(prop) >= 0) {
				popupProps[prop] = rest[prop];
				delete rest[prop];
			}
		}

		return (
			<Popup {...popupProps} css={css}>
				<TabLayout
					{...rest}
					className={css.tabLayout}
					css={css}
					align="start"
				>
					{children}
				</TabLayout>
			</Popup>
		);
	}
});


/**
 * Add behaviors to PopupTabLayout.
 *
 * @hoc
 * @memberof sandstone/PopupTabLayout
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const PopupTabLayoutDecorator = compose(
	Skinnable
);

/**
 * An instance of [`Popup`]{@link sandstone/Popup.Popup} which restricts the `TabLayout` content to
 * the left side of the screen. The content of `TabLayout` can flex vertically, but not horizontally
 * (fixed width). This is typically used to switch between several collections of managed views
 * (`TabPanels` and `TabPanel`, also exported from this module).
 *
 * Example:
 *
 * ```jsx
 * 	<PopupTabLayout>
 * 		<Tab title="Tab One">
 * 			<TabPanels>
 * 				<TabPanel>
 * 					<Header title="First Panel" type="compact" />
 * 					<Item>Item 1 in Panel 1</Item>
 * 					<Item>Item 2 in Panel 1</Item>
 * 				</TabPanel>
 * 				<TabPanel>
 * 					<Header title="Second Panel" type="compact" />
 * 					<Item>Item 1 in Panel 2</Item>
 * 					<Item>Item 2 in Panel 2</Item>
 * 				</TabPanel>
 * 			</TabPanels
 * 		</Tab>
 * 		<Tab title="Tab Two">
 * 			<Item>Goodbye</Item>
 * 		</Tab>
 * 	</PopupTabLayout>
 * ```
 *
 * @class PopupTabLayout
 * @memberof sandstone/PopupTabLayout
 * @ui
 * @public
 */
const PopupTabLayout = PopupTabLayoutDecorator(PopupTabLayoutBase);

/**
 * A shortcut to access {@link sandstone/PopupTabLayout.Tab}
 *
 * @name Tab
 * @memberof sandstone/PopupTabLayout.PopupTabLayout
 * @extends sandstone/TabLayout.Tab
 * @ui
 */
PopupTabLayout.Tab = Tab;

/**
 * A Tab for use inside this component.
 *
 * @class Tab
 * @memberof sandstone/PopupTabLayout
 * @extends sandstone/TabLayout.Tab
 * @ui
 */

/**
 * A customized version of Panels for use inside this component.
 *
 * @class
 * @memberof sandstone/PopupTabLayout
 * @extends sandstone/Panels.Panels
 * @ui
 */
const TabPanels = (props) => <Panels {...props} css={css} />;

/**
 * A customized version of Panel for use inside this component.
 *
 * @class
 * @memberof sandstone/PopupTabLayout
 * @extends sandstone/Panels.Panel
 * @ui
 */
const TabPanel = (props) => <Panel {...props} css={css} hideChildren={false} />;


export default PopupTabLayout;
export {
	PopupTabLayout,
	PopupTabLayoutBase,
	PopupTabLayoutDecorator,
	Tab,
	TabPanels,
	TabPanel
};
