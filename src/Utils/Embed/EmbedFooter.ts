/* eslint-disable no-mixed-spaces-and-tabs */
import { URL } from "url";

export interface IEmbedFooter {
  text: string;
  icon_url: string;
  proxy_icon_url: string;
}

export class EmbedFooterScaleiosBuilder {
  private text!: string;
  private iconUrl!: string;
  private proxyIconUrl!: string;

  public setText(text: string): EmbedFooterScaleiosBuilder {
    this.text = text;
    return this;
  }

  public setIconUrl(url: URL): EmbedFooterScaleiosBuilder {
    this.iconUrl = url.toString();
    return this;
  }

  public setProxyIconUrl(url: URL): EmbedFooterScaleiosBuilder {
    this.proxyIconUrl = url.toString();
    return this;
  }

  public build(): IEmbedFooter {
    return {
      text: this.text,
      icon_url: this.iconUrl,
      proxy_icon_url: this.proxyIconUrl,
    };
  }
}
