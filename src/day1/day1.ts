import { getInput } from "../getInput";

export const day1 = async (): Promise<string> => {
  const input = await getInput(1);
  console.log("calculating day1");
  console.log(input.split("\r\n\r\n").length);
  return "input";
};
