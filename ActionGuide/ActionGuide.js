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
import React from 'react';

import Icon from '../Icon';
import {Marquee} from '../Marquee';
import Skinnable from '../Skinnable';

import componentCss from './ActionGuide.module.less';

/**
 * An Action Guide component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [ActionGuide]{@link sandstone/ActionGuide.ActionGuide}.
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
		css: PropTypes.object
	},

	styles: {
		css: componentCss,
		className: 'actionGuide',
		publicClassNames: ['actionGuide']
	},

	render: ({children, css, ...rest}) => {
		return (
			<div {...rest}>
				<Icon size="small" className={css.icon}>arrowsmalldown</Icon>
				<Marquee className={css.label} marqueeOn="render" alignment="center">{children}</Marquee>
			</div>
		);
	}
});

/**
 * Applies Sandstone specific behaviors to [ActionGuide]{@link sandstone/ActionGuide.ActionGuideBase}.
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
