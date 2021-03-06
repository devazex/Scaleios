import { Client, EVENTS, Payload } from "../../..";
import { ChannelResolver } from "../../../Utils/Constants";
import { Endpoints } from "../../../Utils/Endpoints";
import { ChannelEvents } from "../../Events/ChannelEvents";

export default class {
  constructor(client: Client, payload: Payload, shard: number) {
    const { channel_id } = payload.d(async () => {
      const channel = await client.rest
        .endpoint(Endpoints.CHANNEL)
        .get<any>(channel_id);
      client.emit(
        EVENTS.CHANNEL_PINS_UPDATE,
        new ChannelEvents(
          client,
          new ChannelResolver[channel.type](channel, client),
          shard
        )
      );
    });
  }
}
