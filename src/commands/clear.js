module.exports = {
    name: "clear", //neded
    aliases: ["c"],
    category: "Main Category",
    description: "Apaga as últimas mensagens, digite o número",
    usage: ".clear 5",
    run: async function (client, command, args, message) { //needed

        if (!args[0]) return message.reply('Mensagem de falar quantidade de mensagem')
        message.channel.bulkDelete(args[0]);
    },
};