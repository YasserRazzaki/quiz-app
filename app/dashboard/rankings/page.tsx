"use client"
import { useEffect, useState} from 'react';
import { getRankingsApi } from '../../lib/data';
import { RankingMap } from '../../lib/definitions';

const Rankings = () => {
  const [rankings, setRankings] = useState<RankingMap[]>([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const data = await getRankingsApi();
        setRankings(data);
      } catch (error) {
        console.error('Failed to fetch rankings:', error);
      }
    };

    fetchRankings();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Rankings</h1>
        <ul className="mb-4">
          {rankings.map((ranking) => (
            <li key={ranking.id}>
              User ID: {ranking.userId}, Score: {ranking.score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rankings;