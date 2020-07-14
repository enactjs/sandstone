import {select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Heading from '@enact/sandstone/Heading';
import FormCheckboxItem from '@enact/sandstone/FormCheckboxItem';
import ImageItem from '@enact/sandstone/ImageItem';
import {Header} from '@enact/sandstone/Panels';
import Input from '@enact/sandstone/Input';
import Item from '@enact/sandstone/Item';
import Marquee from '@enact/sandstone/Marquee';
import RadioItem from '@enact/sandstone/RadioItem';
import Scroller from '@enact/sandstone/Scroller';
import SwitchItem from '@enact/sandstone/SwitchItem';

const inputData = {
	english: 'We name themes after gemstones',
	arabic: 'نحن اسم المواضيع بعد الأحجار الكريمة',
	chinese: '星期日 星期一 星期二 星期三 星期四 星期五 星期六',
	greek: 'Ονομάζουμε θέματα μετά από πολύτιμους λίθους',
	hebrew: 'אנו שם נושאים לאחר אבני חן',
	japanese: '宝石にちなんでテーマに名前を付けます',
	oriya: 'ସବୁ ମନୁଷ୍ୟ ଜନ୍ମକାଳରୁ ସ୍ୱାଧୀନ। ସେମାନଙ୍କର ମର୍ଯ୍ୟାଦା ଓ',
	russian: 'Мы называем темы в честь драгоценных камней',
	tamil: 'ரத்தினங்களுக்கு பிறகு கருப்பொருள்களுக்கு பெயரிடுகிறோம்',
	thai: 'เราตั้งชื่อธีมตามอัญมณี',
	urdu: 'ہم گیسسٹون کے بعد موضوعات کا نام دیتے ہیں'
};

const mixedText = 'ข้MอiคxวeาdมTผeสxมt - M混i合x文e字d';

Heading.displayName = 'Heading';

const prop = {
	tallText: [
		'नरेंद्र मोदी',
		'ฟิ้  ไั  ஒ  து',
		'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ'
	]
};

storiesOf('Text', module)
	.add(
		'Tall Glyphs as Non-Latin components',
		() => {
			const children = select('children', prop.tallText, {groupId: 'Text'}, 'नरेंद्र मोदी');

			return (
				<Scroller style={{height: '100%'}}>
					<Heading showLine>Text controls (div, Heading, BodyText, Marquee)</Heading>
					<div>{children}</div>
					<Heading showLine>{children}</Heading>
					<BodyText>{children}</BodyText>
					<Marquee>{children}</Marquee>

					<Heading showLine>Basic Form controls (Button, Input)</Heading>
					<Button>{children}</Button>
					<Input placeholder={children} />
					<Input value={children} />

					<Heading showLine>Simple Items (Item, ImageItem)</Heading>
					<Item>{children}</Item>
					<Item label={children}>{children}</Item>
					<ImageItem style={{height: 200}}>{children}</ImageItem>

					<Heading showLine>Toggle Items</Heading>
					<CheckboxItem>{children}</CheckboxItem>
					<FormCheckboxItem>{children}</FormCheckboxItem>
					<RadioItem>{children}</RadioItem>
					<SwitchItem>{children}</SwitchItem>

					<Heading showLine>Headers (Standard, Compact)</Heading>
					<Header type="standard" title={children} subtitle={children} />
					<br />
					<Header type="compact" title={children} subtitle={children} />
				</Scroller>
			);
		}
	)
	.add(
		'Languages',
		() => Object.keys(inputData).map(key =>
			<Item key={key}>
				<slotBefore>
					<span style={{minWidth: '10ex', display: 'inline-block'}}>[ {key} ]</span>
				</slotBefore>
				{inputData[key]}
			</Item>
		)
	)
	.add(
		'Mixed Scripts',
		() => <div>
			<Item style={{fontWeight: 300}}>
				<slotBefore>
					<span style={{minWidth: '10ex', display: 'inline-block'}}>light</span>
				</slotBefore>
				{mixedText}
			</Item>
			<Item style={{fontWeight: 400}}>
				<slotBefore>
					<span style={{minWidth: '10ex', display: 'inline-block'}}>regular</span>
				</slotBefore>
				{mixedText}
			</Item>
			<Item style={{fontWeight: 600}}>
				<slotBefore>
					<span style={{minWidth: '10ex', display: 'inline-block'}}>semi-bold</span>
				</slotBefore>
				{mixedText}
			</Item>
			<Item style={{fontWeight: 700}}>
				<slotBefore>
					<span style={{minWidth: '10ex', display: 'inline-block'}}>bold</span>
				</slotBefore>
				{mixedText}
			</Item>
		</div>
	);
