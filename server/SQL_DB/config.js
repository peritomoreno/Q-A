const pgtools = require("pgtools");
const config = {
  user: "postgres",
  host: "localhost",
  password: "",
  port: 5432
};
//create database
pgtools.createdb(config, "q_a_db", function(err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});