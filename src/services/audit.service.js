import { pool } from "../database/db.js";

export const getAuditLogs = async () => {
  const result = await pool.query("SELECT * FROM audit_logs ORDER BY created_at DESC");
  return result.rows;
};

export const createAuditLog = async (
  userId,
  action,
  entity,
  entityId,
  details
) => {

  await pool.query(
    `
    INSERT INTO audit_logs
    (
      user_id,
      action,
      entity,
      entity_id,
      details
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      $5
    )
    `,
    [
      userId,
      action,
      entity,
      entityId,
      details
    ]
  );

};
