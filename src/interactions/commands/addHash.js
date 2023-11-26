import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "addhash",
    description: "Add Additional Hash to your Application",
    description_localizations: {
        "en-US": "Add Additional Hash to your Application",
        fi: "Lisää lisähash sovellukseesi",
        fr: "Ajouter un hash supplémentaire à votre application",
        de: "Fügen Sie Ihrer Anwendung einen zusätzlichen Hash hinzu",
        it: "Aggiungi un hash aggiuntivo alla tua applicazione",
        nl: "Voeg een extra hash toe aan uw aanvraag",
        ru: "Добавьте дополнительный хэш к своему приложению",
        pl: "Dodaj dodatkowy hash do swojej aplikacji",
        tr: "Uygulamanıza ek hash ekleyin",
        cs: "Přidejte do své aplikace další hash",
        ja: "アプリケーションに追加のハッシュを追加します",
        ko: "응용 프로그램에 추가 해시 추가"
    },
    options: [
        {
            type: 3,
            name: "hash",
            description: "MD5 hash you want to add",
            description_localizations: {
                "en-US": "MD5 hash you want to add",
                fi: "MD5-tiiviste, jonka haluat lisätä",
                fr: "hachage MD5 que vous souhaitez ajouter",
                de: "MD5-Hash, den Sie hinzufügen möchten",
                it: "hash MD5 che si desidera aggiungere",
                nl: "MD5-hash die u wilt toevoegen",
                ru: "MD5-хэш, который вы хотите добавить",
                pl: "MD5-hash, który chcesz dodać",
                tr: "Eklemek istediğiniz MD5 karma",
                cs: "MD5 hash, který chcete přidat",
                ja: "追加したいMD5ハッシュ",
                ko: "추가하려는 MD5 해시"
            },
            required: true
        }
    ],
    async execute(interaction) {
        let md5hash = interaction.options.getString("hash");
        await interaction.deferReply({ ephemeral: true });

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=addhash&hash=${md5hash}`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({ embeds: [{ title: json.message, color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}`, footer: { text: "KeyAuth Discord Bot" } }] });
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
