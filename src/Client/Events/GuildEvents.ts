import { BaseEvent } from "./BaseEvent";
import { Client } from "../Client";
import { Guild } from "../../Structures/Guild/Guild";

export class GuildEvents extends BaseEvent {
  constructor(client: Client, public guild: Guild, shard: number) {
    super(shard, client);

    this.guild = new (this.client.structures.get("Guild"))(guild.data, client);
  }
}
