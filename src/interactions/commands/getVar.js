import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "getvar",
    description: "Retrieve user variable",
    description_localizations: {
        "en-US": "Retrieve user variable",
        fi: "Hae käyttäjän muuttuja",
        fr: "Récupérer la variable utilisateur",
        de: "Benutzervariable abrufen",
        it: "Recupera variabile utente",
        nl: "Gebruikersvariabele ophalen",
        ru: "Получить переменную пользователя",
        pl: "Pobierz zmienną użytkownika",
        tr: "Kullanıcı değişkenini al",
        cs: "Získejte uživatelskou proměnnou",
        ja: "ユーザー変数を取得する",
        ko: "사용자 변수 검색"
    },
    options: [
        {
            type: 3,
            name: "user",
            description: "Username of user you want to retrieve user variable from",
            description_localizations: {
                "en-US": "Username of user you want to retrieve user variable from",
                fi: "Käyttäjän käyttäjätunnus, jolta haluat hakea käyttäjän muuttujan",
                fr: "Nom d'utilisateur de l'utilisateur dont vous souhaitez récupérer la variable utilisateur",
                de: "Benutzername des Benutzers, von dem Sie die Benutzervariable abrufen möchten",
                it: "Nome utente dell'utente da cui si desidera recuperare la variabile utente",
                nl: "Gebruikersnaam van de gebruiker waarvan u de gebruikersvariabele wilt ophalen",
                ru: "Имя пользователя пользователя, переменную которого вы хотите получить",
                pl: "Nazwa użytkownika użytkownika, z którego chcesz pobrać zmienną użytkownika",
                tr: "Kullanıcı değişkenini almak istediğiniz kullanıcının kullanıcı adı",
                cs: "Uživatelské jméno uživatele, ze kterého chcete získat uživatelskou proměnnou",
                ja: "ユーザー変数を取得したいユーザーのユーザー名",
                ko: "사용자 변수를 검색하려는 사용자의 사용자 이름"
            },
            required: true
        },
        {
            type: 3,
            name: "name",
            description: "Name of user variable you want to retrieve",
            description_localizations: {
                "en-US": "Name of user variable you want to retrieve",
                fi: "Haluamasi käyttäjän muuttujan nimi",
                fr: "Nom de la variable utilisateur que vous souhaitez récupérer",
                de: "Name der Benutzervariable, die Sie abrufen möchten",
                it: "Nome della variabile utente che si desidera recuperare",
                nl: "Naam van de gebruikersvariabele die u wilt ophalen",
                ru: "Имя переменной пользователя, которую вы хотите получить",
                pl: "Nazwa zmiennej użytkownika, którą chcesz pobrać",
                tr: "Almak istediğiniz kullanıcı değişkeninin adı",
                cs: "Název uživatelské proměnné, kterou chcete získat",
                ja: "取得したいユーザー変数の名前",
                ko: "검색하려는 사용자 변수의 이름"
            },
            required: true
        }
    ],
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        let user = interaction.options.getString("user");
        let name = interaction.options.getString("name");
        interaction.member.timeout(5000, "bo tak");
        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=getvar&user=${user}&var=${name}`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: json.message,
                                color: 0x00ff00,
                                fields: [{ name: "Variable data:", value: `\`${json["response"]}\`` }],
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
