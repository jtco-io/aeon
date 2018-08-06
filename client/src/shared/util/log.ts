import { Config } from "../../config";

const cyan = "\x1b[36m";
const white = "\x1b[1m";

export class Logger {
  constructor() {}

  public twoTone(
    firstMessage: string,
    secondMessage: string,
    firstColor: string = cyan,
    secondColor: string = white,
  ) {
    const message = [firstColor, firstMessage];
    if (secondMessage) {
      message.push(secondColor);
      message.push(secondMessage);
    }
    this.log(message);
  }

  private log(message: string[]) {
    console.log(...message);
  }
}
export default Logger;
