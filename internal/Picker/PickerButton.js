import {forward, handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import {MarqueeControllerContext} from '@enact/ui/Marquee/MarqueeController';
import Pure from '@enact/ui/internal/Pure';
import Touchable from '@enact/ui/Touchable';

import Icon from '../../Icon';
import Button from '../../Button';

import css from './Picker.module.less';

const JoinedPickerButtonBase = kind({
	name: 'JoinedPickerButtonBase',

	propTypes: {
		disabled: PropTypes.bool,
		icon: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		])
	},

	render: ({disabled, icon, ...rest}) => (
		<span {...rest} data-webos-voice-intent="Select" disabled={disabled}>
			<Icon className={css.icon} disabled={disabled} size="small">{icon}</Icon>
		</span>
	)
});

const JoinedPickerButton = Touchable(JoinedPickerButtonBase);

const PickerButtonBase = kind({
	name: 'PickerButton',

	contextType: MarqueeControllerContext,

	propTypes: {
		disabled: PropTypes.bool,
		icon: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]),
		joined: PropTypes.bool,
		onSpotlightDisappear: PropTypes.func,
		spotlightDisabled: PropTypes.bool
	},

	styles: {
		css
	},

	handlers: {
		onMouseEnter: handle(
			forward('onMouseEnter'),
			(ev, props, sync) => {
				if (sync && sync.enter) {
					sync.enter(null);
				}
			}
		),
		onMouseLeave: handle(
			forward('onMouseLeave'),
			(ev, props, sync) => {
				if (sync && sync.leave) {
					sync.leave(null);
				}
			}
		)
	},

	render: ({disabled, icon, joined, ...rest}) => {
		if (joined) {
			delete rest.onSpotlightDisappear;
			delete rest.spotlightDisabled;

			return (
				<JoinedPickerButton {...rest} icon={icon} disabled={disabled} />
			);
		} else {
			return (
				<Button
					{...rest}
					backgroundOpacity="transparent"
					disabled={disabled}
					icon={icon}
					size="small"
				/>
			);
		}
	}
});

const PickerButton = Pure(
	PickerButtonBase
);

export default PickerButton;
export {
	PickerButton,
	PickerButtonBase
};
