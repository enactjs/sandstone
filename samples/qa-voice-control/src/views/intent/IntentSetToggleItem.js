import Heading from '@enact/sandstone/Heading';
import SwitchItem from '@enact/sandstone/SwitchItem';
// import {useCallback, useState} from 'react';

import CommonView from '../../components/CommonView';

const IntentSetToggleItem = () => {
	// const [selected, setSelected] = useState(0);

	// const handleSelect = useCallback((e) => setSelected(e.selected), []);

	return (
		<CommonView title="Intent to set ToggleItem">
			<Heading>SwitchItem</Heading>
			<SwitchItem data-testid="hello">Hello</SwitchItem>
		</CommonView>
	);
};

export default IntentSetToggleItem;
