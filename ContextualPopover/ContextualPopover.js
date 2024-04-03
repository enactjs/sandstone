/**
 * Sandstone styled popover component and behavior.
 *
 * @example
 * <Popover>Hello!</Popover>
 *
 * @module sandstone/Popover
 * @exports Popover
 */

import kind from '@enact/core/kind';
import Layout from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import ContextualButton from './ContextualButton';
import ContextualPopoverBody from './ContextualPopoverBody';

import componentCss from './ContextualPopover.module.less';

const ContextualPopover = kind({
	name: 'ContextualPopover',

	propTypes: {
		/**
		 * The contents to be displayed in the body of the popover.
		 *
		 * @type {Node}
		 * @required
		 * @public
		 */
		children: PropTypes.node.isRequired,

		/**
		 * Direction of ContextualPopover.
		 *
		 * @type {('above'|'above center'|'above left'|'above right'|'below'|'below center'|'below left'|'below right'|'left middle'|'left top'|'left bottom'|'right middle'|'right top'|'right bottom')}
		 * @default 'below'
		 * @public
		 */
		direction: PropTypes.oneOf(['above', 'above center', 'above left', 'above right', 'below', 'below center', 'below left', 'below right', 'left middle', 'left top', 'left bottom', 'right middle', 'right top', 'right bottom']),

		/**
		 * Disables closing the popover when the user presses the cancel/back (e.g. `ESC`) key or taps outside the
		 * popover.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAutoDismiss: PropTypes.bool,

		/**
		 * Offset from the activator to apply to the position of the popover.
		 *
		 * @type {('none'|'overlap'|'small')}
		 * @default 'small'
		 * @public
		 */
		offset: PropTypes.oneOf(['none', 'overlap', 'small']),

		/**
		 * A global attribute that turns an element into a popover element.
		 *
		 * @type {('auto'|'manual')}
		 * @default 'auto'
		 * @public
		 */
		popover: PropTypes.oneOf(['auto', 'manual']),

		/**
		 * Turns a <button> or <input> element into a popover control button.
		 * Takes the ID of the popover element to control as its value.
		 *
		 * @type {String}
		 * @default null
		 * @public
		 */
		popoverTarget: PropTypes.string,

		/**
		 * Specifies the action to be performed on the popover element.
		 *
		 * @type {('hide'|'show'|'toggle')}
		 * @default 'toggle
		 * @public
		 */
		popoverTargetAction: PropTypes.oneOf(['hide', 'show', 'toggle'])
	},

	defaultProps: {
		direction: 'below',
		noAutoDismiss: false,
		offset: 'small',
		popover: 'auto',
		popoverTargetAction: 'toggle'
	},

	styles: {
		css: componentCss,
		publicClassNames: ['contextualPopover']
	},

	computed: {
		popover: ({noAutoDismiss}) => noAutoDismiss ? 'manual' : 'auto'
	},

	render: ({children, direction, noAutoDismiss, offset, popover}) => {
		return (
			<Layout align="center space-around" className={componentCss.popoverContainer}>
				<ContextualButton
					popoverTarget="contextualPopover"
					popoverTargetAction="toggle"
				>
					Contextual Button
				</ContextualButton>
				<ContextualPopoverBody
					direction={direction}
					id="contextualPopover"
					noAutoDismiss={noAutoDismiss}
					offset={offset}
					popover={popover}
				>
					{children}
				</ContextualPopoverBody>
			</Layout>
		);
	}
});

export default ContextualPopover;
