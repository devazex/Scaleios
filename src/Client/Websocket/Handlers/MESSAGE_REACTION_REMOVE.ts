import { Client, EVENTS, Payload, MessageReaction } from "../../..";
import { MessageReactionEvents } from "../../Events/MessageReactionEvents";

export default class {
  constructor(client: Client, payload: Payload, shard: number) {
    client.emit(
      EVENTS.MESSAGE_REACTION_REMOVE,
      new MessageReactionEvents(
        client,
        new MessageReaction(payload.d, client),
        shard
      )
    );
  }
}
