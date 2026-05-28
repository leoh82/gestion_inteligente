import { getAssets } from "../services/assets.service.js";

export const getAllAssets = async (req, res) => {
    try {
        const assets = await getAssets();

        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
        
    };
};