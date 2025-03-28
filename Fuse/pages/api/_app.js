import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET':
      const users = await db.collection('users').find({}).toArray();
      res.status(200).json(users);
      break;
    case 'POST':
      // Handle POST request
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}