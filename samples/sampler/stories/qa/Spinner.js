import Button from '@enact/sandstone/Button';
import {InputField} from '@enact/sandstone/Input';
import Spinner from '@enact/sandstone/Spinner';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {Primary, Stories, Title} from '@enact/storybook-utils/addons/docs';
import ri from '@enact/ui/resolution';
import {Component} from 'react';

Spinner.displayName = 'Spinner';

// Set up some defaults for info and controls
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
				<InputField dismissOnEnter onDeactivate={this.handleDeactivate} />
				{this.state.isLoading ? <Spinner blockClickOn="screen" onClick={this.hideSpinner} /> : null}
			</div>
		);
	}
}

export default {
	title: 'Sandstone/Spinner',
	component: 'Spinner',
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Primary />
					<Stories />
				</>
			)
		}
	}
};

export const WithLongContent = (args) => (
	<div>
		<div
			style={{
				height: 'fit-content',
				border: ri.scaleToRem(6) + ' dotted red'
			}}
		>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
				ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat.
			</p>
			<Button onClick={action('Inside Button events')}>Button</Button>
			<Spinner
				transparent={args['transparent']}
				centered={args['centered']}
				blockClickOn={args['blockClickOn']}
				scrim={args['scrim']}
			>
				{args['content']}
			</Spinner>
		</div>
		<Button onClick={action('Outside Button events')}>Button</Button>
	</div>
);

boolean('transparent', WithLongContent, Spinner, false);
boolean('centered', WithLongContent, Spinner, false);
select('blockClickOn', WithLongContent, [null, 'container', 'screen'], Spinner);
boolean('scrim', WithLongContent, Spinner, true);
text('content', WithLongContent, Spinner, prop.longText);

WithLongContent.storyName = 'with long content';

export const BlockingClickEvents = (args) => (
	<div>
		<div
			style={{
				height: 'fit-content',
				border: ri.scaleToRem(6) + ' dotted red'
			}}
		>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
				ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat.
			</p>
			<Button onClick={action('Inside Button events')}>Button</Button>
			<Spinner
				transparent={args['transparent']}
				centered={args['centered']}
				blockClickOn={args['blockClickOn']}
				scrim={args['scrim']}
			>
				{args['content']}
			</Spinner>
		</div>
		<Button onClick={action('Outside Button events')}>Button</Button>
	</div>
);

boolean('transparent', BlockingClickEvents, Spinner, false);
boolean('centered', BlockingClickEvents, Spinner, false);
select('blockClickOn', BlockingClickEvents, [null, 'container', 'screen'], Spinner);
boolean('scrim', BlockingClickEvents, Spinner, true);
text('content', BlockingClickEvents, Spinner);

BlockingClickEvents.storyName = 'blocking click events';

export const WithInput = () => <FocusOnSpinner />;

WithInput.storyName = 'with input';
WithInput.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};
