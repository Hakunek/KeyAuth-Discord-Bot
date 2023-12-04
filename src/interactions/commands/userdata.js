import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "userdata",
    description: "Retrieve info from a user",
    description_localizations: {
        "en-US": "Retrieve info from a user",
        fi: "Hae tietoja käyttäjältä",
        fr: "Récupérer des informations sur un utilisateur",
        de: "Informationen von einem Benutzer abrufen",
        it: "Recupera informazioni da un utente",
        nl: "Informatie ophalen van een gebruiker",
        ru: "Получить информацию о пользователе",
        pl: "Pobierz informacje o użytkowniku",
        tr: "Bir kullanıcıdan bilgi al",
        cs: "Získejte informace o uživateli",
        ja: "ユーザーから情報を取得する",
        ko: "사용자에서 정보 검색"
    },
    options: [
        {
            type: 3,
            name: "user",
            description: "Specify user to lookup",
            description_localizations: {
                "en-US": "Specify user to lookup",
                fi: "Määritä käyttäjä, jota etsitään",
                fr: "Spécifiez l'utilisateur à rechercher",
                de: "Geben Sie den Benutzer an, nach dem gesucht werden soll",
                it: "Specifica l'utente da cercare",
                nl: "Geef de gebruiker op die u wilt opzoeken",
                ru: "Укажите пользователя для поиска",
                pl: "Określ użytkownika do wyszukania",
                tr: "Aranacak kullanıcıyı belirtin",
                cs: "Zadejte uživatele, kterého chcete vyhledat",
                ja: "検索するユーザーを指定してください",
                ko: "찾을 사용자 지정"
            },
            required: true
        }
    ],
    async execute(interaction) {
        let user = interaction.options.getString("user");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=userdata&user=${user}`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (!json.success)
                    return interaction.editReply({
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
                let hwid = json.hwid ?? "N/A";
                let ip = json.ip ?? "N/A";
                let lastlogin = json.lastlogin !== null && json.lastlogin !== undefined ? `<t:${json.lastlogin}:f>` : "N/A";
                let expiry = "N/A";
                let subscription = "N/A";
                if (json.subscriptions.length !== 0) {
                    expiry = json.subscriptions[0].expiry !== null && json.subscriptions[0].expiry !== undefined ? `<t:${json["subscriptions"][0]["expiry"]}:f>` : "N/A";
                    subscription = json.subscriptions[0].subscription !== null && json.subscriptions[0].subscription !== undefined ? json.subscriptions[0].subscription : "N/A";
                }

                interaction.editReply({
                    embeds: [
                        {
                            title: `User data for ${user}`,
                            fields: [
                                { name: "Expiry:", value: `${expiry}` },
                                { name: "Subscription name:", value: `${subscription}` },
                                { name: "Last Login:", value: `${lastlogin}` },
                                { name: "HWID:", value: `${hwid}` },
                                { name: "Created On:", value: `<t:${json["createdate"]}:f>` },
                                { name: "IP,ress::", value: `${ip}` }
                            ],
                            color: 0x0000ff,
                            timestamp: `${interaction.createdAt.toISOString()}`
                        }
                    ]
                });
            })
        );
    }
};
