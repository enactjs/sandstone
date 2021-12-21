import kind from '@enact/core/kind';
import platform from '@enact/core/platform';

import Marquee from '../../Marquee';

import css from './Picker.module.less';

const PickerItemBase = kind({
	name: 'PickerItem',

	styles: {
		css,
		className: 'item'
	},

	computed: {
		className: ({children, styler}) => styler.append({numeric: !isNaN(Number(children))})
	},

	render: (props) => {
		const isMobile = platform.platformName === 'androidChrome' || platform.platformName === 'ios' || platform.platformName === 'safari';
		const fontFamily = isMobile ? {fontFamily: 'Noto Sans'} : {};

		return <Marquee {...props} alignment="center" style={fontFamily} />;
	}
});

export default PickerItemBase;
export {
	PickerItemBase as PickerItem,
	PickerItemBase
};
