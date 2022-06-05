import { Client } from "../../Client/Client";
import { CHANNELTYPES } from "../../Utils/Constants";

export class Channel {
  public client!: Client;
  public id: string;
  public type: CHANNELTYPES;

  constructor(id: string, type: CHANNELTYPES, client: Client) {
    Object.defineProperty(this, "client", {
      value: client,
      enumerable: false,
      writable: false,
    });
    this.id = id;
    this.type = type;
  }
}
