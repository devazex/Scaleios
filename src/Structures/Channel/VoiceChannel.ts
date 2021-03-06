import {
	Overwrite,
	Guild,
	CategoryChannel,
	IVoiceChannel,
	Client,
	CHANNELTYPES,
} from "../..";
import { Objex } from "@evolvejs/objex";
import { Channel } from "./Channel";

export class VoiceChannel extends Channel {
	public overwrites: Objex<string, Overwrite> = new Objex();

	public guildId?: Guild;
	public position!: number;
	public name!: string;
	public bitrate!: number;
	public userLimit!: number;
	public parentId?: string;
	public data!: IVoiceChannel;

	constructor(data: IVoiceChannel, client: Client) {
		super(data.id, CHANNELTYPES.Voice, client);
		Object.defineProperty(this, "data", {
			value: data,
			enumerable: false,
			writable: false,
		});
		this._handle();
	}

	private _handle() {
		if (!this.data) return;
		this.guildId = this.client.guilds.get(this.data.guild_id);
		this.position = this.data.position;
		this.name = this.data.name;
		this.bitrate = this.data.bitrate;
		this.userLimit = this.data.user_limit;
		this.parentId = this.data.parent_id ?? undefined;
		return this;
	}
}
