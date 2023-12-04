import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "setvar",
    description: "Assign variable to user(s)",
    description_localizations: {
        "en-US": "Assign variable to user(s)",
        fi: "Määritä muuttuja käyttäjälle",
        fr: "Assigner une variable à l'utilisateur",
        de: "Variablen einem Benutzer zuweisen",
        it: "Assegna variabile all'utente",
        nl: "Wijs variabele toe aan gebruiker(s)",
        ru: "Назначить переменную пользователю",
        pl: "Przypisz zmienną do użytkownika",
        tr: "Değişkeni kullanıcıya ata",
        cs: "Přiřadit proměnnou uživateli",
        ja: "変数をユーザーに割り当てる",
        ko: "변수를 사용자에게 할당"
    },
    options: [
        {
            type: 3,
            name: "name",
            description: "User variable name",
            description_localizations: {
                "en-US": "User variable name",
                fi: "Käyttäjän muuttujan nimi",
                fr: "Nom de la variable utilisateur",
                de: "Benutzervariablenname",
                it: "Nome variabile utente",
                nl: "Gebruikersvariabelenaam",
                ru: "Имя переменной пользователя",
                pl: "Nazwa zmiennej użytkownika",
                tr: "Kullanıcı değişkeni adı",
                cs: "Název uživatelské proměnné",
                ja: "ユーザー変数名",
                ko: "사용자 변수 이름"
            },
            required: true
        },
        {
            type: 3,
            name: "data",
            description: "User variable data",
            description_localizations: {
                "en-US": "User variable data",
                fi: "Käyttäjän muuttujan tiedot",
                fr: "Données de la variable utilisateur",
                de: "Benutzervariablen-Daten",
                it: "Dati variabili utente",
                nl: "Gebruikersvariabelengegevens",
                ru: "Данные переменной пользователя",
                pl: "Dane zmiennej użytkownika",
                tr: "Kullanıcı değişkeni verileri",
                cs: "Uživatelské proměnné",
                ja: "ユーザー変数データ",
                ko: "사용자 변수 데이터"
            },
            required: true
        },
        {
            type: 3,
            name: "user",
            description: "User to set variable of. If you leave blank, all users will be assigned user variable",
            description_localizations: {
                "en-US": "User to set variable of. If you leave blank, all users will be assigned user variable",
                fi: "Käyttäjä ,taa: muuttujan. Jätä tyhjäksi kaikille käyttäjille",
                fr: "L'utilisateur doit définir la variable de. Laisser vide pour tous les utilisateurs",
                de: "Benutzer zum Festlegen der Variablen. Für alle Benutzer leer lassen",
                it: "Utente di cui impostare la variabile. Lascia vuoto per tutti gli utenti",
                nl: "Gebruiker om variabele van in te stellen. Leeg laten voor alle gebruikers",
                ru: "Пользователь для установки переменной. Оставьте пустым для всех пользователей",
                pl: "Użytkownik do ustawienia zmiennej. Pozostaw puste dla wszystkich użytkowników",
                tr: "Değişkeni ayarlayacak kullanıcı. Tüm kullanıcılar için boş bırakın",
                cs: "Uživatel k nastavení proměnné. Ponechte prázdné pro všechny uživatele",
                ja: "変数を設定するユーザー。空のままにすると、すべてのユーザーにユーザー変数が割り当てられます",
                ko: "변수를 설정할 사용자. 비워 두면 모든 사용자에게 사용자 변수가 할당됩니다"
            },
            required: false
        }
    ],
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        let name = interaction.options.getString("name");
        let data = interaction.options.getString("data");
        let user = interaction.options.getString("user") ?? "all";

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type,var:&user=${user}&var=${name}&data=${data}`).then((res) =>
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
                                fields: [{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`,seller:\` command.` }],
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
