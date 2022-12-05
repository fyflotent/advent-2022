import { trpcClient } from './client';

const { argv } = process;

const runDay = async (dayNumber: number, part: 1 | 2) => {
  const result = await trpcClient.getDayResultByNumber.query({
    dayNumber,
    part: `part${part}`,
  });

  return result;
};

console.log(`Running Day ${argv[2]}`);

runDay(Number(argv[2]), argv[3] && argv[3] === '2' ? 2 : 1).then((result) => {
  console.log('Done with result:');
  console.log(result);
});
