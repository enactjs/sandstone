import Button from '../../../../Button';
import Popup from '../../../../Popup';
import ThemeDecorator from '../../../../ThemeDecorator';
import React, {Component} from 'react';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';

const Container = SpotlightContainerDecorator('div');

const style = {
	main: {
		display: 'grid',
		'gridTemplateColumns': 'repeat(3, 1fr)',
		'gridGap': '6px'
	}
};

spotlight.setPointerMode(false);

class app extends Component {

	state = {
		open1: false,
		open2: false,
		open3: false,
		open4: false,
		open5: false,
		open6: false,
		open7: false,
		open8: false,
		open9: false
	};

	clickHandler = (st) =>  this.setState(st);

	render () {
		return (
			<div id="popupMain" {...this.props}>
				<p>
					UI testing for Popup Component 1. AutoDismiss 2. noAutoDismiss 3. no Components 4. noAnimation
					5. without Close Button 6. spotlightRestrict self-only 7. spotlightRestrict self-first 8. scrimType transparent 9. scrimType none
				</p>
				<div style={style.main}>
					<Button id="buttonPopup1" onClick={() => this.clickHandler({open1: true})}>AutoDismiss</Button>
					<Button id="buttonPopup2" onClick={() => this.clickHandler({open2: true})}>noAutoDismiss</Button>
					<Button id="buttonPopup3" onClick={() => this.clickHandler({open3: true})}>no Component</Button>
					<Button id="buttonPopup4" onClick={() => this.clickHandler({open4: true})}>noAnimation</Button>
					<Button id="buttonPopup5" onClick={() => this.clickHandler({open5: true})}>noCloseButton</Button>
					<Button id="buttonPopup6" onClick={() => this.clickHandler({open6: true})}>spotlightRestrict self-only</Button>
					<Button id="buttonPopup7" onClick={() => this.clickHandler({open7: true})}>spotlightRestrict self-first</Button>
					<Button id="buttonPopup8" onClick={() => this.clickHandler({open8: true})}>scrimType transparent</Button>
					<Button id="buttonPopup9" onClick={() => this.clickHandler({open9: true})}>scrimType none</Button>
				</div>
				<Popup
					id="popup1"
					open={this.state.open1}
					noAnimation={false}
					noAutoDismiss={false}
					showCloseButton
					spotlightRestrict="self-only"
					onClose={() => this.clickHandler({open1: false})}
				>
					<div>Popup with AutoDismiss</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open1: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open1: false})}>Cancel</Button>
					</Container>
				</Popup>
				<Popup
					id="popup2"
					open={this.state.open2}
					noAnimation={false}
					noAutoDismiss
					showCloseButton
					spotlightRestrict="self-only"
					onClose={() => this.clickHandler({open2: false})}
				>
					<div>Popup without AutoDismiss</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open2: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open2: false})}>Cancel</Button>
					</Container>
				</Popup>
				<Popup
					id="popup3"
					open={this.state.open3}
					noAnimation={false}
					noAutoDismiss={false}
					showCloseButton={false}
					spotlightRestrict="self-only"
					onClose={() => this.clickHandler({open3: false})}
				>
					<div>Popup with no Component</div>
				</Popup>
				<Popup
					id="popup4"
					open={this.state.open4}
					noAnimation
					noAutoDismiss={false}
					showCloseButton
					spotlightRestrict="self-only"
					onClose={() => this.clickHandler({open4: false})}
				>
					<div>Popup without Animation</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open4: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open4: false})}>Cancel</Button>
					</Container>
				</Popup>
				<Popup
					id="popup5"
					open={this.state.open5}
					noAnimation={false}
					noAutoDismiss={false}
					showCloseButton={false}
					spotlightRestrict="self-only"
					onClose={() => this.clickHandler({open5: false})}
				>
					<div>Popup without Close button</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open5: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open5: false})}>Cancel</Button>
					</Container>
				</Popup>
				<Popup
					id="popup6"
					open={this.state.open6}
					noAnimation={false}
					noAutoDismiss={false}
					showCloseButton
					spotlightRestrict="self-only"
					onClose={() => this.clickHandler({open6: false})}
				>
					<div>Popup spotlightRestrict is self-only</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open6: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open6: false})}>Cancel</Button>
					</Container>
				</Popup>
				<Popup
					id="popup7"
					open={this.state.open7}
					noAnimation={false}
					noAutoDismiss={false}
					showCloseButton
					spotlightRestrict="self-first"
					onClose={() => this.clickHandler({open7: false})}
				>
					<div>Popup spotlightRestrict is self-first</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open7: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open7: false})}>Cancel</Button>
					</Container>
				</Popup>
				<Popup
					id="popup8"
					open={this.state.open8}
					noAnimation={false}
					noAutoDismiss={false}
					showCloseButton
					spotlightRestrict="self-first"
					scrimType="transparent"
					onClose={() => this.clickHandler({open8: false})}
				>
					<div>Popup scrimType is transparent</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open8: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open8: false})}>Cancel</Button>
					</Container>
				</Popup>
				<Popup
					id="popup9"
					open={this.state.open9}
					noAnimation={false}
					noAutoDismiss={false}
					showCloseButton
					spotlightRestrict="self-first"
					scrimType="none"
					onClose={() => this.clickHandler({open9: false})}
				>
					<div>Popup scrimType is none</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open9: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open9: false})}>Cancel</Button>
					</Container>
				</Popup>
			</div>
		);
	}
}
export default ThemeDecorator(app);
