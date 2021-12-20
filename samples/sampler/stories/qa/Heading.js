import {select, text} from '@enact/storybook-utils/addons/controls';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';

import css from './Heading.module.less';

Heading.displayName = 'Heading';

const prop = {
	tallText: {
		'नरेंद्र मोदी': 'नरेंद्र मोदी',
		'ฟิ้\xa0\xa0ไั\xa0\xa0ஒ\xa0\xa0து': 'ฟิ้\xa0\xa0ไั\xa0\xa0ஒ\xa0\xa0து',
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
