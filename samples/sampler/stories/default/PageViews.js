import {PageViews} from '@enact/sandstone/PageViews';
import Item from '@enact/sandstone/Item';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import {Cell, Row, Column} from '@enact/ui/Layout';

PageViews.displayName = 'PageViews';

const Config = mergeComponentMetadata('PageViews', PageViews);
const propOptions = {
	pageIndicatorType: ['dot', 'number']
};

export default {
	title: 'Sandstone/PageViews',
	component: 'PageViews'
};

export const _PageViews = (args) => (
	<PageViews fullContents={args['fullContents']} pageIndicatorType={args['pageIndicatorType']}>
		<PageViews.Page aria-label="This is a description for page 1">
			<div style={{padding: '24px', width: '50%'}}>
				<Item>Item 1</Item>
				<Item>Item 2</Item>
			</div>
		</PageViews.Page>
		<PageViews.Page aria-label="This is a description for page 2">
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
			<div style={{height: '100%', backgroundColor: 'grey'}}>
				This is page 4
			</div>
		</PageViews.Page>
	</PageViews>
);

boolean('fullContents', _PageViews, Config, false);
select('pageIndicatorType', _PageViews, propOptions.pageIndicatorType, Config, 'dot');

_PageViews.storyName = 'PageViews';
_PageViews.parameters = {
	info: {
		text: 'The basic PageViews'
	}
};
