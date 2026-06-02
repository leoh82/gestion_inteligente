import { getAssets } from "../services/assets.service.js";
import { createAssets } from "../services/assets.service.js";

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

export const createNewAsset = async (req, res) => {
    try {
        const newAsset = await createAssets(req.body);
        res.status(201).json(newAsset);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};