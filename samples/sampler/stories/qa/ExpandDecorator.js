import ExpandDecorator from '@enact/sandstone/ExpandDecorator';
import Spottable from '@enact/spotlight/Spottable';
import ri from '@enact/ui/resolution';

const SpottableDiv = Spottable('div');
const SpottableText = (props) => (
	<SpottableDiv
		style={{
			width: ri.scale(1000),
			height: ri.scale(70),
			margin: ri.scale(40),
			backgroundColor: 'gray',
			textAlign: 'center'
		}}
	>
		{props.children}
	</SpottableDiv>
);
const sampleScale = 0.8;
const sampleDuration = 600;

const TextDefault              = ExpandDecorator(SpottableText);
const TextNoConfig             = ExpandDecorator({}, SpottableText);
const TextWithScale            = ExpandDecorator({scale: sampleScale}, SpottableText);
const TextWithDuration         = ExpandDecorator({duration: sampleDuration}, SpottableText);
const TextWithScaleAndDuration = ExpandDecorator({scale: sampleScale, duration: sampleDuration}, SpottableText);

export const ExpandDecoratorWithSpottableText = () => {
	return (
		<div>
			<TextDefault>Default</TextDefault>
			<TextNoConfig>No config</TextNoConfig>
			<TextWithScale>With scale {sampleScale}</TextWithScale>
			<TextWithDuration>With duration {sampleDuration}</TextWithDuration>
			<TextWithScaleAndDuration>With scale {sampleScale} and duration {sampleDuration}</TextWithScaleAndDuration>
		</div>
	);
};

ExpandDecoratorWithSpottableText.storyName = 'with spottable text';

export default {
	title: 'Sandstone/ExpandDecorator',
	component: 'ExpandDecorator'
};
