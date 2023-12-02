import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "resethash",
    description: "Reset app hash",
    description_localizations: {
        "en-US": "Reset app hash",
        fi: "Nollaa sovelluksen tunniste",
        fr: "Réinitialiser l'empreinte de l'application",
        de: "App-Hash zurücksetzen",
        it: "Reimposta l'hash dell'app",
        nl: "App-hash opnieuw instellen",
        ru: "Сбросить хэш приложения",
        pl: "Zresetuj hash aplikacji",
        tr: "Uygulama karmaşasını sıfırla",
        cs: "Obnovit hash aplikace",
        ja: "アプリのハッシュをリセットする",
        ko: "앱 해시 재설정"
    },
    async execute(interaction) {
        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=resethash`).then((res) =>
            res.json().then((json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: "Hash Successfully Reset!",
                                fields: [{ name: "Reminder:", value: `You need to reset hash each time you compile loader.` }],
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
