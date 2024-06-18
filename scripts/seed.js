const { db } = require('@vercel/postgres');
const { users,rankingsMap, rankingsAPI, inscrits } = require('../app/lib/placeholder-data.js');  // Make sure the path is correct
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS utilisateurs (
      id SERIAL PRIMARY KEY,
      nom VARCHAR(50),
      email VARCHAR(50) UNIQUE,
      motdepasse TEXT NOT NULL,
      date_inscription TIMESTAMP
    );
 `;

  console.log(`Created "utilisateurs" table`);

  /* const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO utilisateurs (id, nom, email, motdepasse, date_inscription)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, CURRENT_TIMESTAMP )
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  console.log(`Seeded ${insertedUsers.length} users`);
*/
} 
async function seedInscrits(client) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS inscrits (
     id SERIAL PRIMARY KEY,
  nom VARCHAR(50),
  email VARCHAR(50) UNIQUE,
  motdepasse TEXT NOT NULL,
  date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
 `;

  console.log(`Created "inscrits" table`);

  const insertedInscrits = await Promise.all(
    inscrits.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO inscrits (id, nom, email, motdepasse, date_inscription)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, CURRENT_TIMESTAMP)
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  console.log(`Seeded ${insertedInscrits.length} users`);
}

async function seedRankingsMap(client) {
  await client.sql`
    DROP TABLE IF EXISTS classement_map;
    CREATE TABLE IF NOT EXISTS classement_map (
      idclassement SERIAL PRIMARY KEY,
      username VARCHAR(50),
      score INT,
      date_classement TIMESTAMP
    );
  `;

  console.log(`Created "classement_map" table`);

  const insertedRankings = await Promise.all(
    rankingsMap.map(ranking => client.sql`
      INSERT INTO classement_map (username, score, date_classement)
      VALUES (${ranking.username}, ${ranking.score}, CURRENT_TIMESTAMP)
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
  await seedInscrits(client);
  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});
