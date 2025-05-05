import { getFlatOfUserController } from '@/controller/flat';

export default async function FlatPage() {
  const flatData = await getFlatOfUserController();
  if (!flatData) return <div>No flat data found</div>;

  return (
    <div>
      <h1>Flatname: {flatData.name}</h1>
      <p>Members:</p>
      <ul>
        {flatData.members.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
      <p>Admin: {flatData.admin}</p>
      <p>Invite Token: {flatData.inviteToken}</p>
      <div>
        {/* Edit Link */}
        <a href={`/flat/edit/${flatData.id}`}>Edit</a>
        {/* Delete Form */}
        <form action="/api/flat" method="POST">
          <input type="hidden" name="action" value="delete" />
          <input type="hidden" name="flatId" value={flatData.id} />
          <button type="submit">Delete</button>
        </form>
      </div>
    </div>
  );
}
