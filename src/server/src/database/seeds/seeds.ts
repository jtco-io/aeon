// import bcrypt from 'bcrypt'
import config from "../../config";
// TODO make compatible with user class
// import User from '../models/Users'

interface User {
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type Users = User[];

export const users: Users = [
  {
    firstName: "John",
    lastName: "Doe",
    username: "jdoe",
    email: "admin@aeon.io",
  },
  {
    firstName: "Jach",
    lastName: "White",
    username: "jwhite",
    email: "jwhite@aeon.io",
  },
];

export function getUsers() {
  return users.map((u: User, index) => {
    return {
      id: index,
      email: u.email,
      username: u.username,
      firstName: u.firstName,
      lastName: u.lastName,
      // password: bcrypt.hashSync("X12345678", 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
}

export async function seed(knex) {
  if (config.env.PRODUCTION) {
    await knex("users")
      .whereIn("email", users.map(u => u.email))
      .del();
  } else {
    await knex("users").del();
  }

  return knex("users").insert(getUsers());
}
