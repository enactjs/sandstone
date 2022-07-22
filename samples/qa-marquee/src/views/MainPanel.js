import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import FormCheckboxItem from '@enact/sandstone/FormCheckboxItem';
import {Header, Panel} from '@enact/sandstone/Panels';
import RadioItem from '@enact/sandstone/RadioItem';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Panel" />
			<div>
				<Button>This is looooooooooooong text</Button>
				<RadioItem style={{width: '300px'}}>This is looooooooooooong text</RadioItem>
				<FormCheckboxItem style={{width: '300px'}}>This is looooooooooooong text</FormCheckboxItem>
			</div>
		</Panel>
	)
});

export default MainPanel;
