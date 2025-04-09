import { getFlatOfUserController } from '@/controller/flat';

export default async function FlatPage() {
  const flat = await getFlatOfUserController();
  console.log(flat);

  return (
    <div>
      <h1>Flatname: {flat.name}</h1>
      <p>Members:</p>
      <ul>
        {flat.members.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
      <p>Admin: {flat.admin}</p>
      <p>Invite Token: {flat.inviteToken}</p>
    </div>
  );
}
