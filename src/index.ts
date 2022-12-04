import { day1 } from "./days/day1";
import { day2 } from "./days/day2";
import { day3 } from "./days/day3";
import { day4 } from "./days/day4";
import { DayFunctions } from "./types";

const { argv } = process;
const days: Record<string, DayFunctions> = {
  day1,
  day2,
  day3,
  day4,
};

const runDay = async (day: number, part: 1 | 2) => {
  const dayFunc = days[`day${day}`][`part${part}`];
  const result = await dayFunc();
  return result;
};

console.log(`Running Day ${argv[2]}`);

runDay(Number(argv[2]), argv[3] && argv[3] === "2" ? 2 : 1).then((result) => {
  console.log(`Done with result:`);
  console.log(result);
});
