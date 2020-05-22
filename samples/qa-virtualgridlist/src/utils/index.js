import {ITEM_SPACING, RECORD_COUNT, MIN_HEIGHT, MIN_WIDTH, MODIFIER_FREQUENCY} from '../defaultConfiguration';

const createRecord = ({
	recordIndex = 0,
	modifierFrequency = MODIFIER_FREQUENCY,
	showSelection = false
} = {}) => {
	const
		modify = (recordIndex % modifierFrequency === 0),
		caption = `${recordIndex} ${(modify) ? ' This is the longest, most perfect caption' : ''}`,
		subCaption = (modify) ? 'Many people are saying that they have never seen a subcaption longer than this one' : 'Subcaption',
		color = Math.floor((Math.random() * 0xEFEFF0) + 0x101010).toString(16);

	return {
		caption,
		subCaption,
		selected: false,
		showSelection,
		src: `http://placehold.it/300x300/${color}/ffffff&text=Image ${recordIndex}`
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
		selectedItems: new Set(),
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
