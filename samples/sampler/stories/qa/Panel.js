import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import {useState, useCallback} from 'react';
import Spotlight from '@enact/spotlight';
import {action} from '@enact/storybook-utils/addons/actions';
import compose from 'ramda/src/compose';
import {Header, Panels, Panel} from '@enact/sandstone/Panels';

export const WithAutoFocusControl = () => {
	// hooks
	const initialState = 0;
	const [panelIndex, setState] = useState(initialState);

	const forward = () => setState(panelIndex + 1);
	const backward = () => setState(panelIndex - 1);

	const handleTransition = useCallback(() => {
		setTimeout(() => {
			console.log(`spotlight focus with ${panelIndex}`);
			Spotlight.focus(`panel-container-${panelIndex}`);
		}, 1000);
	}, [panelIndex]);

	const handleBack = compose(backward, action('onBack'));

	const story = (
		<Panels
			index={panelIndex}
			onBack={handleBack}
			onClose={action('onClose')}
			onTransition={handleTransition}
			onWillTransition={action('onWillTransition')}
		>
			<Panel autoFocus="none" spotlightId="panel-container-0">
				<Header title="Panel 0">
					<Button
						icon="arrowlargeright"
						iconFlip="auto"
						size="small"
						slot="slotAfter"
						onClick={forward} // eslint-disable-line react/jsx-no-bind
					/>
				</Header>
				<Item onClick={forward}>Item 0</Item>
			</Panel>
			<Panel autoFocus="none" spotlightId="panel-container-1">
				<Header title="Panel 1">
					<Button
						icon="arrowlargeright"
						iconFlip="auto"
						size="small"
						slot="slotAfter"
						onClick={forward} // eslint-disable-line react/jsx-no-bind
					/>
				</Header>
				<Item onClick={forward}>Item 1</Item>
			</Panel>
			<Panel autoFocus="none" spotlightId="panel-container-2">
				<Header title="Panel 2" >
					<Button
						icon="arrowlargeright"
						iconFlip="auto"
						size="small"
						slot="slotAfter"
						onClick={forward} // eslint-disable-line react/jsx-no-bind
					/>
				</Header>
				<Item>Item 2</Item>
			</Panel>
		</Panels>
	);
	return story;
};

export default {
	title: 'Sandstone/Panel',
	component: 'Panel'
};

WithAutoFocusControl.storyName = 'with AutoFocus Control';
