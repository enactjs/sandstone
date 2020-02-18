/**
 * Sandstone styled key guide component and behaviors.
 *
 * @example
 * <KeyGuide
 *		open
 * >
 * 	{[
 *		{icon: 'star', children: 'start label', key: 1},
 *		{icon: 'plus', children: 'plus label', key: 2},
 *		{icon: 'minus', children: 'minus label', key: 3}
 *	]}
 * </KeyGuide>
 *
 * @module sandstone/KeyGuide
 * @exports KeyGuide
 * @exports KeyGuideBase
 * @exports KeyGuideDecorator
 */

import kind from '@enact/core/kind';
import EnactPropTypes from '@enact/core/internal/prop-types';
import FloatingLayer from '@enact/ui/FloatingLayer';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import LabeledIcon from '../LabeledIcon';
import Skinnable from '../Skinnable';
import componentCss from './KeyGuide.module.less';

/**
 * A Key Guide component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [KeyGuide]{@link sandstone/KeyGuide.KeyGuide}.
 *
 * @class KeyGuideBase
 * @memberof sandstone/KeyGuide
 * @ui
 * @public
 */
const KeyGuideBase = kind({
	name: 'KeyGuide',

	propTypes: /** @lends sandstone/KeyGuide.KeyGuideBase.prototype */ {
		/**
		 * The items to be displayed in the `KeyGuide` when `open`.
		 *
		 * Takes an array of objects. The properties will be passed onto an `LabeledIcon` component
		 * and `children` as well as a unique `key` property are required.
		 *
		 * @type {Array.<{children: (String|Component), key: (Number|String), icon: (String)}>}
		 * @public
		 */
		children: PropTypes.arrayOf(PropTypes.shape({
			children: EnactPropTypes.renderable.isRequired,
			key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			icon: PropTypes.string
		})).isRequired,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `keyGuide` - The root component class
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Controls the visibility of the KeyGuide.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool
	},

	computed: {
		children: ({children, css}) => {
			if (!Array.isArray(children)) return [];

			return children.map((child) => {
				return <LabeledIcon {...child} css={css} labelPosition="after" size="small" />;
			});
		}
	},

	styles: {
		css: componentCss,
		className: 'keyGuide',
		publicClassNames: ['keyGuide']
	},

	render: ({open, children, ...rest}) => {
		return (
			<FloatingLayer
				noAutoDismiss
				open={open}
				scrimType="none"
			>
				<div {...rest}>
					{children}
				</div>
			</FloatingLayer>
		);
	}
});

const KeyGuideDecorator = compose(
	Pure,
	Skinnable
);

const KeyGuide = KeyGuideDecorator(KeyGuideBase);

export default KeyGuide;
export {
	KeyGuide,
	KeyGuideBase,
	KeyGuideDecorator
};
