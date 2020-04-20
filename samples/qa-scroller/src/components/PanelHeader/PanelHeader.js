import {Cell, Row} from '@enact/ui/Layout';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import {Header} from '@enact/sandstone/Panels';
import Input from '@enact/sandstone/Input';
import PropTypes from 'prop-types';
import React from 'react';

import LocaleSwitch from '../LocaleSwitch';
import ScrollModeSwitch from '../ScrollModeSwitch';

class PanelHeader extends React.Component {
	static propTypes = {
		handleFocusableScrollbar: PropTypes.func,
		handleHeight: PropTypes.func,
		handleScrollMode: PropTypes.func,
		handleWidth: PropTypes.func,
		height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	}

	render () {
		const
			{handleFocusableScrollbar, handleHeight, handleScrollMode, handleWidth, height, width, ...rest} = this.props,
			inputWidth = {width: '5em'};

		return (
			<Header {...rest}>
				<Row style={{direction: 'ltr'}}>
					<Cell>
						<label>height:</label>
						<Input size="small" onChange={handleHeight} style={inputWidth} type="number" value={height} />
					</Cell>
					<Cell>
						<label>width:</label>
						<Input size="small" onChange={handleWidth} style={inputWidth} type="number" value={width} />
					</Cell>
					<Cell
						component={CheckboxItem}
						onClick={handleFocusableScrollbar}
					>
						Focusable Scrollbar
					</Cell>
					<Cell>
						<ScrollModeSwitch onToggle={handleScrollMode} />
					</Cell>
					<Cell>
						<LocaleSwitch />
					</Cell>
				</Row>
				<hr />
			</Header>
		);
	}
}

export default PanelHeader;
