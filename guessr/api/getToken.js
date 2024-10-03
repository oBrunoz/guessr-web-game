export default function handler(req, res) {
    const token = process.env.TMDB_API_KEY;  // Acessa a variável de ambiente configurada no Vercel
    if (token) {
      res.status(200).json({ access_token: token });
    } else {
      res.status(500).json({ error: 'Token not found' });
    }
  }