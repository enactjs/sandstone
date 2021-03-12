import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import Spinner from '@enact/sandstone/Spinner';
import ri from '@enact/ui/resolution';
import {Component} from 'react';

Spinner.displayName = 'Spinner';

// Set up some defaults for info and knobs
const prop = {
	longText: 'SpinnerWithLongText SpinnerWithLongText SpinnerWithLongText'
};

class FocusOnSpinner extends Component {
	constructor (props) {
		super(props);

		this.state = {
			isLoading: false
		};
	}

	handleDeactivate = () => {
		this.setState({
			isLoading: true
		});
	};

	hideSpinner = () => {
		this.setState({
			isLoading: false
		});
	};

	render () {
		return (
			<div>
				<ol>
					<li>Focus and Click on the Input field.</li>
					<li>Click Enter key on the VKB.</li>
				</ol>
				<Input dismissOnEnter onDeactivate={this.handleDeactivate} />
				{this.state.isLoading ? <Spinner blockClickOn="screen" onClick={this.hideSpinner} /> : null}
			</div>
		);
	}
}

export default {
	title: 'Sandstone/Spinner',
	component: 'Spinner'
};

export const WithLongContent = () => (
	<div>
		<div
			style={{
				height: ri.scaleToRem(840),
				border: ri.scaleToRem(6) + ' dotted red'
			}}
		>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
				ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
				cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<Button onClick={action('Inside Button events')}>Button</Button>
			<Spinner
				transparent={boolean('transparent', Spinner, false)}
				centered={boolean('centered', Spinner, false)}
				blockClickOn={select('blockClickOn', [null, 'container', 'screen'], Spinner)}
				scrim={boolean('scrim', Spinner, true)}
			>
				{text('content', Spinner, prop.longText)}
			</Spinner>
		</div>
		<Button onClick={action('Outside Button events')}>Button</Button>
	</div>
);

WithLongContent.storyName = 'with long content';

export const BlockingClickEvents = () => (
	<div>
		<div
			style={{
				height: ri.scaleToRem(840),
				border: ri.scaleToRem(6) + ' dotted red'
			}}
		>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
				ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
				cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<Button onClick={action('Inside Button events')}>Button</Button>
			<Spinner
				transparent={boolean('transparent', Spinner, false)}
				centered={boolean('centered', Spinner, false)}
				blockClickOn={select('blockClickOn', [null, 'container', 'screen'], Spinner)}
				scrim={boolean('scrim', Spinner, true)}
			>
				{text('content', Spinner)}
			</Spinner>
		</div>
		<Button onClick={action('Outside Button events')}>Button</Button>
	</div>
);

BlockingClickEvents.storyName = 'blocking click events';

export const WithInput = () => <FocusOnSpinner />;

WithInput.storyName = 'with input';
