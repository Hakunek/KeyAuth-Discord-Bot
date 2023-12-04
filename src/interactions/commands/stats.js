import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "stats",
    description: "Application Statistics",
    description_localizations: {
        "en-US": "Application Statistics",
        fi: "Sovelluksen tilastot",
        fr: "Statistiques de l'application",
        de: "Anwendungsstatistiken",
        it: "Statistiche dell'applicazione",
        nl: "Applicatiestatistieken",
        ru: "Статистика приложения",
        pl: "Statystyki aplikacji",
        tr: "Uygulama İstatistikleri",
        cs: "Statistiky aplikace",
        ja: "アプリケーションの統計",
        ko: "응용 프로그램 통계"
    },
    async execute(interaction) {
        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=stats`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: "Application Statistics",
                                fields: [
                                    { name: "Total Keys:", value: `${json["totalkeys"]}` },
                                    { name: "Unused Keys:", value: `${json["unused"]}` },
                                    { name: "Used Keys:", value: `${json["used"]}` },
                                    { name: "Paused Keys:", value: `${json["paused"]}` },
                                    { name: "Banned Keys:", value: `${json["banned"]}` },
                                    { name: "Webhooks:", value: `${json["webhooks"]}` },
                                    { name: "Files:", value: `${json["files"]}` },
                                    { name: "Vars:", value: `${json["vars"]}` },
                                    { name: "Total Accounts:", value: `${json["totalaccs"]}` },
                                    { name: "Reseller Accounts:", value: `${json["resellers"]}` },
                                    { name: "Manager Accounts:", value: `${json["managers"]}` }
                                ],
                                color: 0x0000ff,
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
