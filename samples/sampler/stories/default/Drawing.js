import BodyText from '@enact/sandstone/BodyText';
import Drawing, {DrawingBase} from '@enact/sandstone/Drawing';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number} from '@enact/storybook-utils/addons/controls';
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
	const canvasHeight = args['canvasHeight'];
	const canvasWidth = args['canvasWidth'];

	return (
		<section>
			<BodyText size="small" style={{visibility: disabled ? 'visible' : 'hidden', fontSize: '70%', fontStyle: 'italic'}}>
				<sup>*</sup>Drawing is not allowed while <code>disabled</code> is true.
			</BodyText>
			<Drawing
				canvasHeight={canvasHeight}
				canvasWidth={canvasWidth}
				disabled={disabled}
			/>
		</section>
	);
};

number('canvasHeight', _Drawing, Config, 800);
number('canvasWidth', _Drawing, Config, 1200);
boolean('disabled', _Drawing, Config);

_Drawing.storyName = 'Drawing';
_Drawing.parameters = {
	info: {
		text: 'The basic Drawing'
	}
};
