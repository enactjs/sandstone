import {Row, Column, Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {Button} from '../../../../../Button/Button';
import Dropdown from '../../../../../Dropdown/Dropdown';
import Scroller from '../../../../../Scroller/Scroller';
import ThemeDecorator from '../../../../../ThemeDecorator/ThemeDecorator';
import React from 'react';

const ListContainer = SpotlightContainerDecorator({leaveFor: {up: ''}}, 'div');
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
			hideScrollbar: false,
			spotlightDisabled: false
		};
		this.rootRef = React.createRef();
		this.scrollingRef = React.createRef();
	}

	onToggle = ({currentTarget}) => {
		const key = currentTarget.getAttribute('id');
		this.setState((state) => ({[key]: !state[key]}));
	}

	onSelectFocusableScrollbar = (selectedOpt) => {
		this.setState({focusableScrollbar: prop.focusableScrollbarOption[selectedOpt.data]});
	};

	onSelectDirection = (selectedOpt) => {
		this.setState({direction: prop.directionOption[selectedOpt.data]});
	};

	render () {
		const
			{hideScrollbar, spotlightDisabled} = this.state,
			buttonDefaultProps = {minWidth: false, size: 'small'};
		return (
			<div {...this.props} id="list" ref={this.rootRef}>
				<Column>
					<Cell component={OptionsContainer} shrink>
						<Button {...buttonDefaultProps} id="hideScrollbar" onClick={this.onToggle} selected={hideScrollbar}>hide scrollbar</Button>
						<Button {...buttonDefaultProps} id="spotlightDisabled" onClick={this.onToggle} selected={spotlightDisabled}>SpotlightDisabled</Button>
						<Dropdown
							onSelect={this.onSelectFocusableScrollbar}
							title="FocusableScrollbar"
						>
							{Object.keys(prop.focusableScrollbarOption)}
						</Dropdown>
						<Dropdown
							onSelect={this.onSelectDirection}
							title="Direction"
						>
							{Object.keys(prop.directionOption)}
						</Dropdown>
						<span id="scrolling" ref={this.scrollingRef}>Not Scrolling</span>
					</Cell>
					<Cell component={ListContainer}>
						<Row align="center">
							<Cell component={Button} shrink id="left">
								Left
							</Cell>
							<Cell align="stretch">
								<Column align="center">
									<Cell>
										<Scroller
											direction={this.state.direction}
											horizontalscrollbar={getScrollbarVisibility(hideScrollbar)}
											style={{
												height: ri.scaleToRem(1920),
												width: ri.scaleToRem(2400)
											}}
											spotlightDisabled={spotlightDisabled}
											verticalScrollbar={getScrollbarVisibility(hideScrollbar)}
											focusableScrollbar={this.state.focusableScrollbar}
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
