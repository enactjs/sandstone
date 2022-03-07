import Button from '@enact/sandstone/Button';
import {Cell, Row} from '@enact/ui/Layout';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import {connect} from 'react-redux';
import {Header, Panel} from '@enact/sandstone/Panels';
import {InputField as Input} from '@enact/sandstone/Input';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from 'react';
import ri from '@enact/ui/resolution';
import VirtualList from '@enact/sandstone/VirtualList';

import ListItem from '../components/ListItem';
import LocaleSwitch from '../components/LocaleSwitch';
import ScrollModeSwitch from '../components/ScrollModeSwitch';
import {setData} from '../actions';

import css from './MainPanel.module.less';

const childProps = {text: ' child props'};

const MainPanel = ({changeData, listItems, ...rest}) => {
	const [hasChildProps, setHasChildProps] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [nativeScroll, setNativeScroll] = useState(true);
	const [value, setValue] = useState('');

	useEffect(() => {
		changeData(200, false);
	}, [changeData]);

	const handleChange = useCallback((param) => setValue(param.value), []);

	const onChangeDataSize = useCallback(() => {
		const dataSize = parseInt(value) || 0;
		changeData(dataSize, isDisabled);
	}, [changeData, isDisabled, value]);

	const onChangeScrollMode = useCallback(({selected: selNativeScroll}) => setNativeScroll(selNativeScroll), []);

	const onToggleChildProps = useCallback(() => setHasChildProps(!hasChildProps), [hasChildProps]);

	const onToggleDisabled = useCallback(() => {
		changeData(listItems.length, !isDisabled);
		return setIsDisabled(!isDisabled);
	}, [changeData, isDisabled, listItems.length]);

	const renderItem = useCallback(({index, text, ...restItem}) => {
		return (
			<ListItem {...restItem} index={index}>
				{listItems[index].content + (text || '')}
			</ListItem>
		);
	}, [listItems]);

	return (
		<Panel {...rest}>
			<Header
				title="VirtualList"
				type="mini"
			>
				<Row>
					<Cell shrink>
						<label>DataSize:</label>
						<Input
							onChange={handleChange}
							placeholder={`${listItems.length}`}
							size="small"
							style={{width: '5em'}}
							type="number"
							value={value}
						/>
					</Cell>
					<Cell shrink>
						<Button size="small" onClick={onChangeDataSize}>Set DataSize</Button>
					</Cell>
					<Cell>
						<CheckboxItem onClick={onToggleDisabled}>Disabled Items</CheckboxItem>
					</Cell>
					<Cell>
						<CheckboxItem onClick={onToggleChildProps}>Child Props</CheckboxItem>
					</Cell>
					<Cell>
						<ScrollModeSwitch defaultSelected={nativeScroll} onToggle={onChangeScrollMode} />
					</Cell>
					<Cell>
						<LocaleSwitch />
					</Cell>
				</Row>
				<hr />
			</Header>
			<VirtualList
				className={css.verticalPadding}
				childProps={hasChildProps ? childProps : null}
				dataSize={listItems.length}
				itemRenderer={renderItem}
				itemSize={ri.scale(156)}
				key={nativeScroll ? 'native' : 'translate'}
				scrollMode={nativeScroll ? 'native' : 'translate'}
			/>
		</Panel>
	);
};

MainPanel.propTypes = {
	changeData: PropTypes.func.isRequired,
	listItems: PropTypes.array.isRequired,
	nativeScroll: PropTypes.bool
};

const mapStateToProps = ({listItems}) => ({
	listItems
});

const mapDispatchToProps = (dispatch) => ({
	changeData: (dataSize, isDisabled) => dispatch(setData(dataSize, isDisabled))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPanel);
