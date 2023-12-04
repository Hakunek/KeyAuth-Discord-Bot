import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "deluser",
    description: "Delete user",
    description_localizations: {
        "en-US": "Delete user",
        fi: "Poista käyttäjä",
        fr: "Supprimer l'utilisateur",
        de: "Benutzer löschen",
        it: "Elimina utente",
        nl: "Verwijder gebruiker",
        ru: "Удалить пользователя",
        pl: "Usuń użytkownika",
        tr: "Kullanıcıyı sil",
        cs: "Smazat uživatele",
        ja: "ユーザーを削除する",
        ko: "사용자 삭제"
    },
    options: [
        {
            type: 3,
            name: "username",
            description: "Enter Username",
            description_localizations: {
                "en-US": "Enter Username",
                fi: "Anna käyttäjätunnus",
                fr: "Entrez le nom d'utilisateur",
                de: "Geben Sie den Benutzernamen ein",
                it: "Inserisci il nome utente",
                nl: "Voer gebruikersnaam in",
                ru: "Введите имя пользователя",
                pl: "Wprowadź nazwę użytkownika",
                tr: "Kullanıcı adını girin",
                cs: "Zadejte uživatelské jméno",
                ja: "ユーザー名を入力してください",
                ko: "사용자 이름을 입력하십시오"
            },
            required: true
        }
    ],
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        let un = interaction.options.getString("username");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=deluser&user=${un}`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: json.message,
                                color: 0x00ff00,
                                fields: [{ name: "Subscription deleted:", value: `\`${name}\`` }],
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
