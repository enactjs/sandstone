import '@testing-library/jest-dom';
import {render} from '@testing-library/react';

import Spinner from '../Spinner';

describe('Spinner Specs', () => {

	test('should not have client node when Spinner has no children', () => {

		const {getByRole} = render(<Spinner />);
		const spinner = getByRole('alert');

		const children = spinner.children;

		expect(children.length).toEqual(1);
		expect(children.item(0).className).toContain('bg');
		expect(children.item(1)).not.toBeInTheDocument();
	});

	test('should have a client node when Spinner has children', () => {

		const {getByRole} = render(<Spinner>Loading...</Spinner>);
		const spinner = getByRole('alert');

		const childClient = spinner.children.item(1);

		expect(childClient.className).toContain('client');
	});

	test('should have content class when Spinner has children', () => {

		const {getByRole} = render(<Spinner>Loading...</Spinner>);
		const spinner = getByRole('alert');

		expect(spinner.className).toContain('content');
	});

	test('should have transparent class when transparent prop equals true', () => {

		const {getByRole} = render(<Spinner transparent>Loading...</Spinner>);
		const spinner = getByRole('alert');

		expect(spinner.className).toContain('transparent');
	});

	test('should set role to alert by default', () => {

		const {getByLabelText} = render(<Spinner />);
		const spinner = getByLabelText('Loading');

		expect(spinner).toHaveAttribute('role', 'alert');
	});

	test('should set aria-live to off by default', () => {

		const {getByRole} = render(<Spinner />);
		const spinner = getByRole('alert');

		expect(spinner).toHaveAttribute('aria-live', 'off');
	});
});
