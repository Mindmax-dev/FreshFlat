import { createFlatController, deleteFlatController, getFlatByIdController, getFlatsController, updateFlatController } from "@/controller/flat";

// GET: Fetch all flats or a single flat by ID (via query param)
export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
        req.params = { id };
        return await getFlatByIdController(req, res);
    }
    return await getFlatsController(req, res);
}

export async function POST(req, res) {
    return await createFlatController(req, res);
}

export async function PUT(req, res) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    req.params = { id };
    return await updateFlatController(req, res);
}

export async function DELETE(req, res) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    req.params = { id };
    return await deleteFlatController(req, res);
}