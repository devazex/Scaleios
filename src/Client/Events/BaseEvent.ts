import { Client } from "../Client";
import { EvolveSocket } from "../Websocket/Websocket";

export class BaseEvent {
	constructor(private _shard: number, private _client: Client) {}

	get shard(): EvolveSocket {
		const shardConnection = this._client.sharder.connections.get(this._shard);
		if (!shardConnection) {
			throw this.client.transformer.error(
				"Internal Error (Shard Websocket Not Found)"
			);
		}
		return shardConnection;
	}

	get client(): Client {
		return this._client;
	}
}
