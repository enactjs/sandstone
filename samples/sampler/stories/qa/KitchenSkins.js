import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import ContextualMenuDecorator from '@enact/sandstone/ContextualMenuDecorator';
import Dropdown from '@enact/sandstone/Dropdown';
import FormCheckboxItem from '@enact/sandstone/FormCheckboxItem';
import ImageItem from '@enact/sandstone/ImageItem';
import {InputField} from '@enact/sandstone/Input';
import Item from '@enact/sandstone/Item';
import ProgressBar from '@enact/sandstone/ProgressBar';
import Scroller from '@enact/sandstone/Scroller';
import TooltipDecorator from '@enact/sandstone/TooltipDecorator';
import {Row} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';

import Section from './components/KitchenSinkSection';

const ContextualMenuButton = ContextualMenuDecorator(Button);
const TooltipButton = TooltipDecorator({tooltipDestinationProp: 'decoration'}, Button);

export default {
	title: 'Sandstone/Kitchen Sink For Skin',
	component: 'Kitchen Sink'
};

export const KitchenSink = () => (
	<Scroller>
		<Row wrap>
			<Section title="Buttons" size="50%">
				<Button alt="Normal" icon="home">
					Button
				</Button>
				<Button alt="Selected" icon="home" selected>
					Button
				</Button>
				<Button alt="Disabled" icon="home" disabled>
					Button
				</Button>
			</Section>

			<Section title="Transparent Buttons" size="50%">
				<Button alt="Normal" backgroundOpacity="transparent" icon="home">
					Button
				</Button>
				<Button alt="Selected" backgroundOpacity="transparent" icon="home" selected>
					Button
				</Button>
				<Button alt="Disabled" backgroundOpacity="transparent" icon="home" disabled>
					Button
				</Button>
			</Section>

			<Section title="CheckboxItem" size="50%">
				<CheckboxItem alt="Normal" label="label">CheckboxItem</CheckboxItem>
				<CheckboxItem alt="Selected" label="label" selected>CheckboxItem</CheckboxItem>
				<CheckboxItem alt="Disabled" disabled label="label">CheckboxItem Disabled</CheckboxItem>
				<CheckboxItem alt="Disabled Selected" disabled label="label" selected>CheckboxItem Disabled</CheckboxItem>
			</Section>


			<Section title="FormCheckboxItem" size="50%">
				<FormCheckboxItem alt="Normal" >FormCheckboxItem</FormCheckboxItem>
				<FormCheckboxItem alt="Selected" selected>FormCheckboxItem</FormCheckboxItem>
				<FormCheckboxItem alt="Disabled" disabled>FormCheckboxItem</FormCheckboxItem>
				<FormCheckboxItem alt="Disabled Selected" disabled selected>FormCheckboxItem</FormCheckboxItem>
			</Section>

			<Section title="Dropdown" size="50%">
				<Dropdown title="dropdown" defaultSelected={1}>
					{['test1', 'test2', 'test3']}
				</Dropdown>
			</Section>

			<Section title="Popup" size="50%">
				<ContextualMenuButton menuItems={['Option1', 'Option2']}>Contextual Menu</ContextualMenuButton>
			</Section>

			<Section title="Items" size="50%">
				<Item alt="Normal">Item</Item>
				<Item alt="Disabled" disabled>Item</Item>
			</Section>

			<Section title="ImageItem" size="50%">
				<ImageItem
					label="ImageItem label"
					selected
					showSelection
					style={{
						width: ri.scale(768),
						height: ri.scale(588)
					}}
					src='http://via.placeholder.com/200x200/7ed31d/ffffff'
				>
					ImageItem Caption
				</ImageItem>
			</Section>

			<Section title="InputField" size="50%">
				<InputField />
			</Section>

			<Section title="InputField" size="50%">
				<TooltipButton tooltipText="Tooltip!">
					Tooltip Button
				</TooltipButton>
			</Section>

			<Section title="ProgressBar" size="100%">
				<ProgressBar
					backgroundProgress={0.5}
					highlighted
					progress={0.4}
					// disabled
				/>
			</Section>
		</Row>
	</Scroller>
);
