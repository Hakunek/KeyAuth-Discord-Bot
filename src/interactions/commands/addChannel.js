import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "addchannel",
    description: "Add chat channel",
    description_localizations: {
        "en-US": "Add chat channel",
        fi: "Lisää keskustelukanava",
        fr: "Ajouter un canal de discussion",
        de: "Chatkanal hinzufügen",
        it: "Aggiungi canale di chat",
        nl: "Voeg chatkanaal toe",
        ru: "Добавить чат-канал",
        pl: "Dodaj kanał czatu",
        tr: "Sohbet kanalı ekle",
        cs: "Přidat chatovací kanál",
        ja: "チャットチャネルを追加する",
        ko: "채팅 채널 추가"
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
                nl: "Naam van chatkanaal",
                ru: "Имя чат-канала",
                pl: "Nazwa kanału czatu",
                tr: "Sohbet kanalı adı",
                cs: "Název chatovacího kanálu",
                ja: "チャットチャネル名",
                ko: "채팅 채널 이름"
            },
            required: true
        },
        {
            type: 4,
            name: "delay",
            description: "Chat channel delay (how often user can send messages in seconds)",
            description_localizations: {
                "en-US": "Chat channel delay (how often user can send messages in seconds)",
                fi: "Keskustelukanavan viive (kuinka usein käyttäjä voi lähettää viestejä sekunneissa)",
                fr: "Délai du canal de chat (fréquence des messages en secondes)",
                de: "Chatkanalverzögerung (wie oft der Benutzer Nachrichten in Sekunden senden kann)",
                it: "Ritardo del canale di chat (con quale frequenza l'utente può inviare messaggi in secondi)",
                nl: "Chatkanaalvertraging (hoe vaak gebruiker berichten kan verzenden in seconden)",
                ru: "Задержка чат-канала (как часто пользователь может отправлять сообщения в секундах)",
                pl: "Opóźnienie kanału czatu (jak często użytkownik może wysyłać wiadomości w sekundach)",
                tr: "Sohbet kanalı gecikmesi (kullanıcı ne sıklıkla mesaj gönderebileceği saniye cinsinden)",
                cs: "Zpoždění chatovacího kanálu (jak často může uživatel odesílat zprávy v sekundách)",
                ja: "チャットチャネルの遅延（ユーザーが秒単位でメッセージを送信できる頻度）",
                ko: "채팅 채널 지연 (사용자가 초 단위로 메시지를 보낼 수 있는 빈도)"
            },
            required: true
        }
    ],
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        let name = interaction.options.getString("name");
        let delay = interaction.options.getString("delay");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=addchannel&name=${name}&delay=${delay}`).then((res) =>
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
