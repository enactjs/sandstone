/* global URL */

import React from 'react';

function UrlPropsDecorator (Wrapped) {
	return (props) => {
		const updated = {...props};
		const url = new URL(window.location.href);

		url.searchParams.forEach((value, key) => {
			if (!value) {
				value = true;
			} else if (/(true|false)/ig.test(value)) {
				value = Boolean(value);
			} else if (/\d+/.test(value)) {
				value = Number.parseInt(value);
			} else {
				try {
					value = JSON.parse(value);
				} catch (e) {
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
