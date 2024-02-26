import Item from '@enact/sandstone/Item';
import PropTypes from 'prop-types';
import {useContext} from 'react';

import {ListContext} from '../../context/ListContext';

const ListItem = (props) => {
	const {children, index, rest} = props;
	const {listItems} = useContext(ListContext);
	const disabled = listItems[index].disabled;

	return (
		<Item {...rest} disabled={disabled}>
			{children}
		</Item>
	);
};

ListItem.propTypes = {
	index: PropTypes.number,
	children: PropTypes.any
};

export default ListItem;
