/* Custom hook for using [target].eventListener.
 *
 * Shamelessly copy/pasted from https://dev.to/adrianbdesigns/custom-react-hooks-useeventlistener-1kp
 *
 * #noshame
 */
import {useEffect} from 'react';

const useEventListener = (target, type, listener, ...options) => {
	useEffect(() => {
		const targetIsRef = target.hasOwnProperty('current');
		const currentTarget = targetIsRef ? target.current : target;
		if (currentTarget) {
			currentTarget.addEventListener(type, listener, ...options);
		}
		return () => {
			if (currentTarget) {
				currentTarget.removeEventListener(type, listener, ...options);
			}
		};
	}, [target, type, listener, options]);
};

export default useEventListener;
export {useEventListener};
