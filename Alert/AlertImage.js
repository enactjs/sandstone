import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

import Image from '../Image';
import componentCss from './AlertImage.module.less';

/**
 * An image for use in an Alert.
 *
 * @class
 * @memberof sandstone/Alert
 * @ui
 * @public
 */
const AlertImage = kind({
	name: 'AlertImage',
	propTypes: /** @lends sandstone/Alert.AlertImage */ {
		/**
		 * String value or Object of values used to determine which image will appear for
		 * a specific component size.
		 *
		 * @type {String|Object}
		 * @required
		 * @public
		 */
		src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,

		/**
		 * Type of image to appear in the alert component. There are two types:
		 *
		 * * `icon` - A small square sized image type
		 * * `thumbnail` - A common image type
		 *
		 * @type {('icon'|'thumbnail')}
		 * @required
		 * @public
		 */
		type: PropTypes.oneOf(['icon', 'thumbnail']).isRequired,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `alertImage` - The root class name
		 *
		 * @type {Object}
		 * @private
		 */
		css: PropTypes.object
	},
	styles: {
		className: 'alertImage',
		css: componentCss,
		publicClassNames: ['alertImage', 'icon', 'thumbnail']
	},
	computed: {
		className: ({type, styler}) => styler.append(type)
	},
	render: ({css, src, ...rest}) => {
		delete rest.type;
		return (
			<Image
				{...rest}
				src={src}
				css={css}
			/>
		);
	}
});

export default AlertImage;
