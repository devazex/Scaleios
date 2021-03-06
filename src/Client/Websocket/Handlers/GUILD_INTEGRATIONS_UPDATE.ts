import { Client, EVENTS, Payload, Endpoints } from "../../..";
import { IGuild } from "../../../Interfaces/GuildOptions";
import { Guild } from "../../../Structures/Guild/Guild";
import { GuildIntegrationEvents } from "../../Events/GuildIntegrationEvents";

export default class {
  constructor(client: Client, payload: Payload, shard: number) {
    (async () => {
      const guild = new Guild(
        await client.rest
          .endpoint(Endpoints.GUILD)
          .get<IGuild>(payload.d.guild),
        client
      );
      client.emit(
        EVENTS.GUILD_INTEGRATIONS_UPDATE,
        new GuildIntegrationEvents(client, guild, shard)
      );
    })();
  }
}
