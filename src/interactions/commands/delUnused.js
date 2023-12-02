import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "delunused",
    description: "Delete Unused Licenses",
    description_localizations: {
        "en-US": "Delete Unused Licenses",
        fi: "Poista käyttämättömät lisenssit",
        fr: "Supprimer les licences inutilisées",
        de: "Unbenutzte Lizenzen löschen",
        it: "Elimina licenze inutilizzate",
        nl: "Verwijder ongebruikte licenties",
        ru: "Удалить неиспользуемые лицензии",
        pl: "Usuń nieużywane licencje",
        tr: "Kullanılmayan Lisansları Sil",
        cs: "Odstranit nepoužívané licence",
        ja: "未使用のライセンスを削除する",
        ko: "사용되지 않는 라이센스 삭제"
    },
    async execute(interaction) {
        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=delunused`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: json.message,
                                color: 0x00ff00,
                                timestamp: `${interaction.createdAt.toISOString()}`
                            }
                        ]
                    });
                } else {
                    interaction.editReply({
                        embeds: [
                            {
                                title: json.message,
                                fields: [{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`/setseller\` command.` }],
                                color: 0xff0000,
                                timestamp: `${interaction.createdAt.toISOString()}`,
                                footer: { text: "KeyAuth Discord Bot" }
                            }
                        ]
                    });
                }
            })
        );
    }
};
