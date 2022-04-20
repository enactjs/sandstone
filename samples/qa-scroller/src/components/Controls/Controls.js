import {Cell, Row} from '@enact/ui/Layout';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import {InputField as Input} from '@enact/sandstone/Input';
import PropTypes from 'prop-types';

import LocaleSwitch from '../LocaleSwitch';
import ScrollModeSwitch from '../ScrollModeSwitch';

const Controls = ({handleFocusableScrollbar, handleHeight, handleScrollMode, handleWidth, height, nativeScroll, width}) => {
	const inputWidth = {width: '5em'};

	return (
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
				<ScrollModeSwitch defaultSelected={nativeScroll} onToggle={handleScrollMode} />
			</Cell>
			<Cell>
				<LocaleSwitch />
			</Cell>
		</Row>
	);
};

Controls.propTypes = {
	handleFocusableScrollbar: PropTypes.func,
	handleHeight: PropTypes.func,
	handleScrollMode: PropTypes.func,
	handleWidth: PropTypes.func,
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	nativeScroll: PropTypes.bool,
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Controls;
