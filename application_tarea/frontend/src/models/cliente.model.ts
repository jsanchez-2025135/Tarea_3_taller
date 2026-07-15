/**
 * Interfaz que representa a un Cliente.
 * Los nombres de las propiedades usan snake_case
 * para coincidir exactamente con la respuesta del backend.
 */
export interface Cliente {
  codigo_cliente: string;
  nombre_cliente: string;
  direccion_cliente: string;
  telefono: string;
}