import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "purgechat",
    description: "Purge chat channel's messages",
    description_localizations: {
        "en-US": "Purge chat channel's messages",
        fi: "Puhdista keskustelukanavan viestit",
        fr: "Purger les messages du canal de discussion",
        de: "Löschen Sie die Nachrichten des Chatkanals",
        it: "Elimina i messaggi del canale di chat",
        nl: "Verwijder de berichten van het chatkanaal",
        ru: "Удалить сообщения чат-канала",
        pl: "Wyczyść wiadomości kanału czatu",
        tr: "Sohbet kanalının mesajlarını temizle",
        cs: "Vymažte zprávy chatovacího kanálu",
        ja: "チャットチャネルのメッセージを削除する",
        ko: "채팅 채널의 메시지 삭제"
    },

    options: [
        {
            type: 3,
            name: "name",
            description: "Chat channel name",
            description_localizations: {
                "en-US": "Chat channel name",
                fi: "Keskustelukanavan nimi",
                fr: "Nom du canal de discussion",
                de: "Name des Chatkanals",
                it: "Nome del canale di chat",
                nl: "Naam van het chatkanaal",
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
        let name = interaction.options.getString("name");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=clearchannel&name=${name}`).then((res) =>
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
