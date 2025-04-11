'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ChooseFlatPage() {
  const router = useRouter();
  const [flatName, setFlatName] = useState('');
  const [flatCode, setFlatCode] = useState('');

  const handleCreateFlat = async () => {
    await fetch('/api/flat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ flatName: flatName }), // Replace with actual flat name input
    }).then((response) => {
      if (response.ok) {
        router.push('/');
      }
      // ?= Error Handling
    });
  };

  const handleJoinFlat = async () => {
    await fetch('/api/flat', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ flatCode: flatCode }),
    }).then((response) => {
      if (response.ok) {
        router.push('/');
      }
      // ?= Error Handling
    });
  };

  return (
    <div className="container">
      <div className="box">
        <div>CREATE FLAT</div>
        <input
          type="text"
          placeholder="Enter flat name"
          value={flatName}
          onChange={(e) => setFlatName(e.target.value)}
        />
        <button onClick={() => handleCreateFlat()}>Done</button>
      </div>
      <div className="box">
        <div>JOIN FLAT</div>
        <input
          type="text"
          placeholder="Enter flat code"
          value={flatCode}
          onChange={(e) => setFlatCode(e.target.value)}
        />
        <button onClick={() => handleJoinFlat()}>Done</button>
      </div>
    </div>
  );
}
