import Panels, {Panel, Header} from '../../../../Panels';
import Scroller from '../../../../Scroller';
import React from 'react';

class CallbackScroller extends React.Component {

	componentDidMount () {
		this.scrollTo({position: {y: 2000}});
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
	<Panel featureContent>
		<Header title="Title" subtitle="Sub Title" />
	</Panel>;

const collapsed =
	<Panel featureContent>
		<Header title="Title" subtitle="Sub Title" />
		<CallbackScroller />
	</Panel>;

const PanelTests = [
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

export default PanelTests;
