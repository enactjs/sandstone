import Item from '@enact/sandstone/Item';
import {Panel, Header} from '@enact/sandstone/Panels';
import PageViews, {Page} from '@enact/sandstone/PageViews';

const PageViewsView = () => (
	<Panel>
		<Header title="A title for panel" subtitle="A subtitle for panel" />
		<PageViews>
			<Page aria-label={'This is a description for page 1'} >
				Page 1 with contents description (`This is a description for page 1`)
				<Item>Item 1</Item>
				<Item>Item 2</Item>
			</Page>
			<Page aria-label={'This is a description for page 2'}>
				Page 2 with contents description (`This is a description for page 2`)
			</Page>
			<Page>
				Page 3 without contents description
			</Page>
			<Page>
				Page 4 without contents description
				<Item>Item 3</Item>
				<Item>Item 4</Item>
			</Page>
		</PageViews>
	</Panel>
);

export default PageViewsView;
