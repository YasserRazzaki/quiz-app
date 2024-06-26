"use client";
import { useEffect, useState } from 'react';
import { getRankingsMap } from '../../lib/data';
import { RankingMap } from '../../lib/definitions';

const Rankings = () => {
  const [rankingMap, setRankingMap] = useState<RankingMap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        setLoading(true);
        console.log('Fetching rankings...');

        const mapData = await getRankingsMap();
        console.log('Ranking Map data:', mapData);

        // Trier les données par score décroissant
        mapData.sort((a, b) => b.score - a.score);

        // Mettre à jour l'état avec les nouvelles données
        setRankingMap(mapData);
      } catch (error) {
        console.error('Failed to fetch rankings:', error);
      } finally {
        setLoading(false);
      }
    };

    // Charger les données initiales
    fetchRankings();

    // Rafraîchir les données toutes les 10 secondes (10000 ms)
    const refreshInterval = setInterval(fetchRankings, 10000);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 space-y-8">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Ranking Map</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 border border-gray-300 text-center">Username</th>
                <th className="py-2 border border-gray-300 text-center">Score</th>
              </tr>
            </thead>
            <tbody>
              {rankingMap.map((ranking, index) => (
                <tr key={index}>
                  <td className="py-2 border border-gray-300 text-center">{ranking.username}</td>
                  <td className="py-2 border border-gray-300 text-center">{ranking.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Rankings;