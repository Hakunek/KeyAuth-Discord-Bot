import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "delblack",
    description: "Delete blacklist",
    description_localizations: {
        "en-US": "Delete blacklist",
        fi: "Poista musta lista",
        fr: "Supprimer la liste noire",
        de: "Schwarze Liste löschen",
        it: "Elimina blacklist",
        nl: "Verwijder zwarte lijst",
        ru: "Удалить черный список",
        pl: "Usuń czarną listę",
        tr: "Kara listeyi sil",
        cs: "Odstranit černou listinu",
        ja: "ブラックリストを削除する",
        ko: "블랙리스트 삭제"
    },
    options: [
        {
            type: 3,
            name: "ip",
            description: "IP Address you want to remove from blacklist",
            description_localizations: {
                "en-US": "IP Address you want to remove from blacklist",
                fi: "IP-osoite, jonka haluat poistaa mustasta listasta",
                fr: "Adresse IP que vous souhaitez supprimer de la liste noire",
                de: "IP-Adresse, die Sie von der schwarzen Liste entfernen möchten",
                it: "Indirizzo IP che si desidera rimuovere dalla blacklist",
                nl: "IP-adres dat u wilt verwijderen van de zwarte lijst",
                ru: "IP-адрес, который вы хотите удалить из черного списка",
                pl: "Adres IP, który chcesz usunąć z czarnej listy",
                tr: "Kara listeden kaldırmak istediğiniz IP adresi",
                cs: "IP adresa, kterou chcete odstranit z černé listiny",
                ja: "ブラックリストから削除したいIPアドレス",
                ko: "블랙리스트에서 제거하려는 IP 주소"
            },
            required: false
        },
        {
            type: 3,
            name: "hwid",
            description: "Hardware-ID you want to remove from blacklist",
            description_localizations: {
                "en-US": "Hardware-ID you want to remove from blacklist",
                fi: "Laitteiston tunnus, jonka haluat poistaa mustasta listasta",
                fr: "ID matériel que vous souhaitez supprimer de la liste noire",
                de: "Hardware-ID, die Sie von der schwarzen Liste entfernen möchten",
                it: "ID hardware che si desidera rimuovere dalla blacklist",
                nl: "Hardware-ID die u wilt verwijderen van de zwarte lijst",
                ru: "Идентификатор аппаратного обеспечения, который вы хотите удалить из черного списка",
                pl: "ID sprzętu, który chcesz usunąć z czarnej listy",
                tr: "Kara listeden kaldırmak istediğiniz donanım kimliği",
                cs: "ID hardwaru, který chcete odstranit z černé listiny",
                ja: "ブラックリストから削除したいハードウェアID",
                ko: "블랙리스트에서 제거하려는 하드웨어 ID"
            },
            required: false
        }
    ],
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        let ip = interaction.options.getString("ip");
        let hwid = interaction.options.getString("hwid");

        if (!ip && !hwid) {
            return interaction.reply({
                embeds: [
                    {
                        description: `You need to either define hwid or ip paramater. Please try again defining one of these paramaters..`,
                        color: 0xff0000,
                        timestamp: `${interaction.createdAt.toISOString()}`
                    }
                ],
                ephemeral: true
            });
        }
        if (ip && hwid) {
            return interaction.reply({
                embeds: [
                    {
                        description: `Please only define one paramater per command..`,
                        color: 0xff0000,
                        timestamp: `${interaction.createdAt.toISOString()}`
                    }
                ],
                ephemeral: true
            });
        }

        let url = "";
        if (ip) url = `https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=delblack&data=${ip}&blacktype=ip`;
        if (hwid) url = `https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=delblack&data=${hwid}&blacktype=hwid`;

        fetch(url).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: json.message,
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
