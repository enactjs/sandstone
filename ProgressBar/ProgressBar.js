/**
 * Provides Sandstone-themed progress bar component.
 *
 * @example
 * <ProgressBar progress={0.5} backgroundProgress={0.75} />
 *
 * @module sandstone/ProgressBar
 * @exports ProgressBar
 * @exports ProgressBarBase
 * @exports ProgressBarDecorator
 * @exports ProgressBarTooltip
 */

import kind from '@enact/core/kind';
import ComponentOverride from '@enact/ui/ComponentOverride';
import UiProgressBar from '@enact/ui/ProgressBar';
import Pure from '@enact/ui/internal/Pure';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Skinnable from '../Skinnable';
import {ProgressBarTooltip} from './ProgressBarTooltip';

import componentCss from './ProgressBar.module.less';

const RadialBarBase = kind({
	name: 'RadialBar',

	propTypes: /** @lends sandstone/ProgressBar.RadialBar.prototype */ {
		/**
		 * A number between `0` and `1` indicating the proportion of the filled portion of the bar.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		progress: PropTypes.number
	},

	defaultProps: {
		progress: 0
	},

	styles: {
		css: componentCss,
		className: 'radialBar'
	},

	computed: {
		className: ({progress, styler}) => styler.append({
			[componentCss.full]: progress > 0.5
		}),
		style: ({progress, style}) => ({
			...style,
			['--sand-radialbar-rotation']: `${(360 / 100) * (progress * 100)}deg`
		})
	},

	render: (props) => {
		delete props.progress;

		return (
			<div {...props}>
				<div className={componentCss.left} />
				<div className={componentCss.right} />
			</div>
		);
	}
});

const RadialBar = Skinnable(RadialBarBase);

/**
 * Renders a sandstone-styled progress bar.
 *
 * @class ProgressBarBase
 * @memberof sandstone/ProgressBar
 * @ui
 * @public
 */
const ProgressBarBase = kind({
	name: 'ProgressBar',

	propTypes: /** @lends sandstone/ProgressBar.ProgressBarBase.prototype */ {
		/**
		 * The proportion of the loaded portion of the progress bar.
		 *
		 * * Valid values are between `0` and `1`.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		backgroundProgress: PropTypes.number,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `progressBar` - The root component class
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Highlights the filled portion.
		 *
		 * @type {Boolean}
		 * @public
		 */
		highlighted: PropTypes.bool,

		/**
		 * Sets the orientation of the slider.
		 *
		 * * Values: `'horizontal'`, `'vertical'`, `'radial'`
		 *
		 * @type {String}
		 * @default 'horizontal'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical', 'radial']),

		/**
		 * A number between `0` and `1` indicating the proportion of the filled portion of the bar.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		progress: PropTypes.number,

		/**
		 * Enables the built-in tooltip.
		 *
		 * To customize the tooltip, pass either a custom tooltip component or an instance of
		 * [ProgressBarTooltip]{@link sandstone/ProgressBar.ProgressBarTooltip} with additional
		 * props configured.
		 *
		 * The provided component will receive the following props from `ProgressBar`:
		 *
		 * * `orientation`  - The value of `orientation`
		 * * `percent`      - Always `true` indicating the value should be presented as a percentage
		 *                    rather than an absolute value
		 * * `progress`     - The `value` as a proportion between `min` and `max`
		 * * `visible`      - Always `true` indicating that the tooltip should be visible
		 *
		 * Usage:
		 * ```
		 * <ProgressBar
		 *   tooltip={
		 *     <ProgressBarTooltip side="after" />
		 *   }
		 * />
		 * ```
		 *
		 * The tooltip may also be passed as a child via the `"tooltip"` slot. See
		 * [Slottable]{@link ui/Slottable} for more information on how slots can be used.
		 *
		 * Usage:
		 * ```
		 * <ProgressBar>
		 *   <ProgressBarTooltip side="after" />
		 * </ProgressBar>
		 * ```
		 *
		 * @type {Boolean|Component|Element}
		 * @public
		 */
		tooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.func])
	},

	defaultProps: {
		backgroundProgress: 0,
		orientation: 'horizontal',
		progress: 0
	},

	styles: {
		css: componentCss,
		publicClassNames: ['progressBar']
	},

	computed: {
		className: ({highlighted, orientation, styler}) => styler.append({
			highlighted,
			[componentCss.radial]: orientation === 'radial'
		}),
		radialComponent: ({backgroundProgress, orientation, progress}) => (
			orientation === 'radial' ?
				<>
					<RadialBar className={componentCss.load} progress={backgroundProgress} />
					<RadialBar className={componentCss.fill} progress={progress} />
				</> :
				null
		),
		tooltip: ({tooltip}) => tooltip === true ? ProgressBarTooltip : tooltip
	},

	render: ({css, orientation, progress, radialComponent: RadialComponent, tooltip, ...rest}) => {
		delete rest.tooltip;
		delete rest.highlighted;

		return (
			<UiProgressBar
				{...rest}
				orientation={orientation}
				progress={progress}
				css={css}
			>
				{RadialComponent}
				<ComponentOverride
					component={tooltip}
					orientation={orientation}
					percent
					proportion={progress}
					visible
				/>
			</UiProgressBar>
		);
	}
});

/**
 * Sandstone-specific behaviors to apply to [ProgressBar]{@link sandstone/ProgressBar.ProgressBarBase}.
 *
 * @hoc
 * @memberof sandstone/ProgressBar
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const ProgressBarDecorator = compose(
	Pure,
	Slottable({slots: ['tooltip']}),
	Skinnable
);

/**
 * The ready-to-use Sandstone-styled ProgressBar.
 *
 * @class ProgressBar
 * @memberof sandstone/ProgressBar
 * @extends sandstone/ProgressBar.ProgressBarBase
 * @mixes sandstone/ProgressBar.ProgressBarDecorator
 * @ui
 * @public
 */
const ProgressBar = ProgressBarDecorator(ProgressBarBase);


export default ProgressBar;
export {
	ProgressBar,
	ProgressBarBase,
	ProgressBarDecorator,
	ProgressBarTooltip
};
