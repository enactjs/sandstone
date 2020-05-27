import kind from '@enact/core/kind';
import {memoize} from '@enact/core/util';
import ilib from '@enact/i18n';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import NumFmt from 'ilib/lib/NumFmt';
import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../TooltipDecorator/Tooltip';

import componentCss from './ProgressBarTooltip.module.less';

const verticalPositions = ['before', 'after', 'left', 'right'];
const isVerticalModeRadial = (orientation, position) => orientation === 'radial' && verticalPositions.includes(position);

// prop-type validator that warns on invalid orientation + position
/* istanbul ignore next */
const validatePosition = (base) => (props, key, componentName, location, propFullName, ...rest) => {
	const {position} = props;
	let result = base(props, key, componentName, location, propFullName, ...rest);

	if (!result && position) {
		const orientation = props.orientation || 'horizontal';
		const hasVerticalValue = verticalPositions.includes(position);
		if (
			(orientation === 'vertical' && !hasVerticalValue) ||
			(orientation === 'horizontal' && hasVerticalValue)
		) {
			result = new Error(
				`'${key}' value '${position}' is not a valid value for the orientation '${orientation}'`
			);
		}
	}

	return result;
};

const memoizedPercentFormatter = memoize((/* locale */) => new NumFmt({
	type: 'percentage',
	useNative: false
}));

const getDefaultPosition = (orientation) => orientation === 'horizontal' ? 'above' : 'after';

// Returns an array of keywords with horizontal first and vertical second
const getSide = (orientation, position) => {
	position = position || getDefaultPosition(orientation);

	if (orientation === 'horizontal') {
		switch (position) {
			case 'above':
			case 'below':
				return ['auto', position];
			case 'above after':
			case 'above before':
			case 'above center':
			case 'above left':
			case 'above right':
			case 'below after':
			case 'below before':
			case 'below center':
			case 'below left':
			case 'below right':
				return position.split(' ').reverse();
			default:
				// invalid values for horizontal so use defaults
				return ['auto', 'above'];
		}
	} else if (orientation === 'vertical') {
		switch (position) {
			case 'after':
			case 'before':
			case 'left':
			case 'right':
				return [position, 'above'];
			default:
				// invalid values for horizontal so use defaults
				return ['after', 'auto'];
		}
	} else {
		switch (position) {
			case 'above':
			case 'below':
				return ['auto', position];
			case 'above after':
			case 'above before':
			case 'above center':
			case 'above left':
			case 'above right':
			case 'below after':
			case 'below before':
			case 'below center':
			case 'below left':
			case 'below right':
				return position.split(' ').reverse();
			case 'after':
			case 'before':
			case 'left':
			case 'right':
				return [position, 'above'];
			default:
				// invalid values for radial so use defaults
				return ['auto', 'above'];
		}
	}
};

/**
 * A [Tooltip]{@link sandstone/TooltipDecorator.Tooltip} specifically adapted for use with
 * [ProgressBar]{@link sandstone/ProgressBar.ProgressBar} or
 * [Slider]{@link sandstone/Slider.Slider}.
 *
 * @class ProgressBarTooltip
 * @memberof sandstone/ProgressBar
 * @ui
 * @public
 */
const ProgressBarTooltipBase = kind({
	name: 'ProgressBarTooltip',

	propTypes: /** @lends sandstone/ProgressBar.ProgressBarTooltip.prototype */{
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `tooltip` - The root component class
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Sets the orientation of the tooltip based on the orientation of the bar.
		 *
		 * 'vertical' sends the tooltip to one of the sides, 'horizontal' positions it above the bar, 'radial' can position it on all sides.
		 * * Values: `'horizontal'`, `'vertical'`
		 *
		 * @type {String}
		 * @default 'horizontal'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical', 'radial']),

		/**
		 * Displays the value as a percentage.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		percent: PropTypes.bool,

		/**
		 * Position of the tooltip with respect to the progress bar.
		 *
		 * * For `orientation="horizontal"` or `orientation="radial"` progress bars, the default value is `'above'`.
		 * * For `orientation="vertical"` progress bars, the default value is `'before'`.
		 *
		 * When using `'before'` or `'after'` alone or in any of the below combinations, `'before'`
		 * will position the tooltip on the side of the current locale's text directionality. In LTR
		 * locales, it will be on the left; in RTL locales, it will be on the right. Similarly,
		 * `'after'` will position the tooltip on the opposite side: the right side for LTR and
		 * left for RTL.
		 *
		 * Valid values when `orientation="horizontal"` or `orientation="radial"`
		 *
		 * | *Value* | *Tooltip Direction* |
		 * |---|---|
		 * | `'above'` | Above component, flowing to the nearest end |
		 * | `'above left'` | Above component, flowing to the left |
		 * | `'above before'` | Above component, flowing to the start of text |
		 * | `'above center'` | Above component, flowing to the center |
		 * | `'above right'` | Above component, flowing to the right |
		 * | `'above after'` | Above component, flowing to the end of text |
		 * | `'below'` | Below component, flowing to the nearest end |
		 * | `'below left'` | Below component, flowing to the left |
		 * | `'below before'` | Below component, flowing to the start of text |
		 * | `'below center'` | Below component, flowing to the center |
		 * | `'below right'` | Below component, flowing to the right |
		 * | `'below after'` | Below component, flowing to the end of text |
		 *
		 * Valid values when `orientation="vertical"` or `orientation="radial"`
		 *
		 * | *Value* | *Tooltip Direction* |
		 * |---|---|
		 * | `'left'` | Left of the component, contents middle aligned |
		 * | `'before'` | Start of text side of the component, contents middle aligned |
		 * | `'right'` | right of the component, contents middle aligned |
		 * | `'after'` | End of text side of the component, contents middle aligned |
		 *
		 * @type {('above'|'above before'|'above left'|'above after'|'above center'|'above right'|'below'|'below left'|'below before'|'below center'|'below right'|'below after'|'left'|'before'|'right'|'after')}
		 * @public
		 */
		position: validatePosition(PropTypes.oneOf([
			// horizontal or radial
			'above',
			'above before',
			'above left',
			'above center',
			'above after',
			'above right',
			'below',
			'below left',
			'below before',
			'below center',
			'below right',
			'below after',

			// vertical or radial
			'left',
			'before',
			'right',
			'after'
		])),

		/**
		 * The proportion of the filled part of the bar.
		 *
		 * * Should be a number between 0 and 1.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		proportion: PropTypes.number,

		/**
		 * Sets the text direction to be right-to-left
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		 * Visibility of the tooltip
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		visible: PropTypes.bool
	},

	defaultProps: {
		orientation: 'horizontal',
		percent: false,
		proportion: 0,
		visible: false
	},

	styles: {
		css: componentCss,
		className: 'tooltip',
		publicClassNames: true
	},

	computed: {
		children: ({children, proportion, percent}) => {
			if (percent) {
				const formatter = memoizedPercentFormatter(ilib.getLocale());

				return formatter.format(Math.round(proportion * 100));
			}

			return children;
		},
		className: ({orientation, position, proportion, styler}) => {
			const [h, v] = getSide(orientation, position);

			return styler.append(
				orientation,
				{
					above: (v === 'above' && !isVerticalModeRadial(orientation, position)),
					below: (v === 'below' && !isVerticalModeRadial(orientation, position)),
					before: (h === 'before'),
					after: (h === 'after'),
					center: (h === 'center'),
					left: (h === 'left' || (h === 'auto' && proportion <= 0.5)),
					right: (h === 'right' || (h === 'auto' && proportion > 0.5))
				}
			);
		},
		arrowAnchor: ({orientation, position, rtl}) => {
			if (orientation === 'vertical' || isVerticalModeRadial(orientation, position)) return 'middle';

			const [h] = getSide(orientation, position);
			switch (h) {
				case 'auto':
					return 'center';
				case 'before':
					return rtl ? 'right' : 'left';
				case 'after':
					return rtl ? 'left' : 'right';
				case 'left':
				case 'right':
				case 'center':
					return h;
			}
		},
		direction: ({orientation, position, rtl}) => {
			const [h, v] = getSide(orientation, position);

			let dir = 'right';
			if (orientation === 'vertical' || isVerticalModeRadial(orientation, position)) {
				if (
					// forced to the left
					h === 'left' ||
					// LTR before
					(!rtl && h === 'before') ||
					// RTL after
					(rtl && h === 'after')
				) {
					dir = 'left';
				}
			} else {
				dir = v !== 'below' ? 'above' : 'below';
			}
			return dir;
		},
		style: ({proportion, style}) => ({
			...style,
			'--tooltip-progress-proportion': proportion
		})
	},

	render: ({children, css, visible, ...rest}) => {
		if (!visible) return null;

		delete rest.orientation;
		delete rest.percent;
		delete rest.position;
		delete rest.proportion;
		delete rest.rtl;

		return (
			<Tooltip {...rest} css={css}>
				{children}
			</Tooltip>
		);
	}
});

const ProgressBarTooltip = I18nContextDecorator(
	{rtlProp: 'rtl'},
	ProgressBarTooltipBase
);
ProgressBarTooltip.defaultSlot = 'tooltip';

export default ProgressBarTooltip;
export {
	ProgressBarTooltip,
	ProgressBarTooltipBase
};
