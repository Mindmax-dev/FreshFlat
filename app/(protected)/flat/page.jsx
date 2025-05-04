import { getFlatOfUserController } from '@/controller/flat';
import styles from './page.module.css';

export default async function FlatPage() {
  const flat = await getFlatOfUserController();
  console.log(flat);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🏡Flatname: {flat.name}</h1>

      <div className={styles.section}>
        <h2>👥 Members:</h2>

        <ul>
          {flat.members.map((user) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      </div>

      <p className={styles.admin}>
        ⭐ <strong>Admin:</strong> {flat.admin}
      </p>
      <p>
        <strong>Invite Token:</strong>{' '}
        <span className={styles.token}>{flat.inviteToken}</span>
      </p>
    </div>
  );
}
