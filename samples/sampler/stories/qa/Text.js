import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import {ContextualPopupDecorator} from '@enact/sandstone/ContextualPopupDecorator';
import FormCheckboxItem from '@enact/sandstone/FormCheckboxItem';
import Heading from '@enact/sandstone/Heading';
import ImageItem from '@enact/sandstone/ImageItem';
import Input, {InputField} from '@enact/sandstone/Input';
import Item, {ItemBase} from '@enact/sandstone/Item';
import Marquee from '@enact/sandstone/Marquee';
import {Header} from '@enact/sandstone/Panels';
import Picker from '@enact/sandstone/Picker';
import RadioItem from '@enact/sandstone/RadioItem';
import Scroller from '@enact/sandstone/Scroller';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {Row} from '@enact/ui/Layout';
import Repeater from '@enact/ui/Repeater';
import {Component} from 'react';

import Section from './components/KitchenSinkSection';

import iconNames from '../helper/icons';
import {divMargin, propOptions} from './common/Input_Common';

const Config = {
	displayName: 'Text'
};

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
	backgroundOpacity: {
		'undefined/null (automatic)': '',
		'opaque (Default for text buttons)': 'opaque',
		'transparent (Default for icon-only buttons)': 'transparent'
	},
	buttonTallText: {
		' ฟิ้ ไั  ஒ  து': ' ฟิ้ ไั  ஒ  து',
		ÁÉÍÓÚÑÜ: 'ÁÉÍÓÚÑÜ',
		'Bản văn': 'Bản văn',
		តន្ត្រី: 'តន្ត្រី'
	},
	contextualPopupDirection: [
		'above', 'above center', 'above left', 'above right', 'below', 'below center', 'below left', 'below right', 'left middle', 'left top', 'left bottom', 'right middle', 'right top', 'right bottom'],
	icons: ['', ...iconNames],
	focusEffect: ['expand', 'static'],
	pickerOrientation: ['horizontal', 'vertical'],
	pickerWidth: [null, 'small', 'medium', 'large'],
	tallText: ['नरेंद्र मोदी', 'ฟิ้  ไั  ஒ  து  ඒ', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ', 'តន្ត្រី']
};

const CheckboxItemConfig = mergeComponentMetadata('CheckboxItem', ItemBase, Item, CheckboxItem);

const ContextualButton = ContextualPopupDecorator(Button);
const ContextualPopupConfig = mergeComponentMetadata('ContextualButton', ContextualButton);

const renderPopup = () => <div style={{textAlign: 'center'}}>{select('popupText', prop.tallText, ContextualPopupConfig, prop.tallText[0])}</div>;

class ContextualPopupWithActivator extends Component {
	constructor (props) {
		super(props);

		this.state = {open: false};
	}

	handleOpenToggle = () => {
		this.setState(({open}) => ({open: !open}));
	};

	render () {
		return (
			<ContextualButton
				{...this.props}
				onClose={this.handleOpenToggle}
				onClick={this.handleOpenToggle}
				open={this.state.open}
			/>
		);
	}
}

export default {
	title: 'Sandstone/Text',
	component: 'Text'
};

export const TallGlyphSupportInComponents = () => {
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
					<Item alt="Item with Label" label={children}>
						{children}
					</Item>
					<ImageItem alt="ImageItem" style={{height: 200}}>
						{children}
					</ImageItem>
				</Section>

				<Section title="Headers">
					<Header alt="Header Standard" type="standard" title={children} subtitle={children} />
					<br />
					<Header alt="Header Compact" type="compact" title={children} subtitle={children} />
				</Section>

				<Section title="Different components with tall characters as children">
					<Button
						alt="Button"
						onClick={action('onClick')}
						backgroundOpacity={select('backgroundOpacity', prop.backgroundOpacity, Button)}
						disabled={boolean('disabled', Button)}
						focusEffect={select('focusEffect', prop.focusEffect, Button)}
						icon={select('icon', prop.icons, Button)}
						minWidth={boolean('minWidth', Button, true) ? void 0 : false}
						selected={boolean('selected', Button)}
						size={select('size', ['small', 'large'], Button)}
					>
						{select('value', prop.buttonTallText, Button, 'ฟิ้  ไั  ஒ  து')}
					</Button>
					<CheckboxItem
						alt="CheckboxItem"
						disabled={boolean('disabled', CheckboxItemConfig, false)}
						inline={boolean('inline', CheckboxItemConfig)}
						onToggle={action('onToggle')}
					>
						{select('children', prop.tallText, CheckboxItemConfig, prop.tallText[0])}
					</CheckboxItem>
					<InputField
						alt="InputField"
						style={divMargin}
						size={select('size', propOptions.size, InputField)}
						value={select('value', prop.tallText, InputField, prop.tallText[0])}
					/>
					<Item
						alt="Item with tall characters"
						disabled={boolean('disabled', Item)}
					>
						{select('value', prop.tallText, Item, prop.tallText[2])}
					</Item>
					<Picker
						alt="Picker"
						onChange={action('onChange')}
						width={select('width', prop.pickerWidth, Picker, 'large')}
						orientation={select('orientation', prop.pickerOrientation, Picker, 'horizontal')}
						wrap={boolean('wrap', Picker)}
						joined={boolean('joined', Picker)}
						noAnimation={boolean('noAnimation', Picker)}
						disabled={boolean('disabled', Picker)}
						incrementIcon={select('incrementIcon', iconNames, Picker)}
						decrementIcon={select('decrementIcon', iconNames, Picker)}
					>
						{prop.tallText}
					</Picker>
					<RadioItem
						alt="RadioItem"
						disabled={boolean('disabled', RadioItem)}
						inline={boolean('inline', RadioItem)}
						onToggle={action('onToggle')}
					>
						{select('children', prop.tallText, RadioItem, prop.tallText[0])}
					</RadioItem>
					<SwitchItem
						alt="SwitchItem"
						disabled={boolean('disabled', SwitchItem)}
						inline={boolean('inline', SwitchItem)}
						onToggle={action('onToggle')}
					>
						{select('children', prop.tallText, SwitchItem, prop.tallText[0])}
					</SwitchItem>
					<ContextualPopupWithActivator
						alt="ContextualPopupDecorator"
						direction={select('direction', prop.contextualPopupDirection, ContextualPopupConfig, 'above')}
						popupComponent={renderPopup}
					>
						ContextualPopup with tall characters
					</ContextualPopupWithActivator>
				</Section>
			</Scroller>
		</div>
	);
};

TallGlyphSupportInComponents.storyName = '"Tall Glyph" support in components';

export const Languages = () => {
	const languagesList = [];
	Object.keys(inputData).forEach((key) => {
		languagesList.push({
			slotBefore: <span style={{minWidth: '10ex', display: 'inline-block'}}>[ {key} ]</span>,
			children: <span
				style={{
					fontWeight: select(
						'font-weight',
						[
							'100',
							'200',
							'300',
							'400',
							'500',
							'600',
							'700',
							'800',
							'900'
						],
						Config,
						'400'
					)
				}}
			>{inputData[key]}</span>,
			key: 'language' + key
		});
	});
	return (
		<div>
			<Scroller>
				<Repeater childComponent={Item}>{languagesList}</Repeater>
			</Scroller>
		</div>
	);
};

Languages.storyName = 'Languages';

export const MixedScripts = () => (
	<div>
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

MixedScripts.storyName = 'Mixed Scripts';
