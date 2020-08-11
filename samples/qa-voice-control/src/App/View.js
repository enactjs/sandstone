import PropTypes from 'prop-types';
import React from 'react';

const View = ({view: ComponentView}) => {
	return <ComponentView />;
};

View.propTypes = {
	view: PropTypes.func
};

export default View;
