import { parseAbsoluteToLocal, DateValue } from "@internationalized/date";

const standardTimeAndDate = (time: number) => {
    if (time < 10) { // check if time is less than 10, if yes then add 0 in front of the time
        return `0${time}`;
    } else {
        return time;
    }
}

const toDateStandard = (date: DateValue): string => {
    const year = date.year; // Assuming the date object has a 'year' property
    const month = date.month;
    const day = date.day;

    const hour = "hour" in date ? date.hour : 0; // Check if hour exists in the date object
    const minute = "minute" in date ? date.minute : 0;
    const second = "second" in date ? date.second : 0;

    const result = `${year}-${standardTimeAndDate(month)}-${standardTimeAndDate(day)} ${standardTimeAndDate(hour)}:${standardTimeAndDate(minute)}:${standardTimeAndDate(second)}`;

    return result;
}

const toInputDate = (date: string) => {
    const formattedDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);

    return formattedDate;
}

const convertTime = (isoDate: string) => {
    const dateObject = new Date(isoDate);

    const date = dateObject.toLocaleString("id-ID", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
    });

    return `${date} WIB`;
};

export { toDateStandard, toInputDate, convertTime };
