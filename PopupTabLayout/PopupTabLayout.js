/**
 * Provides a floating component suitable for grouping collections of managed views.
 *
 * @module sandstone/PopupTabLayout
 * @exports PopupTabLayout
 * @exports Tab
 * @exports TabPanels
 * @exports TabPanelsBase
 * @exports TabPanel
 */

import {forKey, forProp, forward, forwardCustom, handle, preventDefault, stop} from '@enact/core/handle';
import kind from '@enact/core/kind';
import useHandlers from '@enact/core/useHandlers';
import {cap} from '@enact/core/util';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Spotlight from '@enact/spotlight';
import {getContainersForNode, getContainerNode} from '@enact/spotlight/src/container';
import {getTargetByDirectionFromElement} from '@enact/spotlight/src/target';
import PropTypes from 'prop-types';
import {useContext, useEffect} from 'react';
import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable';
import Panels, {Panel} from '../Panels';
import TabLayout, {TabLayoutContext, Tab} from '../TabLayout';
import Popup from '../Popup';

import componentCss from './PopupTabLayout.module.less';

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
		 * Collection of {@link sandstone/PopupTabLayout.Tab|Tabs} to render.
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
		 * Scrim type.
		 *
		 * * Values: `'transparent'`, `'translucent'`, or `'none'`.
		 *
		 * `'none'` is not compatible with `spotlightRestrict` of `'self-only'`, use a transparent scrim
		 * to prevent mouse focus when using popup.
		 *
		 * @type {('transparent'|'translucent'|'none')}
		 * @default 'translucent'
		 * @public
		 */
		scrimType: PropTypes.oneOf(['transparent', 'translucent', 'none']),

		/**
		 * The container id for {@link spotlight/SpotlightContainerDecorator/#SpotlightContainerDecorator.spotlightId|Spotlight container}.
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
		 * Note: The ready-to-use {@link sandstone/Popup.Popup|Popup} component only supports
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
				collapsed: 216,
				normal: 660
			},
			content: {
				expanded: 1320,
				normal: 1320
			}
		},
		orientation: 'vertical',
		position: 'left',
		scrimType: 'translucent'
	},

	styles: {
		css: componentCss,
		className: 'popupTabLayout',
		publicClassNames: ['bg', 'button', 'collapsed', 'content', 'panels', 'popupTabLayout', 'scrimTranslucent', 'selected', 'tab', 'tabGroup', 'tabLayout', 'tabs', 'tabsExpanded', 'vertical']
	},

	computed: {
		className: ({collapsed, scrimType, styler}) => styler.append({collapsed, noAnimation: (typeof ENACT_PACK_NO_ANIMATION !== 'undefined' && ENACT_PACK_NO_ANIMATION)}, `scrim${cap(scrimType)}`),
		noAnimation: ({noAnimation}) => (typeof ENACT_PACK_NO_ANIMATION !== 'undefined' && ENACT_PACK_NO_ANIMATION) || noAnimation
	},

	render: ({children, css, ...rest}) => {
		// Extract all relevant popup props
		const popupProps = {};
		for (const prop in rest) {
			if (popupPropList.indexOf(prop) >= 0) {
				popupProps[prop] = rest[prop];
				delete rest[prop];
			}
		}

		return (
			<Popup {...popupProps} css={css} noAlertRole noOutline>
				<TabLayout
					{...rest}
					css={css}
					align="start"
					anchorTo="left"
					type="popup"
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
 * @class PopupTabLayoutDecorator
 * @memberof sandstone/PopupTabLayout
 * @mixes sandstone/Skinnable.Skinnable
 * @hoc
 * @public
 */
const PopupTabLayoutDecorator = compose(
	Skinnable
);

/**
 * An instance of {@link sandstone/Popup.Popup|Popup} which restricts the `TabLayout` content to
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
 * 			</TabPanels>
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
 * @type {sandstone/PopupTabLayout.Tab}
 * @memberof sandstone/PopupTabLayout.PopupTabLayout
 * @extends sandstone/TabLayout.Tab
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

const tabPanelsHandlers = {
	onTransition: handle(
		forward('onTransition'),
		(ev, props, {onTransition}) => {
			onTransition(ev);
		}
	),
	onKeyDown: handle(
		forward('onKeyDown'),
		({target}) => (target.tagName !== 'INPUT'),
		forProp('rtl', false),
		forKey('left'),
		(ev, {index}) => (index > 0),
		({target}) => {
			const next = getTargetByDirectionFromElement('left', target);
			if (next === null || (next && !getContainerNode(getContainersForNode(target).pop()).contains(next))) {
				return true;
			}
			return false;
		},
		(ev) => {
			if (getContainerNode(getContainersForNode(ev.target).pop()).tagName === 'HEADER') {
				ev.stopPropagation();
				return false;
			}
			return document.querySelector(`section.${componentCss.body}`).contains(ev.target);
		},
		forwardCustom('onBack'),
		() => {
			Spotlight.setPointerMode(false);
			return true;
		},
		preventDefault,
		stop
	)
};

/**
 * A base component for {@link sandstone/PopupTabLayout.TabPanels|TabPanels} which has
 * left key handler to navigate panels.
 *
 * @class TabPanelsBase
 * @memberof sandstone/PopupTabLayout
 * @extends sandstone/Panels.Panels
 * @ui
 * @public
 */
const TabPanelsBase = ({rtl, ... rest}) => {
	const onTransition = useContext(TabLayoutContext);
	const handlers = useHandlers(tabPanelsHandlers, {rtl, ...rest}, {onTransition});

	return <Panels noCloseButton {...rest} css={componentCss} {...handlers} />;
};

TabPanelsBase.propTypes = {
	rtl: PropTypes.bool
};

/**
 * A customized version of Panels for use inside this component.
 *
 * @class TabPanels
 * @memberof sandstone/PopupTabLayout
 * @extends sandstone/PopupTabLayout.TabPanelsBase
 * @ui
 * @public
 */
const TabPanels = I18nContextDecorator(
	{rtlProp: 'rtl'},
	TabPanelsBase
);

/**
 * Omits the close button.
 *
 * Unlike most components, this prop defaults to `true`. To show the close button, the prop must
 * explicitly set it to `false`:
 *
 * ```
 * <TabPanels noCloseButton={false} />
 * ```
 *
 * @name noCloseButton
 * @memberof sandstone/PopupTabLayout.TabPanels.prototype
 * @type {Boolean}
 * @default true
 * @public
 */

/**
 * A customized version of Panel for use inside this component.
 *
 * @class TabPanel
 * @memberof sandstone/PopupTabLayout
 * @extends sandstone/Panels.Panel
 * @ui
 * @public
 */
const TabPanel = ({spotlightId, ...rest}) => {
	useEffect(() => {
		Spotlight.set(spotlightId, {partition: true});
	}, [spotlightId]);

	return (
		<Panel {...rest} css={componentCss} hideChildren={false} spotlightId={spotlightId} />
	);
};

TabPanel.propTypes = {
	/**
	 * The container id for {@link spotlight/SpotlightContainerDecorator/#SpotlightContainerDecorator.spotlightId|Spotlight container}.
	 *
	 * @type {String}
	 * @private
	 */
	spotlightId: PropTypes.string
};


export default PopupTabLayout;
export {
	PopupTabLayout,
	PopupTabLayoutBase,
	PopupTabLayoutDecorator,
	Tab,
	TabPanels,
	TabPanelsBase,
	TabPanel
};
