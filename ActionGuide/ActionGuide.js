/**
 * Sandstone styled action guide component and behaviors.
 *
 * @example
 * <ActionGuide icon="arrowlargedown">Hello</ActionGuide>
 *
 * @module sandstone/ActionGuide
 * @exports ActionGuide
 * @exports ActionGuideBase
 * @exports ActionGuideDecorator
 */


import kind from '@enact/core/kind';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import $L from '../internal/$L';
import Button from '../Button';
import {Marquee} from '../Marquee';
import Skinnable from '../Skinnable';

import componentCss from './ActionGuide.module.less';

/**
 * An Action Guide component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within {@link sandstone/ActionGuide.ActionGuide|ActionGuide}.
 *
 * @class ActionGuideBase
 * @memberof sandstone/ActionGuide
 * @ui
 * @public
 */
const ActionGuideBase = kind({
	name: 'ActionGuide',

	propTypes: /** @lends sandstone/ActionGuide.ActionGuideBase.prototype */ {
		/**
		 * The "aria-label" for the button.
		 *
		 * @type {String}
		 * @public
		 */
		buttonAriaLabel: PropTypes.string,

		/**
		 * The contents for the action guide.
		 *
		 * @type {String}
		 * @public
		 */
		children: PropTypes.string,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `actionGuide` - The root component class
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Disables the button.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * The icon displayed within the action guide.
		 *
		 * @type {String}
		 * @default 'arrowsmalldown'
		 * @public
		 */
		icon: PropTypes.string,

		/**
		 * Called when Button is clicked.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onClick: PropTypes.func
	},

	defaultProps: {
		icon: 'arrowsmalldown'
	},

	styles: {
		css: componentCss,
		className: 'actionGuide',
		publicClassNames: ['actionGuide']
	},

	render: ({buttonAriaLabel, children, css, disabled, icon, onClick, ...rest}) => {
		return (
			<div {...rest}>
				<Button aria-label={buttonAriaLabel ? buttonAriaLabel : $L('More')} className={css.icon} disabled={disabled} icon={icon} minWidth={false} onClick={onClick} size="small" />
				<Marquee className={css.label} marqueeOn="render" alignment="center">{children}</Marquee>
			</div>
		);
	}
});

/**
 * Applies Sandstone specific behaviors to {@link sandstone/ActionGuide.ActionGuideBase|ActionGuide}.
 *
 * @hoc
 * @memberof sandstone/ActionGuide
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const ActionGuideDecorator = compose(
	Pure,
	Skinnable
);

/**
 * An Action Guide component, ready to use in Sandstone applications.
 *
 * `ActionGuide` may be used to display text and icon to describe an action.
 *
 * Usage:
 * ```
 * <ActionGuide icon="arrowlargedown">Hello</ActionGuide>
 * ```
 *
 * @class ActionGuide
 * @memberof sandstone/ActionGuide
 * @extends sandstone/ActionGuide.ActionGuideBase
 * @mixes sandstone/ActionGuide.ActionGuideDecorator
 * @ui
 * @public
 */
const ActionGuide = ActionGuideDecorator(ActionGuideBase);

export default ActionGuide;
export {
	ActionGuide,
	ActionGuideBase,
	ActionGuideDecorator
};
