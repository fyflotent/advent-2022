import { getInput } from "../getInput";
import { DayFunctions } from "./types";

type Play = "rock" | "paper" | "scissors";

type SymbolConverter = Record<string, Play>;

const getMyPoints = (me: Play, them: Play): number => {
  if (me === "rock") {
    const myScore = 1;
    const resultScore: number = them === "rock" ? 3 : them === "paper" ? 0 : 6;
    return myScore + resultScore;
  } else if (me === "paper") {
    const myScore = 2;
    const resultScore: number = them === "rock" ? 6 : them === "paper" ? 3 : 0;
    return myScore + resultScore;
  } else {
    const myScore = 3;
    const resultScore: number = them === "rock" ? 0 : them === "paper" ? 6 : 3;
    return myScore + resultScore;
  }
};

const interpretGenerator =
  (myConverter: SymbolConverter, theirConverter: SymbolConverter) =>
  (input: string): number[] => {
    const matchStrings = input.split("\r\n");

    const matches: [Play, Play][] = matchStrings.map((matchString) => {
      const [theirSymbol, mySymbol] = matchString.split(" ");
      const myPlay = myConverter[mySymbol];
      const theirPlay = theirConverter[theirSymbol];
      if (!theirPlay || !myPlay)
        throw Error(
          `undefined play theirPlay: '${theirPlay}' myPlay: '${myPlay}'`
        );
      return [myPlay, theirPlay];
    });

    const matchResults = matches.map(([myPlay, theirPlay]) => {
      const t = getMyPoints(myPlay, theirPlay);

      return t;
    });

    return matchResults;
  };
const part1 = async () => {
  const interpreter = interpretGenerator(
    { X: "rock", Y: "paper", Z: "scissors" },
    { A: "rock", B: "paper", C: "scissors" }
  );
  const input = await getInput(2);
  return interpreter(input)
    .reduce((a, b) => a + b, 0)
    .toString();
};

const getWin = (theirPlay: Play): Play =>
  theirPlay === "rock" ? "paper" : theirPlay === "paper" ? "scissors" : "rock";
const getLoss = (theirPlay: Play): Play =>
  theirPlay === "rock" ? "scissors" : theirPlay === "paper" ? "rock" : "paper";
const getDraw = (theirPlay: Play): Play => theirPlay;

const getMyPlay = (mySymbol: string, theirPlay: Play): Play =>
  mySymbol === "X"
    ? getLoss(theirPlay)
    : mySymbol === "Y"
    ? getDraw(theirPlay)
    : getWin(theirPlay);

const interpretGeneratorPart2 =
  (theirConverter: SymbolConverter) =>
  (input: string): number[] => {
    const matchStrings = input.split("\r\n");

    const matches: [Play, Play][] = matchStrings.map((matchString) => {
      const [theirSymbol, mySymbol] = matchString.split(" ");
      const theirPlay = theirConverter[theirSymbol];
      const myPlay: Play = getMyPlay(mySymbol, theirPlay);
      if (!theirPlay || !myPlay)
        throw Error(
          `undefined play theirPlay: '${theirPlay}' myPlay: '${myPlay}'`
        );
      return [myPlay, theirPlay];
    });

    const matchResults = matches.map(([myPlay, theirPlay]) => {
      const t = getMyPoints(myPlay, theirPlay);

      return t;
    });

    return matchResults;
  };

const part2 = async () => {
  const interpreter = interpretGeneratorPart2({
    A: "rock",
    B: "paper",
    C: "scissors",
  });
  const input = await getInput(2);
  return interpreter(input)
    .reduce((a, b) => a + b, 0)
    .toString();
};

export const day2: DayFunctions = { part1, part2 };
