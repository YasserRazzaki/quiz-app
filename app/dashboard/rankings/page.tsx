"use client";
import { useEffect, useState } from 'react';
import { getRankingsApi, getRankingsMap } from '../../lib/data';
import { RankingAPI, RankingMap } from '../../lib/definitions';

const Rankings = () => {
  const [rankingsAPI, setRankings] = useState<RankingAPI[]>([]);
  const [rankingMap, setRankingMap] = useState<RankingMap[]>([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const data = await getRankingsApi();
        setRankings(data);
      } catch (error) {
        console.error('Failed to fetch rankings:', error);
      }
    };

    const fetchRankingMap = async () => {
      try {
        const data = await getRankingsMap();
        setRankingMap(data);
      } catch (error) {
        console.error('Failed to fetch ranking map:', error);
      }
    };

    fetchRankings();
    fetchRankingMap();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full mb-8">
      <h1 className="text-2xl font-bold mb-4">Rankings API</h1>
        <table className="min-w-full items table-auto bg-white border border-gray-300 mb-8">
          <thead>
            <tr>
              <th className="py-2 border border-gray-300">Username</th>
              <th className="py-2 border border-gray-300">Score</th>
            </tr>
          </thead>
          <tbody>
            {rankingsAPI.map((ranking) => (
              <tr key={ranking.id}>
                <td className="py-2 border border-gray-300">{ranking.username}</td>
                <td className="py-2 border border-gray-300">{ranking.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Ranking Map</h1>
        <table className="min-w-full items table-auto bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 border border-gray-300">Name</th>
              <th className="py-2 border border-gray-300">Score</th>
            </tr>
          </thead>
          <tbody>
            {rankingMap.map((ranking) => (
              <tr key={ranking.id}>
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
