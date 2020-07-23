import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Item from '@enact/sandstone/Item';
import ScrollerComponent from '@enact/sandstone/Scroller';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Spotlight from '@enact/spotlight';
import Layout, {Cell} from '@enact/ui/Layout';
import ViewManager from '@enact/ui/ViewManager';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Alert from '../views/Alert';
import Button from '../views/Button';
import Checkbox from '../views/Checkbox';
import CheckboxItem from '../views/CheckboxItem';
import ContextualMenuDecorator from '../views/ContextualMenuDecorator';
import ContextualPopupDecorator from '../views/ContextualPopupDecorator';
import DatePicker from '../views/DatePicker';
import DayPicker from '../views/DayPicker';
import Dropdown from '../views/Dropdown';
import FixedPopupPanels from '../views/FixedPopupPanels';
import FlexiblePopupPanels from '../views/FlexiblePopupPanels';
import FormCheckboxItem from '../views/FormCheckboxItem';
import GroupView from '../views/Group';
import Header from '../views/Header';
import ImageItem from '../views/ImageItem';
import Input from '../views/Input';
import InputField from '../views/InputField';
import ItemView from '../views/Item';
import Option from '../views/Option';
import Panels from '../views/Panels';
import Picker from '../views/Picker';
import Popup from '../views/Popup';
import PopupTabLayout from '../views/PopupTabLayout';
import ProgressBar from '../views/ProgressBar';
import ProgressButton from '../views/ProgressButton';
import RadioItem from '../views/RadioItem';
import RangePicker from '../views/RangePicker';
import ReadAlert from '../views/ReadAlert';
import Region from '../views/Region';
import Scroller from '../views/Scroller';
import Slider from '../views/Slider';
import Spinner from '../views/Spinner';
import Switch from '../views/Switch';
import SwitchItem from '../views/SwitchItem';
import TabLayout from '../views/TabLayout';
import TimePicker from '../views/TimePicker';
import TooltipDecorator from '../views/TooltipDecorator';
import VideoPlayer from '../views/VideoPlayer';
import VirtualGridList from '../views/VirtualGridList';
import VirtualList from '../views/VirtualList';
import WizardPanels from '../views/WizardPanels';

import css from './App.module.less';
import Home from './Home';
import View from './View';

const views = [
	{title: 'About qa-a11y', view: Home},
	{debugProps: true, title: 'Option', view: Option},
	{title: 'Alert', view: Alert},
	{title: 'Button', view: Button},
	{title: 'Checkbox', view: Checkbox},
	{title: 'CheckboxItem', view: CheckboxItem},
	{title: 'ContextualMenuDecorator', view: ContextualMenuDecorator},
	{title: 'ContextualPopupDecorator', view: ContextualPopupDecorator},
	{title: 'DatePicker', view: DatePicker},
	{title: 'DayPicker', view: DayPicker},
	{title: 'Dropdown', view: Dropdown},
	{title: 'FixedPopupPanels', view: FixedPopupPanels},
	{title: 'FlexiblePopupPanels', view: FlexiblePopupPanels},
	{title: 'FormCheckboxItem', view: FormCheckboxItem},
	{title: 'Group', view: GroupView},
	{isHeader: false, title: 'Header', view: Header},
	{title: 'ImageItem', view: ImageItem},
	{title: 'Input', view: Input},
	{title: 'InputField', view: InputField},
	{title: 'Item', view: ItemView},
	{isHeader: false, title: 'Panels', view: Panels},
	{title: 'Picker', view: Picker},
	{title: 'Popup', view: Popup},
	{title: 'PopupTabLayout', view: PopupTabLayout},
	{title: 'ProgressBar', view: ProgressBar},
	{title: 'ProgressButton', view: ProgressButton},
	{title: 'RadioItem', view: RadioItem},
	{title: 'RangePicker', view: RangePicker},
	{title: 'ReadAlert', view: ReadAlert},
	{title: 'Region', view: Region},
	{title: 'Scroller', view: Scroller},
	{title: 'Slider', view: Slider},
	{title: 'Spinner', view: Spinner},
	{title: 'Switch', view: Switch},
	{title: 'SwitchItem', view: SwitchItem},
	{isHeader: false, title: 'TabLayout', view: TabLayout},
	{title: 'TimePicker', view: TimePicker},
	{title: 'TooltipDecorator', view: TooltipDecorator},
	{isAriaHidden: true, title: 'VideoPlayer', view: VideoPlayer},
	{title: 'VirtualGridList', view: VirtualGridList},
	{title: 'VirtualList', view: VirtualList},
	{isHeader: false, title: 'WizardPanels', view: WizardPanels}
];

class AppBase extends React.Component {
	static propTypes = {
		rtl: PropTypes.bool,
		updateLocale: PropTypes.func
	}
	constructor () {
		super();
		this.state = {
			isDebugMode: false,
			jumpToView: '',
			selected: 0
		};
	}

	componentDidMount () {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	cachedKey = -1

	handleChangeView = (selected) => () => this.setState({selected})

	handleDebug = () => this.setState((state) => ({isDebugMode: !state.isDebugMode}))

	handleKeyDown = (ev) => {
		const {keyCode} = ev;
		const {rtl, updateLocale} = this.props;

		if (keyCode === 403 || keyCode === 82) { // Red Key or `r` key
			updateLocale(rtl ? 'en-US' : 'ar-SA');
		} else if (keyCode === 404 || keyCode === 71) { // Green Key or `g` key
			this.handleDebug();
		} else if (keyCode >= 48 && keyCode <= 57) {
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
	}

	render () {
		const {className, ...rest} = this.props;
		const {isDebugMode, jumpToView, selected} = this.state;
		const debugAriaClass = isDebugMode ? 'aria debug' : null;

		delete rest.rtl;
		delete rest.updateLocale;

		return (
			<div className={classnames(className, debugAriaClass)}>
				<Layout {...rest} className={css.layout}>
					<Cell component={ScrollerComponent} size="20%">
						<div className={css.jumpToView}>Jump To View: {jumpToView}</div>
						{views.map((view, i) => (
							<Item
								className={css.navItem}
								data-menu={i}
								key={i}
								slotBefore={
									<div aria-hidden>{('00' + i).slice(-2)}</div>
								}
								onClick={this.handleChangeView(i)}
							>
								{view.title}
							</Item>
						))}
					</Cell>
					<Cell component={ViewManager} index={selected}>
						{views.map((view, i) => (
							<View {...view} handleDebug={this.handleDebug} isDebugMode={isDebugMode} key={i} />
						))}
					</Cell>
				</Layout>
			</div>
		);
	}
}

const AppDecorator = compose(
	ThemeDecorator,
	I18nContextDecorator({rtlProp: 'rtl', updateLocaleProp: 'updateLocale'})
);

const App = AppDecorator(AppBase);

export default App;
