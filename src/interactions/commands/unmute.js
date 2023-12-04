import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "unmute",
    description: "Unmute user from chat channel",
    description_localizations: {
        "en-US": "Unmute user from chat channel",
        fi: "Poista käyttäjän mykistys chat-kanavalta",
        fr: "Réactiver l'utilisateur du canal de chat",
        de: "Stummschaltung des Benutzers im Chat-Kanal aufheben",
        it: "Attiva l'audio dell'utente dal canale di chat",
        nl: "Dempen van gebruiker van chatkanaal opheffen",
        ru: "Включить пользователя из канала чата",
        pl: "Wyłącz wyciszenie użytkownika z kanału czatu",
        tr: "Kullanıcının sohbet kanalından sesini aç",
        cs: "Přestat ignorovat uživatele z chatovacího kanálu",
        ja: "チャット チャネルからユーザーのミュートを解除",
        ko: "채팅 채널에서 사용자 음소거 해제"
    },

    options: [
        {
            type: 3,
            name: "user",
            description: "The user's username",
            description_localizations: {
                "en-US": "The user's username",
                fi: "Käyttäjän käyttäjätunnus",
                fr: "Le nom d'utilisateur de l'utilisateur",
                de: "Der Benutzername des Benutzers",
                it: "Il nome utente dell'utente",
                nl: "De gebruikersnaam van de gebruiker",
                ru: "Имя пользователя пользователя",
                pl: "Nazwa użytkownika użytkownika",
                tr: "Kullanıcının kullanıcı adı",
                cs: "Uživatelské jméno uživatele",
                ja: "ユーザーのユーザー名",
                ko: "사용자의 사용자 이름"
            },
            required: true
        }
    ],
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        let user = interaction.options.getString("user");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=unmuteuser&user=${user}`).then((res) =>
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
