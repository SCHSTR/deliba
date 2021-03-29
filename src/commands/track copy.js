require("dotenv");
const Discord = require("discord.js");
const { rastrearEncomendas } = require("correios-brasil");

const mysql = require("mysql2");

const connection = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

module.exports = {
  name: "track2", //neded
  aliases: ["t2"],
  category: "Main Category",
  description: "Comando usado para rastreio de encomenda",
  usage: ".track",
  run: async function (client, command, args, message) {
    var codigoRastreio = message.content.split(" ");
    var codRastreio = [codigoRastreio[1]];

    if (codigoRastreio[1] == undefined) {
      message.reply("forneça um código, exemplo `.track OG692701683BR`");
    } else if (codigoRastreio[1].length != 13) {
      message.reply(
        "esse código parece ser inválido, verifique e tente novamente"
      );
    } else if (codigoRastreio[1].length == 13) {

      InsertOnDatabase()


      async function InsertOnDatabase() {
        await rastrearEncomendas(codRastreio).then((response) => {

          correios_response = response;

          if (correios_response[0].length != 0) {
            message.reply("o código foi cadastrado com sucesso e será feito uma nova atualização a cada X horas ✌😎");
            success = 1;
          } else {
            message.reply("parece que seu código expirou, ou não está mais cadastrado no sistema 😢");
            success = 0;
          }

          if(success == 1){
            connection
              .promise()
              .query("INSERT INTO trackcode(userID, trackCode)VALUES(?, ?)", [message.author.id, codigoRastreio[1]])
              .then(async ([rows]) => {
                console.log(rows);

                message.reply('registrei o seu código, ele será rastreado a cada X minutos ✌😎')
              })
              .catch(console.log)
              .then(() => connection.end());
          }
        });
      }
    }
  },
};

// connection
//   .promise()
//   .query("INSERT INTO trackcode(userID, trackCode)VALUES(?, ?)", [message.author.id, codigoRastreio[1]])
//   .then(async ([rows]) => {
//     console.log(rows);

//     message.reply('registrei o seu código, ele será rastreado a cada X minutos ✌😎')
//   })
//   .catch(console.log)
//   .then(() => connection.end());
