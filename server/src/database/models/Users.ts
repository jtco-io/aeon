import { Model, RelationMappings } from "objection";

export interface Address {
  street: string;
  city: string;
  zipCode: string;
}

export default class User extends Model {
  // prettier-ignore
  readonly id!: number;
  parentId?: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  address?: Address;
  createdAt?: Date;
  updatedAt?: Date;

  // Optional eager relations.
  parent?: User;
  children?: User[];
  // pets?: Animal[];
  // movies?: Movie[];

  // Table name is the only required property.
  static tableName = "users";

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: "object",
    required: ["firstName", "lastName"],

    properties: {
      id: { type: "integer" },
      parentId: { type: ["integer", "null"] },
      firstName: { type: "string", minLength: 1, maxLength: 255 },
      lastName: { type: "string", minLength: 1, maxLength: 255 },
      age: { type: "number" },

      address: {
        type: "object",
        properties: {
          street: { type: "string" },
          city: { type: "string" },
          zipCode: { type: "string" },
        },
      },
    },
  };

  // Where to look for models classes.
  static modelPaths = [__dirname];

  // This object defines the relations to other models. The modelClass strings
  // will be joined to `modelPaths` to find the class definition, to avoid
  // require loops. The other solution to avoid require loops is to make
  // relationMappings a thunk. See Movie.ts for an example.
  static relationMappings: RelationMappings = {
    // pets: {
    //  relation: Model.HasManyRelation,
    //  // This model defines the `modelPaths` property. Therefore we can simply use
    //  // the model module names in `modelClass`.
    //  modelClass: "Animal",
    //  join: {
    //    from: "users.id",
    //    to: "animals.ownerId",
    //  },
    // },
    //
    // movies: {
    //  relation: Model.ManyToManyRelation,
    //  modelClass: "Movie",
    //  join: {
    //    from: "users.id",
    //    // ManyToMany relation needs the `through` object to describe the join table.
    //    through: {
    //      from: "users_movies.personId",
    //      to: "users_movies.movieId",
    //    },
    //    to: "movies.id",
    //  },
    // },

    children: {
      relation: Model.HasManyRelation,
      modelClass: User,
      join: {
        from: "users.id",
        to: "users.parentId",
      },
    },

    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "users.parentId",
        to: "users.id",
      },
    },
  };

  exampleUserMethod(arg: string): number {
    return 1;
  }

  //
  // Example of numeric timestamps. Presumably this would be in a base
  // class or a mixin, and not just one of your leaf models.
  //
  $beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }

  $parseDatabaseJson(json: object) {
    const jsonSparse = super.$parseDatabaseJson(json);
    toDate(jsonSparse, "createdAt");
    toDate(jsonSparse, "updatedAt");
    return jsonSparse;
  }

  $formatDatabaseJson(json: object) {
    const jsonSparse = super.$formatDatabaseJson(json);
    toTime(jsonSparse, "createdAt");
    toTime(jsonSparse, "updatedAt");
    return jsonSparse;
  }
}

function toDate(obj: any, fieldName: string): any {
  if (obj != null && typeof obj[fieldName] === "number") {
    obj[fieldName] = new Date(obj[fieldName]);
  }
  return obj;
}

function toTime(obj: any, fieldName: string): any {
  if (obj != null && obj[fieldName] != null && obj[fieldName].getTime) {
    obj[fieldName] = obj[fieldName].getTime();
  }
  return obj;
}
