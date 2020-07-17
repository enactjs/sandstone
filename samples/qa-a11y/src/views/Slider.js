import Button from '@enact/sandstone/Button';
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
		const {customText, ...rest} = this.props;
		const valueText = `${customText} ${this.state.value}`;

		return (
			<Slider aria-valuetext={valueText} onChange={this.handleChange} value={this.state.value} {...rest} />
		);
	}
}

const SliderView = () => (
	<>
		<Heading showLine>Default</Heading>
		<Slider />
		<br />
		<br />
		<Heading showLine>Slider using ValueText</Heading>
		<CustomSlider customText="This is Volume" />
		<br />
		<br />
		<Button icon="eject" size="small" />
	</>
);

export default SliderView;
