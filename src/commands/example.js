module.exports = {
    name: "example", //neded
    aliases: ["e", "exa"],
    category: "Main",
    description: "This is an example command",
    usage: "!example",
    run: async function (client, command, args, message) { //needed
        message.channel.send("Hello World!")
    }
}