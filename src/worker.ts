import { DAYS_OF_WEEK, TIMES } from "./constants";
import data from "./data.json";

let timeKeys: string[] = [];

for (let dayOfWeek = 0; dayOfWeek < DAYS_OF_WEEK.length; dayOfWeek++) {
  const day = DAYS_OF_WEEK[dayOfWeek];

  for (let index = 0; index < TIMES.length; index++) {
    const time = TIMES[index];
    const timeKey = day + " " + time;
    timeKeys.push(timeKey);
  }
}

const timeKeysMap: Map<string, number> = new Map();

for (const day of DAYS_OF_WEEK) {
  for (const time of TIMES) {
    const timeKey = `${day} ${time}`;
    timeKeysMap.set(timeKey, 0);
  }
}

for (const time of timeKeys) {
  timeKeysMap.set(time, 0);
}

let maxValue = 0;

function formatHour(hour: number): string {
  const period: string = hour < 12 ? "AM" : "PM";
  const formattedHour: number = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour} ${period}`;
}

for (let index = 0; index < data.length; index++) {
  const element = data[index];
  const dateElement = new Date(element);
  const day = DAYS_OF_WEEK[dateElement.getDay()];
  let hours: string | number = dateElement.getHours();

  hours = formatHour(hours);

  const key = day + " " + hours;

  const value = timeKeysMap.get(key);

  if (value && value > maxValue) {
    maxValue = value + 1;
  }
  if (value !== undefined) {
    timeKeysMap.set(key, value + 1);
  }
}

onmessage = function () {
  const result = { timeKeysMap, maxValue };
  postMessage(result);
};

export {};
