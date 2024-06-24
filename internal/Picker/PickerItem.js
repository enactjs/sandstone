import kind from '@enact/core/kind';

import Marquee from '../../Marquee';

import * as css from './Picker.module.less';

const PickerItemBase = kind({
	name: 'PickerItem',

	styles: {
		css,
		className: 'item'
	},

	computed: {
		className: ({children, styler}) => styler.append({numeric: !isNaN(Number(children))})
	},

	render: (props) => (
		<Marquee {...props} alignment="center" />
	)
});

export default PickerItemBase;
export {
	PickerItemBase as PickerItem,
	PickerItemBase
};
