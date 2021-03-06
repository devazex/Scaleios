/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Gateway } from "../Gateway";
import ws, { Data } from "ws";
import { VoiceIdentify, Heartbeat, EVENTS } from "../../../Utils/Constants";
import { Payload } from "../../..";
import { EventListener } from "../../../Utils/EventListener";

export class VoiceGateway extends EventListener {
	public link!: string;
	public websocket!: ws;
	public seq!: number;
	constructor(public gateway: Gateway) {
		super();
	}

	public init(): void {
		let endpoint = this.gateway.voiceServerUpdate.d.endpoint;
		if (!endpoint) return;
		endpoint = endpoint.match(/([^:]*)/)[0];
		this.websocket = new ws(`wss://${endpoint}?v=4`);

		this.websocket.on("open", () => {
			VoiceIdentify.d.server_id = this.gateway.voiceServerUpdate.d.server_id;
			VoiceIdentify.d.user_id = this.gateway.voiceStateUpdate.userId;
			VoiceIdentify.d.session_id = this.gateway.voiceStateUpdate.sessionID;
			VoiceIdentify.d.token = this.gateway.voiceServerUpdate.d.token;
			this.websocket.send(JSON.stringify(VoiceIdentify));
		});

		this.websocket.on("error", (e) =>
			this.gateway.ws.manager.ScaleiosBuilder.client.transformer.error(e.message)
		);

		this.websocket.on("message", (data: Data) => {
			this.handle(data);
		});
	}

	public handle(data: Data): void {
		const payload: Payload = JSON.parse(data.toString());
		const { op, d } = payload;
		if (op == 2) {
			this.emit("ready" as EVENTS, payload);
		} else if (op == 8) {
			setInterval(() => {
				Heartbeat.op = 3;
				if (this.seq) Heartbeat.d = this.seq;
				this.websocket.send(JSON.stringify(Heartbeat));
			}, d.heartbeat_interval);
		} else if (op == 6) {
			this.seq = d;
		}
	}
}
