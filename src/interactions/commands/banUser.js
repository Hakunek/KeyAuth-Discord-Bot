import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "banuser",
    description: "Ban user",
    description_localizations: {
        "en-US": "Ban user",
        fi: "Estä käyttäjä",
        fr: "Bannir l'utilisateur",
        de: "Benutzer sperren",
        it: "Banna l'utente",
        nl: "Blokkeer gebruiker",
        ru: "Забанить пользователя",
        pl: "Zbanuj użytkownika",
        tr: "Kullanıcıyı yasakla",
        cs: "Zakázat uživatele",
        ja: "ユーザーを禁止する",
        ko: "사용자를 금지하다"
    },
    options: [
        {
            type: 3,
            name: "user",
            description: "User you wish to ban",
            description_localizations: {
                "en-US": "User you wish to ban",
                fi: "Käyttäjä, jonka haluat estää",
                fr: "Utilisateur que vous souhaitez bannir",
                de: "Benutzer, den Sie sperren möchten",
                it: "Utente che desideri bannare",
                nl: "Gebruiker die u wilt blokkeren",
                ru: "Пользователь, которого вы хотите забанить",
                pl: "Użytkownik, którego chcesz zbanować",
                tr: "Yasaklamak istediğiniz kullanıcı",
                cs: "Uživatel, kterého chcete zakázat",
                ja: "禁止したいユーザー",
                ko: "금지하려는 사용자"
            },
            required: true
        },
        {
            type: 3,
            name: "reason",
            description: "Reason for the ban",
            description_localizations: {
                "en-US": "Reason for the ban",
                fi: "Syy bannille",
                fr: "Raison du bannissement",
                de: "Grund für die Sperrung",
                it: "Motivo del ban",
                nl: "Reden voor de ban",
                ru: "Причина бана",
                pl: "Powód banowania",
                tr: "Yasaklama nedeni",
                cs: "Důvod pro zakázání",
                ja: "禁止の理由",
                ko: "금지의 이유"
            },
            required: true
        }
    ],
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        let user = interaction.options.getString("user");
        let reason = interaction.options.getString("reason");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=banuser&user=${user}&reason=${reason}`).then((res) =>
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
