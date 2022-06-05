import { Client, EVENTS, Payload, User } from "../../..";

export default class {
  constructor(client: Client, payload: Payload, shard: number) {
    client.emit(EVENTS.USER_UPDATE, new User(payload.d), shard);
  }
}
