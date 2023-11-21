import { ApplicationCommandType, ComponentType, InteractionType } from "discord.js";

/** @type {import("../types/typesDiscord.mjs").EventData} */
export default {
    name: "interactionCreate",
    once: false,
    execute: async (interaction, client) => {
        /**
         *
         * if (interaction.member != null) if (!interaction.member.roles.cache.find((x) => x.name == "perms")) return interaction.editReply({ embeds: [new EmbedBuilder().setDescription(`You need a role with the name \`perms\` to execute commands. Please ask an administrator to create a role with this name if not already done and assign it to you.`).setColor(Colors.Red).setTimestamp()], ephemeral: true });
         * const ErrorEmbed = new EmbedBuilder().setAuthor({ name: "Interaction Failed" }).setColor(Colors.Red).setTimestamp().setFooter({ text: "KeyAuth Discord Bot", iconURL: client.user.displayAvatarURL() });



        for (var i = 0; i < interaction.options._hoistedOptions.length; i++) {
        content += "\n" + interaction.options._hoistedOptions[i].name + " : " + interaction.options._hoistedOptions[i].value;
    }

    let wh_url = await db.get(`wh_url_${idfrom}`);
    if (wh_url != null) {
        var params = {
            // content: `**${interaction.user.username}#${interaction.user.discriminator} (ID: ${interaction.user.id})** executed the command \`/${interaction.commandName}\`\n\nwith the paramaters:\`${JSON.stringify(interaction.options._hoistedOptions)}\``
            content: content
        };
        fetch(wh_url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(params)
        });
    }
        
        
        
        */

        let task = undefined;
        /** @type {"execute"|"autocomplete"} */
        switch (interaction.type) {
            case InteractionType.ApplicationCommandAutocomplete:
                task = client.interactions.commands.get(interaction.commandName);
                if (!task?.autocomplete) return;
                task.autocomplete(interaction, client);
                break;
            case InteractionType.ApplicationCommand:
                switch (interaction.commandType) {
                    case ApplicationCommandType.ChatInput:
                        task = client.interactions.commands.get(interaction.commandName);
                        if (!task) return;
                        task.execute(interaction, client);
                        break;
                    case ApplicationCommandType.Message:
                    case ApplicationCommandType.User:
                        task = client.interactions.contextMenus.get(interaction.commandName);
                        if (!task) return;
                        task.execute(interaction, client);
                        break;
                }
                break;
            case InteractionType.MessageComponent:
                switch (interaction.componentType) {
                    case ComponentType.MentionableSelect:
                    case ComponentType.RoleSelect:
                    case ComponentType.StringSelect:
                    case ComponentType.UserSelect:
                    case ComponentType.ChannelSelect:
                        task = client.interactions.selectMenu.get(interaction.customId);
                        if (!task) return;
                        task.execute(interaction, client);
                        break;
                    case ComponentType.Button:
                        task = client.interactions.buttons.get(interaction.customId);
                        if (!task) return;
                        task.execute(interaction, client);
                        break;
                }
                break;
            case InteractionType.ModalSubmit:
                task = client.interactions.modals.get(interaction.customId);
                if (!task) return;
                task.execute(interaction, client);
                break;
        }
    }
};
