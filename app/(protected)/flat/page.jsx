import { getFlatOfUserController } from '@/controller/flat';
import styles from './page.module.css';

export default async function FlatPage() {
  const flat = await getFlatOfUserController();
  console.log(flat);

  async function handleTransferAdmin(newAdmin) {
    try {
      const response = await fetch('/api/transfer-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newAdmin }),
      });

      if (!response.ok) {
        throw new Error('Failed to transfer admin rights');
      }

      const result = await response.json();
      console.log('Admin rights transferred successfully:', result);
    } catch (error) {
      console.error('Error transferring admin rights:', error);
    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Flatname: {flat.name}</h1>

      <div className={styles.section}>
        <h2>Members:</h2>

        <ul className={styles.memberList}>
          {flat.members.map((user) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      </div>

      <p className={styles.admin}>
        <strong>Admin:</strong> {flat.admin}
      </p>
      <p>
        <strong>Invite Token:</strong>{' '}
        <span className={styles.token}>{flat.inviteToken}</span>
      </p>
    </div>
  );
}
