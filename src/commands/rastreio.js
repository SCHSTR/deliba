const Discord = require("discord.js");
const { rastrearEncomendas } = require("correios-brasil");

module.exports = {
  name: "rastreio", //neded
    aliases: ["r"],
    category: "Main Category",
    description: "Comando usado para rastreio de encomenda",
    usage: ".rastreio",
    run: async function (client, command, args, message) { //needed
    //let  codRastreio = [] // array de códigos de rastreios

    var codigoRastreio = message.content.split(" ");
    var codRastreio = [codigoRastreio[1]];

    if (codigoRastreio[1] == undefined) {
      message.reply("forneça um código, exemplo `.rastreio OG692701683BR`")
    } else if(codigoRastreio[1].length != 13) {
      message.reply('esse código parece ser inválido, verifique e tente novamente')
    }else if(codigoRastreio[1].length == 13){
      searchPackage()
    }

     

    async function searchPackage() {
      await rastrearEncomendas(codRastreio).then((response) => {
        
        correiosArray = response;
        if(correiosArray[0].length == 0){
          message.reply('parece que seu código expirou, ou não está mais cadastrado no sistema 😢')
        }else{
          var objeto = correiosArray[0].pop();
          if(objeto.local == undefined){
            let correiosEmbed = new Discord.MessageEmbed()
            .setDescription(`O estado atual é: **${objeto.status}** `)
            .addFields(
              { name: "Data", value: `${objeto.data}`, inline: true },
              { name: "Horário", value: `${objeto.hora}`, inline: true },
              { name: "Origem", value: `${objeto.origem}` },
              { name: "Destino", value: `${objeto.destino}` }
            )
            .setColor("#ffb300");
            
            message.channel.send(correiosEmbed);
          }else{
            let correiosEmbed = new Discord.MessageEmbed()
            .setDescription(`O estado atual é: **${objeto.status}** `)
            .addFields(
              { name: "Data", value: `${objeto.data}`, inline: true },
              { name: "Horário", value: `${objeto.hora}`, inline: true },
              { name: "Local", value: `${objeto.local}` },
            )
            .setColor("#ffb300");
            
            message.channel.send(correiosEmbed);
          }

        }        
      });
    }
  },
};
