import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "delused",
    description: "Delete Used Licenses",
    description_localizations: {
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
    },
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=delused`).then((res) =>
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
