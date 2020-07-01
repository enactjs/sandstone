import Spotlight from '@enact/spotlight';
import PropTypes from 'prop-types';
import React from 'react';

import css from './FlexiblePopupPanels.module.less';

const prevButtonSelector = `.${css.navCellBefore} .${css.navButton}`;
const nextButtonSelector = `.${css.navCellAfter} .${css.navButton}`;

function useNavButtonFocus ({index}) {
	let autoFocus;

	const {current: ref} = React.useRef({
		index
	});

	// on index change
	if (index !== ref.index) {
		const current = Spotlight.getCurrent();
		// if the currently focused component is a nav button
		if (current && current.classList.contains(css.navButton)) {
			const prevButtonFocused = current.matches(prevButtonSelector);

			// set autoFocus to point to the selector for the appropriate button
			autoFocus = prevButtonFocused ? prevButtonSelector : nextButtonSelector;
		}
		ref.index = index;
	}

	return {
		autoFocus
	};
}

const NavButtonFocusDecorator = Wrapped => {
	// eslint-disable-next-line no-shadow
	function NavButtonFocusDecorator ({index, ...rest}) {
		const nav = useNavButtonFocus({index});

		return (
			<Wrapped
				{...rest}
				{...nav}
				index={index}
			/>
		);
	}

	NavButtonFocusDecorator.propTypes = {
		index: PropTypes.number
	};

	return NavButtonFocusDecorator;
};

export default useNavButtonFocus;
export {
	useNavButtonFocus,
	NavButtonFocusDecorator
};
