import '@testing-library/jest-dom';
import {getContainerConfig, getContainerId} from '@enact/spotlight/src/container';
import {render, screen} from '@testing-library/react';

import {ScrollerContentContainerDecorator} from '../Scroller';

describe('ScrollerContentContainerDecorator', () => {
	test(
		'should set \'scrollTargetOnDescendantsFocus\' container config to true',
		() => {
			const Container = ScrollerContentContainerDecorator('div');

			render(
				<Container data-testid="container-id" />
			);

			const containerId = getContainerId(screen.getByTestId('container-id'));
			const containerConfig = getContainerConfig(containerId);

			const actual = containerConfig.scrollTargetOnDescendantsFocus;
			const expected = true;

			expect(actual).toBe(expected);
		}
	);
});
