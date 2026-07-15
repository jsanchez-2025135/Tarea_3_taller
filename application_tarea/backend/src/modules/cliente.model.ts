/**
 * Entidad Cliente.
 * Se utiliza snake_case en los nombres de propiedades
 * para que coincidan exactamente con las columnas de la base de datos.
 */
export interface Cliente {
  codigo_cliente: string;
  nombre_cliente: string;
  direccion_cliente: string;
  telefono: string;
}