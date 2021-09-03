const reportWebVitals = (onPerfEntry) => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
			getCLS(onPerfEntry);
			getFID(onPerfEntry);
			getFCP(onPerfEntry);
			getLCP(onPerfEntry);
			getTTFB(onPerfEntry);
			console.log('here!');
			console.log('here!');
			console.log('here!');
		});
	}
};

const setWebVitalsMetrics = () => {
	window._mtr = [];

	const getValues = (value) => {
		window._mtr.push(value);
		console.log('Here!!');
	};

	reportWebVitals(getValues);
}

const getWebVitalsMetrics = async (page) =>  {
	return await page.evaluate(function () {
		return window._mtr;
	});
}

module.exports = {
	setWebVitalsMetrics,
	getWebVitalsMetrics
}