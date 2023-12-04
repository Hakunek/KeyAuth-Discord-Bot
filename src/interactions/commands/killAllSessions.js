import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "killsessions",
    description: "Kill All Existing Sessions",
    description_localizations: {
        "en-US": "Kill All Existing Sessions",
        fi: "Tappaa kaikki olemassa olevat istunnot",
        fr: "Tuez toutes les sessions existantes",
        de: "Töten Sie alle vorhandenen Sitzungen",
        it: "Uccidi tutte le sessioni esistenti",
        nl: "Dood alle bestaande sessies",
        ru: "Убейте все существующие сеансы",
        pl: "Zabij wszystkie istniejące sesje",
        tr: "Tüm Mevcut Oturumları Öldürün",
        cs: "Zabijte všechny existující relace",
        ja: "すべての既存のセッションを終了する",
        ko: "모든 기존 세션 죽이기"
    },
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=killall`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.reply({ embeds: [{ title: "Successfully Killed All Sessions", color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}`, footer: { text: "KeyAuth Discord Bot" } }], ephemeral: true });
                } else {
                    interaction.reply({
                        embeds: [
                            {
                                title: json.message,
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
