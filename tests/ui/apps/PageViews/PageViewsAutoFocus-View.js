import Item from '../../../../Item';
import {PageViews} from '../../../../PageViews';
import Panels, {Panel, Header} from '../../../../Panels';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const PageViewsWithAutoFocus = props => (
	<Panels {...props}>
		<Panel autoFocus="none">
			<Header title="PageViews with autoFocus" />
			<PageViews autoFocus="none" pageIndicatorType="dot">
				<PageViews.Page id="PageViewsPage1" aria-label="This is a description for page 1">
					<div style={{padding: '24px', width: '50%'}}>
						<Item id="PageViewsItem1">Item 1</Item>
						<Item>Item 2</Item>
					</div>
				</PageViews.Page>
				<PageViews.Page id="PageViewsPage2" aria-label="This is a description for page 2">
					<div style={{padding: '24px', width: '50%'}}>
						<Item id="PageViewsItem3">Item 3</Item>
						<Item>Item 4</Item>
					</div>
				</PageViews.Page>
			</PageViews>
		</Panel>
	</Panels>
);

export default ThemeDecorator({noAutoFocus: true}, PageViewsWithAutoFocus);

