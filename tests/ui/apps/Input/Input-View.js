import spotlight from '@enact/spotlight';

import {Input} from '../../../../Input';
import ThemeDecorator from '../../../../ThemeDecorator';

import {Component} from 'react';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

class app extends Component {

	render () {
		return (
			<div id="inputMain" {...this.props} style={{display:'flex', flexDirection:'column'}}>
				<div>
					UI tests for Text Input 1. Password Input 2. Number Input 3. Password Number Input 4. URL Input 5.
					Invalid Input 6. NoBackButton Input 7. Size Large Input 8. Disabled Input 9. Overlay Input 10.
				</div>
				<div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
					<div style={{padding:'20px', textAlign:'center'}}>
						<div>Text Input</div>
						<Input
							className="input1"
							title="Text Input"
							placeholder="placeholder"
							type="text"
						/>
					</div>
					<div style={{padding:'20px', textAlign:'center'}}>
						<div >Password Input</div>
						<Input
							className="input2"
							title="Password Input"
							placeholder="placeholder"
							type="password"
						/>
					</div>
					<div style={{padding:'20px', textAlign:'center'}}>
						<div>Number Input</div>
						<Input
							className="input3"
							title="Number Input"
							placeholder="placeholder"
							type="number"
						/>
					</div>
					<div style={{padding:'20px', textAlign:'center'}}>
						<div>Password Number Input</div>
						<Input
							className="input4"
							title="Password Number Input"
							placeholder="placeholder"
							type="passwordnumber"
						/>
					</div>
					<div style={{padding:'20px', textAlign:'center'}}>
						<div>URL Input</div>
						<Input
							className="input5"
							title="URL Input"
							placeholder="placeholder"
							type="url"
						/>
					</div>
					<div style={{padding:'20px', textAlign:'center'}}>
						<div>Invalid Input</div>
						<Input
							className="input6"
							title="Invalid Input"
							placeholder="placeholder"
							invalid
							invalidMessage="Test Invalid"
						/>
					</div>
					<div style={{padding:'20px', textAlign:'center'}}>
						<div>NoBackButton Input</div>
						<Input
							className="input7"
							title="NoBackButton Input"
							placeholder="placeholder"
							noBackButton
						/>
					</div>
					<div style={{padding:'20px', textAlign:'center'}}>
						<div>Size Large Input</div>
						<Input
							className="input8"
							title="Size Large Input"
							placeholder="placeholder"
							size="large"
						/>
					</div>
					<div style={{padding:'20px', textAlign:'center'}}>
						<div>Disabled Input</div>
						<Input
							className="input9"
							title="Disabled Input"
							placeholder="placeholder"
							disabled
						/>
					</div>
					<div style={{padding:'20px', textAlign:'center'}}>
						<div>Overlay Input</div>
						<Input
							className="input10"
							title="Overlay Input"
							placeholder="placeholder"
							popupType="overlay"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ThemeDecorator(app);
