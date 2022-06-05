/* eslint-disable no-mixed-spaces-and-tabs */
export interface IEmbedField {
  name: string;
  value: string;
  inline: boolean;
}

export class EmbedFieldScaleiosBuilder {
  private name!: string;
  private value!: string;
  private inline = false;

  public setName(name: string): EmbedFieldScaleiosBuilder {
    this.name = name;
    return this;
  }

  public setValue(value: string): EmbedFieldScaleiosBuilder {
    this.value = value;
    return this;
  }

  public enableInline(inline: boolean): EmbedFieldScaleiosBuilder {
    this.inline = inline;
    return this;
  }

  public build(): IEmbedField {
    return {
      name: this.name,
      value: this.value,
      inline: this.inline,
    };
  }
}
