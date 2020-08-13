import React from 'react';
import {cleanup, render, screen, fireEvent, queryByAttribute} from '@testing-library/react';

import Item from '../../Item';
import VirtualList from '../VirtualList';

const getByContainer = queryByAttribute.bind(null, 'data-spotlight-container');

describe('VirtualList with react-testing-library', () => {
	let
		clientSize,
		dataSize,
		getScrollTo,
		items,
		myScrollTo,
		renderItem;

	beforeEach(() => {
		clientSize = {clientWidth: 1280, clientHeight: 720};
		dataSize = 200;
		items = [];

		getScrollTo = (scrollTo) => {
			myScrollTo = scrollTo;
		};

		renderItem = ({index, ...rest}) => { // eslint-disable-line enact/display-name, enact/prop-types
			return (
				<Item {...rest}>
					{items[index].name}
				</Item>
			);
		};

		for (let i = 0; i < dataSize; i++) {
			items.push({name: 'Account ' + i});
		}
	});

	afterEach(() => {
		cleanup();
		clientSize = null;
		dataSize = null;
		getScrollTo = null;
		items = null;
		myScrollTo = null;
	});

	describe('Channel up/down event', () => {
		test('should scroll when Channel down key pressed', () => {
			const App = () => (
				<VirtualList
					clientSize={clientSize}
					dataSize={dataSize}
					itemRenderer={renderItem}
					itemSize={60}
					scrollMode="translate"
				/>
			);

			const dom = render(<App />);
			const target = dom.container.querySelector('[data-spotlight-container]');

			fireEvent.keyDown(target, {key: 'PageDown', code: 'PageDown'});

			screen.debug();
		});
	});
});
