/**
 * A higher-order component that turns an element into a popover element.
 *
 * @memberof sandstone/Popover
 * @hoc
 * @private
 */

import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';

import PropTypes from 'prop-types';

import componentCss from './Popover.module.less';

const PopoverBodyDefaultConfig = {
	/**
	 * A global attribute that turns an element into a popover element.
	 *
	 * @public
	 */
	popover: 'auto'
};

const PopoverBodyDecorator = hoc(PopoverBodyDefaultConfig, (config, Wrapped) => {
	return kind({
		name: 'PopoverBodyDecorator',

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
			 * The `id` of Popover that must be the same the `popoverTarget` attribute value of PopoverControl.
			 *
			 * @type {String}
			 * @public
			 */
			id: PropTypes.string,

			/**
			 * A global attribute that turns an element into a popover element.
			 *
			 * @type {('auto'|'manual')}
			 * @default 'auto'
			 * @public
			 */
			popover: PropTypes.oneOf(['auto', 'manual']),

			/**
			 * Position of the Popover on the screen.
			 *
			 * @type {('bottom'|'center'|'fullscreen'|'left'|'right'|'top')}
			 * @default 'center'
			 * @public
			 */
			position: PropTypes.oneOf(['bottom', 'center', 'fullscreen', 'left', 'right', 'top']),

			/**
			 * Scrim type.
			 *
			 * @type {('transparent'|'translucent')}
			 * @default 'translucent'
			 * @public
			 */
			scrimType: PropTypes.oneOf(['transparent', 'translucent'])
		},

		styles: {
			css: componentCss,
			publicClassNames: ['popover']
		},

		computed: {
			className: ({position, styler}) => styler.append(position),
			popoverClassName: ({css, position, scrimType, styler}) => styler.join(css.popover, position, scrimType)
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

const PopoverBody = PopoverBodyDecorator({PopoverBodyDefaultConfig}, 'div');

export default PopoverBody;
export {
	PopoverBodyDecorator
};
