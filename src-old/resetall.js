const { SlashCommandBuilder, Colors } = require("discord.js");

const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("resetall").setDescription("Reset all user's hwid").setDescriptionLocalizations({
        "en-US": "Reset all user's hwid",
        fi: "Nollaa kaikkien käyttäjien hwid",
        fr: "Réinitialiser l'identifiant matériel de tous les utilisateurs",
        de: "Setzen Sie die Hardware-ID aller Benutzer zurück",
        it: "Reimposta l'ID hardware di tutti gli utenti",
        nl: "Reset alle gebruikers hwid",
        ru: "Сбросить идентификатор аппаратного обеспечения всех пользователей",
        pl: "Zresetuj wszystkie identyfikatory sprzętu użytkowników",
        tr: "Tüm kullanıcının donanım kimliğini sıfırlayın",
        cs: "Obnovte identifikátor hardwaru všech uživatelů",
        ja: "すべてのユーザーのハードウェアIDをリセットします",
        ko: "모든 사용자의 하드웨어 ID를 재설정합니다"
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

        fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerKey}&type=resetalluser`)
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    interaction.editReply({ embeds: [new Discord.EmbedBuilder().setTitle(json.message).setColor(Colors.Green).setTimestamp()], ephemeral: ephemeral });
                } else {
                    interaction.editReply({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setTitle(json.message)
                                .addFields([{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`/setseller\` command.` }])
                                .setColor(Colors.Red)
                                .setFooter({ text: "KeyAuth Discord Bot" })
                                .setTimestamp()
                        ],
                        ephemeral: ephemeral
                    });
                }
            });
    }
};
