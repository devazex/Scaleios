import { BaseEvent } from "./BaseEvent";
import { Client } from "../Client";
import { Channel } from "../../Structures/Channel/Channel";

export class ChannelEvents extends BaseEvent {
  constructor(client: Client, public channel: Channel, shard: number) {
    super(shard, client);
  }
}
