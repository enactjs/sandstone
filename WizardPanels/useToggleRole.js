import React from 'react';

function useToggleRole ({role = 'region', event = 'onWillTransition'} = {}) {
	const {current: ref} = React.useRef(null);

	const handler = React.useCallback(() => {
		// To workaround not reading title when panel transition ends
		ref.setAttribute('role', null);
		ref.setAttribute('role', role);
	}, [ref, role]);

	return {
		ref,
		[event]: handler
	};
}

export default useToggleRole;
export {
	useToggleRole
};
