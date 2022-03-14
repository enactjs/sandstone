import BodyText from '@enact/sandstone/BodyText';
import Drawing from '@enact/sandstone/Drawing';
import {boolean, number} from '@enact/storybook-utils/addons/controls';

Drawing.displayName = 'Drawing';

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

number('canvasHeight', _Drawing, 400);
number('canvasWidth', _Drawing, 600);
boolean('disabled', _Drawing, Drawing);

_Drawing.storyName = 'Drawing';
_Drawing.parameters = {
	info: {
		text: 'The basic Drawing'
	}
};
