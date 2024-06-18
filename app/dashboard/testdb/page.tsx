"use client";

import React, { useEffect, useState } from 'react';
import { getQuestionsByQuizId, getResponsesByQuestionId } from '../../lib/data';
import { Question, Response } from '../../lib/definitions';

const TestDBPage = () => {
  const [data, setData] = useState<{ questions: Question[], responses: Response[] }>({ questions: [], responses: [] });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questions = await getQuestionsByQuizId('quiz2'); // Utilisez l'ID de quiz souhaité
        const responses = await Promise.all(
          questions.map(async (question) => {
            const resps = await getResponsesByQuestionId(question.id);
            return resps;
          })
        );

        const flattenedResponses = responses.flat();

        setData({ questions, responses: flattenedResponses });
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Questions and Responses</h1>
      <div>
        <h2>Questions</h2>
        <pre>{JSON.stringify(data.questions, null, 2)}</pre>
      </div>
      <div>
        <h2>Responses</h2>
        <pre>{JSON.stringify(data.responses, null, 2)}</pre>
      </div>
    </div>
  );
};

export default TestDBPage;
