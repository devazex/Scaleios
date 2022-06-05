import { BaseEvent } from "./BaseEvent";
import { Client } from "../Client";
import { MessageReaction } from "../../Structures/Message/MessageReaction";

export class MessageReactionEvents extends BaseEvent {
  constructor(
    client: Client,
    public reaction: MessageReaction,
    shard: number
  ) {
    super(shard, client);

    this.reaction = new (client.structures.get("MessageReaction"))(
      reaction.data,
      client
    );
  }
}
