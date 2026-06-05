export const errorHandler = (err, req, res, next) => {
    console.error("ERROR:", err);

    const estadoCodigo = err.statusCode || 500;

    res.status(estadoCodigo).json({
        success : false,
        mensage: err.mensage ||"Error interno del Servidor"
    });
};
