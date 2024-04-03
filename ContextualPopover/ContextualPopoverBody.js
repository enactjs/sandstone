/**
 * A higher-order component that turns an element into a popover element.
 *
 * @memberof sandstone/ContextualPopover
 * @hoc
 * @private
 */

import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import componentCss from './ContextualPopover.module.less';

const ContextualPopoverBodyDefaultConfig = {
	/**
	 * A global attribute that turns an element into a popover element.
	 *
	 * @public
	 */
	popover: 'auto'
};

const ContextualPopoverBodyDecorator = hoc(ContextualPopoverBodyDefaultConfig, (config, Wrapped) => {
	return kind({
		name: 'ContextualPopoverBodyDecorator',

		propTypes: {
			/**
			 * The content to be displayed in the body of the popover.
			 *
			 * @type {Node}
			 * @required
			 * @public
			 */
			children: PropTypes.node.isRequired,

			/**
			 * Customizes the component by mapping the supplied collection of CSS class names to the
			 * corresponding internal elements and states of this component.
			 *
			 * The following classes are supported:
			 *
			 * * `popover` - The root class name
			 * * `top` - Applied when the `position` is 'top'
			 * * `right` - Applied when the `position` is 'right'
			 * * `bottom` - Applied when the `position` is 'bottom'
			 * * `left` - Applied when the `position` is 'left'
			 *
			 * @type {Object}
			 * @private
			 */
			css: PropTypes.object,

			/**
			 * Direction of ContextualPopover.
			 *
			 * @type {('above'|'above center'|'above left'|'above right'|'below'|'below center'|'below left'|'below right'|'left middle'|'left top'|'left bottom'|'right middle'|'right top'|'right bottom')}
			 * @default 'below'
			 * @public
			 */
			direction: PropTypes.oneOf(['above', 'above center', 'above left', 'above right', 'below', 'below center', 'below left', 'below right', 'left middle', 'left top', 'left bottom', 'right middle', 'right top', 'right bottom']),

			/**
			 * The `id` of Popover that must be the same the `popoverTarget` attribute value of PopoverControl.
			 *
			 * @type {String}
			 * @public
			 */
			id: PropTypes.string,

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
			popover: PropTypes.oneOf(['auto', 'manual'])
		},

		styles: {
			css: componentCss,
			publicClassNames: ['contextualPopover']
		},

		computed: {
			className: ({direction, styler}) => styler.append(direction),
			popoverClassName: ({css, direction, offset, styler}) => styler.join(css.contextualPopover, direction.split(' '), offset)
		},

		render: ({children, id, popover, popoverClassName}) => {
			return (
				<Wrapped
					className={popoverClassName}
					id={id}
					popover={popover}
				>
					{children}
				</Wrapped>
			);
		}
	});
});

const ContextualPopoverBody = ContextualPopoverBodyDecorator({ContextualPopoverBodyDefaultConfig}, 'div');

export default ContextualPopoverBody;
export {
	ContextualPopoverBodyDecorator
};
