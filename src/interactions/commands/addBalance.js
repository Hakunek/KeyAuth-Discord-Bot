import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "addbalance",
    description: "Add balance to reseller accounts.",
    description_localizations: {
        "en-US": "Add balance to reseller accounts.",
        fi: "Lisää saldoa jälleenmyyjätilille.",
        fr: "Ajouter un solde aux comptes revendeurs.",
        de: "Guthaben auf Reseller-Konten hinzufügen.",
        it: "Aggiungi saldo ai conti rivenditore.",
        nl: "Voeg saldo toe aan reseller-accounts.",
        ru: "Добавить баланс на счета реселлеров.",
        pl: "Dodaj saldo do kont resellerów.",
        tr: "Bayi hesaplarına bakiye ekleyin.",
        cs: "Přidejte zůstatek na účty prodejců.",
        ja: "リセラーアカウントに残高を追加します。",
        ko: "리셀러 계정에 잔액을 추가하십시오."
    },
    options: [
        {
            type: 3,
            name: "username",
            description: "Username of the account",
            description_localizations: {
                "en-US": "Username of the account",
                fi: "Tilin käyttäjänimi",
                fr: "Nom d'utilisateur du compte",
                de: "Benutzername des Kontos",
                it: "Nome utente dell'account",
                nl: "Gebruikersnaam van de account",
                ru: "Имя пользователя учетной записи",
                pl: "Nazwa użytkownika konta",
                tr: "Hesabın kullanıcı adı",
                cs: "Uživatelské jméno účtu",
                ja: "アカウントのユーザー名",
                ko: "계정의 사용자 이름"
            },
            required: true
        },
        {
            type: 4,
            name: "days",
            description: "Number of days",
            description_localizations: {
                "en-US": "Number of days",
                fi: "Päivien lukumäärä",
                fr: "Nombre de jours",
                de: "Anzahl der Tage",
                it: "Numero di giorni",
                nl: "Aantal dagen",
                ru: "Количество дней",
                pl: "Liczba dni",
                tr: "Gün sayısı",
                cs: "Počet dnů",
                ja: "日数",
                ko: "일 수"
            },
            required: false
        },
        {
            type: 4,
            name: "weeks",
            description: "Number of weeks",
            description_localizations: {
                "en-US": "Number of weeks",
                fi: "Viikkojen lukumäärä",
                fr: "Nombre de semaines",
                de: "Anzahl der Wochen",
                it: "Numero di settimane",
                nl: "Aantal weken",
                ru: "Количество недель",
                pl: "Liczba tygodni",
                tr: "Hafta sayısı",
                cs: "Počet týdnů",
                ja: "週数",
                ko: "주 수"
            },
            required: false
        },
        {
            type: 4,
            name: "months",
            description: "Number of months",
            description_localizations: {
                "en-US": "Number of months",
                fi: "Kuukausien lukumäärä",
                fr: "Nombre de mois",
                de: "Anzahl der Monate",
                it: "Numero di mesi",
                nl: "Aantal maanden",
                ru: "Количество месяцев",
                pl: "Liczba miesięcy",
                tr: "Ay sayısı",
                cs: "Počet měsíců",
                ja: "月数",
                ko: "월 수"
            },
            required: false
        },
        {
            type: 4,
            name: "threemonths",
            description: "Number of threemonths",
            description_localizations: {
                "en-US": "Number of threemonths",
                fi: "Kolmen kuukauden lukumäärä",
                fr: "Nombre de trois mois",
                de: "Anzahl der drei Monate",
                it: "Numero di tre mesi",
                nl: "Aantal drie maanden",
                ru: "Количество трех месяцев",
                pl: "Liczba trzech miesięcy",
                tr: "Üç ay sayısı",
                cs: "Počet tří měsíců",
                ja: "3か月の数",
                ko: "3 개월 수"
            },
            required: false
        },
        {
            type: 4,
            name: "sixmonths",
            description: "Number of sixmonths",
            description_localizations: {
                "en-US": "Number of sixmonths",
                fi: "Kuuden kuukauden lukumäärä",
                fr: "Nombre de six mois",
                de: "Anzahl der sechs Monate",
                it: "Numero di sei mesi",
                nl: "Aantal zes maanden",
                ru: "Количество шести месяцев",
                pl: "Liczba sześciu miesięcy",
                tr: "Altı ay sayısı",
                cs: "Počet šesti měsíců",
                ja: "6か月の数",
                ko: "6 개월 수"
            },
            required: false
        },
        {
            type: 4,
            name: "lifetimes",
            description: "Number of lifetimes",
            description_localizations: {
                "en-US": "Number of lifetimes",
                fi: "Elinaikojen lukumäärä",
                fr: "Nombre de vies",
                de: "Anzahl der Lebenszeiten",
                it: "Numero di vite",
                nl: "Aantal levens",
                ru: "Количество жизней",
                pl: "Liczba żyć",
                tr: "Ömür sayısı",
                cs: "Počet životů",
                ja: "生涯の数",
                ko: "생애 수"
            },
            required: false
        }
    ],
    async execute(interaction) {
        let username = interaction.options.getString("username", true);
        let days = interaction.options.getNumber("days") || 0;
        let weeks = interaction.options.getNumber("weeks") || 0;
        let months = interaction.options.getNumber("months") || 0;
        let threemonths = interaction.options.getNumber("threemonths") || 0;
        let sixmonths = interaction.options.getNumber("sixmonths") || 0;
        let lifetimes = interaction.options.getNumber("lifetimes") || 0;
        if (days == 0 && weeks == 0 && months == 0 && threemonths == 0 && sixmonths == 0 && lifetimes == 0)
            return interaction.reply({
                embeds: [
                    {
                        title: `Incorrect input`,
                        fields: [{ name: "Note:", value: `Please supply at least single parameter` }],
                        color: 0xff0000,
                        timestamp: `${interaction.createdAt.toISOString()}`,
                        footer: { text: "KeyAuth Discord Bot" }
                    }
                ],
                ephemeral: true
            });
        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=setbalance&username=${username}&day=${days}&week=${weeks}&month=${months}&threemonth=${threemonths}&sixmonth=${sixmonths}&lifetime=${lifetimes}`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.reply({
                        embeds: [
                            {
                                title: json.message,
                                color: 0x00ff00,
                                timestamp: `${interaction.createdAt.toISOString()}`,
                                footer: { text: "KeyAuth Discord Bot" }
                            }
                        ],
                        ephemeral: true
                    });
                } else {
                    interaction.reply({
                        embeds: [
                            {
                                title: `${json.message}`,
                                fields: [{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`/setseller\` command.` }],
                                color: 0xff0000,
                                timestamp: `${interaction.createdAt.toISOString()}`,
                                footer: { text: "KeyAuth Discord Bot" }
                            }
                        ],
                        ephemeral: true
                    });
                }
            })
        );
    }
};
