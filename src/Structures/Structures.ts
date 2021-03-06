import { Client } from "../Client/Client";
import { CategoryChannel } from "./Channel/CategoryChannel";
import { DMChannel } from "./Channel/DMChannel";
import { NewsChannel } from "./Channel/NewsChannel";
import { StoreChannel } from "./Channel/StoreChannel";
import { TextChannel } from "./Channel/TextChannel";
import { VoiceChannel } from "./Channel/VoiceChannel";
import { Emoji } from "./Guild/Emoji";
import { Guild } from "./Guild/Guild";
import { GuildMember } from "./Guild/GuildMember";
import { Role } from "./Guild/Role";
import { VoiceState } from "./Guild/VoiceState";
import { Message } from "./Message/Message";
import { MessageReaction } from "./Message/MessageReaction";
import { ClientStatus } from "./Miscs/ClientStatus";
import { PresenceUpdate } from "./User/PresenceUpdate";
import { User } from "./User/User";

export class Structures {
	public structures: Classes = {
		Emoji,
		DMChannel,
		TextChannel,
		VoiceChannel,
		CategoryChannel,
		NewsChannel,
		StoreChannel,
		GuildMember,
		Guild,
		Message,
		MessageReaction,
		PresenceUpdate,
		ClientStatus,
		VoiceState,
		Role,
		User,
	};
	private client!: Client;
	constructor(client: Client) {
		Object.defineProperty(this, "client", {
			value: client,
			enumerable: false,
			writable: false,
		});
	}

	public get<K extends keyof Classes>(name: K): Classes[K] {
		if (!this.structures[name])
			throw this.client.transformer.error("Invalid Structure Name");
		return this.structures[name];
	}

	public extend<K extends keyof Classes, T extends Classes[K]>(
		name: K,
		extender: (structure: Classes[K]) => T
	): T {
		try {
			const structure = this.get<K>(name);
			const extended = extender(structure);

			this.structures[name] = extended;
			return extended;
		} catch (e) {
			throw this.client.transformer;
		}
	}
}

export interface Classes {
	Emoji: typeof Emoji;
	DMChannel: typeof DMChannel;
	TextChannel: typeof TextChannel;
	VoiceChannel: typeof VoiceChannel;
	CategoryChannel: typeof CategoryChannel;
	NewsChannel: typeof NewsChannel;
	StoreChannel: typeof StoreChannel;
	GuildMember: typeof GuildMember;
	Guild: typeof Guild;
	Message: typeof Message;
	MessageReaction: typeof MessageReaction;
	PresenceUpdate: typeof PresenceUpdate;
	ClientStatus: typeof ClientStatus;
	VoiceState: typeof VoiceState;
	Role: typeof Role;
	User: typeof User;
}
