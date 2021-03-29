require("dotenv");
const { rastrearEncomendas } = require("correios-brasil");

const mysql = require("mysql2");

const connection = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

module.exports = {
  name: "track", //neded
  aliases: ["t"],
  category: "Main Category",
  description: "Comando usado para rastreio de encomenda",
  usage: ".track",
  run: async function (client, command, args, message) {
    var codigoRastreio = message.content.split(" ");
    var codRastreio = [codigoRastreio[1]];

    if (codigoRastreio[1] == undefined) {
      message.reply("forneça um código, exemplo `.track OG692701683BR`");
    } else if (codigoRastreio[1] == "remove") {
      if (codigoRastreio[2] != undefined && codigoRastreio[2].length == 13) {
        removeFromDB();
      } else {
        message.reply(
          "você precisa digitar o código de rastreio válido que deseja apagar"
        );
      }
    } else if (codigoRastreio[1].length != 13) {
      message.reply(
        "esse código parece ser inválido, verifique e tente novamente"
      );
    } else if (codigoRastreio[1].length == 13) {
      InsertOnDatabase();
    }

    async function InsertOnDatabase() {
      await rastrearEncomendas(codRastreio).then((response) => {
        correios_response = response;

        if (correios_response[0].length != 0) {
          success = 1;
          
          var correiosStatus = correios_response[0].pop()
          console.log(correiosStatus.status)
         

        } else {
          message.reply(
            "parece que seu código expirou, ou não está mais cadastrado no sistema 😢"
          );
          success = 0;
        }

        if (success == 1) {
          connection.query(
            "INSERT INTO trackcode(userID, trackCode, package_Status, package_Local, package_Origin, package_Destiny)VALUES(? , ?, ?, ?, ?, ?)",
            [message.author.id, codRastreio, correiosStatus.status, correiosStatus.local, correiosStatus.origem, correiosStatus.destino],
            function (err, results) {
              if (err) {
                message.reply(
                  "parece que essa mercadoria ja está sendo acompanhada"
                );
              } else {
                message.reply(
                  "registrei o seu código, ele será rastreado a cada X minutos ✌😎"
                );
              }
            }
          );
        }
      });
    }

    async function removeFromDB() {
      connection.query(
        "DELETE FROM trackcode WHERE trackCode = ?",
        [codigoRastreio[2]],
        function (err, results) {
          console.log(results.affectedRows);
          console.log(err);

          if (results.affectedRows == 1) {
            message.reply(
              `seu código ${codigoRastreio[2]} deixou de ser rastreado automaticamente`
            );
          } else {
            message.reply("parece que esse código já foi deletado");
          }
        }
      );
    }
  },
};
