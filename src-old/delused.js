const { SlashCommandBuilder, Colors } = require("discord.js");

const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("delused").setDescription("Delete Used Licenses").setDescriptionLocalizations({
        "en-US": "Delete Used Licenses",
        fi: "Poista käytetyt lisenssit",
        fr: "Supprimer les licences utilisées",
        de: "Verwendete Lizenzen löschen",
        it: "Elimina licenze utilizzate",
        nl: "Verwijder gebruikte licenties",
        ru: "Удалить использованные лицензии",
        pl: "Usuń używane licencje",
        tr: "Kullanılan Lisansları Sil",
        cs: "Odstranit použité licence",
        ja: "使用済みのライセンスを削除する",
        ko: "사용된 라이센스 삭제"
    }),
    async execute(interaction) {
        let idfrom = null;
        let ephemeral = true;

        if (interaction.guild == null) {
            idfrom = interaction.user.id;
            ephemeral = false;
        } else {
            idfrom = interaction.guild.id;
        }

        fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerKey}&type=delused`)
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    interaction.editReply({ embeds: [new Discord.EmbedBuilder().setTitle(json.message).setColor(Colors.Green).setTimestamp()], ephemeral: ephemeral });
                } else {
                    interaction.editReply({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setTitle(json.message)
                                .addFields([{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`setseller\` command.` }])
                                .setColor(Colors.Red)
                                .setTimestamp()
                        ],
                        ephemeral: ephemeral
                    });
                }
            });
    }
};
