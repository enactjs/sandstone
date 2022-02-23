import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Spinner from '../Spinner';

describe('Spinner Specs', () => {
	test('should not have client node when Spinner has no children', () => {
		render(<Spinner />);
		const spinner = screen.getByRole('alert');
		const children = spinner.children;

		expect(children.length).toEqual(1);
		expect(children.item(0)).toHaveClass('bg');
		expect(children.item(1)).not.toBeInTheDocument();
	});

	test('should have a client node when Spinner has children', () => {
		render(<Spinner>Loading...</Spinner>);
		const spinner = screen.getByRole('alert');
		const childClient = spinner.children.item(1);

		expect(childClient).toHaveClass('client');
	});

	test('should have content class when Spinner has children', () => {
		render(<Spinner>Loading...</Spinner>);
		const spinner = screen.getByRole('alert');

		expect(spinner).toHaveClass('content');
	});

	test('should have transparent class when transparent prop equals true', () => {
		render(<Spinner transparent>Loading...</Spinner>);
		const spinner = screen.getByRole('alert');

		expect(spinner).toHaveClass('transparent');
	});

	test('should set role to alert by default', () => {
		render(<Spinner />);
		const spinner = screen.getByLabelText('Loading');

		expect(spinner).toHaveAttribute('role', 'alert');
	});

	test('should set aria-live to off by default', () => {
		render(<Spinner />);
		const spinner = screen.getByRole('alert');

		expect(spinner).toHaveAttribute('aria-live', 'off');
	});
});
