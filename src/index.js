import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { db } from './db/connection.js';
import { leads } from './db/schema.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const result = await db.insert(leads).values({ name, email, message }).returning();
    console.log("[api_marketing] Novo lead registrado:", email);
    res.status(201).json({ success: true, data: result[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.listen(PORT, () => {
  console.log("🚀 API_MARKETING ONLINE (JS): http://localhost:" + PORT);
});
