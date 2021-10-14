import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import BodyText from '@enact/sandstone/BodyText';

BodyText.displayName = 'BodyText';

const stringsToChoose = [
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat. In quis mattis purus, quis tristique mi. Mauris vitae tellus tempus, convallis ligula id, laoreet eros. Nullam eu tempus odio, non mollis tellus. Phasellus vitae iaculis nisl. Sed ipsum felis, suscipit vel est quis, interdum pretium dolor. Curabitur sit amet purus ac massa ullamcorper egestas ornare vel lectus. Nullam quis velit sed ex finibus cursus. Duis porttitor congue cursus.',
	'This product is meant for educational purposes only. Any resemblance to real persons, living or dead is purely coincidental. Void where prohibited. Some assembly required. List each check separately by bank number. Batteries not included.',
	'I am a very short string',
	'ab',
	'a',
	'পারে।',
	'পারেন।',
	'ரத்தினங்களுக்குপারে।',
	'ரத்தினங்களுக்கு பிறகு கருப்பொருள்களுக்கு பெயரிடுகிறோம்'
];

export default {
	title: 'Sandstone/BodyText',
	component: 'BodyText'
};

export const WithLongAndShortStrings = () => (
	<BodyText centered={boolean('centered', BodyText)} noWrap={boolean('noWrap', BodyText)}>
		{select('children', stringsToChoose, BodyText, stringsToChoose[0])}
	</BodyText>
);

WithLongAndShortStrings.storyName = 'with long and short strings';
