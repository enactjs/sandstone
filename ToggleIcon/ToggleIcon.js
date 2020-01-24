/**
 * Provides Sandstone-themed Icon component with interactive toggleable capabilities.
 *
 * `ToggleIcon` does not implement a visual change when a user interacts with the control and must
 * be customized by the consumer using [css className
 * overrides]{@link ui/ToggleIcon.ToggleIconBase.css}.
 *
 * Often, an [Icon value]{@link sandstone/Icon.Icon} is passed as `children` to represent the
 * selected state but is not required. Omitting `children` allows the consumer to implement more
 * advanced approaches such as styling the `::before` and `::after` pseudo-elements to save a DOM
 * node.
 *
 * The following Sandstone components use `ToggleIcon`, and make good examples of various usages.
 *
 * * [Checkbox]{@link sandstone/Checkbox.Checkbox},
 * * [FormCheckbox]{@link sandstone/FormCheckbox.FormCheckbox},
 * * [Switch]{@link sandstone/Switch.Switch},
 * * [RadioItem]{@link sandstone/RadioItem.RadioItem}, and
 * * [SelectableItem]{@link sandstone/SelectableItem.SelectableItem}.
 *
 * @example
 * <ToggleIcon onToggle={(props)=> console.log(props.selected)}>
 *   check
 * </ToggleIcon>
 *
 * @module sandstone/ToggleIcon
 * @exports ToggleIcon
 * @exports ToggleIconBase
 * @exports ToggleIconDecorator
 */

import kind from '@enact/core/kind';
import Pure from '@enact/ui/internal/Pure';
import UiToggleIcon from '@enact/ui/ToggleIcon';
import compose from 'ramda/src/compose';
import React from 'react';

import Icon from '../Icon';
import Skinnable from '../Skinnable';

/**
 * A component that indicates a boolean state.
 *
 * @class ToggleIconBase
 * @memberof sandstone/ToggleIcon
 * @extends ui/ToggleIcon.ToggleIcon
 * @ui
 * @public
 */
const ToggleIconBase = kind({
	name: 'ToggleIcon',

	render: (props) => {
		return (
			<UiToggleIcon {...props} iconComponent={Icon} />
		);
	}
});

/**
 * Sandstone-specific behaviors to apply to `ToggleIconBase`.
 *
 * @hoc
 * @memberof sandstone/ToggleIcon
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const ToggleIconDecorator = compose(
	Pure,
	Skinnable
);

/**
 * A customizable Sandstone starting point [Icon]{@link sandstone/Icon.Icon} that responds to the
 * `selected` prop.
 *
 * @class ToggleIcon
 * @memberof sandstone/ToggleIcon
 * @extends sandstone/ToggleIcon.ToggleIconBase
 * @mixes sandstone/ToggleIcon.ToggleIconDecorator
 * @ui
 * @public
 */
const ToggleIcon = ToggleIconDecorator(ToggleIconBase);

export default ToggleIcon;
export {
	ToggleIcon,
	ToggleIconBase,
	ToggleIconDecorator
};
