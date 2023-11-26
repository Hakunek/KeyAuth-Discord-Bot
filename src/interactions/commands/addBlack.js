import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "addblack",
    description: "Add to blacklist",
    description_localizations: {
        "en-US": "Add to blacklist",
        fi: "Lisää musta lista",
        fr: "Ajouter une liste noire",
        de: "Schwarze Liste hinzufügen",
        it: "Aggiungi blacklist",
        nl: "Zwarte lijst toevoegen",
        ru: "Добавить черный список",
        pl: "Dodaj na czarną listę",
        tr: "Kara listeye ekle",
        cs: "Přidat černou listinu",
        ja: "ブラックリストを追加する",
        ko: "블랙리스트 추가"
    },
    options: [
        {
            type: 3,
            name: "ip",
            description: "IP Address you want to blacklist",
            description_localizations: {
                "en-US": "IP Address you want to blacklist",
                fi: "IP-osoite, jonka haluat mustalle listalle",
                fr: "Adresse IP que vous souhaitez ajouter à la liste noire",
                de: "IP-Adresse, die Sie auf die schwarze Liste setzen möchten",
                it: "Indirizzo IP che si desidera aggiungere alla blacklist",
                nl: "IP-adres dat u op de zwarte lijst wilt zetten",
                ru: "IP-адрес, который вы хотите добавить в черный список",
                pl: "Adres IP, który chcesz dodać do czarnej listy",
                tr: "Kara listeye eklemek istediğiniz IP adresi",
                cs: "IP adresa, kterou chcete přidat do černé listiny",
                ja: "ブラックリストに追加したいIPアドレス",
                ko: "블랙리스트에 추가하려는 IP 주소"
            },
            required: false
        },
        {
            type: 3,
            name: "hwid",
            description: "Hardware-ID you want to blacklist",
            description_localizations: {
                "en-US": "Hardware-ID you want to blacklist",
                fi: "Laitteiston tunnus, jonka haluat mustalle listalle",
                fr: "ID matériel que vous souhaitez ajouter à la liste noire",
                de: "Hardware-ID, die Sie auf die schwarze Liste setzen möchten",
                it: "ID hardware che si desidera aggiungere alla blacklist",
                nl: "Hardware-ID die u op de zwarte lijst wilt zetten",
                ru: "Идентификатор аппаратного обеспечения, который вы хотите добавить в черный список",
                pl: "ID sprzętu, który chcesz dodać do czarnej listy",
                tr: "Kara listeye eklemek istediğiniz donanım kimliği",
                cs: "ID hardwaru, který chcete přidat do černé listiny",
                ja: "ブラックリストに追加したいハードウェアID",
                ko: "블랙리스트에 추가하려는 하드웨어 ID"
            },
            required: false
        }
    ],
    async execute(interaction) {
        let idfrom = null;
        let ephemeral = true;

        if (interaction.guild == null) {
            idfrom = interaction.user.id;
            ephemeral = false;
        } else {
            idfrom = interaction.guild.id;
        }

        let ip = interaction.options.getString("ip");
        let hwid = interaction.options.getString("hwid");

        if (!ip && !hwid) {
            return interaction.reply({ embeds: [{ description: `You need to either define hwid or ip paramater. Please try again defining one of these paramaters..`, color: 0xff0000, timestamp: `${interaction.createdAt.toISOString()}` }], ephemeral: true });
        }
        if (ip && hwid) {
            return interaction.reply({ embeds: [{ description: `Please only define one paramater per command..`, color: 0xff0000, timestamp: `${interaction.createdAt.toISOString()}` }], ephemeral: ephemeral });
        }

        let url = "";
        if (ip) url = `https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=black&ip=${ip}`;
        if (hwid) url = `https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=black&hwid=${hwid}`;

        fetch(url).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.reply({ embeds: [{ title: `${json.message}`, color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }], ephemeral: ephemeral });
                } else {
                    interaction.reply({
                        embeds: [
                            {
                                title: json.message,
                                fields: [{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`/setseller\` command.` }],
                                color: 0xff0000,
                                timestamp: `${interaction.createdAt.toISOString()}`,
                                footer: { text: "KeyAuth Discord Bot" }
                            }
                        ],
                        ephemeral: true
                    });
                }
            })
        );
    }
};
