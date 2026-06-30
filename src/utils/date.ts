import { parseAbsoluteToLocal, DateValue } from "@internationalized/date";


const toDateStandard = (date: DateValue): string => {
    const year = date.year; // Assuming the date object has a 'year' property
    const month = date.month;
    const day = date.day;

    const hour = "hour" in date ? date.hour : 0; // Check if hour exists in the date object
    const minute = "minute" in date ? date.minute : 0;
    const second = "second" in date ? date.second : 0;

    const result = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    return result;
}

const toInputDate = (date: string) => {
    const formattedDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);

    return formattedDate;
}

export { toDateStandard, toInputDate };
