import React from 'react';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import * as Container from '@enact/spotlight/src/container';
import * as Navigate from '@enact/spotlight/src/navigate';
import * as Target from '@enact/spotlight/src/target';
import * as Utils from '@enact/spotlight/src/utils';
import Layout, {Cell} from '@enact/ui/Layout';
import ViewManager from '@enact/ui/ViewManager';

import css from './App.module.less';
import Home from './Home';
import View from './View';

import DataWebosVoiceChecked from '../views/attribute/DataWebosVoiceChecked';
import DataWebosVoiceDisabled from '../views/attribute/DataWebosVoiceDisabled';
import DataWebosVoiceExclusive from '../views/attribute/DataWebosVoiceExclusive';
import DataWebosVoiceGroupLabel from '../views/attribute/DataWebosVoiceGroupLabel';
import DataWebosVoiceIntent from '../views/attribute/DataWebosVoiceIntent';
import DataWebosVoiceLabel from '../views/attribute/DataWebosVoiceLabel';
import DataWebosVoiceLabelIndex from '../views/attribute/DataWebosVoiceLabelIndex';

import WebOSVoice from '../views/event/WebOSVoice';

import IntentDelete from '../views/intent/IntentDelete';
import IntentHorizontalScroller from '../views/intent/IntentHorizontalScroller';
import IntentScroller from '../views/intent/IntentScroller';
import IntentSelect from '../views/intent/IntentSelect';
import IntentSelectCheckboxItem from '../views/intent/IntentSelectCheckboxItem';
import IntentSelectRadioItem from '../views/intent/IntentSelectRadioItem';
import IntentSetToggleItem from '../views/intent/IntentSetToggleItem';
import IntentPlayContent from '../views/intent/IntentPlayContent';
import IntentPlayListControl from '../views/intent/IntentPlayListControl';
import IntentVirtualGridList from '../views/intent/IntentVirtualGridList';
import IntentVirtualList from '../views/intent/IntentVirtualList';

import UseCaseAlert from '../views/usecase/UseCaseAlert';
import UseCaseDatePicker from '../views/usecase/UseCaseDatePicker';
import UseCaseDoubleScroller from '../views/usecase/UseCaseDoubleScroller';
import UseCaseDropdown from '../views/usecase/UseCaseDropdown';
import UseCaseHorizontalScroller from '../views/usecase/UseCaseHorizontalScroller';
import UseCaseInput from '../views/usecase/UseCaseInput';
import UseCasePanel from '../views/usecase/UseCasePanel';
import UseCasePicker from '../views/usecase/UseCasePicker';
import UseCaseSkin from '../views/usecase/UseCaseSkin';
import UseCaseSlider from '../views/usecase/UseCaseSlider';
import UseCaseSpinner from '../views/usecase/UseCaseSpinner';
import UseCaseProgressBar from '../views/usecase/UseCaseProgressBar';
import UseCaseTimePicker from '../views/usecase/UseCaseTimePicker';
import UseCaseVideoPlayer from '../views/usecase/UseCaseVideoPlayer';
import UseCaseVoiceControlDecorator from '../views/usecase/UseCaseVoiceControlDecorator';

// For debugging
window.s = Spotlight;
window.c = Container;
window.t = Target;
window.n = Navigate;
window.u = Utils;

const Menu = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');

const views = [
	{title: 'About qa-voice-control', view: Home},
	{title: 'Intent', view: null},
	{title: 'Delete', view: IntentDelete},
	{title: 'Horizontal Scroller', view: IntentHorizontalScroller},
	{title: 'Scroller', view: IntentScroller},
	{title: 'Select', view: IntentSelect},
	{title: 'Dropdown', view: IntentSelectCheckboxItem},
	{title: 'RadioItem', view: IntentSelectRadioItem},
	{title: 'SwitchItem', view: IntentSetToggleItem},
	{title: 'PlayContent', view: IntentPlayContent},
	{title: 'PlayListControl', view: IntentPlayListControl},
	{title: 'VirtualGridList', view: IntentVirtualGridList},
	{title: 'VirtualList},', view: IntentVirtualList},
	{title: 'Attribute', view: null},
	{title: 'data-webos-voice-checked', view: DataWebosVoiceChecked},
	{title: 'data-webos-voice-disabled', view: DataWebosVoiceDisabled},
	{title: 'data-webos-voice-exclusive', view: DataWebosVoiceExclusive},
	{title: 'data-webos-voice-group-label', view: DataWebosVoiceGroupLabel},
	{title: 'data-webos-voice-intent', view: DataWebosVoiceIntent},
	{title: 'data-webos-voice-label', view: DataWebosVoiceLabel},
	{title: 'data-webos-voice-label-index', view: DataWebosVoiceLabelIndex},
	{title: 'Use Cases', view: null},
	{title: 'Alert', view: UseCaseAlert},
	{title: 'DatePicker', view: UseCaseDatePicker},
	{title: 'Double Scroller', view: UseCaseDoubleScroller},
	{title: 'Dropdown', view: UseCaseDropdown},
	{title: 'Horizontal Scroller', view: UseCaseHorizontalScroller},
	{title: 'Input', view: UseCaseInput},
	{title: 'Panel', view: UseCasePanel},
	{title: 'Picker', view: UseCasePicker},
	{title: 'Skin', view: UseCaseSkin},
	{title: 'Slider', view: UseCaseSlider},
	{title: 'Spinner', view: UseCaseSpinner},
	{title: 'ProgressBar', view: UseCaseProgressBar},
	{title: 'TimePicker', view: UseCaseTimePicker},
	{title: 'VideoPlayer', view: UseCaseVideoPlayer},
	{title: 'VoiceControlDecorator', view: UseCaseVoiceControlDecorator},
	{title: 'Event', view: null},
	{title: 'WebOSVoice', view: WebOSVoice}
];

class AppBase extends React.Component {
	constructor () {
		super();
		this.state = {
			jumpToView: '',
			selected: 0
		};
	}

	componentDidMount () {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	cachedKey = -1;

	handleChangeView = (selected) => () => this.setState({selected});

	handleKeyDown = (ev) => {
		const {keyCode} = ev;

		if (keyCode >= 48 && keyCode <= 57) {
			const num = keyCode - 48;

			if (this.cachedKey === -1) {
				this.cachedKey = num;
				this.setState({jumpToView: num});
			} else {
				const selected = this.cachedKey * 10 + num;

				if (selected < views.length) {
					const target = document.querySelector('[data-menu="' + selected + '"]');
					Spotlight.focus(target);
					this.handleChangeView(selected)();
				}

				this.setState({jumpToView: '' + this.cachedKey + num});
				this.cachedKey = -1;
			}
		}
	};

	render () {
		const {className, ...rest} = this.props;
		const {jumpToView, selected} = this.state;

		return (
			<div className={className}>
				<Layout {...rest} className={css.layout}>
					<Cell component={Menu} id="menu" size="20%" spotlightId="menu">
						<div className={css.jumpToView}>Jump To View: {jumpToView}</div>
						{views.map((view, i) => {
							if (!view.view) {
								return (
									<Heading>{view.title}</Heading>
								);
							}
							return (
								<Item
									aria-label={view.title}
									className={css.navItem}
									data-menu={i}
									key={i}
									onClick={this.handleChangeView(i)}
									slotBefore={('00' + i).slice(-2)}
								>
									{view.title}
								</Item>
							);
						})}
					</Cell>
					<Cell component={ViewManager} index={selected}>
						{views.map((view, i) => (
							<View {...view} key={i} />
						))}
					</Cell>
				</Layout>
			</div>
		);
	}
}

const App = ThemeDecorator(AppBase);

export default App;
