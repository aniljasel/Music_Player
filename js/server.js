require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(bodyParser.json());

const users = []; // Replace with MongoDB or persistent DB
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Auth routes
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  res.status(201).json({ message: 'User registered' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

function verifyToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Access denied' });
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(400).json({ message: 'Invalid token' });
  }
}

// Spotify client credentials flow
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
});
let accessToken = null;
async function refreshSpotifyToken() {
  const data = await spotifyApi.clientCredentialsGrant();
  accessToken = data.body['access_token'];
  spotifyApi.setAccessToken(accessToken);
}
refreshSpotifyToken();
setInterval(refreshSpotifyToken, 1000 * 60 * 55);

// Protected search route
app.get('/search', verifyToken, async (req, res) => {
  const q = req.query.q;
  const data = await spotifyApi.searchTracks(q, { limit: 10 });
  res.json(data.body.tracks.items.map(t => ({
    id: t.id,
    title: t.name,
    artist: t.artists.map(a=>a.name).join(', '),
    preview: t.preview_url,
    cover: t.album.images[0]?.url
  })));
});

app.listen(4000, () => console.log('API running on port 4000'));
