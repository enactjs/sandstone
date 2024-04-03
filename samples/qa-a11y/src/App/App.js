import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Item from '@enact/sandstone/Item';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Layout, {Cell} from '@enact/ui/Layout';
import ViewManager from '@enact/ui/ViewManager';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {useCallback, useEffect, useRef, useState} from 'react';

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
import PageViews from '../views/PageViews';
import Panels from '../views/Panels';
import Picker from '../views/Picker';
import Popup from '../views/Popup';
import PopupTabLayout from '../views/PopupTabLayout';
import ProgressBar from '../views/ProgressBar';
import ProgressButton from '../views/ProgressButton';
import QuickGuidePanels from '../views/QuickGuidePanels';
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

import appCss from './App.module.less';
import Home from './Home';
import View from './View';

const Menu = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');

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
	{title: 'PageViews', view: PageViews},
	{isHeader: false, title: 'Panels', view: Panels},
	{title: 'Picker', view: Picker},
	{title: 'Popup', view: Popup},
	{title: 'PopupTabLayout', view: PopupTabLayout},
	{title: 'ProgressBar', view: ProgressBar},
	{title: 'ProgressButton', view: ProgressButton},
	{noCloseButton: true, title: 'QuickGuidePanels', view: QuickGuidePanels},
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

const AppBase = ({className, rtl, updateLocale, ...rest}) => {
	const [isDebugMode, setIsDebugMode] = useState(false);
	const [jumpToView, setJumpToView] = useState('');
	const [selected, setSelected] = useState(0);
	const cachedKey = useRef(-1);

	const handleChangeView = (select) => () => setSelected(select);

	const handleDebug = useCallback(() => setIsDebugMode(!isDebugMode), [isDebugMode]);

	const handleKeyDown = useCallback((ev) => {
		const {keyCode} = ev;
		if (keyCode === 403 || keyCode === 82) { // Red Key or `r` key
			updateLocale(rtl ? 'en-US' : 'ar-SA');
		} else if (keyCode === 404 || keyCode === 71) { // Green Key or `g` key
			handleDebug();
		} else if (keyCode >= 48 && keyCode <= 57) {
			const num = keyCode - 48;

			if (cachedKey.current === -1) {
				cachedKey.current = num;
				setJumpToView(num);
			} else {
				const select = cachedKey.current * 10 + num;

				if (select < views.length) {
					const target = document.querySelector('[data-menu="' + select + '"]');
					Spotlight.focus(target);
					handleChangeView(select);
				}

				setJumpToView('' + cachedKey.current + num);
				cachedKey.current = -1;
			}
		}
	}, [handleDebug, rtl, updateLocale]);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	const debugAriaClass = isDebugMode ? 'aria debug' : null;

	return (
		<div className={classnames(className, debugAriaClass)}>
			<Layout {...rest} className={appCss.layout}>
				<Cell component={Menu} id="menu" size="20%" spotlightId="menu">
					<div className={appCss.jumpToView}>Jump To View: {jumpToView}</div>
					{views.map((view, i) => (
						<Item
							aria-label={view.title}
							className={appCss.navItem}
							data-menu={i}
							key={i}
							onClick={handleChangeView(i)}
							slotBefore={('00' + i).slice(-2)}
						>
							{view.title}
						</Item>
					))}
				</Cell>
				<Cell component={ViewManager} index={selected}>
					{views.map((view, i) => (
						<View {...view} handleDebug={handleDebug} isDebugMode={isDebugMode} key={i} />
					))}
				</Cell>
			</Layout>
		</div>
	);
};

AppBase.propTypes = {
	rtl: PropTypes.bool,
	updateLocale: PropTypes.func
};

const AppDecorator = compose(
	ThemeDecorator,
	I18nContextDecorator({rtlProp: 'rtl', updateLocaleProp: 'updateLocale'})
);

const App = AppDecorator(AppBase);

export default App;
