import { fdir } from "fdir";
import { writeFile, readFile } from "fs/promises";
export default class {
    constructor() {
        this.read();
        setInterval(() => this.save(), 30 * 1000);
    }
    data = {};
    save = async () => {};
    read = async () => {};
    /**
     * @param {any} key
     * @returns {Promise<String>}
     */
    getValue = async (key) => {
        return "";
    };

    /**
     * @param {String} key
     * @param {String} value
     * @returns {Promise<boolean>}
     */
    setValue = async (key, value) => {
        return false;
    };
}
