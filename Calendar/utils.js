// Calendar utils.js
//

const createYearList = () => {
	let years = [];
	let startingPoint = 1900;
	while (years.length < 200) {
		years = [...years, startingPoint.toString()];
		startingPoint++;
	}
	return years;
};

const getStartDayOfMonth = (firstDayOfWeek, month, year) => {
	let startDate;
	if (firstDayOfWeek === 0) {
		startDate = new Date(year, month, 1).getDay() + 1;
	} else if (firstDayOfWeek === 1) {
		startDate = new Date(year, month, 1).getDay();
	} else { // for locales where first day of week is Saturday
		startDate = new Date(year, month, 1).getDay() + 2;
	}

	return startDate === 0 ? 7 : startDate;
};

const isLeapYear = (year) => {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const isToday = (today, day, month, year) => {
	return (today.getDate() === day && today.getMonth() === month && today.getFullYear() === year);
};

export {
	createYearList,
	getStartDayOfMonth,
	isLeapYear,
	isToday
};
