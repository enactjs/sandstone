import kind from '@enact/core/kind';
// import Cancelable from '@enact/ui/Cancelable';
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


const TabPanels = (props) => <Panels {...props} css={css} />;
const TabPanel = (props) => <Panel {...props} css={css} />;

/**
 * @class PopupTabLayoutBase
 * @type {Function}
 * @hoc
 * @private
 * @memberof sandstone/PopupTabLayoutBase
 */
const PopupTabLayoutBase = kind({
	name: 'PopupTabLayout',

	propTypes: /** @lends sandstone/PopupTabLayout.PopupTabLayoutBase.prototype */ {
		/**
		 * An object containing properties to be passed to each child.
		 *
		 * @type {Object}
		 * @public
		 */
		childProps: PropTypes.object,

		/**
		 * PopupTabLayout to be rendered
		 *
		 * @type {Node}
		 */
		children: PropTypes.node,

		/**
		 * Unique identifier for the PopupTabLayout instance
		 *
		 * @type {String}
		 * @public
		 */
		id: PropTypes.string,

		/**
		 * Index of the active panel
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		index: PropTypes.number,

		/**
		 * Disable transitions.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Called with cancel/back key events.
		 *
		 * @type {Function}
		 * @public
		 */
		onBack: PropTypes.func,

		/**
		 * Called when closing this PopupTabLayout instance.
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func,

		/**
		 * Position of the PopupTabLayout on the screen.
		 *
		 * @type {('left'|'right')}
		 * @default 'left'
		 * @public
		 */
		// Intentionally excluded 'bottom', 'center', 'fullscreen', and 'top' as those aren't configured for this component at this time.
		position: PropTypes.oneOf(['left', 'right'])
	},

	defaultProps: {
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
					css={css}
					align="start"
				>
					{children}
				</TabLayout>
			</Popup>
		);
	}
});

const PopupTabLayoutDecorator = compose(
	// Cancelable({modal: true, onCancel: handleCancel}),
	Skinnable
);

const PopupTabLayout = PopupTabLayoutDecorator(PopupTabLayoutBase);

export default PopupTabLayout;
export {
	PopupTabLayout,
	PopupTabLayoutBase,
	PopupTabLayoutDecorator,
	Tab,
	TabPanels,
	TabPanel
};
