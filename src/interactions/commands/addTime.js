import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "addtime",
    description: "Add time to unused keys(use extend for used keys aka users)",
    description_localizations: {
        "en-US": "Add time to unused keys(use extend for used keys aka users)",
        fi: "Lisää aikaa käyttämättömiin avaimiin (käytä extend käytettyihin avaimiin eli käyttäjiin)",
        fr: "Ajouter du temps aux clés inutilisées (utiliser l'extension si la clé est utilisée)",
        de: "Fügen Sie Zeit zu nicht verwendeten Schlüsseln hinzu (verwenden Sie Extend Used on Keys)",
        it: "Aggiungi tempo a chiavi non utilizzate (usa extend per chiavi utilizzate, ovvero utenti)",
        nl: "Voeg tijd toe aan ongebruikte sleutels (gebruik verlengen gebruikt op sleutels)",
        ru: "Добавьте время к неиспользуемым ключам (используйте расширение, используемое для ключей)",
        pl: "Dodaj czas do nieużywanych kluczy (użyj extend dla używanych kluczy, czyli użytkowników)",
        tr: "Kullanılmayan tuşlara zaman ekleyin (tuşlarda kullanılan uzatmayı kullanın)",
        cs: "Přidejte čas k nepoužívaným klíčům (použijte extend pro použité klíče, tedy uživatele)",
        ja: "使用されていないキーに時間を追加します（使用されているキーにはextendを使用します）",
        ko: "사용되지 않는 키에 시간을 추가하십시오 (사용된 키에는 extend를 사용하십시오)"
    },
    options: [
        {
            type: 4,
            name: "time",
            description: "Number of days",
            description_localizations: {
                "en-US": "Number of days",
                fi: "Päivien määrä",
                fr: "Nombre de jours",
                de: "Anzahl der Tage",
                it: "Numero di giorni",
                nl: "Aantal dagen",
                ru: "Количество дней",
                pl: "Liczba dni",
                tr: "Gün sayısı",
                cs: "Počet dnů",
                ja: "日数",
                ko: "일 수"
            },
            required: true
        }
    ],
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        let time = interaction.options.getString("time");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=addtime&time=${time}`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: json.message,
                                color: 0x00ff00,
                                timestamp: `${interaction.createdAt.toISOString()}`,
                                footer: { text: "KeyAuth Discord Bot" }
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
