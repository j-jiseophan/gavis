import { HistoryEvent, RequestEvent } from "./types";
import { uuidv4 } from "./utils";

class LogHistory {
  private array: HistoryEvent[];

  constructor() {
    this.array = [];
  }

  public get values(): HistoryEvent[] {
    return this.array;
  }

  public push(event: RequestEvent) {
    if (this.array.length > 10) {
      this.array.shift();
    }
    this.array.push({ ...event, id: uuidv4() });
  }

  public getLast() {
    return this.array[this.array.length - 1];
  }

  public clear() {
    this.array = [];
  }
}

export const logHistory = new LogHistory();
