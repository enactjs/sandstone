import {ITEM_SPACING, RECORD_COUNT, MIN_HEIGHT, MIN_WIDTH, MODIFIER_FREQUENCY} from '../defaultConfiguration';

const svgGenerator = (width, height, bgColor, textColor, customText) => (
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' class='img-fluid rounded mx-auto d-block' width='${width}' height='${height}'%3E%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='4rem' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
);

const createRecord = ({
	recordIndex = 0,
	modifierFrequency = MODIFIER_FREQUENCY,
	showSelection = false
} = {}) => {
	const
		modify = (recordIndex % modifierFrequency === 0),
		caption = `${recordIndex}${(modify) ? ' This is the longest, most perfect caption' : ''}`,
		subCaption = (modify) ? 'Many people are saying that they have never seen a subcaption longer than this one' : 'Subcaption',
		color = Math.floor((Math.random() * 0xEFEFF0) + 0x101010).toString(16);

	return {
		caption,
		subCaption,
		selected: false,
		showSelection,
		src: svgGenerator(300, 300, color, 'ffffff', `Image ${recordIndex}`)
	};
};

const initializeRecords = ({
	dataSize = RECORD_COUNT,
	modifierFrequency = MODIFIER_FREQUENCY
} = {}) => {
	const records = {
		data: {},
		dataSize,
		dataOrder: [],
		minHeight: MIN_HEIGHT,
		minWidth: MIN_WIDTH,
		selectedItems: [],
		showOverlay: false,
		spacing: ITEM_SPACING
	};

	for (let recordIndex = 0; recordIndex < dataSize; ++recordIndex) {
		records.dataOrder.push(recordIndex);
		records.data[recordIndex] = createRecord({
			recordIndex,
			modifierFrequency
		});
	}

	return records;
};

export default createRecord;
export {
	createRecord,
	initializeRecords
};
