import { Router } from 'express';
import { listarClientes, agregarCliente } from '../controllers/cliente.controller';

const router = Router();

router.get('/clientes', listarClientes);
router.post('/clientes', agregarCliente);

export default router;