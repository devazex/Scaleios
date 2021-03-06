import { User, IDMChannel, Client, CHANNELTYPES } from "../..";
import { Objex } from "@evolvejs/objex";
import { Channel } from "./Channel";

export class DMChannel extends Channel {
  public recipients: Objex<string, User> = new Objex();

  public lastMessage?: string;
  public lastPin?: number;
  public data!: IDMChannel;

  constructor(data: IDMChannel, client: Client) {
    super(data.id, CHANNELTYPES.Direct, client);
    Object.defineProperty(this, "data", {
      value: data,
      enumerable: false,
      writable: false,
    });

    this._handle();
  }

  private _handle() {
    if (!this.data) return;
    this.lastMessage = this.data.last_message_id || undefined;
    this.lastPin = this.data.last_pin_timestamp;

    return this;
  }
}
