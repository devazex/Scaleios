import { Client, EVENTS, Payload, GuildMember } from "../../..";

export default class {
	constructor(client: Client, payload: Payload, shard: number) {
		const { channel_id, guild_id, user_id, timestamp, member } = payload.d;
		(async () =>
			client.emit(
				EVENTS.TYPING_START,
				await client.channels.resolve(channel_id),
				client.guilds.get(guild_id),
				client.users.get(user_id),
				timestamp,
				new GuildMember(member),
				shard
			))();
	}
}
