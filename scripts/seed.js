const { db } = require('@vercel/postgres');
const { users,rankingsMap, rankingsAPI } = require('../app/lib/placeholder-data.js');  // Make sure the path is correct
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

async function seedRankingsMap(client) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS classement_map (
      idclassement INT PRIMARY KEY,
      username VARCHAR(50),
      score INT,
      date_classement TIMESTAMP
    );
  `;

  console.log(`Created "classement_map" table`);

  const insertedRankings = await Promise.all(
    rankingsMap.map(ranking => client.sql`
      INSERT INTO classement_map (idclassement, username,score, date_classement)
      VALUES (${ranking.id}, ${ranking.username}, ${ranking.score}, CURRENT_TIMESTAMP)
      ON CONFLICT (idclassement) DO NOTHING;
    `)
  );

  console.log(`Seeded ${insertedRankings.length} rankings`);
}

async function seedRankingsAPI(client) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS classement_api (
      idclassement INT PRIMARY KEY,
      username VARCHAR(50),
      score INT,
      date_classement TIMESTAMP
    );
  `;

  console.log(`Created "classement_api" table`);

  const insertedRankings = await Promise.all(
    rankingsAPI.map(ranking => client.sql`
      INSERT INTO classement_api (idclassement, username,score, date_classement)
      VALUES (${ranking.id}, ${ranking.username}, ${ranking.score}, CURRENT_TIMESTAMP)
      ON CONFLICT (idclassement) DO NOTHING;
    `)
  );

  console.log(`Seeded ${insertedRankings.length} rankings`);
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedRankingsMap(client);
  await seedRankingsAPI(client);
  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});
