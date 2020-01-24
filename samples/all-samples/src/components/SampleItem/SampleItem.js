import Item from '@enact/moonstone/Item';
import PropTypes from 'prop-types';
import React from 'react';

class SampleItem extends React.Component {
	static propTypes = {
		history: PropTypes.object,
		path: PropTypes.any
	}

	itemSelect = () => {
		this.props.history.push({pathname: this.props.path});
	}

	render () {
		const {children, ...rest} = this.props;

		return (
			<Item {...rest} onClick={this.itemSelect}>
				{children}
			</Item>
		);
	}
}

export default SampleItem;
