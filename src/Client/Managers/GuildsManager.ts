import { Objex } from "@evolvejs/objex";
import { Guild } from "../../Structures/Guild/Guild";
import { Endpoints } from "../../Utils/Endpoints";
import { Client } from "../Client";

export class GuildsManager extends Objex<string, Guild> {
	constructor(public client: Client) {
		super();
	}

	public async resolve(id: string): Promise<Guild> {
		return new Guild(
			await this.client.rest.endpoint(Endpoints.GUILD).get(id),
			this.client
		);
	}
}
