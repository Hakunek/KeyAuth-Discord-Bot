import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "verifyuser",
    description: "Verify user exists",
    description_localizations: {
        "en-US": "Verify user exists",
        fi: "Tarkista, että käyttäjä on olemassa",
        fr: "Vérifier que l'utilisateur existe",
        de: "Überprüfen, ob Benutzer existiert",
        it: "Verifica che l'utente esista",
        nl: "Controleer of gebruiker bestaat",
        ru: "Проверить, существует ли пользователь",
        pl: "Sprawdź, czy użytkownik istnieje",
        tr: "Kullanıcının olup olmadığını doğrulayın",
        cs: "Ověřte, zda uživatel existuje",
        ja: "ユーザーが存在することを確認します",
        ko: "사용자가 존재하는지 확인하십시오"
    },
    options: [
        {
            type: 3,
            name: "user",
            description: "Username of user you would like to check the existence of",
            description_localizations: {
                "en-US": "Username of user you would like to check the existence of",
                fi: "Käyttäjän käyttäjätunnus, jonka olemassaolon haluat tarkistaa",
                fr: "Nom d'utilisateur de l'utilisateur dont vous souhaitez vérifier l'existence",
                de: "Benutzername des Benutzers, dessen Existenz Sie überprüfen möchten",
                it: "Nome utente dell'utente di cui desideri verificare l'esistenza",
                nl: "Gebruikersnaam van de gebruiker waarvan u de bestaande wilt controleren",
                ru: "Имя пользователя пользователя, существование которого вы хотите проверить",
                pl: "Nazwa użytkownika użytkownika, którego istnienie chcesz sprawdzić",
                tr: "Varlığını kontrol etmek istediğiniz kullanıcının kullanıcı adı",
                cs: "Uživatelské jméno uživatele, jehož existenci chcete ověřit",
                ja: "存在を確認したいユーザーのユーザー名",
                ko: "존재 여부를 확인하려는 사용자의 사용자 이름"
            },
            required: true
        }
    ],
    async execute(interaction) {
        let user = interaction.options.getString("user");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=verifyuser&user=${user}`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: json.message,
                                color: 0x00ff00,
                                fields: [{ name: "User exists:", value: `\`${user}\`` }],
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
