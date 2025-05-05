import { editFlatController, getFlatByIdController } from '@/controller/flat';
import { redirect } from 'next/navigation';

export default async function EditFlat({ params }) {
  const { id } = params;
  const flatData = await getFlatByIdController(id);

  if (!flatData) {
    redirect('/flat');
  }

  async function handleSubmit(formData) {
    'use server';
    const updatedName = formData.get('name');
    await editFlatController(id, { name: updatedName });
    redirect('/flat');
  }

  return (
    <div>
      <h1>Edit Flat</h1>
      <form action={handleSubmit}>
        <label htmlFor="name">Flat Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={flatData.name}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
