import React from 'react';

class DelayedRender extends React.Component {
	constructor (props) {
		super(props);
		const observer = new window.PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				if (entry.name === 'first-paint') {
					this.setState({show:true});
				}
			}
		});
		observer.observe({entryTypes: ['paint']});
	}

	state = {
		show: false
	}

	render () {
		return this.state.show ? this.props.children : '';
	}
}

export default DelayedRender;
