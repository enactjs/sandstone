import hoc from '@enact/core/hoc';
import {useCallback, createContext, useState} from 'react';

import css from './Droppable.module.less';

const defaultConfig = {

};

const DroppableContext = createContext({
	elements: [],
	props: [],
	types: []
})

const Droppable = hoc(defaultConfig, (config, Wrapped) => {
	let App = Wrapped;

	const DroppableHOC = (rest) => {
		const [className, setClassName] = useState(css.normalContainer);
		const onDragLeave = useCallback((event) => {
			event?.preventDefault();
			setClassName(css.normalContainer);
		}, []);

		const onDragOver = useCallback((event) => {
			event?.preventDefault();
			if (className === css.overContainer) return;
			setClassName(css.overContainer);
		}, [className]);

		const onDrop = useCallback((event) => {
			event?.preventDefault();
			setClassName(css.normalContainer);
		}, []);

		return (
			<DroppableContext.Provider
				value={{elements: [], props: [], types: []}}
			>
				<App
					droppable="true"
					onDragOver={onDragOver}
					onDragLeave={onDragLeave}
					onDrop={onDrop}
					className={className}
					{...config}
					{...rest}
				/>
			</DroppableContext.Provider>
		);
	};

	return DroppableHOC;
});

export default Droppable;
export{Droppable};
