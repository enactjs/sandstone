import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import css from "./Drawing.module.less";
import Button from "../Button";
import {Column} from "@enact/ui/Layout";

const DrawingUtils = kind({
	name: 'DrawingUtils',

	propTypes: {
		disabled: PropTypes.bool,
		drawingRef: PropTypes.object,
		fileInputHandler: PropTypes.func,
		backgroundImage: PropTypes.any,
		setBackgroundImage: PropTypes.func
	},

	render: ({disabled, drawingRef, fileInputHandler, backgroundImage, setBackgroundImage}) => {
		return (
			<Column align="center space-between" className={css.canvasOptions}>
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