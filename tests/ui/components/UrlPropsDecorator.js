/* global URL */

import React from 'react';

function UrlPropsDecorator (Wrapped) {
	return (props) => {
		const updated = {...props};
		const url = new URL(window.location.href);

		url.searchParams.forEach((value, key) => {
			if (!value) {
				value = true;
			} else if (/^(true|false)$/i.test(value)) {
				value = Boolean(value);
			} else if (/^\d+$/.test(value)) {
				value = Number.parseInt(value);
			} else {
				try {
					value = JSON.parse(value);
				} catch (e) {
					// eslint-disable-next-line no-console
					console.error(`Failed to handle URL parameter "${key}" with value "${value}"`);
					return;
				}
			}

			updated[key] = value;
		});

		return <Wrapped {...updated} />;
	};
}

export default UrlPropsDecorator;
export {
	UrlPropsDecorator
};
