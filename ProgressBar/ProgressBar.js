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
		 * * `radial` - Applied when `orientation` is `'radial'`
		 *
		 * @type {Object}
		 * @public
		 */
		// `'bar` and `fill'` were intentionally excluded from the above documented
		// exported classes as they do not appear to provide value to the end-developer, but are
		// needed by ProgressButton internally for its design guidelines.
		css: PropTypes.object,

		/**
		 * Highlights the filled portion.
		 *
		 * @type {Boolean}
		 * @public
		 */
		highlighted: PropTypes.bool,

		/**
		 * The orientation of the slider.
		 *
		 * @type {('horizontal'|'vertical'|'radial')}
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
		 * Displays an anchor at `progressAnchor`.
		 *
		 * @type {Boolean}
		 * @public
		 */
		showAnchor: PropTypes.bool,

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
		 *     <ProgressBarTooltip position="after" />
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
		 *   <ProgressBarTooltip position="after" />
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
		publicClassNames: ['progressBar', 'radial', 'bar', 'fill']
	},

	computed: {
		className: ({highlighted, showAnchor, styler}) => styler.append({
			highlighted,
			showAnchor
		}),
		tooltip: ({tooltip}) => tooltip === true ? ProgressBarTooltip : tooltip
	},

	render: ({css, orientation, progress, tooltip, ...rest}) => {
		delete rest.tooltip;
		delete rest.highlighted;
		delete rest.showAnchor;

		return (
			<UiProgressBar
				{...rest}
				orientation={orientation}
				progress={progress}
				css={css}
			>
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
