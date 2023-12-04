import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "reset-password",
    description: "Reset password of user",
    description_localizations: {
        "en-US": "Reset password of user",
        fi: "Nollaa käyttäjän salasana",
        fr: "Réinitialiser le mot de passe de l'utilisateur",
        de: "Passwort des Benutzers zurücksetzen",
        it: "Reimposta la password dell'utente",
        nl: "Wachtwoord van gebruiker resetten",
        ru: "Сброс пароля пользователя",
        pl: "Zresetuj hasło użytkownika",
        tr: "Kullanıcının şifresini sıfırla",
        cs: "Obnovit heslo uživatele",
        ja: "ユーザーのパスワードをリセットする",
        ko: "사용자의 비밀번호 재설정"
    },
    options: [
        {
            type: 3,
            name: "user",
            description: "Username of user you're resetting password of",
            description_localizations: {
                "en-US": "Username of user you're resetting password of",
                fi: "Käyttäjänimi, jonka salasanaa nollaat",
                fr: "Nom d'utilisateur de l'utilisateur dont vous réinitialisez le mot de passe",
                de: "Benutzername des Benutzers, dessen Passwort Sie zurücksetzen",
                it: "Nome utente dell'utente di cui si sta reimpostando la password",
                nl: "Gebruikersnaam van de gebruiker wiens wachtwoord u opnieuw instelt",
                ru: "Имя пользователя пользователя, пароль которого вы сбрасываете",
                pl: "Nazwa użytkownika użytkownika, którego hasło resetujesz",
                tr: "Şifresini sıfırladığınız kullanıcının kullanıcı adı",
                cs: "Uživatelské jméno uživatele, jehož heslo obnovujete",
                ja: "パスワードをリセットするユーザーのユーザー名",
                ko: "비밀번호를 재설정하는 사용자의 사용자 이름"
            },
            required: true
        },
        {
            type: 3,
            name: "pass",
            description: "Password for user (optional) if not set, will be set later on login",
            description_localizations: {
                "en-US": "Password for user (optional) if not set, will be set later on login",
                fi: "Käyttäjän salasana (valinnainen) jos ei aseteta, asetetaan myöhemmin kirjautumisen yhteydessä",
                fr: "Mot de passe pour l'utilisateur. S'il n'est pas défini, il est défini plus tard lors de la connexion",
                de: "Passwort für Benutzer (optional) wenn nicht festgelegt, wird es später beim Anmelden festgelegt",
                it: "Password per l'utente (opzionale) se non impostata, verrà impostata successivamente durante il login",
                nl: "Wachtwoord voor gebruiker. Als het niet is ingesteld, wordt het later ingesteld bij het inloggen",
                ru: "Пароль для пользователя. Если не установлено, оно устанавливается позже при входе в систему",
                pl: "Hasło dla użytkownika. Jeśli nie jest ustawiony, zostanie ustawiony później podczas logowania",
                tr: "Kullanıcı için şifre (isteğe bağlı) ayarlanmamışsa, giriş yaptığınızda daha sonra ayarlanacaktır",
                cs: "Heslo pro uživatele (volitelné), pokud není nastaveno, bude nastaveno později při přihlášení",
                ja: "ユーザーのパスワード（オプション）設定されていない場合は、ログイン時に後で設定されます",
                ko: "사용자의 비밀번호 (선택 사항) 설정되지 않은 경우 나중에 로그인 할 때 설정됩니다"
            },
            required: false
        }
    ],
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        let user = interaction.options.getString("user");
        let pass = interaction.options.getString("pass");

        let url = `https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=resetpw&user=${user}&passwd=${pass}`;
        if (!pass) url = `https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=resetpw&user=${user}`;

        fetch(url).then((res) =>
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
