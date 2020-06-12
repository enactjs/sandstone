import hoc from '@enact/core/hoc';
import Registry from '@enact/core/internal/Registry';
import {ResizeContext} from '@enact/ui/Resizable';
import {objectify} from '@enact/ui/Skinnable/util';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * A higher-order component that classifies an application with a target set of font sizing rules.
 *
 * @class AccessibilityDecorator
 * @memberof sandstone/ThemeDecorator
 * @hoc
 * @public
 */
const AccessibilityDecorator = hoc((config, Wrapped) => {	// eslint-disable-line no-unused-vars
	return class extends React.Component {
		static contextType = ResizeContext;

		static displayName = 'AccessibilityDecorator'

		static propTypes =  /** @lends sandstone/ThemeDecorator.AccessibilityDecorator.prototype */ {
			/**
			 * Enables additional features to help users visually differentiate components.
			 *
			 * The UI library will be responsible for using this information to adjust
			 * the components' contrast to this preset.
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			highContrast: PropTypes.bool,

			/**
			 * The variant(s) on a skin that a component should use when rendering. These will
			 * typically alter the appearance of a skin's existing definition in a way that does not
			 * override that skin's general styling.
			 *
			 * Multiple data types are supported by this prop, which afford different conveniences
			 * and abilities. String and Array are effectively the same, supporting just additions
			 * to the variants being applied to a component, and are much more convenient. Objects
			 * may also be used, and have the ability to disable variants being passed by their
			 * ancestors. Objects take the format of a basic hash, with variants as key names and
			 * true/false Booleans as values, depicting their state. If a variant is excluded from
			 * any version of data type used to set this prop, that variant will ignored, falling
			 * back to the defaultVariant or parent variant, in that order.
			 *
			 * skinVariants examples:
			 * ```
			 *  // String
			 *  skinVariants="highContrast"
			 *
			 *  // Array
			 *  skinVariants={['highContrast']}
			 *
			 *  // Object
			 *  skinVariants={{
			 *  	highContrast: true,
			 *  	grayscale: false
			 *  }}
			 * ```
			 *
			 * @type {String|String[]|Object}
			 * @public
			 */
			skinVariants: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.array,
				PropTypes.object
			]),

			/**
			 * Sets the goal size of the text.
			 *
			 * The UI library will be responsible for using this
			 * information to adjust the components' text sizes to this preset.
			 * Current presets are `'normal'` (default), and `'large'`.
			 *
			 * @type {('normal'|'large')}
			 * @default 'normal'
			 * @public
			 */
			textSize: PropTypes.oneOf(['normal', 'large'])
		}

		static defaultProps = {
			highContrast: false,
			textSize: 'normal'
		}

		componentDidMount () {
			this.resizeRegistry.parent = this.context;
		}

		componentDidUpdate (prevProps) {
			if (prevProps.textSize !== this.props.textSize) {
				this.resizeRegistry.notify({});
			}
		}

		componentWillUnmount () {
			this.resizeRegistry.parent = null;
		}

		resizeRegistry = Registry.create();

		render () {
			const {className, highContrast, skinVariants, textSize, ...props} = this.props;
			const accessibilityClassName = highContrast ? `enact-a11y-high-contrast enact-text-${textSize}` : `enact-text-${textSize}`;
			const combinedClassName = className ? `${className} ${accessibilityClassName}` : accessibilityClassName;
			const variants = objectify(skinVariants);
			if (highContrast) variants.highContrast = true;
			if (textSize === 'large') variants.largeText = true;

			return (
				<ResizeContext.Provider value={this.resizeRegistry.register}>
					<Wrapped className={combinedClassName} skinVariants={variants} {...props} />
				</ResizeContext.Provider>
			);
		}
	};
});

export default AccessibilityDecorator;
export {AccessibilityDecorator};
