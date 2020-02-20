/**
 * Sandstone styled modal Alert components.
 *
 * @module sandstone/Alert
 * @exports Alert
 * @exports AlertBase
 */

import kind from '@enact/core/kind';
import IdProvider from '@enact/ui/internal/IdProvider';
import {Layout, Column} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import React from 'react';

import Popup from '../Popup';
import AlertOverlay from './AlertOverlay';
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
		 * The id of Alert referred to when generating ids for `'title'`, `'titleBelow'` and `'buttons'`.
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
		 * The primary text displayed.
		 *
		 * @type {String}
		 * @public
		 */
		title: PropTypes.string,

		/**
		 * The secondary text displayed below the `title`.
		 *
		 * Will not display if `title` is not set.
		 *
		 * @type {String}
		 * @public
		 */
		titleBelow: PropTypes.string
	},

	defaultProps: {
		open: false
	},

	styles: {
		css: componentCss,
		className: 'alert',
		publicClassNames: ['alert']
	},

	computed: {
		className: ({image, styler}) => styler.append({
			noImage: !image
		}),
		titleBelow: ({title, titleBelow}) => title ? titleBelow : ''
	},

	render: ({buttons, css, id, image, title, titleBelow, ...rest}) => {
		return (
			<Popup {...rest} noAnimation aria-labelledby={`${id}_title ${id}_titleBelow ${id}_buttons`} css={css}>
				<Layout align="center center" orientation="vertical">
					{
						image ? <div>{image}</div> : null
					}
					<div className={css.title} id={`${id}_title`}>
						{title}
					</div>
					<div className={css.titleBelow} id={`${id}_titleBelow`}>
						{titleBelow}
					</div>
					<div>
						<Column className={css.buttons} id={`${id}_buttons`}>
							{buttons}
						</Column>
					</div>
				</Layout>
			</Popup>
		);
	}
});

/**
 * A modal Alert component, ready to use in Sandstone applications.
 *
 * `Alert` may be used to interrupt a workflow to receive feedback from the user. The Alert
 * consists of a image, title, a subtitle and an area for additional
 * [buttons]{@link sandstone/Alert.Alert.buttons}.
 *
 * Usage:
 * ```
 * <Alert
 *   open={this.state.open}
 *   title="An Important Alert"
 *   titleBelow="Some important context to share about the purpose"
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
		{slots: ['title', 'titleBelow', 'buttons', 'image']},
		AlertBase
	)
);

export default Alert;
export {
	Alert,
	AlertBase,
	AlertImage,
	AlertOverlay
};
