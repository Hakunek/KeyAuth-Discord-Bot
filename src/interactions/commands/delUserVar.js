import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "deluservar",
    description: "Delete user variable",
    description_localizations: {
        "en-US": "Delete user variable",
        fi: "Poista käyttäjän muuttuja",
        fr: "Supprimer la variable utilisateur",
        de: "Benutzervariable löschen",
        it: "Elimina variabile utente",
        nl: "Gebruikersvariabele verwijderen",
        ru: "Удалить переменную пользователя",
        pl: "Usuń zmienną użytkownika",
        tr: "Kullanıcı değişkenini sil",
        cs: "Odstranit uživatelskou proměnnou",
        ja: "ユーザー変数を削除",
        ko: "사용자 변수 삭제"
    },
    options: [
        {
            type: 3,
            name: "user",
            description: "Username of user variable you wish to delete",
            description_localizations: {
                "en-US": "Username of user variable you wish to delete",
                fi: "Poistettavan käyttäjän muuttujan käyttäjätunnus",
                fr: "Nom d'utilisateur de la variable utilisateur que vous souhaitez supprimer",
                de: "Benutzername der Benutzervariable, die Sie löschen möchten",
                it: "Nome utente della variabile utente che si desidera eliminare",
                nl: "Gebruikersnaam van de gebruikersvariabele die u wilt verwijderen",
                ru: "Имя пользователя переменной пользователя, которую вы хотите удалить",
                pl: "Nazwa użytkownika zmiennej użytkownika, którą chcesz usunąć",
                tr: "Silmek istediğiniz kullanıcı değişkeninin kullanıcı adı",
                cs: "Uživatelské jméno uživatelské proměnné, kterou chcete odstranit",
                ja: "削除したいユーザー変数のユーザー名",
                ko: "삭제하려는 사용자 변수의 사용자 이름"
            },
            required: true
        },
        {
            type: 3,
            name: "name",
            description: "Name of user variable you wish to delete",
            description_localizations: {
                "en-US": "Name of user variable you wish to delete",
                fi: "Poistettavan käyttäjän muuttujan nimi",
                fr: "Nom de la variable utilisateur que vous souhaitez supprimer",
                de: "Name der Benutzervariable, die Sie löschen möchten",
                it: "Nome della variabile utente che si desidera eliminare",
                nl: "Naam van de gebruikersvariabele die u wilt verwijderen",
                ru: "Имя переменной пользователя, которую вы хотите удалить",
                pl: "Nazwa zmiennej użytkownika, którą chcesz usunąć",
                tr: "Silmek istediğiniz kullanıcı değişkeninin adı",
                cs: "Název uživatelské proměnné, kterou chcete odstranit",
                ja: "削除したいユーザー変数の名前",
                ko: "삭제하려는 사용자 변수의 이름"
            },
            required: true
        }
    ],
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        let user = interaction.options.getString("user");
        let name = interaction.options.getString("name");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=deluservar&user=${user}&var=${name}`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: json.message,
                                color: 0x00ff00,
                                fields: [{ name: "User variable deleted:", value: `\`${name}\`` }],
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
