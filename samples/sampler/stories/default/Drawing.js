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
			{disabled ? (
				<p style={{fontSize: '70%', fontStyle: 'italic', 'margin': 0}}>
					<sup>*</sup>Drawing is not allowed while <code>disabled</code> is true.
				</p>
			) : (
				<p style={{fontSize: '90%', visibility: 'hidden', 'margin' : 0}}>' '</p>
			)}
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
