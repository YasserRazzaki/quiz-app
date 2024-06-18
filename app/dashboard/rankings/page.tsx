"use client"
import { useEffect, useState, FormEvent } from 'react';
import { getRankings, recordRanking } from '../../lib/data';
import { Ranking } from '../../lib/definitions';

const Rankings = () => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [userId, setUserId] = useState('');
  const [quizId, setQuizId] = useState('');
  const [score, setScore] = useState('');
  const [rankingDate, setRankingDate] = useState('');

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const data = await getRankings();
        setRankings(data);
      } catch (error) {
        console.error('Failed to fetch rankings:', error);
      }
    };

    fetchRankings();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const newRanking: Ranking = {
      id: (rankings.length + 1).toString(), // Génère un ID simple pour l'exemple
      userId,
      quizId,
      score: parseInt(score),
      rankingDate: new Date(rankingDate)
    };

    try {
      await recordRanking(newRanking);
      setRankings([...rankings, newRanking]);
    } catch (error) {
      console.error('Failed to insert ranking:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Rankings</h1>
        <ul className="mb-4">
          {rankings.map((ranking) => (
            <li key={ranking.id}>
              User ID: {ranking.userId}, Quiz ID: {ranking.quizId}, Score: {ranking.score}, Date: {ranking.rankingDate.toString()}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>User ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="border p-2"
            />
          </div>
          <div>
            <label>Quiz ID:</label>
            <input
              type="text"
              value={quizId}
              onChange={(e) => setQuizId(e.target.value)}
              required
              className="border p-2"
            />
          </div>
          <div>
            <label>Score:</label>
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              required
              className="border p-2"
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              value={rankingDate}
              onChange={(e) => setRankingDate(e.target.value)}
              required
              className="border p-2"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Ranking
          </button>
        </form>
      </div>
    </div>
  );
};

export default Rankings;