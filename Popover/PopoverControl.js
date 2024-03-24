/**
 * A higher-order component that turns an element into a popover control button.
 *
 * @memberof sandstone/Popover
 * @hoc
 * @private
 */

import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import Button from '../Button';

import componentCss from './Popover.module.less';

const PopoverControlDefaultConfig = {
	/**
	 * Sets a 'toggle' action to be performed on the popover element.
	 *
	 * @public
	 */
	popoverTargetAction: 'toggle'
};

const PopoverControlDecorator = hoc(PopoverControlDefaultConfig, (config, Wrapped) => {
	return kind({
		name: 'PopoverControlDecorator',

		propTypes: {
			/**
			 * The content to be displayed in the body of the popover button.
			 * It is usually a Sandstone Button with some text.
			 *
			 * @type {Node}
			 * @required
			 * @public
			 */
			children: PropTypes.node.isRequired,

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

		styles: {
			css: componentCss,
			publicClassNames: ['popoverButton']
		},

		render: ({children, popoverTarget, popoverTargetAction}) => {
			return (
				<button
					className={componentCss.popoverButton}
					popovertarget={popoverTarget}
					popovertargetaction={popoverTargetAction}
				>
					<Wrapped>
						{children}
					</Wrapped>
				</button>
			);
		}
	});
});

const PopoverControl = PopoverControlDecorator({PopoverControlDefaultConfig}, Button);

export default PopoverControl;
export {
	PopoverControlDecorator
};
