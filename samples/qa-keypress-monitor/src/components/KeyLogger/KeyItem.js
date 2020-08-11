import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Item from '@enact/sandstone/Item';

import componentCss from './KeyItem.module.less';

const KeyItem = kind({
	name: 'KeyItem',
	propTypes: {
		/* The name of the key, such as 'ArrowDown' or 'KeyD'.  MDN recommends using
		 * this instead of 'charCode', 'keyCode' or 'which' to match a key.
		 * See:
		 * - https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/charCode
		 * - https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
		 * - https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/which
		 */
		code: PropTypes.string,

		/* Note: the event prop is `key` but Repeater is stomping on that, so it is
		 * renamed as `keyName` here.
		 *
		 * For printable keys, the printed character.  For others this is the key name
		 * ('Shift', for example).
		 */
		keyName: PropTypes.string,

		/* The numeric keyCode for the key or the charCode for alphanumerics.
		 */
		which: PropTypes.number
	},
	styles: {
		className: 'keyItem',
		css: componentCss
	},
	computed: {
		label: ({code, keyName}) => `${code || 'NO ID FOR KEY'} (${keyName})`
	},
	render: ({css, which, ...rest}) => {
		delete rest.code;
		delete rest.keyName;
		return (
			<Item labelPosition="above" spotlightDisabled {...rest}>
				<div className={css.charCode}>{which}</div>
			</Item>
		);
	}
});

export default KeyItem;
export {KeyItem};
