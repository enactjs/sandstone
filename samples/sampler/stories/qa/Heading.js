import IString from 'ilib/lib/IString';
import {select, text} from '@enact/storybook-utils/addons/controls';
import Heading from '@enact/sandstone/Heading';
import $L from '@enact/sandstone/internal/$L';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';

import css from './Heading.module.less';

Heading.displayName = 'Heading';

const prop = {
	tallText: {
		'नरेंद्र मोदी': 'नरेंद्र मोदी',
		'ฟิ้ ไั ஒ து': 'ฟิ้ ไั ஒ து',
		ÃÑÕÂÊÎÔÛÄËÏÖÜŸ: 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ',
		តន្ត្រី: 'តន្ត្រី'
	},
	marqueeOn: ['', 'hover', 'render']
};

export default {
	title: 'Sandstone/Heading',
	component: 'Heading'
};

export const WithItalics = (args) => (
	<>
		<Heading className={css.italic}>
			{args['children']}
		</Heading>
		<Heading>{args['children']}</Heading>
		<Heading className={css.italic}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</Heading>
		<Heading>ABCDEFGHIJKLMNOPQRSTUVWXYZ</Heading>
		<Heading className={css.italic}>가나다라마바사아자차카타파하</Heading>
		<Heading>가나다라마바사아자차카타파하</Heading>
		<Heading className={css.italic}>نحن اسم المواضيع بعد الأحجار الكريمة</Heading>
		<Heading>نحن اسم المواضيع بعد الأحجار الكريمة</Heading>
	</>
);

text('children', WithItalics, Heading, 'Lorem ipsum dolor sit amet');

WithItalics.storyName = 'with italics';

export const WithLongText = (args) => (
	<Heading marqueeOn={args['marqueeOn']}>
		{args['children']}
	</Heading>
);

select('marqueeOn', WithLongText, prop.marqueeOn, Heading);
text('children', WithLongText, Heading, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat. In quis mattis purus, quis tristique mi.');

WithLongText.storyName = 'with long text';

export const WithTallCharacters = (args) => (
	<Heading>{args['children']}</Heading>
);

select('children', WithTallCharacters, prop.tallText, Heading, 'नरेंद्र मोदी');

WithTallCharacters.storyName = 'with tall characters';

export const MultipleScroller = () => (
	<Scroller
		horizontal="auto"
		style={{
			height: ri.scaleToRem(1104),
			width: '100%'
		}}
		vertical="auto"
	>
		<div
			style={{
				height: ri.scaleToRem(2004),
				width: ri.scaleToRem(4002)
			}}
		>
			<Heading>First Heading</Heading>
			<Item>Item 11</Item>
			<Item>Item 12</Item>
			<Item>Item 13</Item>
			<Heading>Second Heading</Heading>
			<Item>Item 21</Item>
			<Item>Item 22</Item>
			<Item>Item 23</Item>
			<Heading>Third Heading</Heading>
			<Item>Item 31</Item>
			<Item>Item 32</Item>
			<Item>Item 33</Item>
			<Heading>Fourth Heading</Heading>
			<Item>Item 41</Item>
			<Item>Item 42</Item>
		</div>
	</Scroller>
);

MultipleScroller.storyName = 'multiple in scroller';
MultipleScroller.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithBidirectionalText  = () => {
	const inputPasswordFor = 'Input Password for ';
	const inputPasswordForAr = 'الرجاء إدخال كلمة المرور لـ ';
	const abcDevice = 'ABC جهاز';

	return (
		<Scroller>
			{/* See: https://www.w3.org/International/articles/inline-bidi-markup/ */}
			<Heading>{inputPasswordFor + abcDevice}</Heading>
			<Heading>{inputPasswordFor}{abcDevice}, Please</Heading>
			<Heading>{new IString($L('Input Password for {deviceName}, Please')).format({deviceName: abcDevice})}</Heading>

			<br />

			<Heading>{inputPasswordFor}<span dir="ltr">{abcDevice}</span>, Please</Heading>
			{/* When cannot use markup, U+2067 RIGHT-TO-LEFT ISOLATE (RLI) or U+2066 LEFT-TO-RIGHT ISOLATE (LRI)
				These are placed in the same location as the opening <span dir="..."> tag.
				U+2069 POP DIRECTIONAL ISOLATE (PDI), and it corresponds to the </span> in the markup. */}
			<Heading>{inputPasswordFor}&#x2066;{abcDevice}&#x2069;, Please</Heading>
			<br />

			{/* <bdi> same with <span dir=auto> */}
			<Heading>{inputPasswordFor}<span dir="auto">{abcDevice}</span>, Please</Heading>
			<Heading>{inputPasswordFor}<bdi>{abcDevice}</bdi>, Please</Heading>
			{/* When cannot use markup, U+2068 FIRST STRONG ISOLATE */}
			<Heading>{inputPasswordFor}&#x2068;{abcDevice}&#x2069;, Please</Heading>
			<Heading>{new IString($L('Input Password for {deviceName}, Please')).format({deviceName: `\u2068${abcDevice}\u2069`})}</Heading>
			<br />

			{/* auto seems to be determined by the first letter */}
			<Heading>{inputPasswordFor}<bdi>جهاز ABC صباح</bdi>, Please</Heading>

			<br />
			{/* If there is any rtl character, set the direction of the marquee to rtl.  */}
			<Heading>{inputPasswordFor}<bdi>{abcDevice}</bdi>, Please. long text long text long text long text long text long text long text</Heading>

			<br />
			<Heading>{inputPasswordForAr}{abcDevice}</Heading>
			<Heading>{inputPasswordForAr}<bdi>{abcDevice}</bdi></Heading>
		</Scroller>
	);
};

WithBidirectionalText.storyName = 'with bidirectional text';
