import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "delexpusers",
    description: "Delete users with no active subscriptions",
    description_localizations: {
        "en-US": "Delete users with no active subscriptions",
        fi: "Poista käyttäjät, joilla ei ole aktiivisia tilauksia",
        fr: "Supprimer les utilisateurs sans abonnement actif",
        de: "Benutzer mit keinem aktiven Abonnement löschen",
        it: "Elimina gli utenti senza sottoscrizioni attive",
        nl: "Gebruikers met geen actieve abonnementen verwijderen",
        ru: "Удалить пользователей без активных подписок",
        pl: "Usuń użytkowników bez aktywnych subskrypcji",
        tr: "Aktif abonelik olmayan kullanıcıları sil",
        cs: "Odstranit uživatele bez aktivních předplatných",
        ja: "アクティブなサブスクリプションのないユーザーを削除する",
        ko: "활성 구독이없는 사용자 삭제"
    },
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=delexpusers`).then((res) =>
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
