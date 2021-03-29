require("dotenv").config();
const { Client } = require("discord.js");
const client = new Client();
let connection;

const handler = require("@tomdev/discord.js-command-handler");
const check_packages = require("./events/check_packages");
const cmdhandler = new handler(client, "/src/commands", process.env.PREFIX);

const { rastrearEncomendas } = require("correios-brasil");

//handle command on message event
client.on("message", (message) => {
  cmdhandler.handleCommand(message);
});

client.on("ready", () => {
  console.log("Bot logged in.");
  check_packages();
});

client.on("message", async (message) => {
  if (message.content === "1") {

    connection.query("SELECT * FROM trackcode").then(async ([rows]) => {
      rows.map((data) => {

        var trackThis = [];
        trackThis.push(data.trackCode)

        rastrearEncomendas(trackThis).then((response) => {
          correiosArray = response;
          const objeto = correiosArray[0].pop()

          console.log('----------------------')
          console.log(data.trackCode)
          console.log('----------------------')
          console.log(data.package_Status, objeto.status)
          console.log('----------------------')
          console.log(data.package_Local, objeto.local)
          console.log('----------------------')
          console.log(data.package_Origin, objeto.origem)
          console.log('----------------------')
          console.log(data.package_Destiny, objeto.destino)

          if(data.package_Status != objeto.status){
            console.log('Houve uma atualização!')
          }

        })

      });
    });
  }
});


(async () => {
  connection = await require("../database/db");
  await client.login(process.env.BOT_TOKEN);
})();

// EU PRECISO
// CRIAR UMA FUNCAO
// PRA FAZER O RASTREIO
// A CADA X TEMPO
// DE TUDO Q TA NA
// DATABASE

//CODIGO REFERENCIA PARA PEGAR OQ TA LA:
