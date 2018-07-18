import knex from "knex";
import bookshelf from "bookshelf";

export default class Database {
  private static instance: Database = new Database();

  protected knex: any = null;

  protected bookshelf: any = null;

  constructor() {
    if (Database.instance) {
      throw new Error(
        "Error: Instantiation failed: Use Database.getInstance() instead of new.",
      );
    }

    this.knex = knex({
      client: "sqlite3",
      connection: {
        filename: "./db.sqlite",
      },
    });

    this.bookshelf = bookshelf(this.knex);

    bookshelf.instance = this;
  }

  public static getInstance(): Database {
    return Database.instance;
  }

  public getKnex(): any {
    return this.knex;
  }

  public getBookshelf(): Bookshelf {
    return this.bookshelf;
  }
}
