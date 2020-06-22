import Heading from '@enact/sandstone/Heading';
import Slider from '@enact/sandstone/Slider';
import PropTypes from 'prop-types';
import React from 'react';

class CustomSlider extends React.Component {
	static propTypes = {
		customText: PropTypes.string
	}

	constructor (props) {
		super(props);
		this.state = {
			value: 0
		};
	}

	handleChange = (ev) => this.setState({value: ev.value})

	render () {
		const valueText = `${this.props.customText} ${this.state.value}`;

		return (
			<Slider aria-valuetext={valueText} onChange={this.handleChange} value={this.state.value} {...this.props} />
		);
	}
}

const SliderView = () => (
	<div>
		<Heading showLine>Default</Heading>
		<Slider activateOnSelect />
		<Heading showLine>Slider using ValueText</Heading>
		<CustomSlider activateOnSelect customText="Volume" />
	</div>
);

export default SliderView;
