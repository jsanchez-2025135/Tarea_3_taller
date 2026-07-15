-- 1. Borramos la tabla de clientes únicamente
DROP TABLE IF EXISTS clientes;

-- 2. Borramos la secuencia vieja si existía para empezar desde 1 de nuevo
DROP SEQUENCE IF EXISTS clientes_codigo_seq;

-- 3. Creamos la secuencia limpia
CREATE SEQUENCE clientes_codigo_seq START WITH 1;

-- 4. Creamos la tabla con el autoincremento integrado de una vez
CREATE TABLE clientes (
    codigo_cliente VARCHAR(50) PRIMARY KEY DEFAULT 'CLI-' || lpad(nextval('clientes_codigo_seq')::text, 4, '0'),
    nombre_cliente VARCHAR(150) NOT NULL,
    direccion_cliente VARCHAR(200) NOT NULL,
    telefono VARCHAR(30) NOT NULL
);

SELECT * FROM clientes;


