# Enact Performance Testing

Application to perform automated performance testing on Enact components.

We utilize puppeteer to get chrome performance traces.


To run all you have to do is start the server and run the test suite on it.
```
npm run serve
npm run test
```

## Viewing Individual Samples Used For Tests

Once the server has been started, you can view each component's sample that is used within the test suite by appending the name of the sample to the served url.

```
http://localhost:8080/<sample>
```

## Filtering Tests

### Filtering by Component

```
npm test -- <component>
```

## Adding Tests

This project works a bit differently than a regular test suite for now. We have Jest installed more as a test runner, but we don't really use assertions for now. We use it more to gather and report numbers.

### FPS

To gather average FPS time, we just use the `FPS` function from `TraceModel`.
For FPS we don't need to specify any components to look for as it will just grab the SPF for the entire page.

### Update
To get React Update Times we just use the `Update` function from `TraceModel`. For update we need to specify the top component in the tree that belongs to the component you're trying to test.

Example: Picker is wrapped by numerous Higher-order Components, and the top on is `Changeable`. So we'll use `Update(filename, 'Changeable');` to get the average update times.

### Example

It's pretty easy to test FPS and Update in the same test because they both typically require interactions. We can check the React Devtools to see which component is at the top of a specific component.

```javascript
const TestResults = require('../TestResults');
const {FPS, Update} = require('../TraceModel');

it('increment', async () => {
		const filename = getFileName('Picker');
		const incrementer = '[class^="Picker_incrementer"]';

		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.goto('http://localhost:8080/picker');
		await page.tracing.start({path: filename, screenshots: false});
		//interactions
		//...

		await page.tracing.stop();
		await browser.close();

		// FPS
		const actualFPS = FPS(filename);
		TestResults.addResult({component: 'Picker', type: 'Frames Per Second', actualValue: actualFPS});

		// Update
		const actualUpdateTime = Update(filename, 'Changeable');
		TestResults.addResult({component: 'Picker', type: 'Update', actualValue: actualUpdateTime});

	});
```

### Mount

Mounting is very is pretty simple. We just need to find the top component for the component we're trying to test like `Mount(filename, 'Changeable');`. We can check the React Devtools to see which component is at the top of a specific component.

```javascript
	it('should mount picker under threshold', async () => {
		const filename = getFileName('Picker');

		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/picker');
		await page.waitFor(2000);

		await page.tracing.stop();
		await browser.close();

		const actualMount = Mount(filename, 'Changeable');
		TestResults.addResult({component: 'Picker', type: 'Mount', actualValue: actualMount});
	});
```

### Google Sheets
We have the ability to send data to a Google Spreadsheet. If you wish to use this inclide an environment variable. 

```
// .env
API_URL=https://script.google.com/macros/s/SCRIPT_ID/exec
```