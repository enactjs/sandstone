import Button from '../../../../Button';
import Popup from '../../../../Popup';
import ThemeDecorator from '../../../../ThemeDecorator';
import React, {Component} from 'react';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Toggleable from '@enact/ui/Toggleable';

const Container = SpotlightContainerDecorator('div');
const AnnotatedPopup = Toggleable({toggle: null, activate: 'onShow', deactivate: 'onHide'}, ({selected, ...rest}) => {
	return (
		<Popup {...rest} data-popup-open={selected || null} />
	);
});

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

	togglePopup = () => {
		this.setState({
			open10: true
		});


		setTimeout(() => {
			this.setState({
				open10: false
			});
		}, 200);
	};

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
					<Button id="buttonPopup10" onClick={this.togglePopup}>Toggle Open</Button>
				</div>
				<AnnotatedPopup
					id="popup1"
					open={this.state.open1}
					noAnimation={false}
					noAutoDismiss={false}
					spotlightRestrict="self-only"
					onClose={() => this.clickHandler({open1: false})}
				>
					<div>Popup with AutoDismiss</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open1: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open1: false})}>Cancel</Button>
					</Container>
				</AnnotatedPopup>
				<AnnotatedPopup
					id="popup2"
					open={this.state.open2}
					noAnimation={false}
					noAutoDismiss
					spotlightRestrict="self-only"
					onClose={() => this.clickHandler({open2: false})}
				>
					<div>Popup without AutoDismiss</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open2: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open2: false})}>Cancel</Button>
					</Container>
				</AnnotatedPopup>
				<AnnotatedPopup
					id="popup3"
					open={this.state.open3}
					noAnimation={false}
					noAutoDismiss={false}
					spotlightRestrict="self-only"
					onClose={() => this.clickHandler({open3: false})}
				>
					<div>Popup with no Component</div>
				</AnnotatedPopup>
				<AnnotatedPopup
					id="popup4"
					open={this.state.open4}
					noAnimation
					noAutoDismiss={false}
					spotlightRestrict="self-only"
					onClose={() => this.clickHandler({open4: false})}
				>
					<div>Popup without Animation</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open4: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open4: false})}>Cancel</Button>
					</Container>
				</AnnotatedPopup>
				<AnnotatedPopup
					id="popup5"
					open={this.state.open5}
					noAnimation={false}
					noAutoDismiss={false}
					spotlightRestrict="self-only"
					onClose={() => this.clickHandler({open5: false})}
				>
					<div>Popup without Close button</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open5: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open5: false})}>Cancel</Button>
					</Container>
				</AnnotatedPopup>
				<AnnotatedPopup
					id="popup6"
					open={this.state.open6}
					noAnimation={false}
					noAutoDismiss={false}
					spotlightRestrict="self-only"
					onClose={() => this.clickHandler({open6: false})}
				>
					<div>Popup spotlightRestrict is self-only</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open6: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open6: false})}>Cancel</Button>
					</Container>
				</AnnotatedPopup>
				<AnnotatedPopup
					id="popup7"
					open={this.state.open7}
					noAnimation={false}
					noAutoDismiss={false}
					spotlightRestrict="self-first"
					onClose={() => this.clickHandler({open7: false})}
				>
					<div>Popup spotlightRestrict is self-first</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open7: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open7: false})}>Cancel</Button>
					</Container>
				</AnnotatedPopup>
				<AnnotatedPopup
					id="popup8"
					open={this.state.open8}
					noAnimation={false}
					noAutoDismiss={false}
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
				</AnnotatedPopup>
				<AnnotatedPopup
					id="popup9"
					open={this.state.open9}
					noAnimation={false}
					noAutoDismiss={false}
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
				</AnnotatedPopup>
				<AnnotatedPopup
					id="popup10"
					open={this.state.open10}
				>
					<Button>close</Button>
				</AnnotatedPopup>
			</div>
		);
	}
}
export default ThemeDecorator(app);
