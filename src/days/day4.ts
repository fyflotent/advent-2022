import { getInput } from "../getInput";
import { DayFunctions } from "../types";

const getPairs = (inputLines: string[]) =>
  inputLines.map((pair) => {
    const [member1, member2] = pair.split(",");
    const [member1Left, member1Right] = member1.split("-").map((a) => {
      return parseInt(a);
    });
    const [member2Left, member2Right] = member2.split("-").map((a) => {
      return parseInt(a);
    });

    const allNumbers = [member1Left, member1Right, member2Left, member2Right];

    if (!allNumbers.every((m) => m !== undefined && !isNaN(m)))
      throw Error(
        `${[
          member1Left,
          member1Right,
          member2Left,
          member2Right,
        ].toString()} ${member1} ${member2}`
      );
    return allNumbers;
  });

const part1 = async () => {
  const input = await getInput(4);
  const splitInput = input.split("\r\n");
  const pairs = getPairs(splitInput);

  return pairs
    .filter(([member1Left, member1Right, member2Left, member2Right]) => {
      return (
        (member1Left >= member2Left && member1Right <= member2Right) ||
        (member1Left <= member2Left && member1Right >= member2Right)
      );
    })
    .length.toString();
};

const numberInRange = (x: number, rangeLeft: number, rangeRight: number) =>
  x >= rangeLeft && x <= rangeRight;

const part2 = async () => {
  const input = await getInput(4);
  const splitInput = input.split("\r\n");
  const pairs = getPairs(splitInput);

  return pairs
    .filter(([member1Left, member1Right, member2Left, member2Right]) => {
      return (
        numberInRange(member1Left, member2Left, member2Right) ||
        numberInRange(member1Right, member2Left, member2Right) ||
        numberInRange(member2Left, member1Left, member1Right) ||
        numberInRange(member2Right, member1Left, member1Right)
      );
    })
    .length.toString();
};

export const day4: DayFunctions = { part1, part2 };
