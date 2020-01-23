import hoc from '@enact/core/hoc';
import Registry from '@enact/core/internal/Registry';
import {ResizeContext} from '@enact/ui/Resizable';
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
			const {className, highContrast, textSize, ...props} = this.props;
			const accessibilityClassName = highContrast ? `enact-a11y-high-contrast enact-text-${textSize}` : `enact-text-${textSize}`;
			const combinedClassName = className ? `${className} ${accessibilityClassName}` : accessibilityClassName;
			const variants = {};
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
