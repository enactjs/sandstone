import {BasicArranger} from '@enact/sandstone/internal/Panels';
import {PageViews} from '@enact/sandstone/PageViews';
import Item from '@enact/sandstone/Item';
import {select} from '@enact/storybook-utils/addons/controls';
import {Cell, Row, Column} from '@enact/ui/Layout';

PageViews.displayName = 'PageViews';

const propOptions = {
	pageIndicatorType: ['dot', 'number']
};

export default {
	title: 'Sandstone/PageViews',
	component: 'PageViews'
};

export const _PageViews = (args) => (
	<PageViews arranger={BasicArranger} pageIndicatorType={args['pageIndicatorType']}>
		<PageViews.Page aria-label="This is description for page 1">
			<div style={{padding: '24px'}}>
				<Item>Item 1</Item>
				<Item>Item 2</Item>
			</div>
		</PageViews.Page>
		<PageViews.Page aria-label="This is description for page 2">
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

select('pageIndicatorType', _PageViews, propOptions.pageIndicatorType, 'dot');

_PageViews.storyName = 'PageViews';
_PageViews.parameters = {
	info: {
		text: 'The basic PageViews'
	}
};
