import BodyText from '@enact/sandstone/BodyText';
import Drawing, {DrawingBase} from '@enact/sandstone/Drawing';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, range} from '@enact/storybook-utils/addons/controls';
import UIDrawing, {DrawingBase as UIDrawingBase} from '@enact/ui/Drawing';
import DrawingControls from '@enact/sandstone/Drawing/DrawingControls';

Drawing.displayName = 'Drawing';
DrawingControls.displayName = 'DrawingControls';
const Config = mergeComponentMetadata(
	'Drawing',
	UIDrawingBase,
	UIDrawing,
	DrawingBase,
	Drawing
);
const DrawingControlsConfig = mergeComponentMetadata('DrawingControls', DrawingControls, Drawing, DrawingBase, UIDrawing, UIDrawingBase);


export default {
	component: 'Drawing',
	title: 'Sandstone/Drawing'
};

export const _Drawing = (args) => {
	const disabled = args['disabled'];
	const brushSizeNumber = args['brushSize'];
	const canvasHeight = args['canvasHeight'];
	const canvasWidth = args['canvasWidth'];
	const showDrawingControls = args['showDrawingControls'];
	const showDrawingUtils = args['showDrawingUtils'];

	return (
		<section>
			<BodyText size="small" style={{visibility: disabled ? 'visible' : 'hidden', fontSize: '70%', fontStyle: 'italic'}}>
				<sup>*</sup>Drawing is not allowed while <code>disabled</code> is true.
			</BodyText>
			<Drawing
				brushSize={brushSizeNumber}
				canvasHeight={canvasHeight}
				canvasWidth={canvasWidth}
				disabled={disabled}
				showDrawingControls={showDrawingControls}
				showDrawingUtils={showDrawingUtils}
			/>
		</section>
	);
};

number('canvasHeight', _Drawing, Config, 800);
number('canvasWidth', _Drawing, Config, 1200);
boolean('disabled', _Drawing, Config);
boolean('showDrawingControls', _Drawing, Config);
boolean('showDrawingUtils', _Drawing, Config);
range('brushSize', _Drawing, DrawingControlsConfig, {min: 1, max: 30}, 5);

_Drawing.storyName = 'Drawing';
_Drawing.parameters = {
	info: {
		text: 'The basic Drawing'
	}
};
