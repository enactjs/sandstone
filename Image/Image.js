/**
 * Provides Sandstone styled Image component that supports multiple resolution sources.
 *
 * @example
 * <Image src="https://dummyimage.com/64/e048e0/0011ff" style={{height: 64, width: 64}} />
 *
 * @module sandstone/Image
 * @exports Image
 * @exports ImageBase
 * @exports ImageDecorator
 */

import kind from '@enact/core/kind';
import hoc from '@enact/core/hoc';
import {ImageBase as UiImageBase} from '@enact/ui/Image';
import EnactPropTypes from '@enact/core/internal/prop-types';
import ForwardRef from '@enact/ui/ForwardRef';
import Pure from '@enact/ui/internal/Pure';
import {selectSrc} from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Skinnable from '../Skinnable';

import componentCss from './Image.module.less';

/**
 * A Sandstone-styled image component without any behavior
 *
 * @class ImageBase
 * @memberof sandstone/Image
 * @extends ui/Image.Image
 * @ui
 * @public
 */
const ImageBase = kind({
	name: 'Image',

	propTypes: /** @lends sandstone/Image.ImageBase.prototype */ {
		/**
		 * Called with a reference to the root component.
		 *
		 * When using {@link sandstone/Image.Image}, the `ref` prop is forwarded to this component
		 * as `componentRef`.
		 *
		 * @type {Object|Function}
		 * @public
		 */
		componentRef: EnactPropTypes.ref,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `image` - The root component class for Image
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object
	},

	styles: {
		css: componentCss,
		publicClassNames: ['image']
	},

	render: ({css, componentRef, ...rest}) => {
		return (
			UiImageBase.inline({
				draggable: 'false',
				...rest,
				componentRef,
				css
			})
		);
	}
});


// This induces a render when there is a screen size change that has a corresponding image src value
// associated with the new screen size. The render is kicked off by remembering the new image src.
//
// This hoc could (should) be rewritten at a later time to use a smarter context API and callbacks,
// or something like pub/sub; each of which would be hooked together from the resolution.js that
// would coordinate any screen size/orientation changes and emit events from there.
//
// This is ripe for refactoring, and could probably move into UI to be generalized, but that's for
// another time. -B 2018-05-01
const ResponsiveImageDecorator = hoc((config, Wrapped) => {	// eslint-disable-line no-unused-vars
	return class extends React.Component {
		static displayName = 'ResponsiveImageDecorator';

		static propTypes = {
			src: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
		};

		constructor (props) {
			super(props);
			this.state = {
				src: selectSrc(this.props.src)
			};
		}

		componentDidMount () {
			window.addEventListener('resize', this.handleResize);
		}

		componentWillUnmount () {
			window.removeEventListener('resize', this.handleResize);
		}

		handleResize = () => {
			this.setState((state, props) => {
				const src = selectSrc(props.src);
				// Trigger a render and save the currently selected src for later comparisons
				if (src !== state.src) {
					return {src};
				}

				return null;
			});
		};

		render () {
			return <Wrapped {...this.props} />;
		}
	};
});

/**
 * Sandstone-specific behaviors to apply to [Image]{@link sandstone/Image.ImageBase}.
 *
 * @hoc
 * @memberof sandstone/Image
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const ImageDecorator = compose(
	ForwardRef({prop: 'componentRef'}),
	Pure,
	ResponsiveImageDecorator,
	Skinnable
);

/**
 * A Sandstone-styled image component
 *
 * ```
 * <Image
 *   src={{
 *     'hd': 'https://dummyimage.com/64/e048e0/0011ff',
 *     'fhd': 'https://dummyimage.com/128/e048e0/0011ff',
 *     'uhd': 'https://dummyimage.com/256/e048e0/0011ff'
 *   }}
 * >
 * ```
 *
 * @class Image
 * @memberof sandstone/Image
 * @extends sandstone/Image.ImageBase
 * @mixes sandstone/Image.ImageDecorator
 * @ui
 * @public
 */
const Image = ImageDecorator(ImageBase);


export default Image;
export {
	Image,
	ImageBase,
	ImageDecorator
};
