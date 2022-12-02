import { readFile } from "fs/promises";
import path from "path";

export const getInput = async (dayNumber: number): Promise<string> => {
  const dayFileName = path.join("src/input", `day${dayNumber}.txt`);
  console.log(`loading ${dayNumber} from ${dayFileName}`);
  const inputData = await readFile(dayFileName, "utf8");
  console.log("inputData");
  console.log(inputData.slice(0, 100));
  return inputData;
};
