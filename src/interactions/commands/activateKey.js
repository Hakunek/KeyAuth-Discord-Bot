import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "activate",
    description: "Activate License Key",
    description_localizations: {
        "en-US": "Activate License Key",
        "en-GB": "Activate License Key",
        fi: "Aktivoi lisenssikoodi",
        fr: "Activer la clé de licence",
        de: "Aktivieren Sie den Lizenzschlüssel",
        it: "Attiva la chiave di licenza",
        nl: "Activeer licentiesleutel",
        ru: "Активировать лицензионный ключ",
        pl: "Aktywuj klucz licencyjny",
        tr: "Lisans anahtarını etkinleştir",
        cs: "Aktivovat licenční klíč",
        ja: "ライセンスキーを有効にする",
        ko: "라이센스 키 활성화"
    },
    options: [
        {
            type: 3,
            name: "username",
            description: "Enter username to register",
            description_localizations: {
                "en-US": "Enter username to register",
                fi: "Syötä rekisteröitymisessä käytettävä käyttäjätunnus",
                fr: "Entrez le nom d'utilisateur à enregistrer",
                de: "Geben Sie den Benutzernamen ein, um sich zu registrieren",
                it: "Inserisci il nome utente da registrare",
                nl: "Voer de gebruikersnaam in om te registreren",
                ru: "Введите имя пользователя для регистрации",
                pl: "Wprowadź nazwę użytkownika do rejestracji",
                tr: "Kayıt olmak için kullanıcı adını girin",
                cs: "Zadejte uživatelské jméno k registraci",
                ja: "登録するユーザー名を入力してください",
                ko: "등록할 사용자 이름을 입력하십시오"
            },
            required: true
        },
        {
            type: 3,
            name: "license",
            description: "Enter Valid License",
            description_localizations: {
                "en-US": "Enter Valid License",
                fi: "Syötä kelvollinen lisenssi",
                fr: "Entrez une licence valide",
                de: "Geben Sie eine gültige Lizenz ein",
                it: "Inserisci una licenza valida",
                nl: "Voer een geldige licentie in",
                ru: "Введите действительную лицензию",
                pl: "Wprowadź ważną licencję",
                tr: "Geçerli bir lisans girin",
                cs: "Zadejte platnou licenci",
                ja: "有効なライセンスを入力してください",
                ko: "유효한 라이센스를 입력하십시오"
            },
            required: true
        },
        {
            type: 3,
            name: "password",
            description: "Enter Password",
            description_localizations: {
                "en-US": "Enter Password",
                fi: "Syötä salasana",
                fr: "Entrez le mot de passe",
                de: "Geben Sie das Passwort ein",
                it: "Inserisci la password",
                nl: "Voer het wachtwoord in",
                ru: "Введите пароль",
                pl: "Wprowadź hasło",
                tr: "Şifreyi girin",
                cs: "Zadejte heslo",
                ja: "パスワードを入力してください",
                ko: "비밀번호를 입력하십시오"
            },
            required: true
        }
    ],
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction, client) {
        let un = interaction.options.getString("username", true);
        let pw = interaction.options.getString("password", true);
        let key = interaction.options.getString("license", true);
        await interaction.deferReply({ ephemeral: true });

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=activate&user=${un}&key=${key}&pass=${pw}&format=text`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: "License Successfully Activated!",
                                fields: [{ name: "License Activated:", value: `${key}` }],
                                color: 0x00ff00,
                                timestamp: `${interaction.createdAt.toISOString()}`
                            }
                        ]
                    });
                } else {
                    interaction.editReply({
                        embeds: [
                            {
                                // @ts-ignore
                                title: json.message,
                                fields: [{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`setseller\` command.` }],
                                color: 0xff0000,
                                timestamp: `${interaction.createdAt.toISOString()}`
                            }
                        ]
                    });
                }
            })
        );
    }
};
