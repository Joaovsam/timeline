
export function getDateOffset(dateStr) {
    const baseDate = new Date("2025-01-01");
    const currentDate = new Date(dateStr);
    const diff = (currentDate - baseDate) / (1000 * 60 * 60 * 24);
    return diff * 20;
}


export function getDateRange(items) {
    const minDate = new Date(Math.min(...items.map(i => new Date(i.start))));
    const maxDate = new Date(Math.max(...items.map(i => new Date(i.end))));

    const days = [];
    const current = new Date(minDate);

    while (current <= maxDate) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }

    return { min: minDate, max: maxDate, days };
}

export function calculateLeft(startDate, minDate, CELL_WIDTH) {
    const dayInMs = 1000 * 60 * 60 * 24;

    const start = new Date(startDate);
    const min = new Date(minDate);
    start.setHours(0, 0, 0, 0);
    min.setHours(0, 0, 0, 0);

    const diffDays = Math.round((start - min) / dayInMs);
    return diffDays * CELL_WIDTH;
}

export function calculateWidth(startDate, endDate, CELL_WIDTH) {
    const dayInMs = 1000 * 60 * 60 * 24;

    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const durationDays = Math.round((end - start) / dayInMs) + 1; // +1 para incluir o último dia
    return durationDays * CELL_WIDTH;
}

export function shiftDate(dateString, days) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

export function groupDaysByMonth(days) {
    const groups = [];
    let currentGroup = [];

    for (let i = 0; i < days.length; i++) {
        const currentDate = days[i];
        const prevDate = i > 0 ? days[i - 1] : null;

        const isSameMonth =
            prevDate &&
            currentDate.getMonth() === prevDate.getMonth() &&
            currentDate.getFullYear() === prevDate.getFullYear();

        if (!isSameMonth && currentGroup.length > 0) {
            groups.push(currentGroup);
            currentGroup = [];
        }

        currentGroup.push(currentDate);
    }

    if (currentGroup.length > 0) {
        groups.push(currentGroup);
    }

    return groups;
};