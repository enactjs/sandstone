import Group from '@enact/ui/Group';
import Item from '@enact/sandstone/Item';
import Layout, {Cell} from '@enact/ui/Layout';
import React from 'react';
import ScrollerComponent from '@enact/sandstone/Scroller';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import ViewManager from '@enact/ui/ViewManager';

import A11yDecorator from '../views/A11yDecorator';
import Alert from '../views/Alert';
import Button from '../views/Button';
import ContextualMenuDecorator from '../views/ContextualMenuDecorator';
import ContextualPopupDecorator from '../views/ContextualPopupDecorator';
import Dropdown from '../views/Dropdown';
import FixedPopupPanels from '../views/FixedPopupPanels';
import FlexiblePopupPanels from '../views/FlexiblePopupPanels';
import GroupItem from '../views/GroupItem';
import Header from '../views/Header';
import Input from '../views/Input';
import ItemView from '../views/Item';
import Option from '../views/Option';
import Panels from '../views/Panels';
import Picker from '../views/Picker';
import Popup from '../views/Popup';
import PopupTabLayout from '../views/PopupTabLayout';
import Progress from '../views/Progress';
import ReadAlert from '../views/ReadAlert';
import ReadOrder from '../views/ReadOrder';
import Scroller from '../views/Scroller';
import Slider from '../views/Slider';
import Spinner from '../views/Spinner';
import TabLayout from '../views/TabLayout';
import TooltipDecorator from '../views/TooltipDecorator';
import VideoPlayer from '../views/VideoPlayer';
import VirtualGridList from '../views/VirtualGridList';
import VirtualList from '../views/VirtualList';
import WizardPanel from '../views/WizardPanel';

import css from './App.module.less';
import Home from './Home';
import View from './View';

const views = [
	{title: 'About qa-a11y', view: Home},
	{debugProps: true, title: 'Option', view: Option},
	{title: 'A11yDecorator', view: A11yDecorator},
	{title: 'Alert', view: Alert},
	{title: 'Button', view: Button},
	{title: 'ContextualMenuDecorator', view: ContextualMenuDecorator},
	{title: 'ContextualPopupDecorator', view: ContextualPopupDecorator},
	{title: 'Dropdown', view: Dropdown},
	{title: 'FixedPopupPanels', view: FixedPopupPanels},
	{isHeader: false, title: 'FlexiblePopupPanels', view: FlexiblePopupPanels},
	{title: 'GroupItem', view: GroupItem},
	{isHeader: false, title: 'Header', view: Header},
	{title: 'Input', view: Input},
	{title: 'Item', view: ItemView},
	{isHeader: false, title: 'Panels', view: Panels},
	{title: 'Picker', view: Picker},
	{title: 'Popup', view: Popup},
	{title: 'PopupTabLayout', view: PopupTabLayout},
	{title: 'ProgressBar&Button', view: Progress},
	{title: 'ReadAlert', view: ReadAlert},
	{title: 'ReadOrder', view: ReadOrder},
	{title: 'Scroller', view: Scroller},
	{title: 'Slider', view: Slider},
	{title: 'Spinner', view: Spinner},
	{isHeader: false, title: 'TabLayout', view: TabLayout},
	{title: 'TooltipDecorator', view: TooltipDecorator},
	{isAriaHidden: true, title: 'VideoPlayer', view: VideoPlayer},
	{title: 'VirtualGridList', view: VirtualGridList},
	{title: 'VirtualList', view: VirtualList},
	{isHeader: false, title: 'WizardPanel', view: WizardPanel}
];

class AppBase extends React.Component {
	constructor () {
		super();
		this.state = {
			isDebugMode: false,
			selected: 0
		};
	}

	handleChangeView = (state) => this.setState(state)

	handleDebug = () => this.setState((state) => ({isDebugMode: !state.isDebugMode}))

	render () {
		const
			{isDebugMode, selected} = this.state,
			debugAriaClass = isDebugMode ? 'aria debug' : null;

		return (
			<Layout {...this.props}>
				<Cell component={ScrollerComponent} size="20%">
					<Group childComponent={Item} itemProps={{className: css.navItem}} onSelect={this.handleChangeView} select="radio">
						{views.map((view) => view.title)}
					</Group>
				</Cell>
				<Cell className={debugAriaClass} component={ViewManager} index={selected}>
					{views.map((view, i) => (
						<View {...view} handleDebug={this.handleDebug} isDebugMode={isDebugMode} key={i} />
					))}
				</Cell>
			</Layout>
		);
	}
}

const App = ThemeDecorator(AppBase);

export default App;
