/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/ban-types */
import { Client, Message } from "../../";
import { Objex } from "@evolvejs/objex";
import { MessageReaction } from "../../Structures/Message/MessageReaction";
import { EventListener } from "../EventListener";

export class BaseCollector extends EventListener {
  public listener!: (...args: any[]) => void;

  private _collected: Objex<string, Message | MessageReaction> = new Objex();
  constructor(public client: Client, public filter: Function) {
    super();
  }

  get collected(): Objex<string, Message | MessageReaction> {
    return this._collected;
  }
}
