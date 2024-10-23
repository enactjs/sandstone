import Marquee from '@enact/sandstone/Marquee';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/controls';
import {Marquee as uiMarquee} from '@enact/ui/Marquee';
import ri from '@enact/ui/resolution';

const Config = mergeComponentMetadata('Marquee', uiMarquee);
Marquee.displayName = 'Marquee';

const props = {
	alignment: [null, 'left', 'right', 'center'],
	forceDirection: [null, 'rtl', 'ltr'],
	marqueeOn: ['focus', 'hover', 'render']
};

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

boolean('disabled', _Marquee, Config);
select('alignment', _Marquee, props.alignment, Config);
select('forceDirection', _Marquee, props.forceDirection, Config);
number('marqueeDelay', _Marquee, Config);
boolean('marqueeDisabled', _Marquee, Config);
select('marqueeOn', _Marquee, props.marqueeOn, Config, 'render');
number('marqueeResetDelay', _Marquee, Config);
text('marqueeSpacing', _Marquee, Config);
number('marqueeSpeed', _Marquee, Config);
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
