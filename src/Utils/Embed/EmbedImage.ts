/* eslint-disable no-mixed-spaces-and-tabs */
import { URL } from "url";

export interface IEmbedImage {
  url: string;
  proxy_url: string;
  height: number;
  width: number;
}

export class EmbedImageScaleiosBuilder {
  private url!: string;
  private proxyURl!: string;
  private height!: number;
  private width!: number;

  public setURL(url: URL): EmbedImageScaleiosBuilder {
    this.url = url.toString();
    return this;
  }

  public setProxyURL(url: URL): EmbedImageScaleiosBuilder {
    this.proxyURl = url.toString();
    return this;
  }

  public setHeight(height: number): EmbedImageScaleiosBuilder {
    this.height = height;
    return this;
  }

  public setWidth(width: number): EmbedImageScaleiosBuilder {
    this.width = width;
    return this;
  }

  public build(): IEmbedImage {
    return {
      url: this.url,
      proxy_url: this.proxyURl,
      height: this.height,
      width: this.width,
    };
  }
}
