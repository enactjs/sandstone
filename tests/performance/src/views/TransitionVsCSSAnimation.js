import React, {useState} from 'react';
import Spinner from '@enact/sandstone/Spinner';
import ViewManager, {SlideLeftArranger} from '@enact/ui/ViewManager';

const lorem =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const runCPUThread = () => setTimeout(() => {
	let str;
	for (let i = 0; i < 100000; ++i) {
		str = str + ' ' + i;
	}
	runCPUThread();
}, 0);

runCPUThread();

const TransitionVsCSSAnimation = () => {
	const [index, setIndex] = useState(0);

	return (
		<div id="container" style={{display: 'flex'}} className="enact-fit">
			{index < 5 ?
				<ViewManager
					id="viewManager"
					arranger={SlideLeftArranger}
					style={{
						position: 'relative',
						width: '100%',
						overflow: 'hidden'
					}}
					index={index}
					// eslint-disable-next-line react/jsx-no-bind
					onTransition={() => setTimeout(() => setIndex(index + 1), 300)}
				>
					<div className="enact-fit">{lorem}</div>
					<div className="enact-fit">{lorem}</div>
					<div className="enact-fit">{lorem}</div>
					<div className="enact-fit">{lorem}</div>
					<div className="enact-fit">{lorem}</div>
				</ViewManager> :
				<Spinner id="spinner" />
			}
		</div>
	);
};

export default TransitionVsCSSAnimation;
