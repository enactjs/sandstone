import React, {Fragment} from 'react';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Layout, {Cell} from '@enact/ui/Layout';
import Panels, {Panel} from '@enact/sandstone/Panels';

import css from './App.module.less';
import Home from './Home';

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

import UseCaseDoubleScroller from '../views/usecase/UseCaseDoubleScroller';
import UseCaseVideoPlayer from '../views/usecase/UseCaseVideoPlayer';
import UseCaseVoiceControlDecorator from '../views/usecase/UseCaseVoiceControlDecorator';

const Menu = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');

const views = [
	{title: 'About qa-voice-control', view: Home},
	{title: 'Delete', view: IntentDelete, category: 'Intent'},
	{title: 'Horizontal Scroller', view: IntentHorizontalScroller},
	{title: 'Scroller', view: IntentScroller},
	{title: 'Select', view: IntentSelect},
	{title: 'CheckboxItem', view: IntentSelectCheckboxItem},
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
	{title: 'WebOSVoice', view: WebOSVoice, category: 'Events'},
	{title: 'Double Scroller', view: UseCaseDoubleScroller, category: 'Use cases'},
	{title: 'VideoPlayer', view: UseCaseVideoPlayer},
	{title: 'VoiceControlDecorator', view: UseCaseVoiceControlDecorator}
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
						{views.map((view, i) => (
							<Fragment key={view.title}>
								{view.category ?
									<Heading key={`category${i}`} size="tiny" showLine className={css.heading}>
										{view.category}
									</Heading> : null
								}
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
						))}
					</Cell>
					<Cell component={Panels} index={selected}>
						{views.map(({view: ComponentView}, i) => (
							<Panel key={`panel${i}`}>
								<ComponentView />
							</Panel>
						))}
					</Cell>
				</Layout>
			</div>
		);
	}
}

const App = ThemeDecorator(AppBase);

export default App;
