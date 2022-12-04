import { days } from "./days";

const { argv } = process;

const runDay = async (dayNumber: number, part: 1 | 2) => {
  const enteredDay = `day${dayNumber}`;
  const dayFunctions = Object.entries(days).find(
    ([day]) => day === enteredDay
  )?.[1];

  if (!dayFunctions) throw Error(`Day does not exist ${enteredDay}`);

  const dayFunc = dayFunctions[`part${part}`];
  const result = await dayFunc();
  return result;
};

console.log(`Running Day ${argv[2]}`);

runDay(Number(argv[2]), argv[3] && argv[3] === "2" ? 2 : 1).then((result) => {
  console.log(`Done with result:`);
  console.log(result);
});
