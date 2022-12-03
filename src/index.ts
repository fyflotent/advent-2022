import { day1 } from "./day1/day1";

const { argv } = process;
const days: Record<number, [() => Promise<string>, () => Promise<string>]> = {
  1: day1,
};

const runDay = async (day: number, part: number) => {
  console.log(day, typeof day);
  const dayFunc = days[day][part];
  const result = await dayFunc();
  return result;
};

console.log(`Running Day ${argv[2]}`);

runDay(Number(argv[2]), argv[3] ? Number(argv[3]) : 1).then((result) => {
  console.log(`Done with result:`);
  console.log(result);
});
