import {generateTestData} from '@enact/ui-test-utils/utils';

import Button from './components/Button';
import BodyText from './components/BodyText';
import Checkbox from './components/Checkbox';
import CheckboxItem from './components/CheckboxItem';
import ContextualMenuDecorator from './components/ContextualMenuDecorator';
import ContextualPopupDecorator from './components/ContextualPopupDecorator';
import DatePicker from './components/DatePicker';
import DayPicker from './components/DayPicker';
import Dropdown from './components/Dropdown';
import ExpandableInput from './components/ExpandableInput';
import ExpandableItem from './components/ExpandableItem';
import ExpandableList from './components/ExpandableList';
import ExpandablePicker from './components/ExpandablePicker';
import FormCheckbox from './components/FormCheckbox';
import FormCheckboxItem from './components/FormCheckboxItem';
import GridListImageItem from './components/GridListImageItem';
import Header from './components/Header';
import Heading from './components/Heading';
import Icon from './components/Icon';
import IconButton from './components/IconButton';
import Image from './components/Image';
import IncrementSlider from './components/IncrementSlider';
import Input from './components/Input';
import Item from './components/Item';
import LabeledIcon from './components/LabeledIcon';
import LabeledIconButton from './components/LabeledIconButton';
import Marquee from './components/Marquee';
import MediaOverlay from './components/MediaOverlay';
import Notification from './components/Notification';
import Panels from './components/Panels';
import Picker from './components/Picker';
import Popup from './components/Popup';
import ProgressBar from './components/ProgressBar';
import RadioItem from './components/RadioItem';
import RangePicker from './components/RangePicker';
import Region from './components/Region';
import Scroller from './components/Scroller';
import SelectableItem from './components/SelectableItem';
import Slider from './components/Slider';
import Steps from './components/Steps';
import Switch from './components/Switch';
import SwitchItem from './components/SwitchItem';
import TimePicker from './components/TimePicker';
import ToggleIcon from './components/ToggleIcon';

const components = {
	BodyText,
	Button,
	Checkbox,
	CheckboxItem,
	ContextualMenuDecorator,
	ContextualPopupDecorator,
	DatePicker,
	DayPicker,
	Dropdown,
	ExpandableInput,
	ExpandableItem,
	ExpandableList,
	ExpandablePicker,
	FormCheckbox,
	FormCheckboxItem,
	GridListImageItem,
	Header,
	Heading,
	Icon,
	IconButton,
	Image,
	IncrementSlider,
	Input,
	Item,
	LabeledIcon,
	LabeledIconButton,
	Marquee,
	MediaOverlay,
	Notification,
	Panels,
	Picker,
	Popup,
	ProgressBar,
	RadioItem,
	RangePicker,
	Region,
	// Scrollable,
	Scroller,
	SelectableItem,
	// Skinnable,
	Slider,
	// Spinner,
	Steps,
	Switch,
	SwitchItem,
	TimePicker,
	ToggleIcon
	// ToggleItem,
	// TooltipDecorator,
	// VideoPlayer,
	// VirtualList
};

const testMetadata = {};

Object.keys(components).forEach(component => {
	let metaData = generateTestData(component, components[component]);
	testMetadata[component] = metaData;
});

export default components;
export {components, testMetadata};
