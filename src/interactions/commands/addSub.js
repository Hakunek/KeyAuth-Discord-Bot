import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "addsub",
    description: "Add Subscription",
    description_localizations: {
        "en-US": "Add Subscription",
        fi: "Lisää tilaus",
        fr: "Ajouter une abonnement",
        de: "Abonnement hinzufügen",
        it: "Aggiungi abbonamento",
        nl: "Abonnement toevoegen",
        ru: "Добавить подписку",
        pl: "Dodaj subskrypcję",
        tr: "Abonelik ekle",
        cs: "Přidat předplatné",
        ja: "サブスクリプションを追加する",
        ko: "구독 추가"
    },
    options: [
        {
            type: 3,
            name: "name",
            description: "Subscription Name?",
            description_localizations: {
                "en-US": "Subscription Name?",
                fi: "Tilausnimi?",
                fr: "Nom de l'abonnement?",
                de: "Abonnementname?",
                it: "Nome dell'abbonamento?",
                nl: "Abonnementnaam?",
                ru: "Название подписки?",
                pl: "Nazwa subskrypcji?",
                tr: "Abonelik adı?",
                cs: "Název předplatného?",
                ja: "サブスクリプション名？",
                ko: "구독 이름?"
            },
            required: true
        },
        {
            type: 4,
            name: "level",
            description: "Subscription Level?",
            description_localizations: {
                "en-US": "Subscription Level?",
                fi: "Tilaustaso?",
                fr: "Niveau d'abonnement?",
                de: "Abonnementstufe?",
                it: "Livello di abbonamento?",
                nl: "Abonnementsniveau?",
                ru: "Уровень подписки?",
                pl: "Poziom subskrypcji?",
                tr: "Abonelik seviyesi?",
                cs: "Úroveň předplatného?",
                ja: "サブスクリプションレベル？",
                ko: "구독 레벨?"
            },
            required: true
        }
    ],
    async execute(interaction) {
        let subname = interaction.options.getString("name");
        let sublevel = interaction.options.getString("level");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=addsub&name=${subname}&level=${sublevel}`).then((res) =>
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
