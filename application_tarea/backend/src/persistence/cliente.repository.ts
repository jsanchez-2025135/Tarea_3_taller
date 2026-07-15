import { pool } from './db';
import { Cliente } from '../modules/cliente.model';

export const findAllClientes = async (): Promise<Cliente[]> => {
  const result = await pool.query<Cliente>(
    'SELECT codigo_cliente, nombre_cliente, direccion_cliente, telefono FROM clientes ORDER BY codigo_cliente ASC'
  );
  return result.rows;
};

export const insertCliente = async (cliente: Cliente): Promise<Cliente> => {
  const { nombre_cliente, direccion_cliente, telefono } = cliente;

  // 1. Buscamos el último código para autoincrementarlo
  const maxResult = await pool.query(
    `SELECT codigo_cliente FROM clientes 
     WHERE codigo_cliente LIKE 'CLI-%' 
     ORDER BY codigo_cliente DESC LIMIT 1`
  );

  let nuevoCodigo = 'CLI-0001';

  if (maxResult.rows.length > 0) {
    const ultimoCodigo = maxResult.rows[0].codigo_cliente;
    const numeroActual = parseInt(ultimoCodigo.replace('CLI-', ''), 10);
    const siguienteNumero = numeroActual + 1;
    nuevoCodigo = `CLI-${String(siguienteNumero).padStart(4, '0')}`;
  }

  // 2. Insertamos el nuevo registro
  const result = await pool.query<Cliente>(
    `INSERT INTO clientes (codigo_cliente, nombre_cliente, direccion_cliente, telefono)
     VALUES ($1, $2, $3, $4)
     RETURNING codigo_cliente, nombre_cliente, direccion_cliente, telefono`,
    [nuevoCodigo, nombre_cliente, direccion_cliente, telefono]
  );

  return result.rows[0];
};