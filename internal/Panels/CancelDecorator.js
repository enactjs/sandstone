import hoc from '@enact/core/hoc';
import Cancelable from '@enact/ui/Cancelable';
import Spotlight from '@enact/spotlight';

import css from './Viewport.module.less';

const defaultConfig = {
	cancel: null,
	shouldCancel: null
};

const CancelDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const {cancel, shouldCancel} = config;

	function handleCancel (ev, props) {
		const {index, [cancel]: handler} = props;

		if (shouldCancel && !shouldCancel(ev, props)) {
			return;
		}

		if (index > 0 && handler && !document.querySelector(`.${css.transitioning}`)) {
			// clear Spotlight focus
			const current = Spotlight.getCurrent();
			if (current) {
				current.blur();
			}

			handler({
				type: cancel,
				index: index - 1
			});

			ev.stopPropagation();
		}
	}

	return Cancelable(
		{modal: true, onCancel: handleCancel},
		Wrapped
	);
});

export default CancelDecorator;
export {CancelDecorator};
