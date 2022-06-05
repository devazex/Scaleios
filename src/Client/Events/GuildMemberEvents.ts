import { BaseEvent } from "./BaseEvent";
import { Client } from "../Client";
import { GuildMember } from "../../Structures/Guild/GuildMember";
import { Guild } from "../../Structures/Guild/Guild";
import { User } from "../../Structures/User/User";

export class GuildMemberEvent extends BaseEvent {
  constructor(
    client: Client,
    public member: GuildMember | User,
    public guild: Guild,
    shard: number
  ) {
    super(shard, client);

    if (member instanceof GuildMember) {
      this.member = new (this.client.structures.get("GuildMember"))(
        member.data
      );
    } else if (member instanceof User) {
      this.member = new (this.client.structures.get("User"))(member.data);
    }
  }
}
