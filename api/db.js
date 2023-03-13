import mysql from "mysql"

export const db = mysql.createConnection({
    host: "test",
    user: "root",
    password: "Test@123",
    database: "blog"
})