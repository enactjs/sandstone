import TabLayout, {Tab} from '@enact/sandstone/TabLayout';
import Button from '@enact/sandstone/Button';

const MainPanel = () => (
	<TabLayout>
		<Tab title="Settings" icon="gear">
			<Button>Edit</Button>
		</Tab>
		<Tab title="Sound" icon="sound">
			<Button>Edit</Button>
		</Tab>
	</TabLayout>
);

export default MainPanel;
