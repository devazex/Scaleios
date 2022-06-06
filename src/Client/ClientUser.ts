import { User } from "../Structures/User/User";

export class ClientUser extends User {
  constructor(
    public name: string,
    public discriminator: string,
    public verfied: boolean,
    public id: string,
    public flags: number,
    public email: string,
    private bot: boolean,
    public avatar: string
  ) {
    super({
      id,
      avatar,
      username: name,
      discriminator,
      flags,
      bot,
      email,
    });
  }
}
