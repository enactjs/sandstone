import {useRef, useCallback} from 'react';

function useToggleRole ({role = 'region', event = 'onWillTransition'} = {}) {
	const ref = useRef(null);

	const handler = useCallback(() => {
		if (ref.current) {
			// To workaround not reading title when panel transition ends
			ref.current.setAttribute('role', null);
			ref.current.setAttribute('role', role);
		}
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
