import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "addhwid",
    description: "Add HWID",
    description_localizations: {
        "en-US": "Add HWID",
        fi: "Lisää HWID",
        fr: "Ajouter HWID",
        de: "HWID hinzufügen",
        it: "Aggiungi HWID",
        nl: "Voeg HWID toe",
        ru: "Добавить HWID",
        pl: "Dodaj HWID",
        tr: "HWID ekle",
        cs: "Přidat HWID",
        ja: "HWIDを追加",
        ko: "HWID 추가"
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
        },
        {
            type: 3,
            name: "hwid",
            description: "Enter Additional HWID",
            description_localizations: {
                "en-US": "Enter Additional HWID",
                fi: "Anna lisä HWID",
                fr: "Entrez un HWID supplémentaire",
                de: "Geben Sie zusätzliche HWID ein",
                it: "Inserisci HWID aggiuntivo",
                nl: "Voer extra HWID in",
                ru: "Введите дополнительный HWID",
                pl: "Wprowadź dodatkowy HWID",
                tr: "Ek HWID girin",
                cs: "Zadejte další HWID",
                ja: "追加のHWIDを入力してください",
                ko: "추가 HWID 입력"
            },
            required: true
        }
    ],
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        let un = interaction.options.getString("username");
        let auxhwid = interaction.options.getString("hwid");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=addhwiduser&user=${un}&hwid=${auxhwid}`).then((res) =>
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
