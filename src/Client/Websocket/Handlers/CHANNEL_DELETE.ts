import { Client, EVENTS, Payload } from "../../..";
import { ChannelEvents } from "../../Events/ChannelEvents";

export default class {
	constructor(client: Client, payload: Payload, shard: number) {
		(async () => {
			const o = await client.channels.resolve(payload.d.id);
			if (client.options.enableChannelCache)
				client.channels.delete(o!!.id, true);
			client.emit(EVENTS.CHANNEL_DELETE, new ChannelEvents(client, o!!, shard));
		})();
	}
}
