import kind from '@enact/core/kind';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/knobs';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Icon from '@enact/sandstone/Icon';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';

import css from './About.module.less';

const edgeDotKeepout = 12;

const riSafe = (style) => {
	switch (typeof style) {
		case 'object':
			for (let rule in style) {
				if (typeof style[rule] === 'number') {
					style[rule] = ri.unit(ri.scale(style[rule]), 'rem');
				}
			}
			return style;
		default:
			return ri.unit(ri.scale(style), 'rem');
	}
};

const HintDialog = kind({
	name: 'HintDialog',

	propTypes: {
		length: PropTypes.number,
		pointerPosition: PropTypes.string
	},
	defaultProps: {
		pointerPosition: 'below'
	},
	styles: {
		css,
		className: 'hintDialog'
	},
	computed: {
		className: ({pointerPosition, styler}) => styler.append(pointerPosition),
		style: ({length, style}) => ({
			...style,
			'--pointer-length': riSafe(length)
		})
	},
	render: ({children, ...rest}) => {
		delete rest.length;
		delete rest.pointerPosition;

		return (
			<aside {...rest}>
				<div className={css.pointer}>
					<Icon className={css.pointerIcon}>circle</Icon>
				</div>
				<div className={css.text}>{children}</div>
			</aside>
		);
	}
});

export default {
	title: 'About/A Tour of Sampler'
};

export const ATourOfSampler = () => (
	<div style={{overflow: 'hidden', height: '100%'}}>
		<BodyText centered={boolean('text centered', BodyText)}>
			Welcome to the Sandstone sampler! Explore Sandstone components.
		</BodyText>
		<Button onClick={action('onClick')} selected={boolean('button selected', Button)}>
			Click me
		</Button>
		<HintDialog style={{top: 3, left: 99}} length={60} pointerPosition="above">
			Click <b>Docs</b> to see the live source code for the sample
		</HintDialog>
		<HintDialog
			style={riSafe({top: 198, left: 0})}
			length={60}
			pointerPosition="left"
		>
			Select any component from the <b>sidebar</b> to see how it works
		</HintDialog>
		<HintDialog style={{bottom: riSafe(edgeDotKeepout), left: 39, top: 480}} length={111}>
			<b>Actions</b> tab logs events generated by components{' '}
			<b>
				Click the button above
				<Icon size="small" className={css.icon}>
					arrowsmallup
				</Icon>
			</b>{' '}
			for a demonstration
		</HintDialog>
		<HintDialog style={{bottom: riSafe(edgeDotKeepout), left: 114, top: 582}} length={60}>
			<b>Knobs</b> tab lets you adjust component properties
		</HintDialog>
	</div>
);

ATourOfSampler.storyName = 'A Tour of Sampler';
