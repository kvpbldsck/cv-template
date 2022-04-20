const MONTHS_COUNT = 12;

function calcWorkingPeriod(experience) {
    const start = new Date(experience.start);
    const end = experience.end
        ? new Date(experience.end)
        : new Date();

    const years = getYearsBetweenDates(start, end);
    const months = getMonthsBetweenDates(start, end);

    return stringifyWorkingPeriod(years, months);
}

function calcTotalWorkingPeriod(allExperience) {
    let totalYears = 0;
    let totalMonths = 0;

    for (const experience of allExperience) {
        const start = new Date(experience.start);
        const end = experience.end
            ? new Date(experience.end)
            : new Date();

        totalYears += getYearsBetweenDates(start, end);
        totalMonths += getMonthsBetweenDates(start, end);
    }

    totalYears = Math.floor(totalYears + totalMonths / MONTHS_COUNT);
    totalMonths = totalMonths % MONTHS_COUNT;

    return stringifyWorkingPeriod(totalYears, totalMonths);
}

function stringifyWorkingPeriod(years, months) {
    let yearsString = '';
    if (years > 1) {
        yearsString =`${years} years`;
    } else if (years > 0) {
        yearsString =`${years} year`;
    }

    let monthsString = '';
    if (months > 1) {
        monthsString =`${months} months`;
    } else if (months > 0) {
        monthsString =`${months} month`;
    }

    return `${yearsString} ${monthsString}`.trim();
}

function getPassedYears(dateOfBirthString) {
    const now = new Date();
    const then = new Date(dateOfBirthString);

    return getYearsBetweenDates(then, now);
}

function getYearsBetweenDates(first, second) {
    let years = second.getFullYear() - first.getFullYear();

    first.setFullYear(first.getFullYear() + years);
    if (first > second) {
        years -= 1;
    }

    return years;
}

function getMonthsBetweenDates(first, second) {
    const firstMonths = first.getMonth();
    const secondMonths = second.getMonth();

    return secondMonths >= firstMonths
        ? secondMonths - firstMonths
        : secondMonths - firstMonths + MONTHS_COUNT;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
    calcWorkingPeriod,
    calcTotalWorkingPeriod,
    getPassedYears,
    capitalize
}
