import TabLayout, {Tab} from '@enact/sandstone/TabLayout';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';

const handleKeyUpTabLayout = (ev) => {
	ev.preventDefault();
};

const MainPanel = () => (
	<TabLayout onKeyUp={handleKeyUpTabLayout}>
		<Tab title="Settings" icon="gear">
			<Button>Edit</Button>
			<Item>Item</Item>
			<Item>Item</Item>
			<Item>Item</Item>
			<Item>Item</Item>
			<Item>Item</Item>
			<Item>Item</Item>
		</Tab>
		<Tab title="Sound" icon="sound">
			<Button>Edit</Button>
			<Item>Item</Item>
			<Item>Item</Item>
			<Item>Item</Item>
			<Item>Item</Item>
			<Item>Item</Item>
		</Tab>
	</TabLayout>
);

export default MainPanel;
