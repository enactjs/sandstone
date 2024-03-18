import {PageViews} from '@enact/sandstone/PageViews';
import Item from '@enact/sandstone/Item';
import {Cell, Row, Column} from '@enact/ui/Layout';

PageViews.displayName = 'PageViews';

export default {
	title: 'Sandstone/PageViews',
	component: 'PageViews'
};

export const _PageViews = () => (
	<PageViews>
		<PageViews.Page>
			<div style={{padding: '24px'}}>
				<Item>Item 1</Item>
				<Item>Item 2</Item>
			</div>
		</PageViews.Page>
		<PageViews.Page>
			<Column style={{padding: '24px'}}>
				<Row style={{padding: '12px'}}>
					<Cell>Country</Cell>
					<Cell>City</Cell>
					<Cell>Team</Cell>
					<Cell>Rank</Cell>
				</Row>
				<Row style={{padding: '12px'}}>
					<Cell>Korea</Cell>
					<Cell>Seoul</Cell>
					<Cell>Team A</Cell>
					<Cell>1</Cell>
				</Row>
				<Row style={{padding: '12px'}}>
					<Cell>USA</Cell>
					<Cell>NewYork</Cell>
					<Cell>Team B</Cell>
					<Cell>2</Cell>
				</Row>
				<Row style={{padding: '12px'}}>
					<Cell>France</Cell>
					<Cell>Paris</Cell>
					<Cell>Team C</Cell>
					<Cell>3</Cell>
				</Row>
			</Column>
		</PageViews.Page>
		<PageViews.Page>
			<div style={{padding: '24px'}}>
				This is page 3
			</div>
		</PageViews.Page>
		<PageViews.Page>
			This is page 4
		</PageViews.Page>
	</PageViews>
);

_PageViews.storyName = 'PageViews';
_PageViews.parameters = {
	info: {
		text: 'The basic PageViews'
	}
};
