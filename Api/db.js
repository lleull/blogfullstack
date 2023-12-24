import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wizkhalifa@11",
  database: "blogdata",

});
db.connect((err) => {
console.log(err)
})
