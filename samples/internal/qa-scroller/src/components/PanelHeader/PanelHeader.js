import Heading from '../../../../../../Heading';
import {Header} from '../../../../../../Panels';
import Input from '../../../../../../Input';
import PropTypes from 'prop-types';
import React from 'react';
import ToggleButton from '../../../../../../ToggleButton';

import LocaleSwitch from '../LocaleSwitch';

class PanelHeader extends React.Component {
	static propTypes = {
		handleFocusableScrollbar: PropTypes.func,
		handleHeight: PropTypes.func,
		handleWidth: PropTypes.func,
		height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	}

	render () {
		const
			{handleFocusableScrollbar, handleHeight, handleWidth, height, width, ...rest} = this.props,
			inputWidth = {width: '5em'};

		return (
			<div>
				<Header {...rest} />
				<div style={{direction: 'ltr'}}>
					height:<Input size="small" onChange={handleHeight} style={inputWidth} type="number" value={height} />
					width:<Input size="small" onChange={handleWidth} style={inputWidth} type="number" value={width} />
					<ToggleButton size="small" onClick={handleFocusableScrollbar}>Focusable Scrollbar</ToggleButton>
					<LocaleSwitch size="small" />
					<Heading showLine />
				</div>
			</div>
		);
	}
}

export default PanelHeader;
