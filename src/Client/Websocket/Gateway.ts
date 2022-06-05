/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import { EvolveSocket } from "./Websocket";
import { OPCODE, Heartbeat, Identify, VoiceStateUpdate } from "../..";
import { Payload } from "../../Interfaces/Interfaces";
import { VoiceGateway } from "./Voice/VoiceGateway";
import { EVENTS } from "../../Utils/Constants";
import { VoiceState } from "../../Structures/Guild/VoiceState";

export class Gateway {
	public data!: string;
	public ws!: EvolveSocket;
	public launchedShards: Set<number> = new Set();
	public voice!: VoiceGateway;
	public voiceStateUpdate!: VoiceState;
	public voiceServerUpdate!: Payload;
	public shard!: number;
	public lastPingTimeStamp!: number;

	public async init(data: string, ws: EvolveSocket): Promise<void> {
		this.data = data;
		this.ws = ws;
		this.shard = this.ws.shard;

		try {
			let payload: Payload;
			if (this.ws.manager.ScaleiosBuilder.encoding == "json") {
				payload = JSON.parse(data.toString());
			} else {
				try {
					payload = require("erlpack").unpack(
						Buffer.from(data.toString(), "binary")
					);
				} catch (e) {
					throw this.ws.manager.ScaleiosBuilder.client.transformer;
				}
			}
			const { op, t, d } = payload;
			if (!d) return;

			if (op === OPCODE.Hello) {
				// Command: Heartbeat
				this._spawn(this.shard);

				setInterval(() => {
					this.lastPingTimeStamp = Date.now();
					this.ws.send(Heartbeat);
				}, d.heartbeat_interval);
			} else if (op === OPCODE.Reconnect) {
				this.ws.manager.connections.set(
					this.shard,
					new EvolveSocket(this.ws.manager, this.shard)
				);
				this.reconnect();
				this.ws.close();
			} else if (t) {
				this.ws.manager.ScaleiosBuilder.client.emit(EVENTS.RAW, {
					name: t,
					payload,
					shard: this.shard,
				});
				try {
					const { default: handler } = await import(`./Handlers/${t}`);
					new handler(this.ws.manager.ScaleiosBuilder.client, payload, this.shard);
				} catch (err) {
					this.ws.manager.ScaleiosBuilder.client.transformer;
				}
			}
		} catch (e) {
			this.ws.manager.ScaleiosBuilder.client.transformer;
		}
	}

	private _spawn(shard: number): void {
		Identify.d.token = this.ws.manager.ScaleiosBuilder.client.token;
		Identify.d.activity = this.ws.manager.ScaleiosBuilder.activity;
		Identify.d.shard = [shard, this.ws.manager.ScaleiosBuilder.shards];
		Identify.d.intents = this.ws.manager.ScaleiosBuilder.intents;

		if (this._debug(shard)) {
			this.ws.send(Identify);
		}
	}

	public destroy(): void {
		this.ws.manager.connections.delete(this.shard);
		this.ws.manager.emit(EVENTS.SHARD_DESTROY, this.shard);
		this.ws.close();
	}

	private _debug(shard: number): boolean {
		this.ws.manager.emit(EVENTS.SHARD_SPAWN, shard);
		return true;
	}

	public reconnect(): void {
		const payload: Payload = {
			op: OPCODE.Resume,
			d: {
				token: this.ws.manager.ScaleiosBuilder.client.token,
				session_id: this.ws.manager.ScaleiosBuilder.client.sessionID,
				seq: this.ws.seq,
			},
		};
		this.ws.send(payload);
	}

	public sendVoiceStateUpdate(
		guildID: string,
		channelID: string,
		options?: {
			self_deaf: boolean;
			self_mute: boolean;
		},
		initialize = false
	): void {
		VoiceStateUpdate.d.guild_id = guildID;
		VoiceStateUpdate.d.channel_id = channelID;
		if (options) {
			VoiceStateUpdate.d.self_deaf = options.self_deaf;
			VoiceStateUpdate.d.self_mute = options.self_mute;
		}

		this.ws.send(VoiceStateUpdate);

		this.ws.manager.ScaleiosBuilder.client.on(EVENTS.VOICE_STATE_UPDATE, (pk) => {
			if (pk.member.user.id !== this.ws.manager.ScaleiosBuilder.client.user.id) return;
			this.voiceStateUpdate = pk;
			if (this.voiceStateUpdate && this.voiceServerUpdate && !this.voice) {
				this.voice = new VoiceGateway(this);
				this.voice.emit(
					EVENTS.PACKET_READY,
					(this.voiceStateUpdate, this.voiceServerUpdate)
				);
				if (initialize) this.voice.init();
			}
		});

		this.ws.manager.ScaleiosBuilder.client.on(EVENTS.VOICE_SERVER_UPDATE, (pk) => {
			this.voiceServerUpdate = pk;
			if (this.voiceStateUpdate && this.voiceServerUpdate && !this.voice) {
				this.voice = new VoiceGateway(this);
				this.voice.emit(
					EVENTS.PACKET_READY,
					(this.voiceStateUpdate, this.voiceServerUpdate, this.shard)
				);
				if (initialize) this.voice.init();
			}
		});
	}
}
