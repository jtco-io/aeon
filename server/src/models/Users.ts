import database from "../database";

const db = Database.getInstance();
const bookshelf = db.getBookshelf();

export default class User extends bookshelf.Model<User> {
  get tableName(): string {
    return "users";
  }

  get hasTimestamps(): boolean {
    return true;
  }

  public get Name(): string {
    return this.get("name");
  }

  public set Name(value: string) {
    this.set({ name: value });
  }
}
