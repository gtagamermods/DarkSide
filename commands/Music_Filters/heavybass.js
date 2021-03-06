const functions = require("../../functions")
const { Default_Prefix } = require("../../config.json");
const db = require("old-wio.db");
const config = require("../../config.json")
const path = require("path");
module.exports = {

    name: "heavybass",
    category: "Music_Filters",
     aliases: [" "],
    usage: `<${path.parse(__filename).name}>`,
    description: "*Adds a Filter named " + path.parse(__filename).name,
    run: async (client, message, args) => {
        //if not a dj, return error
        if (functions.check_if_dj(message))
            return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `:x: You don\'t have permission for this Command! You need to have: ${functions.check_if_dj(message)}`)

        //If Bot not connected, return error
        if (!message.guild.me.voice.channel) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nothing playing!")

        //if member not connected return error
        if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " You must join a Voice Channel")

        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " You must join my Voice Channel: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

        //get queue
        let queue = client.distube.getQueue(message);

        //if no queue return error
        if (!queue) return functions.embedbuilder(client, 3000, message, config.colors.no, "There is nothing playing!");

        //get the filter from the content
        let filter = path.parse(__filename).name;

        //if its the same filter as the current one, use bassboost6
        if (filter === queue.filter) filter = "bassboost6";

        //set the new filter
        filter = await client.distube.setFilter(message, filter);

        //send information message
        await functions.embedbuilder(client, 3000, message, config.colors.yes, "Adding filter!", filter)
    }
};