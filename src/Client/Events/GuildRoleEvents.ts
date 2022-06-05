import { BaseEvent } from "./BaseEvent";
import { Client } from "../Client";
import { Role } from "../../Structures/Guild/Role";
import { Guild } from "../../Structures/Guild/Guild";

export class GuildRoleEvents extends BaseEvent {
  constructor(
    client: Client,
    public role: Role | undefined,
    public guild: Guild,
    shard: number
  ) {
    super(shard, client);

    if (role) this.role = new (this.client.structures.get("Role"))(role.data);
    this.guild = new (this.client.structures.get("Guild"))(guild.data, client);
  }
}
