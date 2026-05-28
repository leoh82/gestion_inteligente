import { pool } from "../database/db.js";

export const getAssets = async () => {
    const result = await pool.query("SELECT * FROM assets");
    return result.rows;
};