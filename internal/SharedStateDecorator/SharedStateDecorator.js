import hoc from '@enact/core/hoc';
import PropTypes from 'prop-types';
import {createContext, useCallback, useContext, useEffect, useRef, useState} from 'react';

const SharedState = createContext(null);

const defaultConfig = {
	idProp: 'id',
	updateOnMount: false
};

/**
 * Adds shared state to a component.
 *
 * The purpose of shared state is to store framework component state at significant container
 * boundaries in order to restore it when the "same" component is mounted later.
 *
 * "Sameness" is determined by the `idProp` config member (defaults to "id"). If multiple
 * descendants have the same `idProp` within the subtree, SharedStateDecorator will not distinguish
 * between them and will allow each to read from and write over each other's data.
 *
 * For example, Panels and Panel are considered "significant container boundaries" since they are
 * key building blocks for sandstone applications. When components are rendered within a Panel, we
 * may want to store those components state on unmount so that we can restore it when returning to
 * the panel. Panel can (and does) use SharedStateDecorator to establish a shared state which can be
 * used by contained components.
 *
 * It's important to note that SharedStateDecorator doesn't prescribe how or what is stored nor how
 * the data is managed. That is left to the consuming component to determine. Also, unlike React
 * state or third-party state management solutions like Redux, updating shared state will not
 * initiate an update cycle in React. The intent is only to restore state on mount.
 *
 * If shared state is used in the render method for a component, it may be necessary to use the
 * `updateOnMount` config member which will initiate an update cycle within React once the data is
 * available from an upstream shared state.
 *
 * @hoc
 * @private
 */
const SharedStateDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const {idProp, updateOnMount} = config;

	// eslint-disable-next-line no-shadow
	const SharedStateDecorator = (props) => {
		const context = useContext(SharedState);
		const data = useRef({});
		// eslint-disable-next-line no-unused-vars
		const [updateOnMountState, setUpdateOnMountState] = useState(false);

		const isUpdatable = () => {
			const {[idProp]: id, noSharedState} = props;

			return !noSharedState && (id || id === 0);
		};

		const initSharedState = () => {
			return {
				set: (key, value) => {
					const {[idProp]: id} = props;

					if (isUpdatable()) {
						data.current[id] = data.current[id] || {};
						data.current[id][key] = value;
					}
				},

				get: (key) => {
					const {[idProp]: id} = props;

					return (isUpdatable() && data.current[id]) ? data.current[id][key] : null;
				},

				delete: (key) => {
					const {[idProp]: id} = props;

					if (isUpdatable() && data.current[id]) {
						delete data.current[id][key];
					}
				}
			};
		};

		const loadFromContext = useCallback(() => {
			const {[idProp]: id, noSharedState} = props;

			if (!noSharedState && context && context.get) {
				const contextData = context.get(id);

				if (contextData) {
					data.current = contextData;
				} else {
					context.set(id, data.current);
				}

				if (updateOnMount) {
					setUpdateOnMountState(true);
				}
			}
		}, [context, props]);

		const sharedState = initSharedState();
		const prevProps = useRef();

		useEffect(() => {
			loadFromContext();
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		useEffect(() => {
			if (!prevProps.current.noSharedState && props.noSharedState) {
				data.current = {};
			} else if (prevProps.current.noSharedState && !props.noSharedState) {
				loadFromContext();
			}

			prevProps.current = props;
		}, [loadFromContext, props]);

		const {...wrappedComponentProps} = props;
		delete wrappedComponentProps.noSharedState;

		return (
			<SharedState.Provider value={sharedState}>
				<Wrapped {...wrappedComponentProps} />
			</SharedState.Provider>
		);
	};

	SharedStateDecorator.displayName = 'SharedStateDecorator';

	SharedStateDecorator.propTypes = {
		/**
		 * Prevents the component from setting or restoring any framework shared state.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noSharedState: PropTypes.bool
	};

	return SharedStateDecorator;
});

export default SharedStateDecorator;
export {
	SharedState,
	SharedStateDecorator
};
