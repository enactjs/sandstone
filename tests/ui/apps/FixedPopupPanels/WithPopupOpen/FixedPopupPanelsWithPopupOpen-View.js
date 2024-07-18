import {useState} from 'react';

import BodyText from '../../../../../BodyText';
import Button from '../../../../../Button';
import {FixedPopupPanels, Panel, Header} from '../../../../../FixedPopupPanels';
import ThemeDecorator from '../../../../../ThemeDecorator';

function App (props) {
	const [open, setOpen] = useState(true);

	return (
		<div {...props}>
			<Button id="openButton" onClick={() => setOpen(true)}>Open FixedPopupPanels</Button>
			<FixedPopupPanels open={open}>
				<Panel id="panel1">
					<Header>
						<title>
							FixedPopupPanels Title
						</title>
					</Header>
					<BodyText>Example text inside an FixedPopupPanels Panel</BodyText>
					<Button id="closeButton" onClick={() => setOpen(false)}>Close FixedPopupPanels</Button>
				</Panel>
			</FixedPopupPanels>
		</div>
	);
}

export default ThemeDecorator(App);
