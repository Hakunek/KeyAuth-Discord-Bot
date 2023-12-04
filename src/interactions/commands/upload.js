import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "upload",
    description: "Upload a file",
    description_localizations: {
        "en-US": "Upload a file",
        fi: "Lataa tiedosto",
        fr: "Télécharger un fichier",
        de: "Lade eine Datei hoch",
        it: "Carica un file",
        nl: "Upload een bestand",
        ru: "Загрузить файл",
        pl: "Prześlij plik",
        tr: "Bir dosya yükle",
        cs: "Nahrát soubor",
        ja: "ファイルをアップロードする",
        ko: "파일 업로드"
    },
    options: [
        {
            type: 3,
            name: "url",
            description: "File URL what you want to upload",
            description_localizations: {
                "en-US": "File URL what you want to upload",
                fi: "Tiedoston URL, jonka haluat ladata",
                fr: "URL du fichier que vous souhaitez télécharger",
                de: "Datei-URL, die Sie hochladen möchten",
                it: "URL del file che desideri caricare",
                nl: "Bestands-URL die u wilt uploaden",
                ru: "URL-адрес файла, который вы хотите загрузить",
                pl: "Adres URL pliku, który chcesz przesłać",
                tr: "Yüklemek istediğiniz dosya URL'si",
                cs: "URL souboru, který chcete nahrát",
                ja: "アップロードしたいファイルのURL",
                ko: "업로드 할 파일 URL"
            },
            required: true
        }
    ],
    async execute(interaction) {
        let url = interaction.options.getString("url");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=upload&url=${url}`).then((res) =>
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
