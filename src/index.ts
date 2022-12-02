import { day1 } from "./day1/day1";

const { argv } = process;
const days: Record<number, () => Promise<string>> = {
  1: day1,
};

const runDay = async (day: number) => {
  console.log(day, typeof day);
  const dayFunc = days[day];
  const result = await dayFunc();
  console.log(result);
};

console.log(`Running Day ${argv[2]}`);

runDay(Number(argv[2])).then(() => {
  console.log("Done");
});
