require("dotenv");
const Discord = require("discord.js");
const { rastrearEncomendas } = require("correios-brasil");

const mysql = require("mysql2");

const connection = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

module.exports = function checkPackages(){
    //setInterval(() => {console.log('Essa função deve ficar em looping, irá fodar a cada 3horas') }, 2000);
}