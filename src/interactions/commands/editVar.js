import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "editvar",
    description: "Edit Variable",
    description_localizations: {
        "en-US": "Edit Variable",
        fi: "Muokkaa muuttujaa",
        fr: "Modifier la variable",
        de: "Variable bearbeiten",
        it: "Modifica variabile",
        nl: "Variabele bewerken",
        ru: "Изменить переменную",
        pl: "Edytuj zmienną",
        tr: "Değişkeni düzenle",
        cs: "Upravit proměnnou",
        ja: "変数を編集する",
        ko: "변수 편집"
    },
    options: [
        {
            type: 3,
            name: "name",
            description: "Variable Name?",
            description_localizations: {
                "en-US": "Variable Name?",
                fi: "Muuttujan nimi?",
                fr: "Nom de la variable?",
                de: "Variablenname?",
                it: "Nome della variabile?",
                nl: "Variabelenaam?",
                ru: "Имя переменной?",
                pl: "Nazwa zmiennej?",
                tr: "Değişken adı?",
                cs: "Název proměnné?",
                ja: "変数名？",
                ko: "변수 이름?"
            },
            required: true
        },
        {
            type: 3,
            name: "value",
            description: "Variable Value?",
            description_localizations: {
                "en-US": "Variable Value?",
                fi: "Muuttujan arvo?",
                fr: "Valeur de la variable?",
                de: "Variablenwert?",
                it: "Valore della variabile?",
                nl: "Variabele waarde?",
                ru: "Значение переменной?",
                pl: "Wartość zmiennej?",
                tr: "Değişken değeri?",
                cs: "Hodnota proměnné?",
                ja: "変数の値？",
                ko: "변수 값?"
            },
            required: true
        }
    ],
    async execute(interaction) {
        let varname = interaction.options.getString("name");
        let varvalue = interaction.options.getString("value");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=editvar&varid=${varname}&data=${varvalue}`).then((res) =>
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
