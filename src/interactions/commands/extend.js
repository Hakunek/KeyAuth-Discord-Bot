import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "extend",
    description: "Extend User",
    description_localizations: {
        "en-US": "Extend User",
        fi: "Pidentä käyttäjää",
        fr: "Étendre l'utilisateur",
        de: "Benutzer erweitern",
        it: "Estendi utente",
        nl: "Gebruiker uitbreiden",
        ru: "Расширить пользователя",
        pl: "Rozszerz użytkownika",
        tr: "Kullanıcıyı uzat",
        cs: "Rozšířit uživatele",
        ja: "ユーザーを拡張する",
        ko: "사용자 확장"
    },
    options: [
        {
            type: 3,
            name: "username",
            description: "Enter username to extend",
            description_localizations: {
                "en-US": "Enter username to extend",
                fi: "Anna käyttäjätunnus jatkaa",
                fr: "Entrez le nom d'utilisateur à étendre",
                de: "Geben Sie den Benutzernamen ein, um ihn zu erweitern",
                it: "Inserisci il nome utente da estendere",
                nl: "Voer de gebruikersnaam in om uit te breiden",
                ru: "Введите имя пользователя, чтобы расширить",
                pl: "Wprowadź nazwę użytkownika, aby ją rozszerzyć",
                tr: "Uzatmak için kullanıcı adını girin",
                cs: "Zadejte uživatelské jméno, abyste jej rozšířili",
                ja: "拡張するユーザー名を入力してください",
                ko: "확장 할 사용자 이름을 입력하십시오"
            },
            required: true
        },
        {
            type: 3,
            name: "subname",
            description: "Enter Subscription Name",
            description_localizations: {
                "en-US": "Enter Subscription Name",
                fi: "Anna tilausnimi",
                fr: "Entrez le nom de l'abonnement",
                de: "Geben Sie den Abonnementsnamen ein",
                it: "Inserisci il nome dell'abbonamento",
                nl: "Voer de abonnementsnaam in",
                ru: "Введите название подписки",
                pl: "Wprowadź nazwę subskrypcji",
                tr: "Abonelik adını girin",
                cs: "Zadejte název odběru",
                ja: "サブスクリプション名を入力してください",
                ko: "구독 이름을 입력하십시오"
            },
            required: true
        },
        {
            type: 3,
            name: "expiry",
            description: "Enter Days Subscription Should Last",
            description_localizations: {
                "en-US": "Enter Days Subscription Should Last",
                fi: "Anna päivät, jolloin tilaus pitäisi kestää",
                fr: "Entrez les jours pendant lesquels l'abonnement devrait durer",
                de: "Geben Sie die Tage ein, an denen die Abonnementdauer enden soll",
                it: "Inserisci i giorni in cui l'abbonamento dovrebbe durare",
                nl: "Voer de dagen in waarop de abonnementsduur moet eindigen",
                ru: "Введите дни, в течение которых должна длиться подписка",
                pl: "Wprowadź dni, w których subskrypcja powinna trwać",
                tr: "Abonelik süresinin ne kadar süreceğini girin",
                cs: "Zadejte dny, po které má trvat doba platnosti odběru",
                ja: "サブスクリプションの有効期間がどのくらい続くかを入力してください",
                ko: "구독 기간이 얼마나 지속되어야 하는지 입력하십시오"
            },
            required: true
        }
    ],
    async execute(interaction) {
        let un = interaction.options.getString("username");
        let subname = interaction.options.getString("subname");
        let days = interaction.options.getString("expiry");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=extend&user=${un}&sub=${subname}&expiry=${days}`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: json.message,
                                color: 0x00ff00,
                                fields: [{ name: "User Extended:", value: `${un}` }],
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
