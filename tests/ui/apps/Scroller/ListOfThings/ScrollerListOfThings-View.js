import Group from '@enact/ui/Group';
import {Row, Column, Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {Component, createRef} from 'react';

import Button from '../../../../../Button/Button';
import Dropdown from '../../../../../Dropdown/Dropdown';
import Item from '../../../../../Item/Item';
import Scroller from '../../../../../Scroller/Scroller';
import ThemeDecorator from '../../../../../ThemeDecorator/ThemeDecorator';

const ScrollerContainer = SpotlightContainerDecorator('div');
const OptionsContainer = SpotlightContainerDecorator({leaveFor: {down: '#left'}}, 'div');
const getScrollbarVisibility = (hidden) => hidden ? 'hidden' : 'visible';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const itemData = [];
for (let i = 0; i < 100; i++) {
	itemData.push({
		children: `Item${i}`,
		id: `item${i}`,
		key: i
	});
}

const prop = {
	focusableScrollbarOption: {
		false: false,
		true: true,
		'byEnter': 'byEnter'
	}
};

class app extends Component {
	constructor (props) {
		super(props);
		this.state = {
			focusableScrollbar: false,
			hideScrollbar: false,
			nativeScroll: true,
			spotlightDisabled: false
		};
		this.rootRef = createRef();
		this.scrollingRef = createRef();
	}

	onToggle = ({currentTarget}) => {
		const key = currentTarget.getAttribute('id');
		this.setState((state) => ({[key]: !state[key]}));
	};

	onKeyDown = () => {
		if (this.rootRef.current.dataset.keydownEvents) {
			this.rootRef.current.dataset.keydownEvents = Number(this.rootRef.current.dataset.keydownEvents) + 1;
		} else {
			this.rootRef.current.dataset.keydownEvents = 1;
		}
	};

	onScrollStart = () => {
		this.scrollingRef.current.innerHTML = 'Scrolling';
	};

	onScrollStop = () => {
		this.scrollingRef.current.innerHTML = 'Not Scrolling';
		this.rootRef.current.dataset.scrollingEvents = (Number(this.rootRef.current.dataset.scrollingEvents)  || 0) + 1;
	};

	handleSelectFocusableScrollbar = (selectedOpt) => {
		this.setState({focusableScrollbar: prop.focusableScrollbarOption[selectedOpt.data]});
	};

	handleSelectScrollbarVisibility = (selectedOpt) => {
		this.setState({focusableScrollbar: prop.focusableScrollbarOption[selectedOpt.data]});
	};

	render () {
		const {hideScrollbar, nativeScroll, spotlightDisabled} = this.state;
		const buttonDefaultProps = {minWidth: false, size: 'small'};
		const scrollMode = nativeScroll ? 'NativeScroll' : 'TranslateScroll';
		return (
			<div {...this.props} id="scroller" ref={this.rootRef}>
				<Column>
					<Cell component={OptionsContainer} shrink>
						<Button {...buttonDefaultProps} id="hideScrollbar" onClick={this.onToggle} selected={hideScrollbar}>hide scrollbar</Button>
						<Button {...buttonDefaultProps} id="nativeScroll" onClick={this.onToggle}>{scrollMode}</Button>
						<Button {...buttonDefaultProps} id="spotlightDisabled" onClick={this.onToggle} selected={spotlightDisabled}> spotlightDisabled</Button>
						<span id="scrolling" ref={this.scrollingRef}>Not Scrolling</span>
						<Dropdown
							onSelect={this.handleSelectFocusableScrollbar}
							title="FocusableScrollbar"
							id="focusableScrollbarKnobs"
						>
							{Object.keys(prop.focusableScrollbarOption)}
						</Dropdown>
					</Cell>
					<Cell component={ScrollerContainer}>
						<Row align="center">
							<Cell component={Button} shrink id="left">
								Left
							</Cell>
							<Cell align="stretch">
								<Column align="center">
									<Cell component={Button} shrink id="top">
										Top
									</Cell>
									<Cell>
										<Scroller
											focusableScrollbar={this.state.focusableScrollbar}
											horizontalScrollbar={getScrollbarVisibility(hideScrollbar)}
											key={nativeScroll ? 'native' : 'translate'}
											onKeyDown={this.onKeyDown}
											onScrollStart={this.onScrollStart}
											onScrollStop={this.onScrollStop}
											spacing={0}
											spotlightDisabled={spotlightDisabled}
											style={{height: ri.scaleToRem(156 * 9)}}
											verticalScrollbar={getScrollbarVisibility(hideScrollbar)}
										>
											<Group
												childComponent={Item}
											>
												{itemData}
											</Group>
										</Scroller>
									</Cell>
									<Cell component={Button} shrink id="bottom">
										Bottom
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
