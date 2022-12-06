import Marquee from '@enact/sandstone/Marquee';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';

Marquee.displayName = 'Marquee';

export default {
	title: 'Sandstone/Marquee',
	component: 'Marquee'
};

export const _Marquee = (args) => {
	const spacing = () => {
		const value = args['marqueeSpacing'];
		if (value && value.indexOf('%') > 0) {
			return value;
		}

		return Number.parseInt(value);
	};

	const disabled = args['disabled'];
	return (
		<section>
			<Marquee
				alignment={args['alignment']}
				disabled={disabled}
				forceDirection={args['forceDirection']}
				marqueeDelay={args['marqueeDelay']}
				marqueeDisabled={args['marqueeDisabled']}
				marqueeOn={args['marqueeOn']}
				marqueeOnRenderDelay={1000}
				marqueeResetDelay={args['marqueeResetDelay']}
				marqueeSpacing={spacing()}
				marqueeSpeed={args['marqueeSpeed']}
				style={{width: ri.scaleToRem(800)}}
			>
				{args['children']}
			</Marquee>
			{disabled ? (
				<p style={{fontSize: '70%', fontStyle: 'italic'}}>
					<sup>*</sup>Marquee does not visually respond to <code>disabled</code> state.
				</p>
			) : (
				<p />
			)}
		</section>
	);
};

boolean('disabled', _Marquee, Marquee);
select('alignment', _Marquee, [null, 'left', 'right', 'center'], Marquee);
select('forceDirection', _Marquee, [null, 'rtl', 'ltr'], Marquee);
number('marqueeDelay', _Marquee, Marquee, 1000);
boolean('marqueeDisabled', _Marquee, Marquee);
select('marqueeOn', _Marquee, ['hover', 'render'], Marquee, 'render');
number('marqueeResetDelay', _Marquee, Marquee, 1000);
text('marqueeSpacing', _Marquee, Marquee, '50%');
number('marqueeSpeed', _Marquee, Marquee, 60);
text(
	'children',
	_Marquee,
	Marquee,
	'The quick brown fox jumped over the lazy dog. The bean bird flies at sundown.'
);

_Marquee.storyName = 'Marquee';
_Marquee.parameters = {
	info: {
		text: 'The basic MarqueeText'
	}
};
