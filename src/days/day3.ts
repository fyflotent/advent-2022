import { getInput } from "../getInput";
import { DayFunctions } from "../types";

const splitString = (entry: string): [Set<string>, Set<string>] => {
  return [
    new Set(entry.slice(0, entry.length / 2).split("")),
    new Set(entry.slice(entry.length / 2).split("")),
  ];
};

const calculateValue = (char: string) =>
  char === char.toUpperCase()
    ? char.charCodeAt(0) - 64 + 26
    : char.charCodeAt(0) - 96;

const part1 = async () => {
  const input = await getInput(3);
  const stringArr = input.split("\r\n");
  const splitEntries: Array<[Set<string>, Set<string>]> = stringArr.map(
    (entry) => splitString(entry)
  );

  const charCodes = splitEntries.map(([set1, set2]) => {
    const char = [...set1.values()].find((val) => set2.has(val));
    if (!char) throw Error("Null t");
    return calculateValue(char);
  });
  return charCodes.reduce((a, b) => a + b, 0).toString();
};

const createGroups = (entries: string[]): Set<string>[][] =>
  entries.reduce((groups, currentEntry, idx) => {
    const currentGroup = groups.pop() ?? [];
    const newGroups = [
      ...groups,
      [...currentGroup, new Set(currentEntry.split(""))],
    ];
    return (idx + 1) % 3 === 0 && idx != entries.length - 1
      ? [...newGroups, []]
      : newGroups;
  }, new Array<Set<string>[]>());

const part2 = async () => {
  const input = await getInput(3);
  const stringArr = input.split("\r\n");
  const groups = createGroups(stringArr);

  const groupValues = groups.map((group) => {
    const [member1, member2, member3] = group;
    if (!member1 || !member2 || !member3)
      throw Error(`got new undefined ${member1} ${member2} ${member3}`);
    const sharedChar = [...member1.values()].find(
      (value) => member2.has(value) && member3.has(value)
    );

    if (!sharedChar) throw Error(`missing char`);
    return calculateValue(sharedChar);
  });
  return groupValues.reduce((a, b) => a + b, 0).toString();
};

export const day3: DayFunctions = { part1, part2 };
