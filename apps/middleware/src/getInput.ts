import { readFile } from 'fs/promises';
import path from 'path';

export const getInput = async (dayNumber: number): Promise<string> => {
  const dayFileName = path.join('input', `day${dayNumber}.txt`);
  console.log(`loading ${dayNumber} from ${dayFileName}`);
  const inputData = await readFile(dayFileName, 'utf8');
  return inputData;
};
