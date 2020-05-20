import {ITEM_SPACING, RECORD_COUNT, MIN_HEIGHT, MIN_WIDTH, MODIFIER_FREQUENCY} from '../defaultConfiguration';

const createRecord = ({
	recordIndex = 0,
	modifierFrequency = MODIFIER_FREQUENCY,
	selectionOverlayShowing = false
} = {}) => {
	const
		modify = (recordIndex % modifierFrequency === 0),
		caption = `${recordIndex} ${(modify) ? ' with long title' : ''}`,
		subCaption = (modify) ? 'Lorem ipsum dolor sit amet' : 'Subtitle',
		color = Math.floor((Math.random() * 0xEFEFF0) + 0x101010).toString(16);

	return {
		caption,
		subCaption,
		selected: false,
		selectionOverlayShowing,
		source: 'http://placehold.it/300x300/' + color + '/ffffff&text=Image ' + recordIndex
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
