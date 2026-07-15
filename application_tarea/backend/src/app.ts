import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clienteRoutes from './routes/cliente.routes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', clienteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});