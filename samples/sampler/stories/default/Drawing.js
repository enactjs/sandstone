import BodyText from '@enact/sandstone/BodyText';
import Drawing, {DrawingBase} from '@enact/sandstone/Drawing';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, range, select} from '@enact/storybook-utils/addons/controls';
import UIDrawing, {DrawingBase as UIDrawingBase} from '@enact/ui/Drawing';

Drawing.displayName = 'Drawing';
const Config = mergeComponentMetadata(
	'Drawing',
	UIDrawingBase,
	UIDrawing,
	DrawingBase,
	Drawing
);

export default {
	component: 'Drawing',
	title: 'Sandstone/Drawing'
};

export const _Drawing = (args) => {
	const disabled = args['disabled'];

	return (
		<section>
			<BodyText size="small" style={{visibility: disabled ? 'visible' : 'hidden', fontSize: '70%', fontStyle: 'italic'}}>
				<sup>*</sup>Drawing is not allowed while <code>disabled</code> is true.
			</BodyText>
			<Drawing
				brushColor={args['brushColor']}
				brushSize={args['brushSize']}
				canvasColor={args['canvasColor']}
				canvasHeight={args['canvasHeight']}
				canvasWidth={args['canvasWidth']}
				disabled={disabled}
				drawingTool={args['drawingTool']}
				fillColor={args['fillColor']}
				showDrawingControls={args['showDrawingControls']}
				showDrawingUtils={args['showDrawingUtils']}
			/>
		</section>
	);
};

select('brushColor', _Drawing, ['', '#000000', '#FFFFFF', '#FF0000', '#00FF00'], Config, '');
range('brushSize', _Drawing, Config, {min: 1, max: 30}, 5);
select('canvasColor', _Drawing, ['', '#000000', '#FFFFFF', '#FF0000', '#00FF00'], Config, '');
number('canvasHeight', _Drawing, Config, 800);
number('canvasWidth', _Drawing, Config, 1200);
boolean('disabled', _Drawing, Config);
select('drawingTool', _Drawing, ['brush', 'fill', 'triangle', 'rectangle', 'circle', 'erase'], Config, '');
select('fillColor', _Drawing, ['', '#000000', '#FFFFFF', '#FF0000', '#00FF00'], Config, '');
boolean('showDrawingControls', _Drawing, Config);
boolean('showDrawingUtils', _Drawing, Config);

_Drawing.storyName = 'Drawing';
_Drawing.parameters = {
	info: {
		text: 'The basic Drawing'
	}
};
