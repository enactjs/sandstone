import {generateTestData} from '@enact/ui-test-utils/utils';

import AlwaysViewingPanels from './components/AlwaysViewingPanels';
import ActivityPanels from './components/ActivityPanels';
import Button from './components/Button';
import BodyText from './components/BodyText';
import Checkbox from './components/Checkbox';
import CheckboxItem from './components/CheckboxItem';
import ContextualPopupDecorator from './components/ContextualPopupDecorator';
import DatePicker from './components/DatePicker';
import DayPicker from './components/DayPicker';
import DaySelector from './components/DaySelector';
import Dialog from './components/Dialog';
import Dropdown from './components/Dropdown';
import EditableIntegerPicker from './components/EditableIntegerPicker';
import ExpandableInput from './components/ExpandableInput';
import ExpandableItem from './components/ExpandableItem';
import ExpandableList from './components/ExpandableList';
import ExpandablePicker from './components/ExpandablePicker';
import FormCheckbox from './components/FormCheckbox';
import FormCheckboxItem from './components/FormCheckboxItem';
import GridListImageItem from './components/GridListImageItem';
import Heading from './components/Heading';
import Icon from './components/Icon';
import IconButton from './components/IconButton';
import Image from './components/Image';
import IncrementSlider from './components/IncrementSlider';
import Input from './components/Input';
import Item from './components/Item';
import LabeledIcon from './components/LabeledIcon';
import LabeledIconButton from './components/LabeledIconButton';
import LabeledItem from './components/LabeledItem';
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
import SlotItem from './components/SlotItem';
import Switch from './components/Switch';
import SwitchItem from './components/SwitchItem';
import TimePicker from './components/TimePicker';
import ToggleButton from './components/ToggleButton';
import ToggleIcon from './components/ToggleIcon';

const components = {
	AlwaysViewingPanels,
	ActivityPanels,
	BodyText,
	Button,
	Checkbox,
	CheckboxItem,
	ContextualPopupDecorator,
	DatePicker,
	DayPicker,
	DaySelector,
	Dialog,
	Dropdown,
	EditableIntegerPicker,
	ExpandableInput,
	ExpandableItem,
	ExpandableList,
	ExpandablePicker,
	FormCheckbox,
	FormCheckboxItem,
	GridListImageItem,
	Heading,
	Icon,
	IconButton,
	Image,
	IncrementSlider,
	Input,
	Item,
	LabeledIcon,
	LabeledIconButton,
	LabeledItem,
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
	//	Scrollable,
	Scroller,
	SelectableItem,
	//	Skinnable,
	Slider,
	SlotItem,
	//	Spinner,
	Switch,
	SwitchItem,
	TimePicker,
	ToggleButton,
	ToggleIcon
//	ToggleItem,
//	TooltipDecorator,
//	VideoPlayer,
//	VirtualList
};

const testMetadata = {};

Object.keys(components).forEach(component => {
	let metaData = generateTestData(component, components[component]);
	testMetadata[component] = metaData;
});

export default components;
export {components, testMetadata};
