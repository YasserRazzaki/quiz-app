const { db } = require('@vercel/postgres');
const { users, quizzes, questions, responses, rankings } = require('../app/lib/placeholder-data.js');  // Make sure the path is correct
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS utilisateurs (
      idUtilisateurs VARCHAR(50) PRIMARY KEY,
      nom VARCHAR(50),
      email VARCHAR(50) UNIQUE,
      motdepasse TEXT NOT NULL,
      date_inscription TIMESTAMP
    );
 `;

  console.log(`Created "utilisateurs" table`);

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO utilisateurs (idUtilisateurs, nom, email, motdepasse)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (idUtilisateurs) DO NOTHING;
      `;
    }),
  );

  console.log(`Seeded ${insertedUsers.length} users`);
}

async function seedQuizzes(client) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS quiz (
      idquiz VARCHAR(50) PRIMARY KEY,
      titre VARCHAR(50),
      description VARCHAR(255),
      nombre_questions INT,
      temps INT
    );
  `;

  console.log(`Created "quiz" table`);

  const insertedQuizzes = await Promise.all(
    quizzes.map(quiz => client.sql`
      INSERT INTO quiz (idquiz, titre, description, nombre_questions, temps)
      VALUES (${quiz.id}, ${quiz.title}, ${quiz.description}, ${quiz.numberOfQuestions}, ${quiz.timeLimit})
      ON CONFLICT (idquiz) DO NOTHING;
    `)
  );

  console.log(`Seeded ${insertedQuizzes.length} quizzes`);
}

async function seedQuestions(client) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS question (
      idquestion VARCHAR(50) PRIMARY KEY,
      texte VARCHAR(255),
      idquiz VARCHAR(50) NOT NULL,
      FOREIGN KEY(idquiz) REFERENCES quiz(idquiz)
    );
  `;

  console.log(`Created "question" table`);

  const insertedQuestions = await Promise.all(
    questions.map(question => client.sql`
      INSERT INTO question (idquestion, texte, idquiz)
      VALUES (${question.id}, ${question.text}, ${question.quizId})
      ON CONFLICT (idquestion) DO NOTHING;
    `)
  );

  console.log(`Seeded ${insertedQuestions.length} questions`);
}

async function seedResponses(client) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS reponse (
      idReponse VARCHAR(50) PRIMARY KEY,
      texte VARCHAR(255),
      estcorrect BOOLEAN,
      idquestion VARCHAR(50) NOT NULL,
      FOREIGN KEY(idquestion) REFERENCES question(idquestion)
    );
  `;

  console.log(`Created "reponse" table`);

  const insertedResponses = await Promise.all(
    responses.map(response => client.sql`
      INSERT INTO reponse (idReponse, texte, estcorrect, idquestion)
      VALUES (${response.id}, ${response.text}, ${response.isCorrect}, ${response.questionId})
      ON CONFLICT (idReponse) DO NOTHING;
    `)
  );

  console.log(`Seeded ${insertedResponses.length} responses`);
}

async function seedRankings(client) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS classement (
      idclassement VARCHAR(50) PRIMARY KEY,
      idUtilisateurs VARCHAR(50),
      idquiz VARCHAR(50),
      score INT,
      date_classement TIMESTAMP,
      FOREIGN KEY(idUtilisateurs) REFERENCES utilisateurs(idUtilisateurs),
      FOREIGN KEY(idquiz) REFERENCES quiz(idquiz)
    );
  `;

  console.log(`Created "classement" table`);

  const insertedRankings = await Promise.all(
    rankings.map(ranking => client.sql`
      INSERT INTO classement (idclassement, idUtilisateurs, idquiz, score, date_classement)
      VALUES (${ranking.id}, ${ranking.userId}, ${ranking.quizId}, ${ranking.score}, CURRENT_TIMESTAMP)
      ON CONFLICT (idclassement) DO NOTHING;
    `)
  );

  console.log(`Seeded ${insertedRankings.length} rankings`);
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedQuizzes(client);
  await seedQuestions(client);
  await seedResponses(client);
  await seedRankings(client);

  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});
