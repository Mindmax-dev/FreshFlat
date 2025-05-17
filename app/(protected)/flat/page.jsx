'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaCrown, FaKey, FaUserFriends } from 'react-icons/fa';
import styles from './page.module.css';

export default function FlatPage() {
  const router = useRouter();
  const [flatData, setFlatData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/flat');
        const data = await res.json();

        if (!res.ok) {
          setMessage(data.error || 'Failed to fetch flat data');
          return;
        }

        setFlatData(data.flat);
        console.log('Flat Data:', data.flat);

        // Fetch user ID from Supabase client-side
        const { createClient } = await import('@/utils/supabase/client');
        const supabase = createClient();
        const userResponse = await supabase.auth.getUser();
        console.log('User Response:', userResponse);

        if (!userResponse.data.user) {
          setMessage('Please log in to continue');
          router.push('/login');
          return;
        }
        setUserId(userResponse.data.user.id);
      } catch (error) {
        console.error('Error fetching flat data:', error);
        setMessage('An error occurred while fetching flat data');
      }
    }

    fetchData();
  }, [router]);

  const handleLeaveFlat = async () => {
    if (!userId || !flatData) return;
    setMessage('');

    try {
      const res = await fetch('/api/flat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'leave',
          flatId: flatData.id,
          userId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || 'Successfully left the flat');
        router.push('/chooseFlat');
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  if (!flatData) return <div>{message || 'Loading...'}</div>;

  async function handleTransferAdmin(newAdmin) {
    try {
      const response = await fetch('/api/flat/transfer-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flatId: flatData.id,
          newAdmin: newAdmin.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to transfer admin rights');
      }

      const result = await response.json();
      console.log('Admin rights transferred successfully:', result);
      window.location.reload();
    } catch (error) {
      console.error('Error transferring admin rights:', error);
    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Flat Name: {flatData.name}</h1>
      <p className={styles.subtitle}>
        <FaUserFriends className={styles.icon} />
        Members:
      </p>
      <ul className={styles.memberList}>
        {/* Displaying members individually */}
        {flatData.members.map((user, index) => (
          <li key={index} className={styles.memberItem}>
            <span>{user.name}</span>
            {user.id === flatData.admin.id && (
              <span className={styles.adminBadge}>
                <FaCrown className={styles.crownIcon} />
              </span>
            )}
            {user.id !== flatData.admin.id && (
              <button
                className={styles.transferAdminBtn}
                onClick={() => handleTransferAdmin(user)}
              >
                Transfer Admin
              </button>
            )}
          </li>
        ))}
      </ul>

      <p className={styles.subtitle}>Admin: {flatData.admin.name}</p>
      <p className={styles.inviteToken}>
        <FaKey className={styles.icon} />
        Invite Token: {flatData.id}
      </p>

      {/* Edit Link */}
      <div className={styles.actions}>
        <button
          className={styles.editBtn}
          onClick={() => router.push(`/flat/edit/${flatData.id}`)}
        >
          Edit Flat Name
        </button>
        {/* Delete Form */}
        <form action="/api/flat" method="POST" className={styles.deleteForm}>
          <input type="hidden" name="action" value="delete" />
          <input type="hidden" name="flatId" value={flatData.id} />
          <button className={styles.deleteBtn} type="submit">
            Delete Flat
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}

        <button className={styles.leaveBtn} onClick={handleLeaveFlat}>
          Leave Flat
        </button>
      </div>
    </div>
  );
}
