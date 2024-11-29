import '@testing-library/jest-dom';
import {getContainerConfig, getContainerId} from '@enact/spotlight/src/container';
import {render, screen} from '@testing-library/react';

import {ContentContainerDecorator} from '../Scroller';

describe('ContentContainerDecorator', () => {
	test(
		'should set \'positionTargetOnFocus\' container config to true',
		() => {
			const Container = ContentContainerDecorator('div');

			render(
				<Container data-testid="container-id" />
			);

			const containerId = getContainerId(screen.getByTestId('container-id'));
			const containerConfig = getContainerConfig(containerId);

			const actual = containerConfig.positionTargetOnFocus;
			const expected = true;

			expect(actual).toBe(expected);
		}
	);
});
