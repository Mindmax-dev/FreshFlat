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

// export async function createFlatController(req, res) {
//   try {
//     const { name, adminId } = req.json();
//     const { flat, error } = await createFlat(name, adminId);
//     if (error) {
//       return new Response(JSON.stringify({ error: error.message }), {
//         status: 400,
//       });
//     }
//     return new Response(JSON.stringify(flat), { status: 201 });
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ error: 'An error occurred while creating the flat' }),
//       { status: 500 }
//     );
//   }
// }
// export async function getFlatsController(req, res) {
//   try {
//     const { flats, error } = await getFlats();
//     if (error) {
//       return new Response(JSON.stringify({ error: error.message }), {
//         status: 400,
//       });
//     }
//     return new Response(JSON.stringify(flats), { status: 200 });
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ error: 'An error occurred while fetching flats' }),
//       { status: 500 }
//     );
//   }
// }
// export async function getFlatByIdController(req, res) {
//   try {
//     const { id } = req.params;
//     const { flat, error } = await getFlatById(id);
//     if (error) {
//       return new Response(JSON.stringify({ error: error.message }), {
//         status: 400,
//       });
//     }
//     return new Response(JSON.stringify(flat), { status: 200 });
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ error: 'An error occurred while fetching the flat' }),
//       { status: 500 }
//     );
//   }
// }

// export async function updateFlatController(req, res) {
//   try {
//     const { id } = req.params;
//     const updateData = req.json();
//     const { updatedFlat, error } = await updateFlat(id, updateData);
//     if (error) {
//       return new Response(JSON.stringify({ error: error.message }), {
//         status: 400,
//       });
//     }
//     return new Response(JSON.stringify(updatedFlat), { status: 200 });
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ error: 'An error occurred while updating the flat' }),
//       { status: 500 }
//     );
//   }
// }
// export async function deleteFlatController(req, res) {
//   try {
//     const { id } = req.params;
//     const { error } = await deleteFlat(id);
//     if (error) {
//       return new Response(JSON.stringify({ error: error.message }), {
//         status: 400,
//       });
//     }
//     return new Response(
//       JSON.stringify({ message: 'Flat deleted successfully' }),
//       { status: 200 }
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ error: 'An error occurred while deleting the flat' }),
//       { status: 500 }
//     );
//   }
// }
