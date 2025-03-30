// app/api/flat/route.js
import { createFlatController, deleteFlatController, getFlatByIdController, getFlatsController, updateFlatController } from "@/controller/flat";

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return createFlatController(req, res);
        case 'GET':
            if (req.query.id) {
                return getFlatByIdController(req, res);
            } else {
                return getFlatsController(req, res);
            }
        case 'PATCH':
            return updateFlatController(req, res);
        case 'DELETE':
            return deleteFlatController(req, res);
        default:
            return res.status(405).json({ error: 'Method Not Allowed' });
    }
}