import { ScaleiosBuilder, Client, EVENTS } from "../../dist";
import { argv } from "process";

const client: Client = new ScaleiosBuilder()
	.setToken(argv[2] ?? process.env.DISCORD_TOKEN ?? "...")
	.build();

client.sharder.on("shardSpawn", (id: number) => {
	console.log(`[Shard: ${id}] => Spawned`);
});

client.sharder.on("shardDestroy", (id: number) => {
	console.log(`[Shard: ${id}] => Destroyed`);
});

client.on("clientReady", () => {
	console.log("[Client: Client] => Ready");
});

client.on(EVENTS.MESSAGE_CREATE, console.log);
