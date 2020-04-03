import {ActivityPanels} from '../../../../../Panels';
import {connect} from 'react-redux';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import ThemeDecorator from '../../../../../ThemeDecorator';

import {decreaseIndex, increaseIndex} from '../actions';
import MainPanel from '../views/MainPanel';

const App = kind({
	name: 'App',

	propTypes: {
		index: PropTypes.number,
		popPanel: PropTypes.func,
		pushPanel: PropTypes.func
	},

	defaultProps: {
		index: 0
	},

	render: ({index, pushPanel, popPanel, ...rest}) => {
		return (
			<ActivityPanels {...rest} onSelectBreadcrumb={popPanel} index={index}>
				<MainPanel title="First" onClick={pushPanel} />
				<MainPanel title="Second" onClick={pushPanel} />
				<MainPanel title="Third" onClick={pushPanel} />
				<MainPanel title="Fourth" />
			</ActivityPanels>
		);
	}
});

const mapStateToProps = ({index}) => ({
	index
});

const mapDispatchToProps = (dispatch) => {
	return {
		pushPanel: () => dispatch(increaseIndex()),
		popPanel: () => dispatch(decreaseIndex())
	};
};

export default ThemeDecorator(connect(mapStateToProps, mapDispatchToProps)(App));
