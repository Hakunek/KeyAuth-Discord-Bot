import { ApplicationCommandType, ComponentType, InteractionType } from "discord.js";

/** @type {import("../types/typesDiscord.mjs").EventData} */
export default {
    name: "interactionCreate",
    once: false,
    execute: async (interaction, client) => {
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
