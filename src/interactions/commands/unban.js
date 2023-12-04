import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "unban",
    description: "Unban license key",
    description_localizations: {
        "en-US": "Unban license key",
        fi: "Poista lisenssikoodin esto",
        fr: "Débannir la clé de licence",
        de: "Lizenzschlüssel freigeben",
        it: "Sbanna la chiave di licenza",
        nl: "Deban licentiesleutel",
        ru: "Разбанить лицензионный ключ",
        pl: "Odbanuj klucz licencyjny",
        tr: "Lisans anahtarını debanlayın",
        cs: "Odbanovat licenční klíč",
        ja: "ライセンスキーの禁止を解除する",
        ko: "라이센스 키 차단 해제"
    },

    options: [
        {
            type: 3,
            name: "key",
            description: "Key you wish to unban",
            description_localizations: {
                "en-US": "Key you wish to unban",
                fi: "Avain, jonka haluat poistaa estosta",
                fr: "Clé que vous souhaitez débannir",
                de: "Schlüssel, den Sie freigeben möchten",
                it: "Chiave che desideri sbannare",
                nl: "Sleutel die u wilt debannen",
                ru: "Ключ, который вы хотите разбанить",
                pl: "Klucz, który chcesz odbanować",
                tr: "Debanlamak istediğiniz anahtar",
                cs: "Klíč, který chcete odbanovat",
                ja: "禁止を解除したいキー",
                ko: "차단 해제하려는 키"
            },
            required: true
        }
    ],
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        let key = interaction.options.getString("key");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=unban&key=${key}`).then((res) =>
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
