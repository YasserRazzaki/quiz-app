import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';

// Configuration de la connexion à la base de données
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

const handleRegister = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { nom, email, motdepasse } = req.body;

    if (!nom || !email || !motdepasse) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(motdepasse, 10);

    const client = await pool.connect();

    const result = await client.query(
      'INSERT INTO utilisateurs (nom, email, motdepasse) VALUES ($1, $2, $3) RETURNING *',
      [nom, email, hashedPassword]
    );

    client.release();

    const newUser = result.rows[0];
    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handleRegister;
