import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  ssl: process.env.NODE_ENV === 'production' ? {
    minVersion: "TLSv1.2",
    rejectUnauthorized: true,
  } : false,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("connection failed:", err.message);
  } else {
    console.log("connected");
    connection.release();
  }
});

export default db;
