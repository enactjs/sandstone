import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import Resizable from '@enact/ui/Resizable';
import ri from '@enact/ui/resolution';
import {Component, Fragment} from 'react';

const data = ['a', 'ABCDEFGHIJKLMNOPQRSTUVW12345', 'c'];

const ResizeButton = Resizable({resize: 'onClick'}, Button);

class NoUpdate extends Component {
	shouldComponentUpdate () {
		return false;
	}

	render () {
		return <div>{this.props.children}</div>;
	}
}

class Items extends Component {
	constructor (props) {
		super(props);

		this.state = {
			more: false
		};
	}

	toggleRenderItems = () => {
		this.setState(({more}) => {
			return {more: !more};
		});
	};

	render () {
		const {more} = this.state;
		const amount = more ? 'Fewer' : 'More';

		return (
			<Fragment>
				<ResizeButton onClick={this.toggleRenderItems}>Render {amount} Items</ResizeButton>
				{more ?
					data.map((item) => {
						return <Item key={item}>{item}</Item>;
					}) :
					null
				}
			</Fragment>
		);
	}
}

export default {
	title: 'Sandstone/Resizable',
	component: 'Resizable'
};

export const ShouldRecalculateLongMarqueeWhenScrollbarIsRendered = () => (
	<Scroller style={{height: ri.scaleToRem(798), width: ri.scaleToRem(1002)}}>
		<NoUpdate>
			<Item marqueeOn="render">MARQUEEONRENDER ABCDE</Item>
			<Item>ABCDEFGHIJKLMNOPQRST</Item>
			<Item>ITEM ABCDEFGHIJKLMNOPQRST</Item>
			<Items />
			<Item>dummy</Item>
		</NoUpdate>
	</Scroller>
);

ShouldRecalculateLongMarqueeWhenScrollbarIsRendered.storyName = 'should recalculate long marquee when scrollbar is rendered';
ShouldRecalculateLongMarqueeWhenScrollbarIsRendered.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};