/*
  CITATIONS

  Adapted from nodejs starter app.
  This application was adapted from starter code provided by Dr. Curry and Prof. Safonte
  for the CS 340 course at Oregon State University.
  Curry, M. and Safonte, D. 2023
  https://github.com/osu-cs340-ecampus/nodejs-starter-app

  Adapted from CS 290 "Exploration — Full-Stack MERN App - Retrieve and Delete"
  This section took inspiration from the "Exploration — Full-Stack MERN App - Retrieve and Delete"
  lesson from CS 290.
  Original author unknown. 2022
  Unable to link to "movies-api-backend-starter code.zip"
*/

'use strict';

// Getting a mysql instance might fix that issue; moving config to .env
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config( { path: '../.env' });

// Moving db connection info over to an .env 
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DATABASE
})

// module.exports.pool = pool.promise();
module.exports.pool = pool;