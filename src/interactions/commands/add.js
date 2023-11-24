import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "add",

    description: "Add key. You must specify the optional parameters the first time. After that they're saved.",
    description_localizations: {
        "en-US": "Add key. You must specify the optional parameters the first time. After they're saved.",
        fi: "Lisää avain. Sinun on määritettävä valinnaiset parametrit ensimmäistä kertaa.",
        fr: "Ajouter une clé. Vous devez spécifier les paramètres facultatifs la première fois.",
        de: "Schlüssel hinzufügen. Sie müssen die optionalen Parameter beim ersten Mal angeben.",
        it: "Aggiungi chiave. È necessario specificare i parametri facoltativi la prima volta.",
        nl: "Sleutel toevoegen. U moet de eerste keer de optionele parameters opgeven.",
        ru: "Добавить ключ. Вы должны указать необязательные параметры в первый раз. После этого они сохраняются.",
        pl: "Dodaj klucz. Musisz określić opcjonalne parametry po raz pierwszy. Po tym są zapisywane.",
        tr: "Anahtar ekleyin. İlk kez isteğe bağlı parametreleri belirtmeniz gerekir. Sonra kaydedilirler.",
        cs: "Přidejte klíč. Musíte zadat volitelné parametry poprvé. Poté jsou uloženy.",
        ja: "キーを追加します。最初にオプションのパラメータを指定する必要があります。その後、保存されます。",
        ko: "키를 추가하십시오. 최초에 선택적 매개 변수를 지정해야합니다. 그 후 저장됩니다.",
    },
    options: [
        {
            type: 4,
            name: "expiry",
            description: "How many days?",
            description_localizations: {
                "en-US": "How many days?",
                fi: "Kuinka monta päivää?",
                fr: "Combien de jours?",
                de: "Wie viele Tage?",
                it: "Quanti giorni?",
                nl: "Hoeveel dagen?",
                ru: "Сколько дней?",
                pl: "Ile dni?",
                tr: "Kaç gün?",
                cs: "Kolik dní?",
                ja: "何日？",
                ko: "몇 일?",
            },
            min_value: 1,
            required: false,
        },
        {
            type: 4,
            name: "level",
            description: "What level?",
            description_localizations: {
                "en-US": "What level?",
                fi: "Mikä taso?",
                fr: "Quel niveau?",
                de: "Welche Ebene?",
                it: "Qual è il livello?",
                nl: "Welk niveau?",
                ru: "Какой уровень?",
                pl: "Jaki poziom?",
                tr: "Ne seviye?",
                cs: "Jaká úroveň?",
                ja: "どのレベル？",
                ko: "어떤 레벨?",
            },
            min_value: 1,
            required: false,
        },
        {
            type: 4,
            name: "amount",
            description: "What amount?",
            description_localizations: {
                "en-US": "What amount?",
                fi: "Mikä määrä?",
                fr: "Quel montant?",
                de: "Wie viel?",
                it: "Quanto?",
                nl: "Hoeveel?",
                ru: "Какая сумма?",
                pl: "Jaka kwota?",
                tr: "Ne kadar?",
                cs: "Jaká částka?",
                ja: "何量？",
                ko: "얼마?",
            },
            max_value: 20,
            min_value: 1,
            required: false,
        },
    ],
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true });
        let license_mask = await client.storage.getValue("");
        if (license_mask === null) license_mask = "XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX";

        let days = interaction.options.getInteger("expiry", true);
        let level = interaction.options.getInteger("level", true);
        let amount = interaction.options.getInteger("amount", true);

        if (amount > 20)
            return interaction.editReply({
                embeds: [
                    {
                        title: "Failure",
                        fields: [{ name: "Reason:", value: `You cannot add more than twenty keys at a time.` }],
                        color: 0xff0000,
                        footer: { text: "KeyAuth Discord Bot" },
                        timestamp: `${interaction.createdAt.toISOString()}`,
                    },
                ],
            });

        if (days) {
            fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=add&expiry=${days}&mask=${license_mask}&level=${level}&amount=${amount}&format=text`)
                .then((res) => res.text())
                .then((text) => {
                    if (!text.includes("message")) {
                        interaction.followUp({ content: `${text}`, ephemeral: true });
                        client.storage.setValue(`{ "days": ${days}, "level": ${level}, "amount": ${amount}}`);
                    } else {
                        let json = JSON.parse(text);
                        interaction.editReply({
                            embeds: [
                                {
                                    title: json.message,
                                    fields: [{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`/setseller\` command.` }],
                                    color: 0xff0000,
                                    footer: { text: "KeyAuth Discord Bot" },
                                    timestamp: `${interaction.createdAt.toISOString()}`,
                                },
                            ],
                        });
                    }
                });
        } else {
            let licenseAdd = await client.storage.getValue("");
            if (licenseAdd === null)
                return interaction.editReply({
                    embeds: [
                        {
                            description: `No config saved for adding licenses yet. Please do a command with paramaters included then this will work.`,
                            color: 0xff0000,
                            footer: { text: "KeyAuth Discord Bot" },
                            timestamp: `${interaction.createdAt.toISOString()}`,
                        },
                    ],
                });
            licenseAdd = JSON.parse(licenseAdd);

            fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=add&expiry=${licenseAdd.days}&mask=${license_mask}&level=${licenseAdd.level}&amount=${licenseAdd.amount}&format=text`)
                .then((res) => res.text())
                .then((text) => {
                    if (!text.includes("message")) {
                        interaction.followUp({ content: `${text}`, ephemeral: true });
                    } else {
                        let json = JSON.parse(text);
                        interaction.editReply({
                            embeds: [
                                {
                                    title: json.message,
                                    fields: [{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`/setseller\` command.` }],
                                    color: 0xff0000,
                                    footer: { text: "KeyAuth Discord Bot" },
                                    timestamp: `${interaction.createdAt.toISOString()}`,
                                },
                            ],
                        });
                    }
                });
        }
    },
};
