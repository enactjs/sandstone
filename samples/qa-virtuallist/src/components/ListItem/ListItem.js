import Item from '@enact/sandstone/Item';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

const ListItem = kind({
	name: 'ListItem',
	functional: true,
	propTypes: {
		children: PropTypes.any,
		dispatch: PropTypes.func,
		index: PropTypes.number
	},
	render: ({children, ...rest}) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const disabled = useSelector(({listItems}) => listItems[rest.index].disabled);
		delete rest.index;
		delete rest.dispatch;

		return (
			<Item {...rest} disabled={disabled}>
				{children}
			</Item>
		);
	}
});

export default ListItem;
