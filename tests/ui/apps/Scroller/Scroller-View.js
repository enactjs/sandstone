import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {Row, Column, Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import React from 'react';

import {Button} from '../../../../Button';
import Dropdown from '../../../../Dropdown';
import Scroller from '../../../../Scroller';
import ThemeDecorator from '../../../../ThemeDecorator';

const ScrollerContainer = SpotlightContainerDecorator({leaveFor: {up: ''}}, 'div');
const OptionsContainer = SpotlightContainerDecorator({leaveFor: {down: '#left'}}, 'div');
const getScrollbarVisibility = (hidden) => hidden ? 'hidden' : 'auto';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const prop = {
	directionOption: {
		'both': 'both',
		'horizontal': 'horizontal',
		'vertical': 'vertical'
	},
	focusableScrollbarOption: {
		false: false,
		true: true,
		'byEnter': 'byEnter'
	}
};

class app extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			direction: 'both',
			focusableScrollbar: false,
			hideScrollbar: false
		};
		this.scrollingRef = React.createRef();
	}

	onScrollStart = () => {
		this.scrollingRef.current.innerHTML = 'Scrolling';
	}

	onScrollStop = () => {
		this.scrollingRef.current.innerHTML = 'Not Scrolling';
	}

	handleToggle = ({currentTarget}) => {
		const key = currentTarget.getAttribute('id');
		this.setState((state) => ({[key]: !state[key]}));
	}

	handleSelectFocusableScrollbar = (selectedOpt) => {
		this.setState({focusableScrollbar: prop.focusableScrollbarOption[selectedOpt.data]});
	};

	handleSelectDirection = (selectedOpt) => {
		this.setState({direction: prop.directionOption[selectedOpt.data]});
	};

	render () {
		const
			{hideScrollbar} = this.state,
			buttonDefaultProps = {minWidth: false, size: 'small'};
		return (
			<div {...this.props} id="scroller">
				<Column>
					<Cell component={OptionsContainer} shrink>
						<Button {...buttonDefaultProps} id="hideScrollbar" onClick={this.handleToggle} selected={hideScrollbar}>hide scrollbar</Button>
						<Dropdown
							onSelect={this.handleSelectFocusableScrollbar}
							title="FocusableScrollbar"
						>
							{Object.keys(prop.focusableScrollbarOption)}
						</Dropdown>
						<Dropdown
							onSelect={this.handleSelectDirection}
							title="Direction"
						>
							{Object.keys(prop.directionOption)}
						</Dropdown>
						<span id="scrolling" ref={this.scrollingRef}>Not Scrolling</span>
					</Cell>
					<Cell component={ScrollerContainer}>
						<Row align="center">
							<Cell component={Button} shrink id="left">
								Left
							</Cell>
							<Cell align="stretch">
								<Column align="center">
									<Cell>
										<Scroller
											direction={this.state.direction}
											focusableScrollbar={this.state.focusableScrollbar}
											horizontalscrollbar={getScrollbarVisibility(hideScrollbar)}
											onScrollStart={this.onScrollStart}
											onScrollStop={this.onScrollStop}
											style={{
												height: ri.scaleToRem(1920),
												width: ri.scaleToRem(2400)
											}}
											verticalScrollbar={getScrollbarVisibility(hideScrollbar)}
										>
											<div
												style={{
													height: ri.scaleToRem(2004),
													width: ri.scaleToRem(4002),
													marginTop: ri.scaleToRem(200)
												}}
											>
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
												Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt. Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.
												<div
													style={{
														marginTop: ri.scaleToRem(1602)
													}}
												>
													Mauris blandit sollicitudin mattis. Fusce commodo arcu vitae risus consectetur sollicitudin. Aliquam eget posuere orci. Cras pellentesque lobortis sapien non lacinia.
												</div>
											</div>
										</Scroller>
									</Cell>
								</Column>
							</Cell>
							<Cell component={Button} shrink id="right">
								Right
							</Cell>
						</Row>
					</Cell>
				</Column>
			</div>
		);
	}
}

export default ThemeDecorator(app);
