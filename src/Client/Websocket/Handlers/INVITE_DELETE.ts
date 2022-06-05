import { Client, EVENTS, Payload, Invite } from "../../..";

export default class {
  constructor(client: Client, payload: Payload, shard: number) {
    const invite = new Invite(payload.d, client);
    client.emit(EVENTS.INVITE_DELETE, invite, shard);
  }
}
