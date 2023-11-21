import { ActivityType } from "discord.js";
/** @type {import("../types/typesDiscord.mjs").EventData} */
export default {
    name: "ready",
    once: true,
    execute: async (client) => {
        while (!client.application?.commands) {
            await client.sleep(100);
        }
        console.log(`Application ${client.user?.tag || client.user?.username} - (${client.user?.id}) ready…`);

        await client?.application?.commands?.set(client.destination[0]);
        (await client?.guilds.fetch(`${process.env.supportSrv}`))?.commands.set(client.destination[1]);
        console.log(`Slash commands registered.\n\tPRODUCTION:\t${client.destination[0].length}\n\tDEVELOPEMENT:\t\t${client.destination[1].length}`);

        client.user?.setPresence({
            activities: [{ name: `keyauth.cc`, type: ActivityType.Competing }],
            status: "online"
        });
    }
};
