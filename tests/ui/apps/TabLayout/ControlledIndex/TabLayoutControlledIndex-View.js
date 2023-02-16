import {useState, useCallback} from 'react';
import spotlight from '@enact/spotlight';

import Button from '../../../../../Button';
import Item from '../../../../../Item';
import TabLayout, {Tab} from '../../../../../TabLayout';
import ThemeDecorator from '../../../../../ThemeDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

// Note: The timeout for the delay is set high to avoid the refocus of the tab from initiating an
// index change
const App = (props) => {
	const [index, setIndex] = useState(1);
	const [orientation, setOrientation] = useState(true);
	const handleClick = useCallback(() => {
		setOrientation(!orientation);
	}, [orientation]);

	return <div {...props}>
		<Button id="orientationButton" onClick={() => handleClick()} selected={orientation}>{orientation ? 'Vertical' : 'Horizontal'}</Button>
		<TabLayout
			id="tabLayout"
			index={index}
			orientation={orientation ? 'vertical' : 'horizontal'}
			onSelect={ev => setIndex(ev.index)}
		>
			<Tab icon="home" title="Home">
				<div id="view1"><Button id="button1" onClick={() => setIndex(1)}>Change to 2nd tab</Button></div>
			</Tab>
			<Tab icon="gear" title="Button">
				<div id="view2">
					<Button id="button2" onClick={() => setIndex(2)}>Change to 3rd tab</Button>
					<Button id="button3" onClick={() => setTimeout(() => setIndex(2), 1000)}>Delayed changed 3rd tab</Button>
				</div>
			</Tab>
			<Tab icon="trash" title="Item">
				<div id="view3"><Item id="Item" onClick={() => setIndex(1)}>Change to 2nd tab</Item></div>
			</Tab>
		</TabLayout>
	</div>;
};

export default ThemeDecorator(App);
