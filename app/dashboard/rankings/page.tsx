"use client"
import { useEffect, useState } from 'react';
import { getRankingsApi } from '../../lib/data';
import { RankingAPI } from '../../lib/definitions';

const Rankings = () => {
  const [rankingsAPI, setRankings] = useState<RankingAPI[]>([]);

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
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Rankings</h1>
      <div className="w-full">
        <table className="min-w-full items table-auto bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 border border-gray-300">Id</th>
              <th className="py-2 border border-gray-300">Username</th>
              <th className="py-2 border border-gray-300">Score</th>
            </tr>
          </thead>
          <tbody>
            {rankingsAPI.map((ranking) => (
              <tr key={ranking.id}>
                <td className="py-2 border border-gray-300">{ranking.id}</td>
                <td className="py-2 border border-gray-300">{ranking.username}</td>
                <td className="py-2 border border-gray-300">{ranking.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rankings;
