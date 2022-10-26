import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import Resizable from '@enact/ui/Resizable';
import useResizable from '@enact/ui/Resizable/useResizable';

import ri from '@enact/ui/resolution';
import {Component, Fragment} from 'react';

const data = ['a', 'ABCDEFGHIJKLMNOPQRSTUVW12345', 'c'];

const ResizeButton = Resizable({resize: 'onClick'}, Button);

const ResizeButtonWithHook = (props) => {
	const handlers = useResizable(props, {resize: 'onClick'});
	return <Button {...handlers}>{props.children}</Button>;
};

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
			moreItemForResizeButton: false,
			moreItemForResizeButtonWithHook: false
		};
	}

	toggleForResizeButton = () => {
		this.setState(({moreItemForResizeButton}) => {
			return {moreItemForResizeButton: !moreItemForResizeButton};
		});
	};

	toggleForResizeButtonWithHook = () => {
		this.setState(({moreItemForResizeButtonWithHook}) => {
			return {moreItemForResizeButtonWithHook: !moreItemForResizeButtonWithHook};
		});
	};

	render () {
		const {moreItemForResizeButton, moreItemForResizeButtonWithHook} = this.state;

		return (
			<Fragment>
				<ResizeButton onClick={this.toggleForResizeButton}>
					{moreItemForResizeButton ? 'Fewer' : 'More'} Items (hoc)
				</ResizeButton>
				{moreItemForResizeButton ?
					data.map((item) => {
						return <Item key={item}>{item}</Item>;
					}) :
					null
				}
				<ResizeButtonWithHook onClick={this.toggleForResizeButtonWithHook}>
					{moreItemForResizeButtonWithHook ? 'Fewer' : 'More'} Items (hook)
				</ResizeButtonWithHook>
				{moreItemForResizeButtonWithHook ?
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
