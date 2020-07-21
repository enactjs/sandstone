import {generateTestData} from '@enact/ui-test-utils/utils';


import ActionGuide from './components/ActionGuide';
import Alert from './components/Alert';
import Button from './components/Button';
import BodyText from './components/BodyText';
import Checkbox from './components/Checkbox';
import CheckboxItem from './components/CheckboxItem';
import ContextualMenuDecorator from './components/ContextualMenuDecorator';
import ContextualPopupDecorator from './components/ContextualPopupDecorator';
import DatePicker from './components/DatePicker';
import Dropdown from './components/Dropdown';
import FixedPopupPanels from './components/FixedPopupPanels';
import FlexiblePopupPanels from './components/FlexiblePopupPanels';
import FormCheckboxItem from './components/FormCheckboxItem';
import Header from './components/Header';
import Heading from './components/Heading';
import Icon from './components/Icon';
import Image from './components/Image';
import ImageItem from './components/ImageItem';
import Input from './components/Input';
import InputField from './components/InputField';
import Item from './components/Item';
import KeyGuide from './components/KeyGuide';
import Marquee from './components/Marquee';
import MediaOverlay from './components/MediaOverlay';
import Panel from './components/Panel';
import Panels from './components/Panels';
import Picker from './components/Picker';
import Popup from './components/Popup';
import PopupTabLayout from './components/PopupTabLayout';
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
import Tooltip from './components/Tooltip';
import WizardPanels from './components/WizardPanels';

const components = {
	ActionGuide,
	Alert,
	BodyText,
	Button,
	Checkbox,
	CheckboxItem,
	ContextualMenuDecorator,
	ContextualPopupDecorator,
	DatePicker,
	Dropdown,
	FixedPopupPanels,
	FlexiblePopupPanels,
	FormCheckboxItem,
	Header,
	Heading,
	Icon,
	Image,
	ImageItem,
	Input,
	InputField,
	Item,
	KeyGuide,
	Marquee,
	MediaOverlay,
	Panel,
	Panels,
	Picker,
	Popup,
	PopupTabLayout,
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
	Tooltip,
	// TooltipDecorator,
	// VideoPlayer,
	// VirtualList,
	WizardPanels
};

const testMetadata = {};

Object.keys(components).forEach(component => {
	let metaData = generateTestData(component, components[component]);
	testMetadata[component] = metaData;
});

export default components;
export {components, testMetadata};
