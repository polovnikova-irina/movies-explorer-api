require('dotenv').config();

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/bitfilmsdb';
const PORT = process.env.PORT || 3000;

module.exports = {
  DB_URL,
  PORT,
};
