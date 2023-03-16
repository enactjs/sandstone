import ExpandDecorator from '@enact/sandstone/ExpandDecorator';
import Spottable from '@enact/spotlight/Spottable';

import css from './ExpandDecorator.module.less';

const SpottableDiv = Spottable('div');
const SpottableText = ({children, style}) => {
	const mergedStyle = Object.assign({
	}, style);

	return (
		<SpottableDiv
			className={css.spottabletext}
			style={mergedStyle}
		>
			{children}
		</SpottableDiv>
	);
};
const sampleScale = 0.8;
const sampleDuration = 600;

const TextDefault              = ExpandDecorator(SpottableText);
const TextNoAnimation          = ExpandDecorator({duration: 0}, SpottableText);
const TextWithScale            = ExpandDecorator({scale: sampleScale}, SpottableText);
const TextWithDuration         = ExpandDecorator({duration: sampleDuration}, SpottableText);
const TextWithScaleAndDuration = ExpandDecorator({scale: sampleScale, duration: sampleDuration}, SpottableText);

const InlineSpottableText = (props) => (
	<SpottableText {...props} style={{display: 'inline-block'}} />
);
const SpottableInsideNonSpottable = (props) => (
	<div className={css.container}>
		<InlineSpottableText {...props} />
		<InlineSpottableText>Another one</InlineSpottableText>
	</div>
);
const SpottableInsideNonSpottableWithDecorator = ExpandDecorator(SpottableInsideNonSpottable);
const SpottableInsideSpottable = (props) => (
	<SpottableDiv className={css.container}>
		<InlineSpottableText {...props} />
		<InlineSpottableText>Another one</InlineSpottableText>
	</SpottableDiv>
);
const SpottableInsideSpottableWithDecorator = ExpandDecorator(SpottableInsideSpottable);

export const ExpandDecoratorWithSpottableText = () => {
	return (
		<div>
			<TextDefault>Default</TextDefault>
			<TextNoAnimation>No animation</TextNoAnimation>
			<TextWithScale>With scale {sampleScale}</TextWithScale>
			<TextWithDuration>With duration {sampleDuration}</TextWithDuration>
			<TextWithScaleAndDuration>With scale {sampleScale} and duration {sampleDuration}</TextWithScaleAndDuration>
			<SpottableInsideNonSpottableWithDecorator>Spottable inside non-spottable</SpottableInsideNonSpottableWithDecorator>
			<SpottableInsideSpottableWithDecorator>Spottable inside spottable</SpottableInsideSpottableWithDecorator>
		</div>
	);
};

ExpandDecoratorWithSpottableText.storyName = 'with spottable text';

export default {
	title: 'Sandstone/ExpandDecorator',
	component: 'ExpandDecorator'
};
