import { Client, EVENTS, Payload, User, Endpoints } from "../../..";
import { IGuild } from "../../../Interfaces/GuildOptions";
import { Guild } from "../../../Structures/Guild/Guild";
import { GuildBanEvents } from "../../Events/GuildBanEvents";

export default class {
  constructor(client: Client, payload: Payload, shard: number) {
    (async () => {
      // eslint-disable-next-line prefer-const
      let { guild_id, user } = payload.d;
      const guild = await client.rest
        .endpoint(Endpoints.GUILD)
        .get<IGuild>(guild_id);
      user = new User(user);
      client.emit(
        EVENTS.GUILD_BAN_REMOVE,
        new GuildBanEvents(client, user, new Guild(guild, client), shard)
      );
    })();
  }
}
