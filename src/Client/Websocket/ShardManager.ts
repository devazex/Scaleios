import { Objex } from "@evolvejs/objex";
import { promisify } from "util";
import { EventListener } from "../../Utils/EventListener";
import { ScaleiosBuilder } from "../Builder";
import { EvolveSocket } from "./Websocket";

export class ShardManager extends EventListener {
	public ScaleiosBuilder!: ScaleiosBuilder;
	public connections: Objex<number, EvolveSocket> = new Objex();
	constructor(ScaleiosBuilder: ScaleiosBuilder) {
		super();
		Object.defineProperty(this, "ScaleiosBuilder", {
			value: ScaleiosBuilder,
			enumerable: false,
			writable: false,
		});
	}

	public spawnAll(): void {
		for (let i = 0; i < this.ScaleiosBuilder.shards; i++) {
			promisify(setTimeout)(5000).then(() => {
				const socket = new EvolveSocket(this, i);
				this.connections.set(i, socket);
			});
		}
	}

	public destroy(id: number): void {
		this.connections.get(id)?.gateway.destroy();
	}

	public respawn(id: number): void {
		this.connections.get(id)?.gateway.reconnect();
	}

	public destroyAll(code = 0): void {
		const initialLastShardConnection = this.connections.size - 1;
		for (const [k, v] of this.connections) {
			v.gateway.destroy();

			if (k === initialLastShardConnection) {
				process.exit(code);
			}
		}
	}
	get ping(): number {
		return (
			this.connections.reduce<number>((a, b) => a + b.shardPing) /
			this.connections.size
		);
	}

	public getguildShardId(guildID: string): number {
		return (Number(guildID) >> 22) % this.connections.size;
	}
}
