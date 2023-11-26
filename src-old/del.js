const { SlashCommandBuilder, Colors } = require("discord.js");

const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("del")
        .setDescription("Delete a key")
        .setDescriptionLocalizations({
            "en-US": "Delete a key",
            fi: "Poista avain",
            fr: "Supprimer une clé",
            de: "Schlüssel löschen",
            it: "Elimina una chiave",
            nl: "Sleutel verwijderen",
            ru: "Удалить ключ",
            pl: "Usuń klucz",
            tr: "Bir anahtarı sil",
            cs: "Odstranit klíč",
            ja: "キーを削除する",
            ko: "키 삭제"
        })
        .addStringOption((option) =>
            option
                .setName("license")
                .setDescription("Specify key you would like deleted")
                .setDescriptionLocalizations({
                    "en-US": "Specify key you would like deleted",
                    fi: "Määritä poistettava avain",
                    fr: "Spécifiez la clé que vous souhaitez supprimer",
                    de: "Geben Sie den Schlüssel an, den Sie löschen möchten",
                    it: "Specifica la chiave che desideri eliminare",
                    nl: "Geef de sleutel op die u wilt verwijderen",
                    ru: "Укажите ключ, который вы хотите удалить",
                    pl: "Określ klucz, który chcesz usunąć",
                    tr: "Silmek istediğiniz anahtarı belirtin",
                    cs: "Zadejte klíč, který chcete odstranit",
                    ja: "削除したいキーを指定してください",
                    ko: "삭제할 키를 지정하십시오"
                })
                .setRequired(true)
        ),
    async execute(interaction) {
        let idfrom = null;
        let ephemeral = true;

        if (interaction.guild == null) {
            idfrom = interaction.user.id;
            ephemeral = false;
        } else {
            idfrom = interaction.guild.id;
        }

        let key = interaction.options.getString("license");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerKey}&type=del&key=${key}&format=json`)
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setTitle(json.message)
                                .addFields([{ name: "Key Deleted:", value: `\`${key}\`` }])
                                .setColor(Colors.Green)
                                .setTimestamp()
                        ],
                        ephemeral: ephemeral
                    });
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
