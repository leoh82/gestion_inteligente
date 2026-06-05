import e from "cors";
import { getAssets, createAssets, deleteAsset, updateAsset as updateAssetService } from "../services/assets.service.js";

export const getAllAssets = async (req, res) => {
    try {
        const assets = await getAssets();
        res.status(200).json(assets);
    } catch (error) {
       next(error);
    }
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

export const removeAssets = async (req, res, next) => {
    try{
        const {id} =req.params;

        const deletedAsset = await deleteAsset(id);

        if (!deletedAsset) {
            const error = new Error ("bien no encontrado")
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: "Asset eliminado",
            asset: deletedAsset,
        });

    } catch (error) {
        next(error);
    }
};

export const updateAsset = async (req, res, next) => {
    try {
        const {id} = req.params;
        const updateAsset = await updateAssetService(id, req.body);

        if (!updateAsset) {
            const error = new Error ("bien no Actualizado");
            error.statusCode = 404;
            throw(error);
            }
            res.status(200).json({
            message : "Bien actualizado",
            asset: updateAsset
        });
        
        }
    catch (error) {
        next(error);
    }
};
