import kind from '@enact/core/kind';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import {ButtonBase, ButtonDecorator} from '../Button';
import Icon from '../Icon';
import ProgressBar from '../ProgressBar';
import Skinnable from '../Skinnable';

import componentCss from './ProgressButton.module.less';


/**
 * Renders a sandstone-styled progress button.
 *
 * @class ProgressButtonBase
 * @memberof sandstone/ProgressButton
 * @extends sandstone/Button
 * @extends sandstone/ProgressBar
 * @ui
 * @public
 */
const ProgressButtonBase = kind({
	name: 'ProgressButton',

	propTypes: /** @lends sandstone/ProgressButton.ProgressButtonBase.prototype */ {

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `progressButton` - The root component class
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The icon content displayed with progress.
		 *
		 * @type {String|Object}
		 * @default stop
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * A number between `0` and `1` indicating the proportion of the filled portion of the bar.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		progress: PropTypes.number,

		/**
		 * Shows progress instead of text.
		 *
		 * @type {Boolean}
		 * @public
		 */
		showProgress: PropTypes.bool
	},

	defaultProps: {
		icon: 'stop',
		progress: 0,
		showProgress: false
	},

	styles: {
		css: componentCss,
		className: 'progressButton',
		publicClassNames: ['progressButton']
	},

	computed: {
	},

	render: ({css, children, icon, progress, showProgress, ...rest}) => {

		return (
			<ButtonBase
				{...rest}
				css={css}
			>
				{showProgress ?
					(
						<div className={css.progressContainer}>
							<ProgressBar
								orientation="radial"
								progress={progress}
								css={css}
							/>
							<Icon className={css.icon}>
								{icon}
							</Icon>
						</div>
					) : children
				}
			</ButtonBase>
		);
	}
});

/**
 * Sandstone-specific behaviors to apply to [ProgressButton]{@link sandstone/ProgressButton.ProgressButtonBase}.
 *
 * @hoc
 * @memberof sandstone/ProgressButton
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const ProgressButtonDecorator = compose(
	Pure,
	Skinnable
);

/**
 * The ready-to-use Sandstone-styled ProgressButton.
 *
 * @class ProgressButton
 * @memberof sandstone/ProgressButton
 * @extends sandstone/ProgressButton.ProgressButtonBase
 * @mixes sandstone/ProgressButton.ProgressButtonDecorator
 * @ui
 * @public
 */
const ProgressButton = ButtonDecorator(ProgressButtonBase);


export default ProgressButton;
export {
	ProgressButton,
	ProgressButtonBase,
	ProgressButtonDecorator
};
