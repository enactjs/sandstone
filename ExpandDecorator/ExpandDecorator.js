/**
 * Sandstone styled expand effect on focus.
 *
 * @module sandstone/ExpandDecorator
 * @exports ExpandDecorator
 */

import hoc from '@enact/core/hoc';
import {useLayoutEffect, useRef} from 'react';

import css from './ExpandDecorator.module.less';

const DefaultConfig = {
	duration: 200,
	scale: 1.2
};

/**
 * A higher-order component for expanding effect of the wrapped component on focus.
 *
 * @class ExpandDecorator
 * @memberof sandstone/ExpandDecorator
 * @hoc
 * @public
 */
const ExpandDecorator = hoc(DefaultConfig, (config, Wrapped) => {
	const {duration, scale} = config;

	const Decorator = ({...rest}) => {
		const ref = useRef();

		useLayoutEffect(() => {
			const styleObject = ref.current?.style;

			if (styleObject) {
				if (typeof duration === 'number' && !isNaN(duration)) {
					styleObject.setProperty('--expand-decorator-transition-duration', `${duration}ms`);
				}
				if (typeof scale === 'number' && !isNaN(scale)) {
					styleObject.setProperty('--expand-decorator-transform', `scale(${scale})`);
				}
			}
		}, []);

		return (
			<div ref={ref} className={css.expand}>
				<Wrapped {...rest} />
			</div>
		);
	};

	Decorator.displayName = 'ExpandDecorator';

	return Decorator;
});


export default ExpandDecorator;
export {
	ExpandDecorator
};
