export const getAllAuditLogs = async (req, res, next) => {
    try {
        const auditLogs = await getAuditLogs();
        res.status(200).json(auditLogs);
    } catch (error) {
        next(error);
    }
};
