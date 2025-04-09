"use client";

import { useEffect, useState } from 'react';

export default function FlatsPage() {
    const [flats, setFlats] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchFlats = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/flat');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setFlats(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (error) {
            console.error(`Fetch error: ${error.message}`);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlats();
    }, []);

    if (loading) return <div>Loading flats...</div>;
    if (error) return <div>Error loading flats: {error}</div>;

    return (
        <div>
            <h1>Flats</h1>
            <ul>
                {flats.map(flat => (
                    <li key={flat.id}>
                        {flat.name} : {flat.adminId}
                    </li>
                ))}
            </ul>
        </div>
    );
}