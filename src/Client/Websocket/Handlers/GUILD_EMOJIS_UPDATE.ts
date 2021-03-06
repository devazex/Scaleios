import {
  Client,
  EVENTS,
  Payload,
  Emoji,
  Endpoints,
  Guild,
} from "../../..";
import { Objex } from "@evolvejs/objex";
import { GuildEmojiEvents } from "../../Events/GuildEmojiEvents";
import { IGuild } from "../../../Interfaces/GuildOptions";

export default class {
  constructor(client: Client, payload: Payload, shard: number) {
    const { guild_id, emojis } = payload.d;

    (async () => {
      const guild = await client.rest
        .endpoint(Endpoints.GUILD)
        .get<IGuild>(guild_id);
      const emojiObjex: Objex<string | null, Emoji> = new Objex();
      for (const emoji of emojis) {
        emojiObjex.set(emoji.id, new Emoji(emoji));
        if (client.options.enableEmojiCache)
          client.emojis.set(emoji.id, new Emoji(emoji));
      }
      client.emit(
        EVENTS.GUILD_EMOJIS_UPDATE,
        new GuildEmojiEvents(
          client,
          emojiObjex,
          new Guild(guild, client),
          shard
        )
      );
    })();
  }
}
