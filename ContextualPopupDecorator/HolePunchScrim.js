import kind from '@enact/core/kind';
import {unit} from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable';

import css from './HolePunchScrim.module.less';

const autoUnit = (size) => (typeof size === 'number' ? unit(size, 'rem') : size);

const HolePunchScrimBase = kind({
	name: 'HolePunchScrim',

	propTypes: {
		holeBounds: PropTypes.shape({
			height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			right: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		})
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
				'--hole-height': autoUnit(height),
				'--hole-width': autoUnit(width),
				'--hole-top': autoUnit(top),
				'--hole-left': autoUnit(left)
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
