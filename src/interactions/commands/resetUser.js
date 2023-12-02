import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "resetuser",
    description: "Reset a user",
    description_localizations: {
        "en-US": "Reset a user",
        fi: "Nollaa käyttäjä",
        fr: "Réinitialiser un utilisateur",
        de: "Benutzer zurücksetzen",
        it: "Reimposta un utente",
        nl: "Reset een gebruiker",
        ru: "Сбросить пользователя",
        pl: "Zresetuj użytkownika",
        tr: "Bir kullanıcıyı sıfırlayın",
        cs: "Resetovat uživatele",
        ja: "ユーザーをリセットする",
        ko: "사용자를 재설정하십시오"
    },

    options: [
        {
            type: 3,
            name: "username",
            description: "Specify username",
            description_localizations: {
                "en-US": "Specify username",
                fi: "Määritä käyttäjänimi",
                fr: "Spécifiez le nom d'utilisateur",
                de: "Benutzernamen angeben",
                it: "Specifica il nome utente",
                nl: "Geef gebruikersnaam op",
                ru: "Укажите имя пользователя",
                pl: "Określ nazwę użytkownika",
                tr: "Kullanıcı adını belirtin",
                cs: "Zadejte uživatelské jméno",
                ja: "ユーザー名を指定してください",
                ko: "사용자 이름 지정"
            },
            required: true
        }
    ],
    async execute(interaction) {
        let username = interaction.options.getString("username");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=resetuser&user=${username}`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: json.message,
                                color: 0x00ff00,
                                fields: [{ name: "Username:", value: `\`${username}\`` }],
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
