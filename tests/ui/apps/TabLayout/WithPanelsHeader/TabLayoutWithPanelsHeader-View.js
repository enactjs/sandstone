import Item from '../../../../../Item/Item';
import {Panels, Panel, Header} from '../../../../../Panels';
import TabLayout from '../../../../../TabLayout/TabLayout';
import ThemeDecorator from '../../../../../ThemeDecorator/ThemeDecorator';

const App = (props) => {
	return <div {...props}>
		<Panels index={1}>
			<Panel />
			<Panel>
				<Header title="title" />
				<TabLayout
					id="tabLayout"
					orientation="vertical"
				>
					<TabLayout.Tab title="Tab1" icon="home">
						<Item id="item1">Item 1</Item>
						<Item id="item2">Item 2</Item>
					</TabLayout.Tab>
					<TabLayout.Tab title="Tab2" icon="gear">
						<Item>Item</Item>
						<Item>Item</Item>
					</TabLayout.Tab>
				</TabLayout>
			</Panel>
		</Panels>
	</div>;
};

export default ThemeDecorator(App);
