import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "resetall",
    description: "Reset all user's hwid",
    description_localizations: {
        "en-US": "Reset all user's hwid",
        fi: "Nollaa kaikkien käyttäjien hwid",
        fr: "Réinitialiser l'identifiant matériel de tous les utilisateurs",
        de: "Setzen Sie die Hardware-ID aller Benutzer zurück",
        it: "Reimposta l'ID hardware di tutti gli utenti",
        nl: "Reset alle gebruikers hwid",
        ru: "Сбросить идентификатор аппаратного обеспечения всех пользователей",
        pl: "Zresetuj wszystkie identyfikatory sprzętu użytkowników",
        tr: "Tüm kullanıcının donanım kimliğini sıfırlayın",
        cs: "Obnovte identifikátor hardwaru všech uživatelů",
        ja: "すべてのユーザーのハードウェアIDをリセットします",
        ko: "모든 사용자의 하드웨어 ID를 재설정합니다"
    },
    async execute(interaction) {
        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=resetalluser`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: json.message,
                                color: 0x00ff00,
                                fields: [{ name: "Subscription deleted:", value: `\`${name}\`` }],
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
