/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Guild, User, IInvite, Client } from "../..";
import { Channel } from "../Channel/Channel";

export class Invite {
  public code!: string;
  public guild!: Guild;
  public channel!: Channel;
  public inviter!: User;
  public targetUser!: User;
  public targetUserType?: number;
  public approxPresenceCount?: number;
  public approxMemberCount?: number;
  private client!: Client;
  public data!: IInvite;
  constructor(data: IInvite, client: Client) {
    Object.defineProperty(this, "data", {
      value: data,
      enumerable: false,
      writable: false,
    });
    Object.defineProperty(this, "client", {
      value: client,
      enumerable: false,
      writable: false,
    });
    this._handle();
  }

  private _handle() {
    if (!this.data) return;
    this.code = this.data.code;
    this.guild = new Guild(this.data.guild!, this.client);
    this.channel = new Channel(
      this.data.channel.id,
      this.data.channel.type,
      this.client
    );
    this.inviter = new User(this.data.inviter!);
    this.targetUser = new User(this.data.target_user!);
    this.targetUserType = this.data.target_user_type;
    this.approxPresenceCount = this.data.approximate_presence_count;
    this.approxMemberCount = this.data.approximate_member_count;
    return this;
  }
}
