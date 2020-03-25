import {generateTestData} from '@enact/ui-test-utils/utils';


import ActionGuide from './components/ActionGuide';
import Button from './components/Button';
import BodyText from './components/BodyText';
import Checkbox from './components/Checkbox';
import CheckboxItem from './components/CheckboxItem';
import ContextualMenuDecorator from './components/ContextualMenuDecorator';
import ContextualPopupDecorator from './components/ContextualPopupDecorator';
import DatePicker from './components/DatePicker';
import Dropdown from './components/Dropdown';
import FormCheckbox from './components/FormCheckbox';
import FormCheckboxItem from './components/FormCheckboxItem';
import GridListImageItem from './components/GridListImageItem';
import Header from './components/Header';
import Heading from './components/Heading';
import Icon from './components/Icon';
import IconButton from './components/IconButton';
import Image from './components/Image';
import InputField from './components/InputField';
import Item from './components/Item';
import LabeledIcon from './components/LabeledIcon';
import LabeledIconButton from './components/LabeledIconButton';
import Marquee from './components/Marquee';
import MediaOverlay from './components/MediaOverlay';
import Panels from './components/Panels';
import Picker from './components/Picker';
import Popup from './components/Popup';
import ProgressBar from './components/ProgressBar';
import RadioItem from './components/RadioItem';
import RangePicker from './components/RangePicker';
import Region from './components/Region';
import Scroller from './components/Scroller';
import Slider from './components/Slider';
import Steps from './components/Steps';
import Switch from './components/Switch';
import SwitchItem from './components/SwitchItem';
import TabLayout from './components/TabLayout';
import TimePicker from './components/TimePicker';
import WizardPanel from './components/WizardPanel';

const components = {
	ActionGuide,
	BodyText,
	Button,
	Checkbox,
	CheckboxItem,
	ContextualMenuDecorator,
	ContextualPopupDecorator,
	DatePicker,
	Dropdown,
	FormCheckbox,
	FormCheckboxItem,
	GridListImageItem,
	Header,
	Heading,
	Icon,
	IconButton,
	Image,
	InputField,
	Item,
	LabeledIcon,
	LabeledIconButton,
	Marquee,
	MediaOverlay,
	Panels,
	Picker,
	Popup,
	ProgressBar,
	RadioItem,
	RangePicker,
	Region,
	Scroller,
	// Skinnable,
	Slider,
	// Spinner,
	Steps,
	Switch,
	SwitchItem,
	TabLayout,
	TimePicker,
	// TooltipDecorator,
	// VideoPlayer,
	// VirtualList,
	WizardPanel
};

const testMetadata = {};

Object.keys(components).forEach(component => {
	let metaData = generateTestData(component, components[component]);
	testMetadata[component] = metaData;
});

export default components;
export {components, testMetadata};
