import { day1 } from "./days/day1";
import { day2 } from "./days/day1";
import { DayFunctions } from "./types";

const { argv } = process;
const days: Record<string, DayFunctions> = {
  day1,
  day2,
};

const runDay = async (day: number, part: number) => {
  console.log(day, typeof day);
  const dayFunc = days[`day${day}`][part];
  const result = await dayFunc();
  return result;
};

console.log(`Running Day ${argv[2]}`);

runDay(Number(argv[2]), argv[3] ? Number(argv[3]) : 1).then((result) => {
  console.log(`Done with result:`);
  console.log(result);
});
