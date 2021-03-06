import { Client, EVENTS, Payload, PresenceUpdate } from "../../..";

export default class {
  constructor(client: Client, payload: Payload, shard: number) {
    const presence = new PresenceUpdate(payload.d, client);
    client.emit(EVENTS.PRESENCE_UPDATE, presence, shard);
  }
}
