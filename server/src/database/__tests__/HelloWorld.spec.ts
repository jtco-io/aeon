import { Database } from "../../lib";
import config from "../../config";
const { resolve } = require("path");
const knexfile = resolve(__dirname, "..", "..", "..", "knexfile.ts");

const knexConfig = require(knexfile);
const database = new Database(config, knexConfig);
beforeAll(async () => {
  console.log("beforeAll  db", database, knexfile);

  await database.connect();

});

afterAll(async () => {
  console.log("Lets close the database");
  await database.close();

  console.log("Db should be closed", database);

});

// beforeEach (async () => {
//  // Clears the database and adds some testing data.
//  // Jest will wait for this promise to resolve before running tests.
//  console.log ("before!");
// });

function sum(a, b) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("adds 2 + 2 to equal 4", () => {
  expect(sum(2, 2)).toBe(4);
});
