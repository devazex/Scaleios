import {
  Client,
  EVENTS,
  Payload,
  Role,
  Endpoints,
  IGuild,
} from "../../..";
import { Guild } from "../../../Structures/Guild/Guild";
import { GuildRoleEvents } from "../../Events/GuildRoleEvents";

export default class {
  constructor(client: Client, payload: Payload, shard: number) {
    (async () => {
      const { guild_id, role } = payload.d;
      const guild = new Guild(
        await client.rest.endpoint(Endpoints.GUILD).get<IGuild>(guild_id),
        client
      );

      client.emit(
        EVENTS.GUILD_ROLE_UPDATE,
        new GuildRoleEvents(client, new Role(role), guild, shard)
      );
    })();
  }
}
