// import {Users} from '../models'

const bcrypt = require("bcrypt");
// const faker = require('faker')
const config = require("../config");

interface User {
  name: string;
  username: string;
  email: string;
}

type Users = User[];

const users: Users = [
  {
    name: "John Doe",
    username: "jdoe",
    email: "admin@prion.io",
  },
  {
    name: "Jach White",
    username: "jwhite",
    email: "jwhite@prion.io",
  },
];

function getUsers() {
  return users.map((u: User) => {
    return {
      // id: u.id,
      email: u.email,
      username: u.username,
      name: u.name,
      password: bcrypt.hashSync("X12345678", 10),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  });
}

exports.getUsers = getUsers;

exports.seed = async function(knex) {
  if (config.env.isProd) {
    await knex("users")
      .whereIn("email", users.map(u => u.email))
      .del();
  } else {
    await knex("users").del();
  }

  return knex("users").insert(getUsers());
};
