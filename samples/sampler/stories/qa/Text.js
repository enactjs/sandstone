import {select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {Row} from '@enact/ui/Layout';
import Repeater from '@enact/ui/Repeater';

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

import Section from './components/KitchenSinkSection';

const inputData = {
	english: 'We name themes after gemstones',
	arabic: 'نحن اسم المواضيع بعد الأحجار الكريمة',
	chinese: '星期日 星期一 星期二 星期三 星期四 星期五 星期六',
	greek: 'Ονομάζουμε θέματα μετά από πολύτιμους λίθους',
	hebrew: 'אנו שם נושאים לאחר אבני חן',
	hindi: 'हम रत्न के बाद विषयों का नाम देते हैं',
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
		'ฟิ้  ไั  ஒ  து  ඒ',
		'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ'
	]
};

storiesOf('Text', module)
	.add(
		'"Tall Glyph" support in components',
		() => {
			const children = select('children', prop.tallText, {groupId: 'Text'}, prop.tallText[0]);

			return (
				<div>
					<Scroller style={{height: '100%'}}>
						<Section title="Text controls">
							<div alt="Basic div">{children}</div>
							<Heading alt="Heading">{children}</Heading>
							<BodyText alt="BodyText">{children}</BodyText>
							<Marquee alt="Marquee">{children}</Marquee>
						</Section>

						<Row>
							<Section title="Basic Form controls" size="50%">
								<Button alt="Button">{children}</Button>
								<Input alt="Input with Placeholder" placeholder={children} />
								<Input alt="Input" value={children} />
							</Section>
							<Section title="Toggleable Items" size="50%">
								<CheckboxItem alt="CheckboxItem">{children}</CheckboxItem>
								<FormCheckboxItem alt="FormCheckboxItem">{children}</FormCheckboxItem>
								<RadioItem alt="RadioItem">{children}</RadioItem>
								<SwitchItem alt="SwitchItem">{children}</SwitchItem>
							</Section>
						</Row>

						<Section title="Simple Items">
							<Item alt="Item">{children}</Item>
							<Item alt="Item with Label" label={children}>{children}</Item>
							<ImageItem alt="ImageItem" style={{height: 200}}>{children}</ImageItem>
						</Section>


						<Section title="Headers">
							<Header alt="Header Standard" type="standard" title={children} subtitle={children} />
							<br />
							<Header alt="Header Compact" type="compact" title={children} subtitle={children} />
						</Section>
					</Scroller>
				</div>
			);
		}
	)
	.add(
		'Languages',
		() => {
			const languagesList = [];
			Object.keys(inputData).forEach(key => {
				languagesList.push({
					slotBefore: <span style={{minWidth: '10ex', display: 'inline-block'}}>[ {key} ]</span>,
					children: inputData[key],
					key: 'language' + key
				});
			});
			return (
				<div>
					<Scroller>
						<Repeater
							childComponent={Item}
						>
							{languagesList}
						</Repeater>
					</Scroller>
				</div>
			);
		}
	)
	.add(
		'Mixed Scripts',
		() => <div>
			<Scroller>
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
			</Scroller>
		</div>
	);
