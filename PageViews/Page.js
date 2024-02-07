import {useContext, useEffect} from 'react';

import {WizardPanelsContext} from '../WizardPanels/WizardPanels';

function Page ({
	children
}) {
	const set = useContext(WizardPanelsContext);

	useEffect(() => {
		if (set) {
			set({
				children
			});
		}
	}, [
		children,
		set
	]);
	return null;
}

export default Page;
export {
	Page
};
