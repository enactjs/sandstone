import Checkbox from '../../../../Checkbox';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div style={{padding: '20px'}}>
		<Checkbox
			id="normalCheckbox"
		/>
	</div>
	<div style={{padding: '20px'}}>
		<Checkbox
			id="selectedCheckbox"
			defaultSelected
		/>
	</div>
	<div style={{padding: '20px'}}>
		<Checkbox
			id="indeterminateCheckbox"
			indeterminate
		/>
	</div>
	<div style={{padding: '20px'}}>
		<Checkbox
			id="disabledCheckbox"
			disabled
		/>
	</div>
</div>;

export default ThemeDecorator(app);
