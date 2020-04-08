import Layout, {Cell} from '@enact/ui/Layout';
import React from 'react';
import ri from '@enact/ui/resolution';
import Scroller from '@enact/sandstone/Scroller';
import ToggleButton from '@enact/sandstone/ToggleButton';

class ScrollerView extends React.Component {
	constructor () {
		super();
		this.state = {
			customAriaLabel: false,
			isNative: false
		};
	}

	onClickChangeAriaLabelButton = () => this.setState((state) => ({customAriaLabel: !state.customAriaLabel}))

	onClickChangeJSNativeButton = () => this.setState((state) => ({isNative: !state.isNative}))

	render () {
		const
			{isNative, customAriaLabel} = this.state,
			scrollMode = isNative ? 'native' : 'translate';

		return (
			<Layout orientation="vertical">
				<Cell shrink>
					<ToggleButton
						size="small"
						onClick={this.onClickChangeAriaLabelButton}
						selected={customAriaLabel}
					>
						Customizable aria-labels on ScrollButtons
					</ToggleButton>
					<ToggleButton
						size="small"
						onClick={this.onClickChangeJSNativeButton}
						selected={isNative}
					>
						Native
					</ToggleButton>
				</Cell>
				<Cell
					component={Scroller}
					focusableScrollbar
					scrollDownAriaLabel={customAriaLabel ? 'This is scroll down' : null}
					scrollLeftAriaLabel={customAriaLabel ? 'This is scroll left' : null}
					scrollMode={scrollMode}
					scrollRightAriaLabel={customAriaLabel ? 'This is scroll right' : null}
					scrollUpAriaLabel={customAriaLabel ? 'This is scroll up' : null}
				>
					<div style={{width: ri.scale(2000) + 'px'}}>
						Foo<br />Bar<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />
						Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow. Boom boom pow.
						Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
						Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
						Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. <br />Foo<br />Bar<br />Bar<br />
						Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />
						Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
						Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
						Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
						Boom boom pow. Boom boom pow. Boom boom pow. <br />Foo<br />Bar<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />
						Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />
						Foo<br />Bar<br />Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
						Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
						Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
						Boom boom pow. <br />Foo<br />Bar<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />
						Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow.
						Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
						Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
						Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					</div>
				</Cell>
			</Layout>
		);
	}
}

export default ScrollerView;
