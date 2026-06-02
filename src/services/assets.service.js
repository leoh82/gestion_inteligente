import { pool } from "../database/db.js";

export const getAssets = async () => {
    const result = await pool.query('SELECT * FROM assets');
    return result.rows;
};

export const createAssets = async (assetData) => {
    const {
        codigo_patrimonial,
        nombre,
        descripcion,
        estado,
        ubicacion,
    } = assetData;

    const query = `
        INSERT INTO assets
        (
            codigo_patrimonial,
            nombre,
            descripcion,
            estado,
            ubicacion
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [
        codigo_patrimonial,
        nombre,
        descripcion,
        estado,
        ubicacion,
    ];
    const result = await pool.query(query, values);

    return result.rows[0];
}