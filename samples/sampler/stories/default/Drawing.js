import BodyText from '@enact/sandstone/BodyText';
import Drawing from '@enact/sandstone/Drawing';
import {boolean} from '@enact/storybook-utils/addons/controls';

Drawing.displayName = 'Drawing';

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
				disabled={disabled}
			/>
		</section>
	);
};

boolean('disabled', _Drawing, Drawing);

_Drawing.storyName = 'Drawing';
_Drawing.parameters = {
	info: {
		text: 'The basic Drawing'
	}
};
