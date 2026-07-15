import { Request, Response } from 'express';
import { findAllClientes, insertCliente } from '../persistence/cliente.repository';
import { Cliente } from '../modules/cliente.model';

/**
 * GET /clientes
 * Devuelve la lista completa de clientes.
 */
export const listarClientes = async (_req: Request, res: Response): Promise<void> => {
  try {
    const clientes = await findAllClientes();
    res.status(200).json(clientes);
  } catch (error) {
    console.error('Error al listar clientes:', error);
    res.status(500).json({ mensaje: 'Error al obtener la lista de clientes' });
  }
};

/**
 * POST /clientes
 * Agrega un nuevo cliente.
 */
export const agregarCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const datosCliente = req.body;

    // Le asignamos un string vacío al código para cumplir con la interfaz de TypeScript,
    // pero nuestro repositorio se encargará de calcular el código real de forma autoincremental.
    const cliente: Cliente = {
      ...datosCliente,
      codigo_cliente: datosCliente.codigo_cliente || ''
    };

    const nuevoCliente = await insertCliente(cliente);
    res.status(201).json(nuevoCliente);
  } catch (error) {
    console.error('Error al agregar cliente:', error);
    res.status(500).json({ mensaje: 'Error al agregar el cliente' });
  }
};