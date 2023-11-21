//TODO: I have plans to add mysql support

import { createPool } from "mysql2/promise";
export default class {
    constructor() {
        this.pool = createPool({
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database,
            connectTimeout: 30_000
        });
    }
}
