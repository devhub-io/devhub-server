import express from 'express';
import mysql from 'mysql';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res, next) => {
  res.json({ title: process.env.APP_URL });
});

router.get('/mysql', (req, res, next) => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

  connection.connect();

  connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    console.log('The solution is: ', rows[0].solution);
  });

  connection.end();

  res.json({ mysql: 's' });
});

export default router;
