/**
 * An [Icon]{@link sandstone/Icon.Icon} decorated with a label.
 *
 * You may specify an image or a font-based icon by setting the `icon` to either the path
 * to the image or a string from an [iconList]{@link sandstone/Icon.IconBase.iconList}.
 *
 * @example
 * <LabeledIcon icon="star" labelPosition="after">
 *   Favorite
 * </LabeledIcon>
 *
 * @module sandstone/LabeledIcon
 * @exports LabeledIcon
 * @exports LabeledIconBase
 * @exports LabeledIconDecorator
 */

import kind from '@enact/core/kind';
import UiLabeledIcon from '@enact/ui/LabeledIcon';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import {IconBase} from '../Icon';
import Skinnable from '../Skinnable';

import componentCss from './LabeledIcon.module.less';

// Make a basic Icon. This cuts `Pure` out of icon for a small gain.
const Icon = Skinnable(IconBase);

/**
 * A basic LabeledIcon component structure without any behaviors applied to it.
 *
 * @class LabeledIconBase
 * @memberof sandstone/LabeledIcon
 * @ui
 * @public
 */
const LabeledIconBase = kind({
	name: 'LabeledIcon',

	propTypes: /** @lends sandstone/LabeledIcon.LabeledIconBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `labeledIcon` - The root component class
		 * * `label` - The label component class
		 * * `icon` - The icon component class
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object
	},

	styles: {
		css: componentCss,
		className: 'labeledIcon',
		publicClassNames: ['labeledIcon', 'icon', 'label']
	},

	render: (props) => {
		return UiLabeledIcon.inline({
			...props,
			iconComponent: Icon,
			css: props.css
		});
	}
});

/**
 * Adds Sandstone specific behaviors to [LabeledIconBase]{@link sandstone/LabeledIcon.LabeledIconBase}.
 *
 * @hoc
 * @memberof sandstone/LabeledIcon
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const LabeledIconDecorator = compose(
	Pure,
	Skinnable
);

/**
 * A Sandstone-styled icon component with a label.
 *
 * Usage:
 * ```
 * <LabeledIcon icon="star" labelPosition="after">
 *   Favorite
 * </LabeledIcon>
 * ```
 *
 * @class LabeledIcon
 * @memberof sandstone/LabeledIcon
 * @extends sandstone/LabeledIcon.LabeledIconBase
 * @mixes sandstone/LabeledIcon.LabeledIconDecorator
 * @ui
 * @public
 */
const LabeledIcon = LabeledIconDecorator(LabeledIconBase);

export default LabeledIcon;
export {
	LabeledIcon,
	LabeledIconBase,
	LabeledIconDecorator
};
