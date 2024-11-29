import {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {Component} from 'react';

import Button from '../../../../../Button';
import Header from '../../../../../Panels/Header';
import Scroller from '../../../../../Scroller';
import ThemeDecorator from '../../../../../ThemeDecorator';

const OptionsContainer = SpotlightContainerDecorator({leaveFor: {down: '#left'}}, 'div');

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

class app extends Component {
	constructor (props) {
		super(props);
		this.state = {
			nativeScroll: true
		};
	}

	onToggle = ({currentTarget}) => {
		const key = currentTarget.getAttribute('id');
		this.setState((state) => ({[key]: !state[key]}));
	};

	render () {
		const {nativeScroll} = this.state;
		const scrollMode = nativeScroll ? 'NativeScroll' : 'TranslateScroll';
		return (
			<div {...this.props} id="scroller">
				<Cell component={OptionsContainer} shrink>
					<Button id="nativeScroll" minWidth="false" onClick={this.onToggle} size="small">{scrollMode}</Button>
				</Cell>
				<Header title="Header" />
				<Scroller
					direction="horizontal"
					horizontalScrollbar="auto"
					key={nativeScroll ? 'native' : 'translate'}
				>
					<div
						style={{
							height: ri.scaleToRem(720, 'rem'),
							width: ri.scaleToRem(14400, 'rem'),
							padding: '1px'
						}}
					>
						{[...Array(20)].map((x, i) => (
							<Button id={`item${i}`} key={i + 1}>Button {i + 1}</Button>
						))}
					</div>
				</Scroller>
			</div>
		);
	}
}

export default ThemeDecorator(app);
