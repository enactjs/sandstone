/**
 * Sandstone styled modal Alert components.
 *
 * @module sandstone/Alert
 * @exports Alert
 * @exports AlertBase
 * @exports AlertImage
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

import css from './Alert.module.less';

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
		 *
		 * Only shown when `type="overlay"`. If `children` is text-only, it will be wrapped with
		 * [BodyText]{@link sandstone/BodyText}.
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * The `id` of Alert referred to when generating ids for `'title'` and `'buttons'`.
		 *
		 * @type {String}
		 * @private
		 */
		id: PropTypes.string,

		/**
		 * Image to be included in the Alert component.
		 *
		 * It is recommended to use the `AlertImage` component.
		 *
		 * @type {Element}
		 * @public
		 */
		image: PropTypes.element,

		/**
		 * Called when the user requests to close the Alert.
		 *
		 * This also includes pressing the cancel key.
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
		 * Assign a skin.
		 *
		 * @type {String}
		 * @private
		 */
		skin: PropTypes.string,

		/**
		 * The primary text displayed.
		 *
		 * Only shown when `type="fullscreen"`.
		 *
		 * @type {String}
		 * @public
		 */
		title: PropTypes.string,

		/**
		 * Type of popup.
		 *
		 * There are two types:
		 *
		 * * `fullscreen` - Full screen popup
		 * * `overlay` - Popup in the center of the screen
		 *
		 * @type {('fullscreen'|'overlay')}
		 * @default 'fullscreen'
		 * @public
		 */
		type: PropTypes.oneOf(['fullscreen', 'overlay'])
	},

	defaultProps: {
		open: false,
		type: 'fullscreen'
	},

	styles: {
		css,
		className: 'alert'
	},

	computed: {
		buttons: ({buttons}) => {
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
		contentComponent: ({children}) => {
			if (typeof children === 'string' ||
				Array.isArray(children) && children.every(child => (child == null || typeof child === 'string'))
			) {
				return BodyText;
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

	render: ({buttons, contentComponent, children, id, image, title, type, ...rest}) => {
		const fullscreen = (type === 'fullscreen');
		const position = (type === 'overlay' ? 'bottom' : type);
		const layoutOrientation = (fullscreen ? 'vertical' : 'horizontal');
		const showTitle = (fullscreen && title);
		const ariaLabelledBy = (showTitle ? `${id}_title ` : '') + `${id}_content ${id}_buttons`;
		return (
			<Popup
				{...rest}
				noAnimation
				aria-labelledby={ariaLabelledBy}
				css={css}
				position={position}
			>
				<Layout align="center center" orientation={layoutOrientation}>
					{image ? <Cell className={css.alertImage} shrink>{image}</Cell> : null}
					{showTitle ? <Heading size="title" alignment="center" className={css.title} id={`${id}_title`}>{title}</Heading> : null}
					<Cell shrink align={fullscreen ? 'center' : ''} component={contentComponent} className={css.content} id={`${id}_content`}>
						{children}
					</Cell>
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
 * consists of a title, a message, and an area for additional
 * [buttons]{@link sandstone/Alert.Alert.buttons}.
 *
 * Usage:
 * ```
 * <Alert
 *   open={this.state.open}
 *   title="An Important Alert"
 * >
 *   <image>
 *     <AlertImage src={this.state.src} type="thumbnail" />
 *   </image>
 *
 *   Body text for alert. Components may also be used here for greater customizability.
 *
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
		{slots: ['title', 'buttons', 'image']},
		AlertBase
	)
);

export default Alert;
export {
	Alert,
	AlertBase,
	AlertImage
};
