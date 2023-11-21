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

    getValue = () => {};
    setValue = () => {};
}
