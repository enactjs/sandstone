/**
 * Sandstone styled modal Alert components.
 *
 * @module sandstone/Alert
 * @exports Alert
 * @exports AlertBase
 */

import kind from '@enact/core/kind';
import IdProvider from '@enact/ui/internal/IdProvider';
import Layout, {Cell} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import React from 'react';

import BodyText from '../BodyText';
import Heading from '../Heading';
import Popup from '../Popup';

import AlertImage from './AlertImage';

import componentCss from './Alert.module.less';

/**
 * A modal Alert component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [Alert]{@link sandstone/Alert.Alert}.
 *
 * @class AlertBase
 * @memberof sandstone/Alert
 * @ui
 * @public
 */
const AlertBase = kind({
	name: 'Alert',

	propTypes: /** @lends sandstone/Alert.AlertBase.prototype */ {
		/**
		 * Buttons to be included under the component.
		 *
		 * Typically, up to 3 buttons are used.
		 *
		 * @type {Element|Element[]}
		 * @public
		 */
		buttons: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.arrayOf(PropTypes.element)
		]),

		/**
		 * The contents of the body of the component.
		 * This is only shown in `type="overlay"`
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `alert` - The root class name
		 *
		 * @type {Object}
		 * @private
		 */
		css: PropTypes.object,

		/**
		 * The id of Alert referred to when generating ids for `'title'`, `'subtitle'` and `'buttons'`.
		 *
		 * @type {String}
		 * @private
		 */
		id: PropTypes.string,

		/**
		 * Image to be included in the Alert component.
		 * It recommends to use `AlertImage` component.
		 *
		 * Will not display if `image` is not set.
		 *
		 * @type {Element}
		 * @public
		 */
		image: PropTypes.element,

		/**
		 * Called when the user requests to close the Alert.
		 *
		 * These actions include pressing the cancel key.
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func,

		/**
		 * Called after the transition to hide the Alert has finished.
		 *
		 * @type {Function}
		 * @public
		 */
		onHide: PropTypes.func,

		/**
		 * Opens the Alert.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Assign a skin
		 *
		 * @type {String}
		 * @private
		 */
		skin: PropTypes.string,

		/**
		 * The secondary text displayed below the `title`.
		 * This is only shown in `type="fullscreen"`
		 *
		 * Will not display if `title` is not set.
		 *
		 * @type {String}
		 * @public
		 */
		subtitle: PropTypes.string,

		/**
		 * The primary text displayed. This is only shown in
		 * `type="fullscreen"`
		 *
		 * @type {String}
		 * @public
		 */
		title: PropTypes.string,

		/**
		 * Type of popup to appear in the screen. There are two types.
		 *
		 * * `fullscreen` - Full screen popup
		 * * `overlay` - Popup in the center of the screen
		 * @type {String|Object}
		 * @public
		 */
		type: PropTypes.oneOf(['fullscreen', 'overlay'])
	},

	defaultProps: {
		open: false,
		type: 'fullscreen'
	},

	styles: {
		css: componentCss,
		className: 'alert',
		publicClassNames: ['alert']
	},

	computed: {
		buttons: ({buttons, css}) => {
			if (buttons) {
				return React.Children.map(buttons, (button, index) => (
					<Cell className={css.buttonCell} key={`button${index}`} shrink>
						{button}
					</Cell>
				));
			} else {
				return null;
			}
		},
		className: ({buttons, image, type, styler}) => styler.append(
			{
				maxButtons: (buttons && React.Children.toArray(buttons).filter(Boolean).length > 2),
				noImage: !image
			},
			type
		),
		skin: ({skin, type}) => (skin || (type === 'overlay' ? 'light' : 'neutral'))
	},

	render: ({buttons, children, css, id, image, title, subtitle, type, ...rest}) => {
		const fullscreen = (type === 'fullscreen');
		const layoutOrientation = (fullscreen ? 'vertical' : 'horizontal');
		return (
			<Popup {...rest} noAnimation aria-labelledby={`${id}_title ${id}_subtitle ${id}_buttons`} css={css} position={(type === 'overlay' ? 'bottom' : type)}>
				<Layout align="center center" orientation={layoutOrientation}>
					{image ? <Cell className={css.alertImage} shrink>{image}</Cell> : null}
					{fullscreen ?
						<Cell shrink align="stretch">
							<Heading size="title" alignment="center" className={css.title} id={`${id}_title`} >{title}</Heading>
							<BodyText centered className={css.subtitle} id={`${id}_subtitle`}>{subtitle}</BodyText>
						</Cell> :
						<Cell shrink component={BodyText} className={css.content} id={`${id}content`}>
							{children}
						</Cell>
					}
					<Cell align={fullscreen ? '' : 'end'} shrink className={css.buttonContainer}>
						<Layout align="center" orientation="vertical" id={`${id}_buttons`}>
							{buttons}
						</Layout>
					</Cell>
				</Layout>
			</Popup>
		);
	}
});

/**
 * A modal Alert component, ready to use in Sandstone applications.
 *
 * `Alert` may be used to interrupt a workflow to receive feedback from the user. The dialong
 * consists of a title, a subtitle, a message, and an area for additional
 * [buttons]{@link sandstone/Alert.Alert.buttons}.
 *
 * Usage:
 * ```
 * <Alert
 *   open={this.state.open}
 *   title="An Important Alert"
 *   subtitle="Some important context to share about the purpose"
 * >
 *   <image>
 *     <AlertImage src={this.state.src} type="thumbnail" />
 *   </image>
 *   <buttons>
 *     <Button>Button 1</Button>
 *     <Button>Button 2</Button>
 *   </buttons>
 * </Alert>
 * ```
 *
 * @class Alert
 * @memberof sandstone/Alert
 * @extends sandstone/Alert.AlertBase
 * @mixes ui/Slottable.Slottable
 * @ui
 * @public
 */
const Alert = IdProvider(
	{generateProp: null, prefix: 'a_'},
	Slottable(
		{slots: ['title', 'subtitle', 'buttons', 'image']},
		AlertBase
	)
);

export default Alert;
export {
	Alert,
	AlertBase,
	AlertImage
};
