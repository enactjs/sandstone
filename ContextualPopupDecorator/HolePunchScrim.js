import kind from '@enact/core/kind';
import {unit} from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable';

import css from './HolePunchScrim.module.less';

const HolePunchScrimBase = kind({
	name: 'HolePunchScrim',

	propTypes: {
		holeBounds: PropTypes.object
	},

	defaultProps: {
		holeBounds: {}
	},

	styles: {
		css,
		className: 'holePunchScrim'
	},

	computed: {
		style: ({holeBounds: {top = 0, left = 0, width = 0, height = 0}, style}) => {
			return {
				...style,
				'--hole-height': unit(height, 'rem'),
				'--hole-width': unit(width, 'rem'),
				'--hole-top': unit(top, 'rem'),
				'--hole-left': unit(left, 'rem')
			};
		}
	},

	render: ({...rest}) => {
		delete rest.holeBounds;
		return (
			<div {...rest} />
		);
	}
});

const HolePunchScrimDecorator = compose(
	Skinnable
);

const HolePunchScrim = HolePunchScrimDecorator(HolePunchScrimBase);

export default HolePunchScrim;
export {
	HolePunchScrim,
	HolePunchScrimBase,
	HolePunchScrimDecorator
};
