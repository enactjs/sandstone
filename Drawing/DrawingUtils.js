/* eslint-disable react/jsx-no-bind */

import kind from '@enact/core/kind';
import {Column} from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import Button from '../Button';

import css from './DrawingUtils.module.less';

/**
 * A set of components for controlling drawing utils and rendering additional components.
 *
 * @class DrawingUtils
 * @memberof sandstone/Drawing
 * @ui
 * @private
 */
const DrawingUtils = kind({
	name: 'DrawingUtils',

	propTypes: /** @lends sandstone/Drawing.DrawingUtils.prototype */ {
		/**
		 * Sets an image as canvas background.
		 *
		 * @type {*}
		 */
		backgroundImage: PropTypes.any,

		/**
		 * Applies the `disabled` class.
		 *
		 * When `true`, the drawing utils is shown as disabled.
		 *
		 * @type {Boolean}
		 */
		disabled: PropTypes.bool,

		/**
		 * Canvas reference.
		 *
		 * @type {Object}
		 */
		drawingRef: PropTypes.object,

		/**
		 * Called when user clicks import input.
		 *
		 * @type {Function}
		 */
		fileInputHandler: PropTypes.func,

		/**
		 * Called when background of canvas is changed.
		 *
		 * @type {Function}
		 * @private
		 */
		setBackgroundImage: PropTypes.func
	},

	styles: {
		css,
		className: 'drawingUtils'
	},

	render: ({backgroundImage, disabled, drawingRef, fileInputHandler, setBackgroundImage, ...rest}) => {
		return (
			<Column align="center space-between" {...rest}>
				<Button css={css} disabled={disabled} icon="arrowhookleft" onClick={() => drawingRef.current.undo()} size="small" tooltipText="Undo" />
				<Button css={css} disabled={disabled} icon="arrowhookright" onClick={() => drawingRef.current.redo()} size="small" tooltipText="Redo" />
				<Button css={css} disabled={disabled} icon="refresh" onClick={() => drawingRef.current.clearCanvas()} size="small" tooltipText="Clear all" />
				<Button css={css} disabled={disabled} icon="plus" onClick={() => document.getElementById('fileInput').click()} size="small" tooltipText="Import image" />
				<input
					accept="image/*"
					className={css.inputFile}
					id="fileInput"
					onChange={(ev) => fileInputHandler({backgroundImage, ev, setBackgroundImage})}
					onClick={(e) => {
						e.target.value = null;
					}}
					type="file"
				/>
				<Button css={css} disabled={disabled} icon="trash" onClick={() => setBackgroundImage(null)} size="small" tooltipText="Clear image" />
				<Button css={css} disabled={disabled} icon="download" onClick={() => drawingRef.current.saveCanvas()} size="small" tooltipText="Save canvas" />
			</Column>
		);
	}
});

export default DrawingUtils;
