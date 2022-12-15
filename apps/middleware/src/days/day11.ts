import { getInput } from '../getInput';
import { splitLines } from './textUtils';
import { DayFunctions } from './types';
import { parse } from 'yaml';
import { last } from './arrayUtils';

interface ParsedMonkey {
  'Starting items': string;
  Operation: string;
  Test: {
    test: string;
    'If true': string;
    'If false': string;
  };
}

type ParsedOperation = (old: number) => number;
type ParsedTest = (newWorry: number) => boolean;

interface Monkey {
  items: number[];
  itemCount: number;
  operation: ParsedOperation;
  test: ParsedTest;
  testTrue: string;
  testFalse: string;
}

const parseOperation = (test: string): ParsedOperation => {
  const [_, __, operand1, operation, operand2] = test.split(' ');
  const parseOrOld = (parseable: string, old: number): number =>
    isNaN(parseInt(parseable)) ? old : parseInt(parseable);
  switch (operation) {
    case '+':
      return (old: number) => {
        return parseOrOld(operand1, old) + parseOrOld(operand2, old);
      };
    case '*':
      return (old: number) => {
        return parseOrOld(operand1, old) * parseOrOld(operand2, old);
      };
    default:
      console.error('default hit');
      return (old: number) =>
        parseOrOld(operand1, old) + parseOrOld(operand2, old);
  }
};

const getTestNumber = (test: string) => parseInt(last(test.split(' ')) ?? '1');

const parseTest = (test: string): ParsedTest => {
  const testNumber = getTestNumber(test);
  return (newWorry: number) => {
    return newWorry % testNumber === 0;
  };
};

const monkeyInspectItem = (
  currentMonkeyName: string,
  currentMonkey: Monkey,
  monkies: Record<string, Monkey>
): Record<string, Monkey> => {
  return currentMonkey.items.reduce((currentMonkies, item) => {
    const newItem = Math.floor(currentMonkey.operation(item) / 3);
    const monkeyToUpdate = currentMonkey.test(newItem)
      ? currentMonkey.testTrue
      : currentMonkey.testFalse;
    return {
      ...currentMonkies,
      [currentMonkeyName]: {
        ...currentMonkies[currentMonkeyName],
        items: currentMonkies[currentMonkeyName].items.slice(1),
        itemCount: currentMonkies[currentMonkeyName].itemCount + 1,
      },
      [monkeyToUpdate]: {
        ...currentMonkies[monkeyToUpdate],
        items: [...currentMonkies[monkeyToUpdate].items, newItem],
      },
    };
  }, monkies);
};

const doMonkyBusiness = (monkies: Record<string, Monkey>) => {
  return [...Object.keys(monkies)].reduce((currentMonkies, monkeyTurn) => {
    const currentMonk = currentMonkies[monkeyTurn];
    const newMonkies = monkeyInspectItem(
      monkeyTurn,
      currentMonk,
      currentMonkies
    );
    return {
      ...newMonkies,
      [monkeyTurn]: {
        ...newMonkies[monkeyTurn],
      },
    };
  }, monkies);
};

// input text file was converted a bit to be yaml
const part1 = async (optionalInput?: string) => {
  const input = optionalInput ?? (await getInput(11));
  const parsedMonkies: Record<string, ParsedMonkey> = parse(input);
  const monkies: Record<string, Monkey> = [
    ...Object.entries<ParsedMonkey>(parsedMonkies),
  ].reduce<Record<string, Monkey>>((record, [monkeyName, parsedMonkey]) => {
    return {
      ...record,
      [monkeyName]: {
        items: parsedMonkey['Starting items']
          .split(', ')
          .map((item) => parseInt(item)),
        operation: parseOperation(parsedMonkey.Operation),
        test: parseTest(parsedMonkey.Test.test),
        testTrue: `Monkey ${last(parsedMonkey.Test['If true'].split(' '))}`,
        testFalse: `Monkey ${last(parsedMonkey.Test['If false'].split(' '))}`,
        itemCount: 0,
      },
    };
  }, {});

  const sortedSimulation = [
    ...Object.values<Monkey>(
      [...new Array(20)].reduce(
        (currentMonkies) => doMonkyBusiness(currentMonkies),
        monkies
      )
    ),
  ].sort((a, b) => (a.itemCount > b.itemCount ? 1 : -1));
  return `${
    sortedSimulation[sortedSimulation.length - 1].itemCount *
    sortedSimulation[sortedSimulation.length - 2].itemCount
  }`;
};

const monkeyInspectItemVeryWorried = (
  currentMonkeyName: string,
  currentMonkey: Monkey,
  monkies: Record<string, Monkey>,
  superModulo: number
): Record<string, Monkey> => {
  return currentMonkey.items.reduce((currentMonkies, item) => {
    const newItem = currentMonkey.operation(item);
    const monkeyToUpdate = currentMonkey.test(newItem)
      ? currentMonkey.testTrue
      : currentMonkey.testFalse;
    return {
      ...currentMonkies,
      [currentMonkeyName]: {
        ...currentMonkies[currentMonkeyName],
        items: currentMonkies[currentMonkeyName].items.slice(1),
        itemCount: currentMonkies[currentMonkeyName].itemCount + 1,
      },
      [monkeyToUpdate]: {
        ...currentMonkies[monkeyToUpdate],
        items: [...currentMonkies[monkeyToUpdate].items, newItem % superModulo],
      },
    };
  }, monkies);
};

const doMonkyBusinessVeryWorried = (
  monkies: Record<string, Monkey>,
  superModulo: number
) => {
  return [...Object.keys(monkies)].reduce((currentMonkies, monkeyTurn) => {
    const currentMonk = currentMonkies[monkeyTurn];
    const newMonkies = monkeyInspectItemVeryWorried(
      monkeyTurn,
      currentMonk,
      currentMonkies,
      superModulo
    );
    return {
      ...newMonkies,
      [monkeyTurn]: {
        ...newMonkies[monkeyTurn],
      },
    };
  }, monkies);
};

const part2 = async (optionalInput?: string) => {
  const input = optionalInput ?? (await getInput(11));
  const parsedMonkies: Record<string, ParsedMonkey> = parse(input);
  const [superModulo, monkies]: [number, Record<string, Monkey>] = [
    ...Object.entries<ParsedMonkey>(parsedMonkies),
  ].reduce<[number, Record<string, Monkey>]>(
    ([smodulo, record], [monkeyName, parsedMonkey]) => {
      return [
        smodulo * getTestNumber(parsedMonkey.Test.test),
        {
          ...record,
          [monkeyName]: {
            items: parsedMonkey['Starting items']
              .split(', ')
              .map((item) => parseInt(item)),
            operation: parseOperation(parsedMonkey.Operation),
            test: parseTest(parsedMonkey.Test.test),
            testTrue: `Monkey ${last(parsedMonkey.Test['If true'].split(' '))}`,
            testFalse: `Monkey ${last(
              parsedMonkey.Test['If false'].split(' ')
            )}`,
            itemCount: 0,
          },
        },
      ];
    },
    [1, {}]
  );

  const t = [...new Array(10000)].reduce(
    (currentMonkies) => doMonkyBusinessVeryWorried(currentMonkies, superModulo),
    monkies
  );
  console.log(superModulo, t);

  const sortedSimulation = [...Object.values<Monkey>(t)].sort((a, b) =>
    a.itemCount > b.itemCount ? 1 : -1
  );
  return `${
    sortedSimulation[sortedSimulation.length - 1].itemCount *
    sortedSimulation[sortedSimulation.length - 2].itemCount
  }`;
};

export const day11: DayFunctions = { part1, part2 };
