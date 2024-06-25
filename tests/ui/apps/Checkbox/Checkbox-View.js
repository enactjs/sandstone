import Checkbox from '../../../../Checkbox';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div style={{padding: '20px'}}>
		<Checkbox
			id="Checkbox1"
		/>
	</div>
	<div style={{padding: '20px'}}>
		<Checkbox
			id="Checkbox2"
			defaultSelected
		/>
	</div>
	<div style={{padding: '20px'}}>
		<Checkbox
			id="Checkbox3"
			indeterminate
		/>
	</div>
	<div style={{padding: '20px'}}>
		<Checkbox
			id="Checkbox4"
			disabled
		/>
	</div>
</div>;

export default ThemeDecorator(app);
