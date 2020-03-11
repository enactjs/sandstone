/**
 * Provides Sandstone styled component to indicate progress along a continuum.
 *
 * In the following example, 6 total steps will be displayed with the current step being the 3rd
 * step, having passed the previous 2 steps, with 3 more to go.
 *
 * @example
 * <Steps total={6} current={3} />
 *
 * @module sandstone/Steps
 * @exports Steps
 * @exports StepsBase
 * @exports StepsDecorator
 */

import kind from '@enact/core/kind';
import {coerceArray} from '@enact/core/util';
import EnactPropTypes from '@enact/core/internal/prop-types';
import Repeater from '@enact/ui/Repeater';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'ramda/src/compose';

import Icon from '../Icon';
import Skinnable from '../Skinnable';

import componentCss from './Steps.module.less';

/**
 * Renders a sandstone-styled steps component only basic behavior.
 *
 * @class StepsBase
 * @memberof sandstone/Steps
 * @ui
 * @public
 */
const StepsBase = kind({
	name: 'Steps',

	propTypes: /** @lends sandstone/Steps.StepsBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `steps` - The root class name
		 * * `step` - Applied to each individual step
		 * * `numbers` - Applied on the steps designated as "numbers" special case (See: `Icon` related props below)
		 * * `past` - Applied to the steps preceding the current step
		 * * `current` - Applied to the current step
		 * * `future` - Applied to the steps following the current step
		 *
		 * When providing a custom `iconComponent` it will receive the classes:
		 * 'step' (always), 'numbers' (conditionally, based on the "numbers" value), and one of the
		 * following three, based on the `current` step: 'past', 'current', and 'future'.
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Indicate the current step.
		 *
		 * This is 1-based, not 0-based; as in the first step is `1`.
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		current: PropTypes.number,

		/**
		 * The icon to use for indicating the current step.
		 *
		 * This accepts any icon supported by {@link sandstone/Icon}, in addition to a special
		 * value: "numbers", which instead of a standard icon, shows the number of the step.
		 *
		 * @type {String}
		 * @default 'numbers'
		 * @public
		 */
		currentIcon: PropTypes.string,

		/**
		 * The icon to use for indicating all steps following the current step.
		 *
		 * This accepts any icon supported by {@link sandstone/Icon}, in addition to a special
		 * value: "numbers", which instead of a standard icon, shows the number of the step.
		 *
		 * @type {String}
		 * @default 'numbers'
		 * @public
		 */
		futureIcon: PropTypes.string,

		/**
		 * Defines a custom element to use as the icon component.
		 *
		 * Use the `css` prop and public class name override system to target the classes applied to
		 * this component. This component will be repeated `total` number of times and will also
		 * receive the `children` and `size` props.
		 *
		 * @type {Component}
		 * @default `sandstone/Icon`
		 * @public
		 */
		iconComponent: EnactPropTypes.component,

		/**
		 * The icon to use for indicating all steps preceding the current step.
		 *
		 * This accepts any icon supported by {@link sandstone/Icon}, in addition to a special
		 * value: "numbers", which instead of a standard icon, shows the number of the step.
		 *
		 * @type {String}
		 * @default 'check'
		 * @public
		 */
		pastIcon: PropTypes.string,

		/**
		 * The size of the step icons.

		 * This accepts any `size` supported by {@link sandstone/Icon}.
		 *
		 * @type {('large'|'medium'|'small'|'tiny')}
		 * @default 'small'
		 * @public
		 */
		size: PropTypes.oneOf(['large', 'medium', 'small', 'tiny']),

		/**
		 * Indicate which steps to skip.
		 *
		 * A number or array of step numbers is acceptable.
		 *
		 * @type {Number|Number[]}
		 * @public
		 */
		skip: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),

		/**
		 * The icon to use for any skipped steps, past or future.
		 *
		 * This accepts any icon supported by {@link sandstone/Icon}.
		 *
		 * The current step will always show the `currentIcon` regardless of whether it has been
		 * skipped. It's the developer's responsibility to not set `current` to a skipped step.
		 *
		 * @type {String}
		 * @default 'minus'
		 * @public
		 */
		skipIcon: PropTypes.string,

		/**
		 * Indicate the total number of steps.
		 *
		 * @type {Number}
		 * @default 2
		 * @public
		 */
		total: PropTypes.number
	},

	defaultProps: {
		current: 1,
		iconComponent: Icon,
		pastIcon: 'check',
		currentIcon: 'numbers',
		futureIcon: 'numbers',
		size: 'small',
		skipIcon: 'minus',
		total: 2
	},

	styles: {
		css: componentCss,
		className: 'steps',
		publicClassNames: ['steps', 'step', 'numbers', 'past', 'current', 'future']
	},

	computed: {
		steps: ({current, pastIcon, currentIcon, futureIcon, skip, skipIcon, total, styler}) => {
			skip = coerceArray(skip);
			return Array.from(Array(total)).map((el, index) => {
				const stepNum = index + 1;
				const skipStep = (skip.indexOf(stepNum) >= 0);
				const past = (stepNum < current);
				const present = (stepNum === current);
				const future = (stepNum > current);

				let children, numbers = false;
				if (present) {
					numbers = (currentIcon === 'numbers');
					children = numbers ? stepNum.toString() : currentIcon;
				} else if (past) {
					numbers = (pastIcon === 'numbers');
					children = numbers ? stepNum.toString() : pastIcon;
				} else if (future) {
					numbers = (futureIcon === 'numbers');
					children = numbers ? stepNum.toString() : futureIcon;
				}

				if (skipStep && !present) {
					numbers = (skipIcon === 'numbers');
					children = numbers ? stepNum.toString() : skipIcon;
				}

				return {
					className: styler.join('step', {numbers, past, current: present, future, skip: (skipStep && !present)}),
					key: `step${stepNum}`,
					children
				};
			});
		}
	},

	render: ({iconComponent, size, steps, ...rest}) => {
		delete rest.current;
		delete rest.currentIcon;
		delete rest.futureIcon;
		delete rest.pastIcon;
		delete rest.skip;
		delete rest.skipIcon;
		delete rest.total;
		return (
			<Repeater
				{...rest}
				component="div"
				childComponent={iconComponent}
				itemProps={{size}}
			>
				{steps}
			</Repeater>
		);
	}
});

/**
 * Sandstone-specific behaviors to apply to [StepsBase]{@link sandstone/Steps.StepsBase}.
 *
 * @hoc
 * @memberof sandstone/Steps
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const StepsDecorator = compose(
	Skinnable
);

/**
 * A full-featured Sandstone-styled step component.
 *
 * @class Steps
 * @memberof sandstone/Steps
 * @extends sandstone/Steps.StepsBase
 * @mixes sandstone/Steps.StepsDecorator
 * @ui
 * @public
 */
const Steps = StepsDecorator(StepsBase);

export default Steps;
export {
	Steps,
	StepsBase,
	StepsDecorator
};
