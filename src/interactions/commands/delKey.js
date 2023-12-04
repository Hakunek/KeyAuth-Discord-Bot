import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "del",
    description: "Delete a key",
    description_localizations: {
        "en-US": "Delete a key",
        fi: "Poista avain",
        fr: "Supprimer une clé",
        de: "Schlüssel löschen",
        it: "Elimina una chiave",
        nl: "Sleutel verwijderen",
        ru: "Удалить ключ",
        pl: "Usuń klucz",
        tr: "Bir anahtarı sil",
        cs: "Odstranit klíč",
        ja: "キーを削除する",
        ko: "키 삭제"
    },
    options: [
        {
            type: 3,
            name: "license",
            description: "Specify key you would like deleted",
            description_localizations: {
                "en-US": "Specify key you would like deleted",
                fi: "Määritä poistettava avain",
                fr: "Spécifiez la clé que vous souhaitez supprimer",
                de: "Geben Sie den Schlüssel an, den Sie löschen möchten",
                it: "Specifica la chiave che desideri eliminare",
                nl: "Geef de sleutel op die u wilt verwijderen",
                ru: "Укажите ключ, который вы хотите удалить",
                pl: "Określ klucz, który chcesz usunąć",
                tr: "Silmek istediğiniz anahtarı belirtin",
                cs: "Zadejte klíč, který chcete odstranit",
                ja: "削除したいキーを指定してください",
                ko: "삭제할 키를 지정하십시오"
            },
            required: true
        }
    ],
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        let key = interaction.options.getString("license");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=del&key=${key}&format=json`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: json.message,
                                color: 0x00ff00,
                                fields: [{ name: "Key Deleted:", value: `\`${key}\`` }],
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
