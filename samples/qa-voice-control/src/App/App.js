import React, { Fragment } from 'react';
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
import UseCasePanels from '../views/usecase/UseCasePanels';
import UseCasePicker from '../views/usecase/UseCasePicker';
import UseCaseSkinnable from '../views/usecase/UseCaseSkinnable';
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
	{title: 'Delete', view: IntentDelete, category: 'Intent'},
	{title: 'Horizontal Scroller', view: IntentHorizontalScroller},
	{title: 'Scroller', view: IntentScroller},
	{title: 'Select', view: IntentSelect},
	{title: 'Dropdown', view: IntentSelectCheckboxItem},
	{title: 'RadioItem', view: IntentSelectRadioItem},
	{title: 'SwitchItem', view: IntentSetToggleItem},
	{title: 'PlayContent', view: IntentPlayContent},
	{title: 'PlayListControl', view: IntentPlayListControl},
	{title: 'VirtualGridList', view: IntentVirtualGridList},
	{title: 'VirtualList', view: IntentVirtualList},
	{title: 'data-webos-voice-checked', view: DataWebosVoiceChecked, category: 'Attributes'},
	{title: 'data-webos-voice-disabled', view: DataWebosVoiceDisabled},
	{title: 'data-webos-voice-exclusive', view: DataWebosVoiceExclusive},
	{title: 'data-webos-voice-group-label', view: DataWebosVoiceGroupLabel},
	{title: 'data-webos-voice-intent', view: DataWebosVoiceIntent},
	{title: 'data-webos-voice-label', view: DataWebosVoiceLabel},
	{title: 'data-webos-voice-label-index', view: DataWebosVoiceLabelIndex},
	{title: 'Alert', view: UseCaseAlert, category: 'Use cases'},
	{title: 'DatePicker', view: UseCaseDatePicker},
	{title: 'Double Scroller', view: UseCaseDoubleScroller},
	{title: 'Dropdown', view: UseCaseDropdown},
	{title: 'Horizontal Scroller', view: UseCaseHorizontalScroller},
	{title: 'Input', view: UseCaseInput},
	{title: 'Panel', view: UseCasePanels},
	{title: 'Picker', view: UseCasePicker},
	{title: 'Skinnable', view: UseCaseSkinnable},
	{title: 'Slider', view: UseCaseSlider},
	{title: 'Spinner', view: UseCaseSpinner},
	{title: 'ProgressBar', view: UseCaseProgressBar},
	{title: 'TimePicker', view: UseCaseTimePicker},
	{title: 'VideoPlayer', view: UseCaseVideoPlayer},
	{title: 'VoiceControlDecorator', view: UseCaseVoiceControlDecorator},
	{title: 'WebOSVoice', view: WebOSVoice, category: 'Events'}
];

class AppBase extends React.Component {
	constructor () {
		super();
		this.state = {
			selected: 0
		};
	}

	handleChangeView = (selected) => () => this.setState({selected});

	render () {
		const {className, ...rest} = this.props;
		const {selected} = this.state;

		return (
			<div className={className}>
				<Layout {...rest} className={css.layout}>
					<Cell component={Menu} id="menu" size="20%" spotlightId="menu">
						{views.map((view, i) => {
							if (view.category) {
								return (
									<Fragment key={view.title}>
										<Heading key={`category${i}`} size="tiny" showLine className={css.heading}>{view.category}</Heading>
										<Item
											className={css.navItem}
											data-menu={i}
											key={i}
											onClick={this.handleChangeView(i)}
											slotBefore={('00' + i).slice(-2)}
										>
											{view.title}
										</Item>
									</Fragment>
								);
							} else {
								return (
									<Item
										className={css.navItem}
										data-menu={i}
										key={i}
										onClick={this.handleChangeView(i)}
										slotBefore={('00' + i).slice(-2)}
									>
										{view.title}
									</Item>
								);
							}
						})}
					</Cell>
					<Cell component={ViewManager} index={selected}>
						{views.map((view, i) => (
							<View {...view} key={`view${i}`} />
						))}
					</Cell>
				</Layout>
			</div>
		);
	}
}

const App = ThemeDecorator(AppBase);

export default App;
