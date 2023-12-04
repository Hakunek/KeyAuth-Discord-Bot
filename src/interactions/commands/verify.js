import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "verify",
    description: "Verify license exists",
    description_localizations: {
        "en-US": "Verify license exists",
        fi: "Tarkista, että lisenssi on olemassa",
        fr: "Vérifiez que la licence existe",
        de: "Überprüfen Sie, ob die Lizenz vorhanden ist",
        it: "Verifica che la licenza esista",
        nl: "Controleer of de licentie bestaat",
        ru: "Проверьте, существует ли лицензия",
        pl: "Sprawdź, czy licencja istnieje",
        tr: "Lisansın var olup olmadığını doğrulayın",
        cs: "Ověřte, zda licenční klíč existuje",
        ja: "ライセンスが存在することを確認します",
        ko: "라이센스가 존재하는지 확인하십시오"
    },
    options: [
        {
            type: 3,
            name: "license",
            description: "License key you would like to check the existence of",
            description_localizations: {
                "en-US": "License key you would like to check the existence of",
                fi: "Lisenssikoodi, jonka olemassaolon haluat tarkistaa",
                fr: "Clé de licence dont vous souhaitez vérifier l'existence",
                de: "Lizenzschlüssel, dessen Existenz Sie überprüfen möchten",
                it: "Chiave di licenza di cui desideri verificare l'esistenza",
                nl: "Licentiesleutel waarvan u wilt controleren of deze bestaat",
                ru: "Ключ лицензии, существование которого вы хотите проверить",
                pl: "Klucz licencyjny, którego istnienie chcesz sprawdzić",
                tr: "Varlığını kontrol etmek istediğiniz lisans anahtarınız",
                cs: "Klíč licenčního klíče, jehož existenci chcete ověřit",
                ja: "存在を確認したいライセンスキー",
                ko: "존재 여부를 확인하려는 라이센스 키"
            },
            required: true
        }
    ],
    async execute(interaction) {
        let key = interaction.options.getString("license");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=verify&key=${key}`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: json.message,
                                color: 0x00ff00,
                                fields: [{ name: "Subscription deleted:", value: `\`${name}\`` }],
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
