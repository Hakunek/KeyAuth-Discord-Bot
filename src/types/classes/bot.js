import { Client, Collection } from "discord.js";
import { fdir } from "fdir";
(await import("dotenv")).config();
const storage = await import(`../../storage/${process.env.storageType}.js`);
export default class Bot extends Client {
    captureRejections = true;
    /**
     * @param {import("discord.js").ClientOptions} o
     */
    constructor(o) {
        const options = {
            /** @type {import("discord.js").MessageMentionOptions} */
            allowedMentions: {
                parse: ["everyone", "roles", "users"],
                repliedUser: true,
            },
            ...o,
        };
        super(options);
    }
    sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    /** @type {import("../typesDiscord.mjs").Interactions} */
    interactions = {
        commands: new Collection(),
        contextMenus: new Collection(),
        buttons: new Collection(),
        modals: new Collection(),
        selectMenu: new Collection(),
    };

    /**
     * @param {string} p - File path.
     * @param {number} lvl - File-folder depth.
     * @param {string} ext - File extension (Usually `.js`)
     */
    crawler = (p, lvl = Infinity, ext = ".js") =>
        new fdir()
            .withFullPaths()
            .filter((path, isDirectory) => path.endsWith(ext))
            .withMaxDepth(lvl)
            .crawl(p)
            .sync();
    handleEvents = async () => {
        const eventFiles = this.crawler("./src/events");
        for (const path of eventFiles) {
            const event = (await import(`file://${path}`)).default;
            if (event.once) {
                this.once(event.name, (...args) => event.execute(...args, this));
            } else {
                this.on(event.name, (...args) => event.execute(...args, this));
            }
        }
        return this;
    };
    /** @type {any[][]} */
    destination = [[], []];
    handleInteractions = async () => {
        const cmdFo = this.crawler("./src/interactions");
        for (const path of cmdFo) {
            const split = path.split(/[\\/]+/gim);
            const type = split[split.length - 2];
            const destination = path.includes("developmentEnviorment") ? 1 : 0;
            if (!Object.keys(this.interactions).includes(type)) continue;
            const file = (await import(`file://${path}`)).default;
            switch (type) {
                case "commands":
                case "contextMenus":
                    this.destination[destination].push(file);
                default:
                    this.interactions[type].set(file.name, file);
            }
        }
        return this;
    };
    storage = storage;
    /**
     * @returns {Promise<Bot>}
     */
    init = async () => {
        await this.handleEvents();
        await this.handleInteractions();
        await this.login(process.env.token);
        return this;
    };
}
