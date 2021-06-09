import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {Component} from 'react';

import Alert from '../../../../Alert';
import Button from '../../../../Button';
import ThemeDecorator from '../../../../ThemeDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const Container = SpotlightContainerDecorator('div');

class app extends Component {

	state = {
		openFullscreen: false,
		openOverlay: false
	};

	clickHandler = (st) => this.setState(st);

	render () {
		return (
			<div id="alertMain" {...this.props}>
				<div className="outsideOverlay">
					UI testing for Alert Fullscreen and Alert Overlay
				</div>
				<div>
					<Button id="openFullscreen" onClick={() => this.clickHandler({openFullscreen: true})}>Open Fullscreen Alert</Button>
					<Button id="openOverlay" onClick={() => this.clickHandler({openOverlay: true})}>Open Overlay Alert</Button>
				</div>
				<Alert
					id="alertFullscreen"
					open={this.state.openFullscreen}
					type="fullscreen"
					onClose={() => this.clickHandler({openFullscreen: false})}
				>
					<div>Fullscreen Alert</div>
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({openFullscreen: false})}>Ok</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({openFullscreen: false})}>Cancel</Button>
					</Container>
				</Alert>
				<Alert
					id="alertOverlay"
					open={this.state.openOverlay}
					type="overlay"
					onClose={() => this.clickHandler({openOverlay: false})}
				>
					<div>Overlay Alert</div>
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({openOverlay: false})}>Ok</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({openOverlay: false})}>Cancel</Button>
					</Container>
				</Alert>
			</div>
		);
	}
}

export default ThemeDecorator(app);
