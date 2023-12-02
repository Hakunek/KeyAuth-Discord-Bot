import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "info",
    description: "Info On key",
    description_localizations: {
        "en-US": "Info On key",
        fi: "Tietoja avaimesta",
        fr: "Info sur la clé",
        de: "Info zur Taste",
        it: "Info sulla chiave",
        nl: "Info over sleutel",
        ru: "Информация о ключе",
        pl: "Informacje o kluczu",
        tr: "Anahtar hakkında bilgi",
        cs: "Informace o klíči",
        ja: "キーに関する情報",
        ko: "키 정보"
    },
    options: [
        {
            type: 3,
            name: "license",
            description: "Specify key",
            description_localizations: {
                "en-US": "Specify key",
                fi: "Määritä avain",
                fr: "Spécifier la clé",
                de: "Schlüssel angeben",
                it: "Specifica la chiave",
                nl: "Geef sleutel op",
                ru: "Укажите ключ",
                pl: "Określ klucz",
                tr: "Anahtarı belirtin",
                cs: "Zadejte klíč",
                ja: "キーを指定する",
                ko: "키 지정"
            },
            required: true
        }
    ],
    async execute(interaction) {
        let key = interaction.options.getString("license");
        let hwid;
        let ip;

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=info&key=${key}`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (!json.success)
                    return interaction.editReply({
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

                interaction.editReply({
                    embeds: [
                        {
                            title: `Key Information for ${key}`,
                            fields: [
                                { name: "Expiry:", value: `${json["expiry"]}` },
                                { name: "Last Login:", value: `${json["lastlogin"]}` },
                                { name: "HWID:", value: `${hwid}` },
                                { name: "Status:", value: `${json["status"]}` },
                                { name: "Level:", value: `${json["level"]}` },
                                { name: "Created By:", value: `${json["createdby"]}` },
                                { name: "Created On:", value: `${json["creationdate"]}` },
                                { name: "IP Address:", value: `${ip}` }
                            ],
                            color: 0x0000ff,
                            timestamp: `${interaction.createdAt.toISOString()}`
                        }
                    ]
                });
            })
        );
    }
};
