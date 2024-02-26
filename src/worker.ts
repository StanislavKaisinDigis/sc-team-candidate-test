import { DAYS_OF_WEEK, TIMES } from "./constants";
import data from "./data.json";

let timeKeys: string[] = [];

for (let j = 0; j < DAYS_OF_WEEK.length; j++) {
  const day = DAYS_OF_WEEK[j];
  for (let index = 0; index < TIMES.length; index++) {
    const time = TIMES[index];
    const timeKey = day + " " + time;
    timeKeys.push(timeKey);
  }
}

const timeKeysMap = new Map();

for (const iterator of timeKeys) {
  timeKeysMap.set(iterator, 0);
}

let maxValue = 0;

for (let index = 0; index < data.length; index++) {
  const element = data[index];
  const dateElement = new Date(element);
  const day = DAYS_OF_WEEK[dateElement.getDay()];
  let hours: string | number = dateElement.getHours();
  if (hours === 0) {
    hours = 12 + " AM";
  } else if (hours < 12) {
    hours = hours + " AM";
  } else if (hours === 12) {
    hours = 12 + " PM";
  } else {
    hours = hours - 12 + " PM";
  }

  const key = day + " " + hours;
  const value = timeKeysMap.get(key);
  if (value > maxValue) {
    maxValue = value + 1;
  }
  timeKeysMap.set(key, value + 1);
}

onmessage = function (event) {
  const result = { timeKeysMap, maxValue };
  postMessage(result);
};

export {};
