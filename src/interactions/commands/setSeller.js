import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "setseller",
    description: "Sets The seller key",
    description_localizations: {
        "en-US": "Sets The seller key",
        fi: "Asettaa myyjän avaimen",
        fr: "Définit la clé du vendeur",
        de: "Setzt den Verkäufer-Schlüssel",
        it: "Imposta la chiave del venditore",
        nl: "Stelt de verkoperssleutel in",
        ru: "Устанавливает ключ продавца",
        pl: "Ustawia klucz sprzedawcy",
        tr: "Satıcı anahtarını ayarlar",
        cs: "Nastaví klíč prodejce",
        ja: "販売者キーを設定します",
        ko: "판매자 키 설정"
    },
    options: [
        {
            type: 3,
            name: "sellerKey",
            description: "Specify application seller key",
            description_localizations: {
                "en-US": "Specify application seller key",
                fi: "Määritä sovelluksen myyjän avain",
                fr: "Spécifiez la clé du vendeur de l'application",
                de: "Geben Sie den Verkäufer-Schlüssel der Anwendung an",
                it: "Specifica la chiave del venditore dell'applicazione",
                nl: "Geef de verkoperssleutel van de applicatie op",
                ru: "Укажите ключ продавца приложения",
                pl: "Określ klucz sprzedawcy aplikacji",
                tr: "Uygulama satıcı anahtarını belirtin",
                cs: "Zadejte klíč prodejce aplikace",
                ja: "アプリケーションの販売者キーを指定してください",
                ko: "응용 프로그램 판매자 키 지정"
            },
            required: true
        }
    ],
    async execute(interaction) {
        let sellerKey = interaction.options.getString("sellerKey");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerKey}&type=setseller`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: `Seller Key Successfully Set!`,
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
