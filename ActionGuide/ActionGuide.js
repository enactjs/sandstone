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

import Icon from '../Icon/Icon';
import {Marquee} from '../Marquee';
import Skinnable from '../Skinnable';

import componentCss from './ActionGuide.module.less';

/**
 * A Action Guide component.
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
		css: PropTypes.object,

		/**
		 * The icon displayed within the action guide.
		 *
		 * @type {String}
		 * @public
		 */
		icon: PropTypes.string
	},

	styles: {
		css: componentCss,
		className: 'actionGuide',
		publicClassNames: ['actionGuide']
	},

	render: ({icon, children, css, ...rest}) => {
		return (
			<div {...rest}>
				<Icon size="tiny" className={css.icon}>{icon}</Icon>
				<Marquee className={css.label} marqueeOn="render" alignment="center">{children}</Marquee>
			</div>
		);
	}
});

const ActionGuideDecorator = compose(
	Pure,
	Skinnable
);

const ActionGuide = ActionGuideDecorator(ActionGuideBase);

export default ActionGuide;
export {
	ActionGuide,
	ActionGuideBase,
	ActionGuideDecorator
};
