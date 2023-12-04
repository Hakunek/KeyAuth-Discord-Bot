import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "fetch",
    description: "Fetch * All Things",
    options: [
        {
            type: 3,
            name: "type",
            description: `Select what you would like to fetch`,
            choices: [
                {
                    name: "licenses",
                    value: "fetchallkeys"
                },
                {
                    name: "users",
                    value: "fetchallusers"
                },
                {
                    name: "subsriptions",
                    value: "fetchallsubs"
                },
                {
                    name: "chats",
                    value: "fetchallchats"
                },
                {
                    name: "sessions",
                    value: "fetchallsessions"
                },
                {
                    name: "files",
                    value: "fetchallfiles"
                },
                {
                    name: "consts",
                    value: "fetchallconsts"
                },
                {
                    name: "blacklist",
                    value: "fetchallblacks"
                },
                {
                    name: "webhooks",
                    value: "fetchallwebhooks"
                },
                {
                    name: "buttons",
                    value: "fetchallbuttons"
                }
            ],
            required: true
        }
    ],
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        let subcommand = interaction.options.getString("type", true);

        if (subcommand === "licenses") {
            interaction.reply({ embeds: [{ title: "Fetching Licenses...", color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }], ephemeral: true });

            const keyList = `https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=fetchallkeys&format=text`;
            interaction.reply({
                embeds: [{ author: { name: "KeyAuth Application Keys" }, footer: { text: "KeyAuth Discord Bot" }, color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }],
                files: [
                    {
                        attachment: keyList,
                        name: "keys.txt"
                    }
                ],
                ephemeral: true
            });
        } else if (subcommand === "users") {
            interaction.reply({ embeds: [{ title: "Fetching Users...", color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }], ephemeral: true });

            fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=fetchallusers`).then((res) =>
                res.json().then((/** @type {any} */ json) => {
                    if (json.success) {
                        let users = "";
                        for (let i = 0; i < json.users.length; i++) {
                            users += json.users[i].username + "\n";
                        }

                        interaction.reply({
                            embeds: [{ title: "KeyAuth Application Users", description: `**${users}**`, footer: { text: "KeyAuth Discord Bot" }, color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    } else {
                        interaction.reply({
                            embeds: [{ title: json.message, fields: [{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`/setseller\` command.` }], color: 0xff0000, footer: { text: "KeyAuth Discord Bot" }, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    }
                })
            );
        } else if (subcommand === "subs") {
            interaction.reply({ embeds: [{ title: "Fetching Subs...", color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }], ephemeral: true });

            fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=fetchallsubs`).then((res) =>
                res.json().then((/** @type {any} */ json) => {
                    if (json.success) {
                        let subs = "";
                        for (let i = 0; i < json.subs.length; i++) {
                            subs += json.subs[i].username + "\n";
                        }

                        interaction.reply({
                            embeds: [{ title: "KeyAuth Application Subscriptions", description: `**${subs}**`, footer: { text: "KeyAuth Discord Bot" }, color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    } else {
                        interaction.reply({
                            embeds: [{ title: json.message, fields: [{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`/setseller\` command.` }], color: 0xff0000, footer: { text: "KeyAuth Discord Bot" }, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    }
                })
            );
        } else if (subcommand === "chats") {
            interaction.reply({ embeds: [{ title: "Fetching Chats...", color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }], ephemeral: true });

            fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=fetchallchats`).then((res) =>
                res.json().then((/** @type {any} */ json) => {
                    if (json.success) {
                        let chats = "";
                        for (let i = 0; i < json.chats.length; i++) {
                            chats += `name: ${json.chats[i].name} - Delay: ${json.chats[i].delay}\n`;
                        }

                        interaction.reply({
                            embeds: [{ title: "KeyAuth Application Chat Channels", description: `**${chats}**`, footer: { text: "KeyAuth Discord Bot" }, color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    } else {
                        interaction.reply({
                            embeds: [{ title: json.message, fields: [{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`/setseller\` command.` }], color: 0xff0000, footer: { text: "KeyAuth Discord Bot" }, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    }
                })
            );
        } else if (subcommand === "sessions") {
            interaction.reply({ embeds: [{ title: "Fetching Sessions...", color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }], ephemeral: true });

            fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=fetchallsessions`).then((res) =>
                res.json().then((/** @type {any} */ json) => {
                    if (json.success) {
                        let sessions = "";
                        for (let i = 0; i < json.sessions.length; i++) {
                            sessions += `ID: ${json.sessions[i].id} - Validated: ${json.sessions[i].validated ? true : false}` + "\n";
                        }

                        interaction.reply({
                            embeds: [{ title: "KeyAuth Application Sessions", description: `**${sessions}**`, footer: { text: "KeyAuth Discord Bot" }, color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    } else {
                        interaction.reply({
                            embeds: [{ title: json.message, fields: [{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`/setseller\` command.` }], color: 0xff0000, footer: { text: "KeyAuth Discord Bot" }, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    }
                })
            );
        } else if (subcommand === "files") {
            interaction.reply({ embeds: [{ title: "Fetching Files...", color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }], ephemeral: true });

            fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=fetchallfiles`).then((res) =>
                res.json().then((/** @type {any} */ json) => {
                    if (json.success) {
                        let files = "";
                        for (let i = 0; i < json.files.length; i++) {
                            files += `ID: ${json.files[i].id} - Download: [Here](${json.files[i].url})` + "\n";
                        }

                        interaction.reply({
                            embeds: [{ title: "KeyAuth Application Files", description: `**${files}**`, footer: { text: "KeyAuth Discord Bot" }, color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    } else {
                        interaction.reply({
                            embeds: [{ title: json.message, fields: [{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`/setseller\` command.` }], color: 0xff0000, footer: { text: "KeyAuth Discord Bot" }, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    }
                })
            );
        } else if (subcommand === "consts") {
            interaction.reply({ embeds: [{ title: "Fetching consts...", color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }], ephemeral: true });

            fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=fetchallconsts`).then((res) =>
                res.json().then((/** @type {any} */ json) => {
                    if (json.success) {
                        let consts = "";
                        for (let i = 0; i < json.consts.length; i++) {
                            consts += `ID: ${json.consts[i].constid} - Data: ${json.consts[i].msg}` + "\n";
                        }

                        interaction.reply({
                            embeds: [{ title: "KeyAuth Application constiables", description: `**${consts}**`, footer: { text: "KeyAuth Discord Bot" }, color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    } else {
                        interaction.reply({
                            embeds: [{ title: json.message, fields: [{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`/setseller\` command.` }], color: 0xff0000, footer: { text: "KeyAuth Discord Bot" }, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    }
                })
            );
        } else if (subcommand === "blacklists") {
            interaction.reply({ embeds: [{ title: "Fetching Blacklists...", color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }], ephemeral: true });

            fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=fetchallblacks`).then((res) =>
                res.json().then((/** @type {any} */ json) => {
                    if (json.success) {
                        let blacklists = "";
                        for (let i = 0; i < json.blacklists.length; i++) {
                            let btemp = "";
                            if (json.blacklists[i].ip !== null) btemp = `\`\`\`${json.blacklists[i].ip}\`\`\``;
                            else btemp = `\`\`\`${json.blacklists[i].hwid}\`\`\``;

                            blacklists += `**ID: ${i} - Type: ${json.blacklists[i].type}** ${btemp}` + "\n";
                        }

                        interaction.reply({
                            embeds: [{ title: "KeyAuth Application Blacklists", description: `${blacklists}`, footer: { text: "KeyAuth Discord Bot" }, color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    } else {
                        interaction.reply({
                            embeds: [{ title: json.message, fields: [{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`/setseller\` command.` }], color: 0xff0000, footer: { text: "KeyAuth Discord Bot" }, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    }
                })
            );
        } else if (subcommand === "webhooks") {
            interaction.reply({ embeds: [{ title: "Fetching Webhooks...", color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }], ephemeral: true });

            fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=fetchallwebhooks`).then((res) =>
                res.json().then((/** @type {any} */ json) => {
                    if (json.success) {
                        let webhooks = "";
                        for (let i = 0; i < json.webhooks.length; i++) {
                            let authed = json.webhooks[i].authed == "1" ? "True" : "False";
                            webhooks += `Web ID: \`${json.webhooks[i].webid}\` - Base link: \`${json.webhooks[i].short_baselink}\` - Useragent: \`${json.webhooks[i].useragent}\` - Authed: \`${authed}\`\n`;
                        }

                        interaction.reply({
                            embeds: [{ title: "KeyAuth Application Webhooks", description: `**${webhooks}**`, footer: { text: "KeyAuth Discord Bot" }, color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    } else {
                        interaction.reply({
                            embeds: [{ title: json.message, fields: [{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`/setseller\` command.` }], color: 0xff0000, footer: { text: "KeyAuth Discord Bot" }, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    }
                })
            );
        } else if (subcommand === "buttons") {
            interaction.reply({ embeds: [{ title: "Fetching Buttons...", color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }], ephemeral: true });

            fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=fetchallbuttons`).then((res) =>
                res.json().then((/** @type {any} */ json) => {
                    if (json.success) {
                        let buttons = "";
                        for (let i = 0; i < json.buttons.length; i++) {
                            buttons += `Text: ${json.buttons[i].text} - Value: ${json.buttons[i].value}`;
                        }

                        interaction.reply({
                            embeds: [{ title: "KeyAuth Application Buttons", description: `**${buttons}**`, footer: { text: "KeyAuth Discord Bot" }, color: 0x00ff00, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    } else {
                        interaction.reply({
                            embeds: [{ title: json.message, fields: [{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`/setseller\` command.` }], color: 0xff0000, footer: { text: "KeyAuth Discord Bot" }, timestamp: `${interaction.createdAt.toISOString()}` }],
                            ephemeral: true
                        });
                    }
                })
            );
        }
    }
};
