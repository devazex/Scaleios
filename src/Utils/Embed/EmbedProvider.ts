/* eslint-disable no-mixed-spaces-and-tabs */
import { URL } from "url";

export interface IEmbedProvider {
  name: string;
  url: string;
}

export class EmbedProviderScaleiosBuilder {
  private name!: string;
  private url!: string;

  public setName(name: string): EmbedProviderScaleiosBuilder {
    this.name = name;
    return this;
  }

  public setURL(url: URL): EmbedProviderScaleiosBuilder {
    this.url = url.toString();
    return this;
  }

  public build(): IEmbedProvider {
    return {
      name: this.name,
      url: this.url,
    };
  }
}
