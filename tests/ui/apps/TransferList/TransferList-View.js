import ThemeDecorator from '../../../../ThemeDecorator';
import TransferList from '../../../../TransferList';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => (
	<div {...props}>
		<TransferList
			firstList={['BBC World News', 'CNN International', 'CNBC', 'Fox News', 'MTV', 'Euro News', 'ESPN', 'Fox Sports']}
			firstListOperation={'move'}
			itemSize={201}
			orientation="horizontal"
			secondList={['HBO', 'Comedy Central', 'HGTV', 'CBS', 'Cartoon Network', 'AXN', 'Disney Channel', 'BBC Food']}
			secondListOperation={'move'}
		/>
	</div>
);

export default ThemeDecorator(app);
