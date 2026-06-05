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
};

export const deleteAsset = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM assets WHERE id = $1 RETURNING *",
      [id]
    );
    if (!result || result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    console.error("No se pudo borrar el bien:", error);
    throw error;
  }
};

export const updateAsset = async (id, assetData) => {
    const {
        codigo_patrimonial,
        nombre,
        descripcion,
        estado,
        ubicacion
    }= assetData;

    const query = `
        UPDATE assets
        SET
            codigo_patrimonial = $1,
            nombre = $2,
            descripcion = $3,
            estado = $4,
            ubicacion = $5
        WHERE id = $6
        RETURNING *;
    `;
    const values = [
        codigo_patrimonial,
        nombre,
        descripcion,
        estado,
        ubicacion,
        id
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
};
