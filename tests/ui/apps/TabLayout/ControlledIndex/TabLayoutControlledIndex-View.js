import React from 'react';
import spotlight from '@enact/spotlight';

import Button from '../../../../../Button';
import TabLayout, {Tab} from '../../../../../TabLayout';
import ThemeDecorator from '../../../../../ThemeDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

// Note: The timeout for the delay is set high to avoid the refocus of the tab from initiating an
// index change
const App = (props) => {
	const [index, setIndex] = React.useState(1);

	return <div {...props}>
		<TabLayout
			id="tabLayout"
			index={index}
			onSelect={ev => setIndex(ev.index)}
		>
			<Tab title="One" icon="star">
				<div id="view1">View One</div>
			</Tab>
			<Tab title="Two" icon="home">
				<div id="view2"><Button id="button2" onClick={() => setIndex(2)}>Immediate Switch</Button></div>
			</Tab>
			<Tab title="Three" icon="plug">
				<div id="view3"><Button id="button3" onClick={() => setTimeout(() => setIndex(1), 1000)}>Delayed Switch</Button></div>
			</Tab>
		</TabLayout>
	</div>;
};

export default ThemeDecorator(App);
