const {
  createFlat,
  getFlats,
  getFlatById,
  updateFlat,
  deleteFlat,
  getFlatOfUser,
} = require('@/model/flat');

export async function getFlatOfUserController() {
  const { flat, error } = await getFlatOfUser();
  if (error) {
    return null;
  }
  return flat;
}

export async function editFlatController(flatId, updatedData) {
  const { updatedFlat, error } = await updateFlat(flatId, updatedData);
  if (error) {
    throw new Error(error.message);
  }
  return updatedFlat;
}

export async function deleteFlatController(flatId) {
  const { error } = await deleteFlat(flatId);
  if (error) {
    throw new Error(error.message);
  }
}

export async function getFlatByIdController(flatId) {
  const { flat, error } = await getFlatById(flatId);
  if (error) {
    return null;
  }
  return flat;
}