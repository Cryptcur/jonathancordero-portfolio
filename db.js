const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/testing_db"
);

client.connect();

const sync = async () => {
  try {
    const SQL = `
          CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
          DROP TABLE IF EXISTS users;
          CREATE TABLE users(
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              name VARCHAR(100)
          );
          INSERT INTO users(name) values('lucy');
          INSERT INTO users(name) values('moe');
          `;
    await client.query(SQL);
  } catch (ex) {
    console.log(ex);
  }
};
const readUsers = async () => {
  return (await client.query("SELECT * from users;")).rows;
};

module.exports = {
  sync,
  readUsers
};
