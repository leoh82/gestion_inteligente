export const validateNameAssets = (req, res, next) => {
    const { nombre } = req.body;
    if (!nombre || nombre.length < 2) {
        return res.status(400).json({ error: 'El nombre es obligatorio y debe tener al menos 2 caracteres.' });
    }
    next();
};

export const validateCodigoPatrimonial = (req, res, next) => {
    const { codigo_patrimonial } = req.body;
    if (!codigo_patrimonial || typeof codigo_patrimonial !== 'string' || codigo_patrimonial.length < 5 || codigo_patrimonial.length > 50) {
        return res.status(400).json({ error: 'El codigo patrimonial debe tener entre 5 y 50 caracteres y no nulo.' });
    }
    next();
};

export const estadoPermitido = (req, resp, next) => {
    const { estado } = req.body;
    const estadosPermitidos = ['activo', 'baja', 'mantenimiento', 'extraviado','desuso'];
    if (!estado || !estadosPermitidos.includes(estado)) {
        return resp.status(400).json({ error: `El estado debe ser uno de los siguientes: ${estadosPermitidos.join(', ')}` });
    }
    next();
};

export const ubicacionAssets = (req, res, next) =>{
    const { ubicacion } = req.body;
    if (!ubicacion || typeof ubicacion !== 'string' || ubicacion.length < 5 || ubicacion.length > 100) {
        return res.status(400).json({ error: 'La ubicación debe tener entre 5 y 100 caracteres y no nulo.' });
    }
    next();
};
