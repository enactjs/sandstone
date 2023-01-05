import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';

import css from './CustomItem.module.less';

export const CustomItem = ({...rest}) => (

	<Item
		{...rest}
		css={css}
		slotBefore={<Icon size="small">notification</Icon>}
	/>
);

export default CustomItem;
