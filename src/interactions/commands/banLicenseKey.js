import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "ban",
    description: "Ban license key",
    description_localizations: {
        "en-US": "Ban license key",
        fi: "Estä lisenssikoodi",
        fr: "Interdire la clé de licence",
        de: "Lizenzschlüssel sperren",
        it: "Blocca la chiave di licenza",
        nl: "Licentiesleutel verbannen",
        ru: "Запретить лицензионный ключ",
        pl: "Zbanuj klucz licencyjny",
        tr: "Lisans anahtarını yasakla",
        cs: "Zakáže licenční klíč",
        ja: "ライセンスキーを禁止する",
        ko: "라이센스 키 금지"
    },
    options: [
        {
            type: 3,
            name: "key",
            description: "Key you wish to ban",
            description_localizations: {
                "en-US": "Key you wish to ban",
                fi: "Avain, jonka haluat estää",
                fr: "Clé que vous souhaitez interdire",
                de: "Schlüssel, den Sie sperren möchten",
                it: "Chiave che desideri bloccare",
                nl: "Sleutel die u wilt verbannen",
                ru: "Ключ, который вы хотите запретить",
                pl: "Klucz, który chcesz zbanować",
                tr: "Yasaklamak istediğiniz anahtar",
                cs: "Klíč, který chcete zakázat",
                ja: "禁止したいキー",
                ko: "금지하려는 키"
            },
            required: true
        },
        {
            type: 3,
            name: "reason",
            description: "Reason for the ban",
            description_localizations: {
                "en-US": "Reason for the ban",
                fi: "Syy bannille",
                fr: "Raison du bannissement",
                de: "Grund für die Sperrung",
                it: "Motivo del ban",
                nl: "Reden voor de ban",
                ru: "Причина бана",
                pl: "Powód bana",
                tr: "Yasaklama nedeni",
                cs: "Důvod pro zákaz",
                ja: "禁止の理由",
                ko: "금지의 이유"
            },
            required: true
        }
    ],
    async execute(interaction) {
        let key = interaction.options.getString("key");
        let reason = interaction.options.getString("reason");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=ban&key=${key}&reason=${reason}`).then((res) =>
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
