import BodyText from '@enact/sandstone/BodyText';
import Scroller from '@enact/sandstone/Scroller';
import {boolean, select} from '@enact/storybook-utils/addons/controls';

import css from './BodyText.module.less';

BodyText.displayName = 'BodyText';

const stringsToChoose = [
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat. In quis mattis purus, quis tristique mi. Mauris vitae tellus tempus, convallis ligula id, laoreet eros. Nullam eu tempus odio, non mollis tellus. Phasellus vitae iaculis nisl. Sed ipsum felis, suscipit vel est quis, interdum pretium dolor. Curabitur sit amet purus ac massa ullamcorper egestas ornare vel lectus. Nullam quis velit sed ex finibus cursus. Duis porttitor congue cursus.',
	'This product is meant for educational purposes only. Any resemblance to real persons, living or dead is purely coincidental. Void where prohibited. Some assembly required. List each check separately by bank number. Batteries not included.',
	'I am a very short string',
	'ab',
	'a'
];

export default {
	title: 'Sandstone/BodyText',
	component: 'BodyText'
};

export const WithLongAndShortStrings = (args) => (
	<BodyText centered={args['centered']} noWrap={args['noWrap']}>
		{args['children']}
	</BodyText>
);

boolean('centered', WithLongAndShortStrings, BodyText);
boolean('noWrap', WithLongAndShortStrings, BodyText);
select('children', WithLongAndShortStrings, stringsToChoose, BodyText, stringsToChoose[0]);

WithLongAndShortStrings.storyName = 'with long and short strings';


export const WithTextWrapBalance = (args) => (
	<Scroller>
		<BodyText className={css.normal} centered={args['centered']} noWrap={args['noWrap']}>
			This product is meant for educational purposes only. Any resemblance to real persons, living or dead is purely coincidental. Void where prohibited. Some assembly required. List each check separately by bank number. Batteries not included.
		</BodyText>
		<BodyText className={css.balance} centered={args['centered']} noWrap={args['noWrap']}>
			This product is meant for educational purposes only. Any resemblance to real persons, living or dead is purely coincidental. Void where prohibited. Some assembly required. List each check separately by bank number. Batteries not included.
		</BodyText>
		<BodyText className={css.normal} centered={args['centered']} noWrap={args['noWrap']}>
			نحن اسم المواضيع بعد الأحجار الكريمة نحن اسم المواضيع بعد الأحجار الكريمة نحن اسم المواضيع بعد الأحجار الكريمة نحن اسم المواضيع بعد الأحجار الكريمة نحن اسم المواضيع بعد الأحجار الكريمة نحن اسم المواضيع بعد الأحجار الكريمة نحن اسم المواضيع بعد الأحجار الكريمة
		</BodyText>
		<BodyText className={css.balance} centered={args['centered']} noWrap={args['noWrap']}>
			نحن اسم المواضيع بعد الأحجار الكريمة نحن اسم المواضيع بعد الأحجار الكريمة نحن اسم المواضيع بعد الأحجار الكريمة نحن اسم المواضيع بعد الأحجار الكريمة نحن اسم المواضيع بعد الأحجار الكريمة نحن اسم المواضيع بعد الأحجار الكريمة نحن اسم المواضيع بعد الأحجار الكريمة
		</BodyText>
		<BodyText className={css.normal} centered={args['centered']} noWrap={args['noWrap']}>
			宝石にちなんでテーマに名前を付けます宝石にちなんでテーマに名前を付けます宝石にちなんでテーマに名前を付けます宝石にちなんでテーマに名前を付けます宝石にちなんでテーマに名前を付けます宝石にちなんでテーマに名前を付けます宝石にちなんでテーマに名前を付けます
		</BodyText>
		<BodyText className={css.balance} centered={args['centered']} noWrap={args['noWrap']}>
			宝石にちなんでテーマに名前を付けます宝石にちなんでテーマに名前を付けます宝石にちなんでテーマに名前を付けます宝石にちなんでテーマに名前を付けます宝石にちなんでテーマに名前を付けます宝石にちなんでテーマに名前を付けます宝石にちなんでテーマに名前を付けます
		</BodyText>
		<BodyText className={css.normal} centered={args['centered']} noWrap={args['noWrap']}>
			국민경제의 발전을 위한 중요정책의 수립에 관하여 대통령의 자문에 응하기 위하여 국민경제자문회의를 둘 수 있다국민경제의 발전을 위한 중요정책의 수립에 관하여 대통령의 자문에 응하기 위하여 국민경제자문회의를 둘 수 있다국민경제의 발전을 위한 중요정책의 수립에 관하여 대통령의 자문에 응하기 위하여 국민경제자문회의를 둘 수 있다
		</BodyText>
		<BodyText className={css.balance} centered={args['centered']} noWrap={args['noWrap']}>
			국민경제의 발전을 위한 중요정책의 수립에 관하여 대통령의 자문에 응하기 위하여 국민경제자문회의를 둘 수 있다국민경제의 발전을 위한 중요정책의 수립에 관하여 대통령의 자문에 응하기 위하여 국민경제자문회의를 둘 수 있다국민경제의 발전을 위한 중요정책의 수립에 관하여 대통령의 자문에 응하기 위하여 국민경제자문회의를 둘 수 있다
		</BodyText>
	</Scroller>

);

boolean('centered', WithTextWrapBalance, BodyText);
boolean('noWrap', WithTextWrapBalance, BodyText);
select('children', WithTextWrapBalance, stringsToChoose, BodyText, stringsToChoose[0]);

WithTextWrapBalance.storyName = 'With Text Wrap Balance';
