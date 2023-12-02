/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "setkeymask",
    description: "Sets License Key mask",
    description_localizations: {
        "en-US": "Sets License Key mask",
        fi: "Asettaa lisenssikoodin maskin",
        fr: "Définit le masque de clé de licence",
        de: "Setzt das Lizenzschlüssel-Masken",
        it: "Imposta la maschera della chiave di licenza",
        nl: "Stelt de licentiesleutelmasker in",
        ru: "Устанавливает маску лицензионного ключа",
        pl: "Ustawia maskę klucza licencyjnego",
        tr: "Lisans Anahtarını maske ayarlar",
        cs: "Nastaví masku klíče licence",
        ja: "ライセンスキーのマスクを設定します",
        ko: "라이센스 키 마스크를 설정합니다"
    },

    options: [
        {
            type: 3,
            name: "mask",
            description: "Specify mask for License / (null = default)",
            description_localizations: {
                "en-US": "Specify mask for License / (null = default)",
                fi: "Määritä lisenssi maski / (null = oletus)",
                fr: "Spécifiez le masque pour la licence / (null = par défaut)",
                de: "Geben Sie das Masken für die Lizenz an / (null = Standard)",
                it: "Specifica la maschera per la licenza / (null = predefinito)",
                nl: "Geef het masker voor de licentie op / (null = standaard)",
                ru: "Укажите маску для лицензии / (null = по умолчанию)",
                pl: "Określ maskę dla licencji / (null = domyślny)",
                tr: "Lisans için maske belirtin / (null = varsayılan)",
                cs: "Zadejte masku pro licenci / (null = výchozí)",
                ja: "ライセンスのマスクを指定します / (null = デフォルト)",
                ko: "라이센스에 대한 마스크를 지정하십시오 / (null = 기본값)"
            },
            required: true
        }
    ],
    async execute(interaction, client) {
        let license_mask = null;
        let licensestring = interaction.options.getString("mask");

        if (licensestring == "null") license_mask = "XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX";
        else license_mask = licensestring;

        interaction.editReply({
            embeds: [
                {
                    title: "License Mask Successfully Set!",
                    color: 0x00ff00,
                    timestamp: `${interaction.createdAt.toISOString()}`
                }
            ]
        });
    }
};
