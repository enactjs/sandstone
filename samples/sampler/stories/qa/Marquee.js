import kind from '@enact/core/kind';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import Marquee, {MarqueeController} from '@enact/sandstone/Marquee';
import Skinnable from '@enact/sandstone/Skinnable';
import Spottable from '@enact/spotlight/Spottable';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import {Component} from 'react';

import css from './Marquee.module.less';

Marquee.displayName = 'Marquee';

const SpottableMarquee = Spottable(Skinnable(Marquee));
const Controller = MarqueeController('div');
const SpottableDiv = MarqueeController({marqueeOnFocus: true}, Spottable(Skinnable('div')));

const LTR = [
	'The quick brown fox jumped over the lazy dog. The bean bird flies at sundown.',
	'Η γρήγορη καφέ αλεπού πήδηξε πάνω από το μεσημέρι. Το πουλί πετά σε φασολιών δύση του ηλίου.',
	'Bahasa Melayu,Eesti keel,Čeština,Bahasa Indonesia,Dansk,한국어,العربية,English',
	"ਤੁਰੰਤ ਭੂਰਾ Fox ਆਲਸੀ ਕੁੱਤੇ ਨੂੰ ਵੱਧ ਗਈ. ਬੀਨ ਪੰਛੀ ਸੂਰਜ ਡੁੱਬਣ 'ਤੇ ਉਡਾਣ ਭਰਦੀ ਹੈ.",
	'速い茶色のキツネは、怠け者の犬を飛び越えた。豆の鳥は日没で飛ぶ。',
	'那只敏捷的棕色狐狸跃过那只懒狗。豆鸟飞日落。',
	'빠른 갈색 여우가 게으른 개를 뛰어 넘었다.콩 조류 일몰에 파리.'
];
const RTL = [
	'שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקיעה.',
	'قفز الثعلب البني السريع فوق الكلب الكسول. الطيور تطير في الفول عند غروب الشمس.',
	'فوری بھوری لومڑی سست کتے پر چھلانگ لگا. بین پرندوں سوریاست میں پرواز.'
];

const mixedText = [
	'This is marquee text',
	'No marquee',
	'الطيور تطير في الفول عند غروب الشمس.'
];

const texts = [
	'No marquee no marquee',
	'Ellipsis show before the initial start of the marquee. Ellipsis will not show on the subsequent starts.',
	'Second test to show that the Ellipsis show before the initial start of the marquee. Ellipsis will not show on the subsequent starts.'
];

const disabledDisclaimer = (disabled) =>
	disabled ? (
		<p style={{fontSize: '70%', fontStyle: 'italic'}}>
			<sup>*</sup>Marquee does not visually respond to <code>disabled</code> state.
		</p>
	) : (
		<p />
	);

const MarqueeI18nSamples = I18nContextDecorator(
	{updateLocaleProp: 'updateLocale'},
	kind({
		name: 'I18nPanel',

		handlers: {
			// eslint-disable-next-line enact/prop-types
			updateLocale: (ev, {updateLocale}) => updateLocale('ar-SA')
		},

		render: ({updateLocale}) => (
			<div>
				<Heading showLine>
					Remeasure marquee when locale change causes a font change with different metrics
				</Heading>
				<Button onClick={updateLocale}>Change locale to ar-SA</Button>
			</div>
		)
	})
);

const CustomItemBase = ({children, ...rest}) => (
	<div {...rest} style={{display: 'flex', width: 300, alignItems: 'center'}}>
		<Icon>notification</Icon>
		<Marquee id="marqueeText" style={{flex: 1, overflow: 'hidden'}}>
			{children}
		</Marquee>
		<Icon>trash</Icon>
	</div>
);

const CustomItem = Spottable(
	Skinnable(MarqueeController({marqueeOnFocus: true}, CustomItemBase))
);

const MarqueeItem = Spottable(Skinnable(MarqueeController({marqueeOnFocus: true}, 'div')));

class MarqueeWithShortContent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			long: false,
			scrollWidth: null,
			width: null
		};
	}

	componentDidMount () {
		this.node = document.querySelector('#marqueeText');
		this.updateSizeInfo();
	}

	componentDidUpdate () {
		this.updateSizeInfo();
	}

	updateSizeInfo = () => {
		if (this.node.scrollWidth !== this.state.scrollWidth) {
			this.setState({
				scrollWidth: this.node.scrollWidth,
				width: this.node.getBoundingClientRect().width
			});
		}
	};

	handleClick = () => {
		this.setState((prevState) => ({long: !prevState.long}));
	};

	render () {
		return (
			<div>
				scrollWidth: {this.state.scrollWidth} width: {this.state.width}
				<CustomItem className={css.spotlight} onClick={this.handleClick}>
					{this.state.long ? 'Very very very very very very very very very long text' : 'text'}
				</CustomItem>
			</div>
		);
	}
}

class MarqueeWithContentChanged extends Component {
	constructor (props) {
		super(props);
		this.state = {
			count: 0
		};
	}

	handleClick = () => {
		this.setState(({count}) => ({count: ++count % 3}));
	};

	render () {
		return (
			<div>
				<ol>
					<li>Click once to show the ellipsis just before the text marquees the first time.</li>
					<li>
						Click a second time to show the ellipsis just before the text marquees the first time
					</li>
					<li>Click again to return to a short string without marquee.</li>
				</ol>
				<Button onClick={this.handleClick}>{'Click Me'}</Button>
				<Marquee style={{width: ri.scaleToRem(800)}} marqueeOn={'render'}>
					{texts[this.state.count]}
				</Marquee>
			</div>
		);
	}
}

class MarqueeSynchronizedWithContentChanged extends Component {
	constructor (props) {
		super(props);
		this.state = {
			count: 0
		};
	}

	handleClick = () => {
		this.setState(({count}) => ({count: ++count % 3}));
	};

	render () {
		return (
			<div>
				<ol>
					<li>Click once to show the ellipsis just before the text marquees the first time.</li>
					<li>
						Click a second time to show the ellipsis just before the text marquees the first time
					</li>
					<li>Click again to return to a short string without marquee.</li>
				</ol>
				<Button onClick={this.handleClick}>{'Click Me'}</Button>
				<Controller>
					<Marquee style={{width: ri.scaleToRem(800)}} marqueeOn={'render'}>
						{texts[this.state.count]}
					</Marquee>
				</Controller>
			</div>
		);
	}
}

export default {
	title: 'Sandstone/Marquee',
	component: 'Marquee'
};

export const Ltr = (args) => {
	const disabled = args['disabled'];
	return (
		<section>
			<Marquee
				style={{width: ri.scaleToRem(798)}}
				disabled={disabled}
				forceDirection={args['forceDirection']}
				marqueeDelay={args['marqueeDelay']}
				marqueeDisabled={args['marqueeDisabled']}
				marqueeOn={args['marqueeOn']}
				marqueeOnRenderDelay={args['marqueeOnRenderDelay']}
				marqueeResetDelay={args['marqueeResetDelay']}
				marqueeSpeed={args['marqueeSpeed']}
			>
				{args['children']}
			</Marquee>
			{disabledDisclaimer(disabled)}
		</section>
	);
};

boolean('disabled', Ltr, Marquee, false);
select('forceDirection', Ltr, ['', 'ltr', 'rtl'], Marquee, '');
number('marqueeDelay', Ltr, Marquee, 1000);
boolean('marqueeDisabled', Ltr, Marquee, false);
select('marqueeOn', Ltr, ['hover', 'render'], Marquee, 'render');
number('marqueeOnRenderDelay', Ltr, Marquee, 1000);
number('marqueeResetDelay', Ltr, Marquee, 1000);
number('marqueeSpeed', Ltr, Marquee, 60);
select('children', Ltr, LTR, Marquee, LTR[0]);

Ltr.storyName = 'LTR';

export const Rtl = (args) => {
	const disabled = args['disabled'];
	return (
		<section>
			<Marquee
				style={{width: ri.scaleToRem(798)}}
				disabled={disabled}
				forceDirection={args['forceDirection']}
				marqueeDelay={args['marqueeDelay']}
				marqueeDisabled={args['marqueeDisabled']}
				marqueeOn={args['marqueeOn']}
				marqueeOnRenderDelay={args['marqueeOnRenderDelay']}
				marqueeResetDelay={args['marqueeResetDelay']}
				marqueeSpeed={args['marqueeSpeed']}
			>
				{args['children']}
			</Marquee>
			{disabledDisclaimer(disabled)}
		</section>
	);
};

boolean('disabled', Rtl, Marquee, false);
select('forceDirection', Rtl, ['', 'ltr', 'rtl'], Marquee, '');
number('marqueeDelay', Rtl, Marquee, 1000);
boolean('marqueeDisabled', Rtl, Marquee, false);
select('marqueeOn', Rtl, ['hover', 'render'], Marquee, 'render');
number('marqueeOnRenderDelay', Rtl, Marquee, 1000);
number('marqueeResetDelay', Rtl, Marquee, 1000);
number('marqueeSpeed', Rtl, Marquee, 60);
select('children', Rtl, RTL, Marquee, RTL[0]);

Rtl.storyName = 'RTL';

export const Synchronized = (args) => {
	const disabled = args['disabled'];
	return (
		<Controller style={{width: ri.scaleToRem(798)}}>
			{LTR.map((children, index) => (
				<Marquee
					disabled={disabled}
					forceDirection={args['forceDirection']}
					key={index}
					marqueeDelay={args['marqueeDelay']}
					marqueeDisabled={args['marqueeDisabled']}
					marqueeOn={args['marqueeOn']}
					marqueeOnRenderDelay={args['marqueeOnRenderDelay']}
					marqueeResetDelay={args['marqueeResetDelay']}
					marqueeSpeed={args['marqueeSpeed']}
				>
					{children}
				</Marquee>
			))}
			{disabledDisclaimer(disabled)}
		</Controller>
	);
};

boolean('disabled', Synchronized, Marquee, false);
select('forceDirection', Synchronized, ['', 'ltr', 'rtl'], Marquee, '');
number('marqueeDelay', Synchronized, Marquee, 1000);
boolean('marqueeDisabled', Synchronized, Marquee, false);
select('marqueeOn', Synchronized, ['hover', 'render'], Marquee, 'render');
number('marqueeOnRenderDelay', Synchronized, Marquee, 5000);
number('marqueeResetDelay', Synchronized, Marquee, 1000);
number('marqueeSpeed', Synchronized, Marquee, 60);

export const OnFocus = () => (
	<div>
		<Item style={{width: ri.scaleToRem(798)}} marqueeOn="focus">
			{LTR[0]}
		</Item>
		<SpottableMarquee
			className={css.spotlight}
			style={{width: ri.scaleToRem(798)}}
			marqueeOn="focus"
		>
			{LTR[0]}
		</SpottableMarquee>
	</div>
);

OnFocus.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const RestartMarqueeWhenMarqueeCompletes = () => (
	<SpottableDiv className={css.spotlight}>
		<Marquee
			style={{width: ri.scaleToRem(798)}}
			disabled={false}
			marqueeDelay={1000}
			marqueeDisabled={false}
			marqueeOn="focus"
			marqueeOnRenderDelay={1000}
			marqueeResetDelay={1000}
			marqueeSpeed={60}
		>
			{'The quick brown fox.'}
		</Marquee>
		<Marquee
			style={{width: ri.scaleToRem(798)}}
			disabled={false}
			marqueeDelay={1000}
			marqueeDisabled={false}
			marqueeOn="focus"
			marqueeOnRenderDelay={1000}
			marqueeResetDelay={1000}
			marqueeSpeed={60}
		>
			{LTR[0]}
		</Marquee>
	</SpottableDiv>
);

RestartMarqueeWhenMarqueeCompletes.storyName = 'Restart Marquee when Marquee completes';
RestartMarqueeWhenMarqueeCompletes.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const I18N = () => <MarqueeI18nSamples />;

I18N.storyName = 'I18n';
I18N.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithShortContent = () => (
	<div>
		<MarqueeWithShortContent />
	</div>
);

WithShortContent.storyName = 'with Short Content';
WithShortContent.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithContentChanged = () => <MarqueeWithContentChanged />;

WithContentChanged.storyName = 'with Content Changed';
WithContentChanged.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const SynchronizedWithContentChanged = () => <MarqueeSynchronizedWithContentChanged />;

SynchronizedWithContentChanged.storyName = 'Synchronized with Content Changed';
SynchronizedWithContentChanged.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithTextCentered = () => (
	<div>
		<Heading>Focus on below MarqueeController + Marquee center</Heading>
		<MarqueeItem className={css.spotlight} style={{width: ri.scale(802), padding: ri.scale(24)}}>
			<div>Sample text</div>
			<div style={{width: '100%', flex: 1}}>
				<Marquee alignment="center" style={{width: '100%'}}>
					{'this is marquee text this is marquee text'}
				</Marquee>
			</div>
		</MarqueeItem>
		<br />
		<Heading>MarqueeController + Marquee not center</Heading>
		<MarqueeItem
			className={css.spotlight}
			style={{width: ri.scale(802), padding: ri.scale(24), border: '1px solid yellow'}}
		>
			<div>Sample text</div>
			<div style={{width: '100%', flex: 1, textAlign: 'center'}}>
				<Marquee style={{width: '100%'}}>{'this is marquee text this is marquee text'}</Marquee>
			</div>
		</MarqueeItem>
	</div>
);

WithTextCentered.storyName = 'with Text Centered';
WithTextCentered.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithScaledItem = (args) => {
	return (
		<MarqueeItem className={css.scaledItem}>
			<Marquee
				alignment={args['alignment']}
				className={css.textArea}
				forceDirection={args['forceDirection']}
				marqueeDelay={args['marqueeDelay']}
				marqueeDisabled={args['marqueeDisabled']}
				marqueeResetDelay={args['marqueeResetDelay']}
				marqueeSpeed={args['marqueeSpeed']}
			>
				{args['children']}
			</Marquee>
		</MarqueeItem>
	);
};

select('alignment', WithScaledItem, [null, 'left', 'right', 'center'], Marquee);
select('forceDirection', WithScaledItem, ['', 'ltr', 'rtl'], Marquee, '');
number('marqueeDelay', WithScaledItem, Marquee, 1000);
boolean('marqueeDisabled', WithScaledItem, Marquee, false);
number('marqueeResetDelay', WithScaledItem, Marquee, 1000);
number('marqueeSpeed', WithScaledItem, Marquee, 60);
select('children', WithScaledItem, mixedText, Marquee, mixedText[0]);

WithScaledItem.storyName = 'with Scaled Item';
