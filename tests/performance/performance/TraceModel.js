const fs = require('fs');
const DevtoolsTimelineModel = require('devtools-timeline-model');

const FPS = (filename) => {
	const events = fs.readFileSync(filename, 'utf8');
	const model = new DevtoolsTimelineModel(events);
	const results = model.frameModel();

	let counter = 0;
	const avgDuration = results._frames.reduce((accumulator, currentValue) => {
		if (!currentValue.idle) {
			counter += 1;
			return accumulator + 1000 / currentValue.duration;
		} else {
			return accumulator;
		}
	}, 0) / counter;

	return avgDuration;
};

const Mount = (filename, component) => {
	const events = fs.readFileSync(filename, 'utf8');
	const model = new DevtoolsTimelineModel(events);
	const results = model.timelineModel();

	const userTiming = Array.from(results._namedTracks.values())[0];
	const timingEvents = userTiming.asyncEvents;

	// retrieve mount timing
	const mountTiming = timingEvents.find((item) => item.name === `⚛ ${component} [mount]`).duration;

	return mountTiming;
};

const Update = (filename, component) => {
	const events = fs.readFileSync(filename, 'utf8');
	const model = new DevtoolsTimelineModel(events);
	const results = model.timelineModel();

	const userTiming = Array.from(results._namedTracks.values())[0];
	const timingEvents = userTiming.asyncEvents;

	// filter our component update data
	const updateData = timingEvents.filter((item) => {
		return item.name === `⚛ ${component} [update]`;
	});

	const updates = updateData.length;
	const avgUpdateTiming = updateData.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0) / updates;

	return avgUpdateTiming;
};

module.exports = {
	FPS,
	Mount,
	Update
};
