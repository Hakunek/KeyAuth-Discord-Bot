import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "help",
    description: "Help command for bot",
    description_localizations: {
        "en-US": "Help command for bot",
        fi: "Ohje-komento bottia varten",
        fr: "Commande d'aide pour le bot",
        de: "Hilfsbefehl für den Bot",
        it: "Comando di aiuto per il bot",
        nl: "Helpcommando voor bot",
        ru: "Команда справки для бота",
        pl: "Polecenie pomocy dla bota",
        tr: "Bot için yardım komutu",
        cs: "Příkaz nápovědy pro bota",
        ja: "ボットのヘルプコマンド",
        ko: "봇의 도움말 명령"
    },
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        const embed = {
            title: `KeyAuth help menu`,
            fields: [
                { name: "_ _", value: "This bot is for the open-source authentication system [KeyAuth](https://keyauth.cc)\n\nIf you're using the cloud hosted version of KeyAuth, you'll need the seller plan to use. You can test before purchase by using the demo seller account in the #demo-accounts channel of the [Discord server](https://discord.gg/keyauth)" },
                { name: "Source code:", value: `[https://github.com/KeyAuth/KeyAuth-Discord-Bot](https://github.com/KeyAuth/KeyAuth-Discord-Bot)` },
                { name: "Library", value: "Discord.JS v14.0.1" },
                { name: "Tutorial video", value: "[https://www.youtube.com/watch?v=orQ_5BQCd-U](https://www.youtube.com/watch?v=orQ_5BQCd-U)" }
            ],
            color: 0x0000ff,
            timestamp: `${interaction.createdAt.toISOString()}`
        };

        interaction.editReply({ embeds: [embed] });
    }
};
