/**
 * Sandstone styled modal Alert components.
 *
 * @module sandstone/Alert
 * @exports Alert
 * @exports AlertBase
 */

import kind from '@enact/core/kind';
import IdProvider from '@enact/ui/internal/IdProvider';
import {Column, Cell, Row} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import React from 'react';

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
		subtitle: ({title, subtitle}) => title ? subtitle : '',
		type: ({type}) => type === 'overlay' ? 'bottom' : type
	},

	render: ({buttons, children, css, id, image, title, subtitle, type, ...rest}) => {
		const fullscreen = (type === 'fullscreen');
		const Container = fullscreen ? Column : Row;
		return (
			<Popup {...rest} noAnimation aria-labelledby={`${id}_title ${id}_subtitle ${id}_buttons`} css={css} position={type} skinVariants="light">
				<Container align="center center">
					<Cell shrink>
						<Container align="center">
							{image ? <Cell className={css.alertImage} shrink>{image}</Cell> : null}
							{fullscreen ?
								<React.Fragment>
									<Cell className={css.title} id={`${id}_title`} shrink>
										{title}
									</Cell>
									<Cell className={css.subtitle} id={`${id}_subtitle`} shrink>
										{subtitle}
									</Cell>
								</React.Fragment> :
								<Cell className={css.content} id={`${id}content`} shrink>
									{children}
								</Cell>
							}
						</Container>
					</Cell>
					<Cell align={type === 'fullscreen' ? '' : 'end'} shrink className={css.buttonContainer}>
						<Column id={`${id}_buttons`} align="center center">
							{buttons}
						</Column>
					</Cell>
				</Container>
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
