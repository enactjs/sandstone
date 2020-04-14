import Panels, {CollapsingHeaderPanel, Header} from '../../../../Panels';
import Scroller from '../../../../Scroller';
import React from 'react';

class CallbackScroller extends React.Component {

	componentDidMount () {
		setTimeout(() => this.scrollTo({position: {y: 2000}}), 10);
	}

	cbScrollTo = (fn) => {
		this.scrollTo = fn;
	}

	render () {
		return (
			<Scroller cbScrollTo={this.cbScrollTo}>
				<div style={{height: 4000}}>
					Some content
				</div>
			</Scroller>
		);
	}
}
// Panel components to show in the Panels
const uncollapsed =
	<CollapsingHeaderPanel>
		<Header title="Title" subtitle="Sub Title" />
	</CollapsingHeaderPanel>;

const collapsed =
	<CollapsingHeaderPanel>
		<Header title="Title" subtitle="Sub Title" />
		<CallbackScroller />
	</CollapsingHeaderPanel>;

const PanelsTests = [
	{
		title: 'with uncollapsed header',
		component: <Panels>{uncollapsed}</Panels>,
		wrapper: {full: true}
	},
	{
		title: 'with collapsed header',
		component: <Panels>{collapsed}</Panels>,
		wrapper: {full: true}
	}
];

export default PanelsTests;
