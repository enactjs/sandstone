import spotlight from '@enact/spotlight';
import ri from '@enact/ui/resolution';

import Button from '../../../../../Button';
import Item from '../../../../../Item';
import Scroller from '../../../../../Scroller';
import ThemeDecorator from '../../../../../ThemeDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

function App (props) {
	return (
		<div {...props} style={{display: 'flex'}}>
			<Button id="focusButton">focus to me</Button>
			<Scroller
				focusableScrollbar={false}
				key="native"
				scrollMode="native"
				style={{height: ri.scaleToRem(840), width: ri.scaleToRem(600), display: 'inline-block'}}
			>
				<Item>Item 1</Item>
				<Item>Item 2</Item>
				<Item>Item 3</Item>
				<Item>Item 4</Item>
				<Item>Item 5</Item>
				<Item>Item 6</Item>
				<Item>Item 7</Item>
				<Item>Item 8</Item>
				<Item>Item 9</Item>
				<div>Test Test Test Test Test Test</div>
			</Scroller>
		</div>
	);
}

export default ThemeDecorator(App);
