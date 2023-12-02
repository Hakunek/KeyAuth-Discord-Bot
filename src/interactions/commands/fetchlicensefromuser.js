import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "userlicense",
    description: "Get License from user",
    description_localizations: {
        "en-US": "Get License from user",
        fi: "Hae lisenssi käyttäjältä",
        fr: "Obtenir usernamee licence de l'utilisateur",
        de: "Lizenz von Benutzer erhalten",
        it: "Ottieni licenza dall'utente",
        nl: "Licentie van gebruiker ophalen",
        ru: "Получить лицензию от пользователя",
        pl: "Uzyskaj licencję od użytkownika",
        tr: "Kullanıcıdan lisans al",
        cs: "Získejte licenci od uživatele",
        ja: "ユーザーからライセンスを取得する",
        ko: "사용자로부터 라이센스 가져 오기"
    },
    options: [
        {
            type: 3,
            name: "username",
            description: "Username where you want the license",
            description_localizations: {
                "en-US": "Username where you want the license",
                fi: "Käyttäjätusernamenus, johon haluat lisenssin",
                fr: "Nom d'utilisateur où vous souhaitez la licence",
                de: "Benutzername, an dem Sie die Lizenz möchten",
                it: "Nome utente dove vuoi la licenza",
                nl: "Gebruikersnaam waar u de licentie wilt",
                ru: "Имя пользователя, где вы хотите лицензию",
                pl: "Nazwa użytkownika, w której chcesz licencję",
                tr: "Lisans istediğiniz kullanıcı adı",
                cs: "Uživatelské jméno, kde chcete licenci",
                ja: "ライセンスを取得したいユーザー名",
                ko: "라이센스를 원하는 사용자 이름"
            },
            required: true
        }
    ],
    async execute(interaction) {
        let username = interaction.options.getString("username", true);

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=getkey&user=${username}`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: json.message,
                                color: 0x00ff00,
                                fields: [{ name: "License:", value: `\`${json["key"]}\`` }],
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
