// controller/flats.js
const { createFlat, getFlats, getFlatById, updateFlat, deleteFlat } = require("../model/flat");

export async function createFlatController(req, res) {
    try {
        const { name, adminId } = req.body;
        const { flat, error } = await createFlat(name, adminId);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(201).json(flat);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the flat' });
    }
}

export async function getFlatsController(req, res) {
    try {
        const { flats, error } = await getFlats();
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json(flats);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching flats' });
    }
}

export async function getFlatByIdController(req, res) {
    try {
        const flatId = parseInt(req.params.id);
        const { flat, error } = await getFlatById(flatId);
        if (error || flat.length === 0) {
            return res.status(404).json({ error: 'Flat not found' });
        }
        res.status(200).json(flat);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the flat' });
    }
}

export async function updateFlatController(req, res) {
    try {
        const flatId = parseInt(req.params.id);
        const flatData = req.body;
        const { updatedFlat, error } = await updateFlat(flatId, flatData);
        if (error || updatedFlat.length === 0) {
            return res.status(404).json({ error: 'Flat not found' });
        }
        res.status(200).json(updatedFlat);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the flat' });
    }
}

export async function deleteFlatController(req, res) {
    try {
        const flatId = parseInt(req.params.id);
        const { error } = await deleteFlat(flatId);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the flat' });
    }
}