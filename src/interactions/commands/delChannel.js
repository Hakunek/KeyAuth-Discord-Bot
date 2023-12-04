import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "delchannel",
    description: "Delete chat channel",
    description_localizations: {
        "en-US": "Delete chat channel",
        fi: "Poista keskustelukanava",
        fr: "Supprimer le canal de discussion",
        de: "Chat-Kanal löschen",
        it: "Elimina canale di chat",
        nl: "Chatkanaal verwijderen",
        ru: "Удалить чат-канал",
        pl: "Usuń kanał czatu",
        tr: "Sohbet kanalını sil",
        cs: "Odstranit chatovací kanál",
        ja: "チャットチャネルを削除する",
        ko: "채팅 채널 삭제"
    },
    options: [
        {
            type: 7,
            name: "name",
            description: "Chat channel name",
            description_localizations: {
                "en-US": "Chat channel name",
                fi: "Keskustelukanavan nimi",
                fr: "Nom du canal de discussion",
                de: "Name des Chat-Kanals",
                it: "Nome del canale di chat",
                nl: "Naam van chatkanaal",
                ru: "Имя чат-канала",
                pl: "Nazwa kanału czatu",
                tr: "Sohbet kanalı adı",
                cs: "Název chatovacího kanálu",
                ja: "チャットチャネル名",
                ko: "채팅 채널 이름"
            },
            required: true
        }
    ],
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        let name = interaction.options.getString("name", true);

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=delchannel&name=${name}`).then((res) =>
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
