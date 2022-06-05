import { Client, EVENTS, Payload } from "../../..";

export default class {
  constructor(client: Client, payload: Payload, shard: number) {
    client.emit(EVENTS.VOICE_SERVER_UPDATE, payload, shard);
  }
}
