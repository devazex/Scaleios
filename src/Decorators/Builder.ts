import { ScaleiosBuilder } from "../Client/Builder";
import { Client } from "../Client/Client";
import { CacheProviders } from "../Interfaces/Interfaces";
import { Structures } from "../Structures/Structures";
import { CacheOptions, GatewayIntents } from "../Utils/Constants";

export function Builder(options: BuilderDecoratorOptions) {
	return (target: typeof Client): void => {
		const builder: ScaleiosBuilder = new ScaleiosBuilder(
			options.token,
			options.useDefaultSetting ?? true
		).setClientClass(target);

		if (options.intents) builder.enableIntents(...options.intents);
		if (options.cache) builder.enableCache(...options.cache);
		if (options.secret) builder.setSecret(options.secret);
		if (options.activity) builder.setActivity(options.activity);
		if (options.encoding) builder.setEncoding(options.encoding);
		if (options.shards) builder.setShards(options.shards);
		if (options.structure) builder.setStructureClass(options.structure);
		if (options.cacheProvider) builder.setCacheProviders(options.cacheProvider);

		builder.build();
	};
}

interface BuilderDecoratorOptions {
	intents?: GatewayIntents[];
	cache?: CacheOptions[];
	useDefaultSetting?: boolean;
	token: string;
	secret?: string;
	activity?: Object;
	encoding?: "json" | "etf";
	shards?: number;
	structure?: Structures;
	cacheProvider?: CacheProviders;
}
