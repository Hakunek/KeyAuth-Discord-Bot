const { SlashCommandBuilder, Colors } = require("discord.js");

const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unbanuser")
        .setDescription("Unban user")
        .addStringOption((option) => option.setName("user").setDescription("User you wish to unban").setRequired(true)),
    async execute(interaction) {
        let idfrom = null;
        let ephemeral = true;

        if (interaction.guild == null) {
            idfrom = interaction.user.id;
            ephemeral = false;
        } else {
            idfrom = interaction.guild.id;
        }

        let user = interaction.options.getString("user");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerKey}&type=unbanuser&user=${user}`)
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    interaction.editReply({ embeds: [new Discord.EmbedBuilder().setTitle(json.message).setColor(Colors.Green).setTimestamp().setFooter({ text: "KeyAuth Discord Bot" })], ephemeral: ephemeral });
                } else {
                    interaction.editReply({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setTitle(json.message)
                                .addFields([{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`/setseller\` command.` }])
                                .setColor(Colors.Red)
                                .setTimestamp()
                                .setFooter({ text: "KeyAuth Discord Bot" })
                        ],
                        ephemeral: ephemeral
                    });
                }
            });
    }
};
